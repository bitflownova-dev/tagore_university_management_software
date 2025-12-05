import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Tabs,
  Tab,
  LinearProgress,
} from '@mui/material';
import { CalendarToday, Assessment, School, TrendingUp } from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;
  return <div hidden={value !== index}>{value === index && <Box sx={{ py: 3 }}>{children}</Box>}</div>;
}

const phases = [
  { name: 'Phase 1', duration: '1 Year', students: 200, competencies: 250, completion: 85 },
  { name: 'Phase 2', duration: '1.5 Years', students: 190, competencies: 350, completion: 78 },
  { name: 'Phase 3 Part 1', duration: '1 Year', students: 185, competencies: 400, completion: 72 },
  { name: 'Phase 3 Part 2', duration: '1 Year', students: 180, competencies: 300, completion: 68 },
  { name: 'Internship', duration: '1 Year', students: 45, competencies: 150, completion: 92 },
];

const departments = [
  { name: 'Anatomy', faculty: 12, subjects: 3, clinicalHours: 0, theoryHours: 180 },
  { name: 'Physiology', faculty: 10, subjects: 2, clinicalHours: 0, theoryHours: 150 },
  { name: 'Biochemistry', faculty: 8, subjects: 2, clinicalHours: 0, theoryHours: 120 },
  { name: 'Pathology', faculty: 10, subjects: 3, clinicalHours: 240, theoryHours: 100 },
  { name: 'Pharmacology', faculty: 9, subjects: 2, clinicalHours: 0, theoryHours: 120 },
  { name: 'Microbiology', faculty: 8, subjects: 2, clinicalHours: 180, theoryHours: 90 },
  { name: 'Forensic Medicine', faculty: 6, subjects: 1, clinicalHours: 60, theoryHours: 80 },
  { name: 'Community Medicine', faculty: 10, subjects: 3, clinicalHours: 300, theoryHours: 120 },
  { name: 'Medicine', faculty: 15, subjects: 4, clinicalHours: 600, theoryHours: 180 },
  { name: 'Surgery', faculty: 15, subjects: 4, clinicalHours: 600, theoryHours: 150 },
  { name: 'OBG', faculty: 8, subjects: 2, clinicalHours: 400, theoryHours: 100 },
  { name: 'Pediatrics', faculty: 10, subjects: 3, clinicalHours: 450, theoryHours: 120 },
];

const examSchedule = [
  { exam: 'Phase 1 - Block 1 Assessment', date: 'Dec 15, 2024', type: 'Theory + Practical', students: 200, status: 'Scheduled' },
  { exam: 'Phase 2 - OSCE Assessment', date: 'Dec 18, 2024', type: 'Clinical Skills', students: 190, status: 'Scheduled' },
  { exam: 'Phase 3 - Internal Medicine Viva', date: 'Dec 20, 2024', type: 'Viva Voce', students: 185, status: 'Scheduled' },
  { exam: 'Internship - Log Review', date: 'Dec 22, 2024', type: 'Competency Review', students: 45, status: 'Scheduled' },
  { exam: 'Phase 1 - Anatomy Final', date: 'Jan 05, 2025', type: 'Theory + Practical', students: 200, status: 'Upcoming' },
];

export default function MedicalAcademicManagement() {
  const [tabValue, setTabValue] = useState(0);

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #D32F2F 0%, #C62828 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          MBBS Academic Management (CBME)
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Competency-Based Medical Education - NMC Framework
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFEBEE', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <School sx={{ fontSize: 40, color: '#D32F2F', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#D32F2F' }}>
                    800
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total MBBS Students
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Assessment sx={{ fontSize: 40, color: '#388E3C', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#388E3C' }}>
                    1,450
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Competencies
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E3F2FD', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CalendarToday sx={{ fontSize: 40, color: '#1976D2', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976D2' }}>
                    5
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Upcoming Assessments
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFF3E0', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp sx={{ fontSize: 40, color: '#F57C00', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#F57C00' }}>
                    79%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Avg Completion Rate
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="CBME Phases" />
          <Tab label="Departments" />
          <Tab label="Examination Schedule" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            CBME Phase-wise Academic Structure
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Phase</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell align="center">Students</TableCell>
                  <TableCell align="center">Competencies</TableCell>
                  <TableCell>Completion Rate</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {phases.map((phase, index) => (
                  <TableRow key={index} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{phase.name}</TableCell>
                    <TableCell>{phase.duration}</TableCell>
                    <TableCell align="center">{phase.students}</TableCell>
                    <TableCell align="center">{phase.competencies}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={phase.completion}
                          sx={{ flex: 1, height: 8, borderRadius: 1 }}
                          color={phase.completion >= 80 ? 'success' : phase.completion >= 70 ? 'primary' : 'warning'}
                        />
                        <Typography variant="body2" sx={{ minWidth: 50 }}>
                          {phase.completion}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Button size="small" variant="outlined">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Clinical & Pre-Clinical Departments
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Department</TableCell>
                  <TableCell align="center">Faculty</TableCell>
                  <TableCell align="center">Subjects</TableCell>
                  <TableCell align="center">Clinical Hours</TableCell>
                  <TableCell align="center">Theory Hours</TableCell>
                  <TableCell>Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {departments.map((dept, index) => (
                  <TableRow key={index} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{dept.name}</TableCell>
                    <TableCell align="center">{dept.faculty}</TableCell>
                    <TableCell align="center">{dept.subjects}</TableCell>
                    <TableCell align="center">{dept.clinicalHours}</TableCell>
                    <TableCell align="center">{dept.theoryHours}</TableCell>
                    <TableCell>
                      <Chip
                        label={dept.clinicalHours > 0 ? 'Clinical' : 'Pre-Clinical'}
                        size="small"
                        color={dept.clinicalHours > 0 ? 'error' : 'primary'}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Upcoming MBBS Assessments & Examinations
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Examination</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell align="center">Students</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {examSchedule.map((exam, index) => (
                  <TableRow key={index} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{exam.exam}</TableCell>
                    <TableCell>{exam.date}</TableCell>
                    <TableCell>{exam.type}</TableCell>
                    <TableCell align="center">{exam.students}</TableCell>
                    <TableCell>
                      <Chip
                        label={exam.status}
                        size="small"
                        color={exam.status === 'Scheduled' ? 'warning' : 'default'}
                      />
                    </TableCell>
                    <TableCell>
                      <Button size="small" variant="contained">
                        Manage
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                NMC Compliance Status
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Faculty Requirements</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      142/160
                    </Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={88.75} sx={{ height: 8, borderRadius: 1 }} color="primary" />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Infrastructure Standards</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      95%
                    </Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={95} sx={{ height: 8, borderRadius: 1 }} color="success" />
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">CBME Implementation</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      92%
                    </Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={92} sx={{ height: 8, borderRadius: 1 }} color="success" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Quick Actions
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={6}>
                  <Button fullWidth variant="contained" color="error">
                    Academic Calendar
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button fullWidth variant="contained" color="primary">
                    Exam Schedule
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button fullWidth variant="outlined">
                    Competency Matrix
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button fullWidth variant="outlined">
                    NMC Reports
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
