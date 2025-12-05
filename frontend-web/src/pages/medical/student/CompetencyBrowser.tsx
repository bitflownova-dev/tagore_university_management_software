import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  TextField,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from '@mui/material';
import {
  Search as SearchIcon,
  ExpandMore,
  CheckCircle,
  RadioButtonUnchecked,
  Schedule,
} from '@mui/icons-material';

interface Competency {
  code: string;
  description: string;
  level: 'Knows' | 'Knows How' | 'Shows How' | 'Does';
  assessmentMethods: string[];
  status: 'not-started' | 'in-progress' | 'completed';
  achievedDate?: string;
}

// Sample CBME competency data structure
const competencyData: Record<string, Record<string, Competency[]>> = {
  Anatomy: {
    phase1: [
      {
        code: 'AN1.1',
        description: 'Describe the anatomical position and terms of relationship',
        level: 'Knows',
        assessmentMethods: ['Written', 'Viva'],
        status: 'completed',
        achievedDate: '2024-09-15',
      },
      {
        code: 'AN1.2',
        description: 'Describe composition of bone & periosteum, their vascular & nerve supply',
        level: 'Knows How',
        assessmentMethods: ['Written', 'OSPE'],
        status: 'completed',
        achievedDate: '2024-09-20',
      },
      {
        code: 'AN2.1',
        description: 'Identify & describe parts, blood supply, nerve supply, lymphatic drainage',
        level: 'Shows How',
        assessmentMethods: ['OSPE', 'Practical'],
        status: 'in-progress',
      },
    ],
  },
  Physiology: {
    phase1: [
      {
        code: 'PY1.1',
        description: 'Describe organization of human body from molecular to organ system level',
        level: 'Knows',
        assessmentMethods: ['Written', 'MCQ'],
        status: 'completed',
        achievedDate: '2024-09-10',
      },
      {
        code: 'PY1.2',
        description: 'Explain normal functioning of body systems',
        level: 'Knows How',
        assessmentMethods: ['Written', 'Viva'],
        status: 'in-progress',
      },
      {
        code: 'PY2.1',
        description: 'Demonstrate examination of various body systems',
        level: 'Shows How',
        assessmentMethods: ['OSCE', 'Clinical'],
        status: 'not-started',
      },
    ],
  },
  Biochemistry: {
    phase1: [
      {
        code: 'BI1.1',
        description: 'Describe structure & function of cell and subcellular organelles',
        level: 'Knows',
        assessmentMethods: ['Written', 'MCQ'],
        status: 'completed',
        achievedDate: '2024-09-12',
      },
      {
        code: 'BI1.2',
        description: 'Describe metabolism of carbohydrates, proteins, lipids',
        level: 'Knows How',
        assessmentMethods: ['Written', 'Viva'],
        status: 'in-progress',
      },
    ],
  },
};

export default function CompetencyBrowser() {
  const [selectedPhase, setSelectedPhase] = useState('phase1');
  const [selectedSubject, setSelectedSubject] = useState('Anatomy');
  const [searchQuery, setSearchQuery] = useState('');

  const subjects = Object.keys(competencyData);
  const competencies: Competency[] = competencyData[selectedSubject]?.[selectedPhase] || [];

  const filteredCompetencies = competencies.filter(
    (comp) =>
      comp.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateProgress = () => {
    const completed = competencies.filter((c) => c.status === 'completed').length;
    return (completed / competencies.length) * 100;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle color="success" />;
      case 'in-progress':
        return <Schedule color="warning" />;
      default:
        return <RadioButtonUnchecked color="disabled" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Knows':
        return 'info';
      case 'Knows How':
        return 'primary';
      case 'Shows How':
        return 'warning';
      case 'Does':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Competency Browser
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Track your progress through the CBME curriculum
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Competencies
              </Typography>
              <Typography variant="h3" color="primary">
                126
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Completed
              </Typography>
              <Typography variant="h3" color="success.main">
                45
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                In Progress
              </Typography>
              <Typography variant="h3" color="warning.main">
                28
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Not Started
              </Typography>
              <Typography variant="h3" color="text.secondary">
                53
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Tabs
          value={selectedPhase}
          onChange={(_, value) => setSelectedPhase(value)}
          sx={{ mb: 3 }}
        >
          <Tab label="Phase 1" value="phase1" />
          <Tab label="Phase 2" value="phase2" disabled />
          <Tab label="Phase 3 Part 1" value="phase3p1" disabled />
          <Tab label="Phase 3 Part 2" value="phase3p2" disabled />
        </Tabs>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search competencies by code or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Subjects
              </Typography>
              {subjects.map((subject) => (
                <Button
                  key={subject}
                  fullWidth
                  variant={selectedSubject === subject ? 'contained' : 'text'}
                  onClick={() => setSelectedSubject(subject)}
                  sx={{ mb: 1, justifyContent: 'flex-start' }}
                >
                  {subject}
                </Button>
              ))}
            </Paper>
          </Grid>

          <Grid item xs={12} md={9}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                {selectedSubject} - Phase 1
              </Typography>
              <LinearProgress
                variant="determinate"
                value={calculateProgress()}
                sx={{ height: 8, borderRadius: 1, mb: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                {calculateProgress().toFixed(0)}% Complete
              </Typography>
            </Box>

            {filteredCompetencies.map((competency) => (
              <Accordion key={competency.code}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                    {getStatusIcon(competency.status)}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {competency.code}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {competency.description}
                      </Typography>
                    </Box>
                    <Chip
                      label={competency.level}
                      size="small"
                      color={getLevelColor(competency.level) as any}
                    />
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        Assessment Methods:
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {competency.assessmentMethods.map((method) => (
                          <Chip key={method} label={method} size="small" />
                        ))}
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        Status:
                      </Typography>
                      <Chip
                        label={competency.status.replace('-', ' ').toUpperCase()}
                        color={
                          competency.status === 'completed'
                            ? 'success'
                            : competency.status === 'in-progress'
                            ? 'warning'
                            : 'default'
                        }
                      />
                      {competency.achievedDate && (
                        <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                          Achieved on: {competency.achievedDate}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
