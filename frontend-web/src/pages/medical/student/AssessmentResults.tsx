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
  Tabs,
  Tab,
  LinearProgress,
} from '@mui/material';
import {
  EmojiEvents,
  TrendingUp,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';

interface Assessment {
  id: number;
  date: string;
  type: string;
  subject: string;
  topic: string;
  competencyCode: string;
  marksObtained: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  examiner: string;
  remarks?: string;
}

const assessments: Assessment[] = [
  {
    id: 1,
    date: '2024-11-28',
    type: 'OSCE',
    subject: 'Surgery',
    topic: 'Suturing Techniques',
    competencyCode: 'SU3.2',
    marksObtained: 18,
    totalMarks: 20,
    percentage: 90,
    grade: 'A+',
    examiner: 'Dr. Priya Sharma',
    remarks: 'Excellent technique. Good hand movements and knot tying.',
  },
  {
    id: 2,
    date: '2024-11-25',
    type: 'OSPE',
    subject: 'Anatomy',
    topic: 'Upper Limb Identification',
    competencyCode: 'AN2.1',
    marksObtained: 16,
    totalMarks: 20,
    percentage: 80,
    grade: 'A',
    examiner: 'Dr. Suresh Iyer',
    remarks: 'Good identification. Need to improve on nerve supply details.',
  },
  {
    id: 3,
    date: '2024-11-20',
    type: 'Viva',
    subject: 'Internal Medicine',
    topic: 'Cardiovascular System',
    competencyCode: 'IM4.1',
    marksObtained: 17,
    totalMarks: 20,
    percentage: 85,
    grade: 'A',
    examiner: 'Dr. Ramesh Kumar',
  },
  {
    id: 4,
    date: '2024-11-15',
    type: 'Written',
    subject: 'Physiology',
    topic: 'Respiratory System',
    competencyCode: 'PY3.4',
    marksObtained: 38,
    totalMarks: 50,
    percentage: 76,
    grade: 'B+',
    examiner: 'Dr. Kavita Desai',
  },
  {
    id: 5,
    date: '2024-11-10',
    type: 'MCQ',
    subject: 'Biochemistry',
    topic: 'Metabolism',
    competencyCode: 'BI2.3',
    marksObtained: 22,
    totalMarks: 25,
    percentage: 88,
    grade: 'A',
    examiner: 'Dr. Anil Gupta',
  },
  {
    id: 6,
    date: '2024-11-05',
    type: 'Practical',
    subject: 'Pediatrics',
    topic: 'Newborn Assessment',
    competencyCode: 'PE2.1',
    marksObtained: 19,
    totalMarks: 20,
    percentage: 95,
    grade: 'A+',
    examiner: 'Dr. Anjali Verma',
    remarks: 'Outstanding performance. Excellent patient handling.',
  },
];

export default function AssessmentResults() {
  const [selectedTab, setSelectedTab] = useState(0);

  const subjects = ['All', 'Anatomy', 'Physiology', 'Biochemistry', 'Internal Medicine', 'Surgery', 'Pediatrics'];

  const filteredAssessments = assessments.filter((assessment) => {
    if (selectedTab === 0) return true;
    return assessment.subject === subjects[selectedTab];
  });

  const averagePercentage =
    assessments.reduce((sum, a) => sum + a.percentage, 0) / assessments.length;

  const gradeDistribution = {
    'A+': assessments.filter((a) => a.grade === 'A+').length,
    A: assessments.filter((a) => a.grade === 'A').length,
    'B+': assessments.filter((a) => a.grade === 'B+').length,
    B: assessments.filter((a) => a.grade === 'B').length,
  };

  const getGradeColor = (grade: string) => {
    if (grade === 'A+') return 'success';
    if (grade === 'A') return 'primary';
    if (grade === 'B+') return 'warning';
    return 'default';
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Assessment Results
        </Typography>
        <Typography variant="body2" color="text.secondary">
          View your competency-based assessment performance
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TrendingUp sx={{ fontSize: 40, color: '#2E7D32' }} />
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Average Score
                  </Typography>
                  <Typography variant="h3" color="success.main">
                    {averagePercentage.toFixed(1)}%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AssessmentIcon sx={{ fontSize: 40, color: '#1976D2' }} />
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Total Assessments
                  </Typography>
                  <Typography variant="h3" color="primary">
                    {assessments.length}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <EmojiEvents sx={{ fontSize: 40, color: '#FFA726' }} />
                <Box>
                  <Typography variant="h6" gutterBottom>
                    A+ Grades
                  </Typography>
                  <Typography variant="h3" sx={{ color: '#FFA726' }}>
                    {gradeDistribution['A+']}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Current CGPA
              </Typography>
              <Typography variant="h3" color="primary">
                8.5
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Based on all assessments
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Grade Distribution
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {Object.entries(gradeDistribution).map(([grade, count]) => (
                <Grid item xs={6} key={grade}>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Grade {grade}</Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {count}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(count / assessments.length) * 100}
                      sx={{ height: 8, borderRadius: 1 }}
                      color={
                        grade === 'A+' ? 'success' : grade === 'A' ? 'primary' : 'warning'
                      }
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Assessment Type Breakdown
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {['OSCE', 'OSPE', 'Viva', 'Written'].map((type) => {
                const count = assessments.filter((a) => a.type === type).length;
                return (
                  <Grid item xs={6} key={type}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          {type}
                        </Typography>
                        <Typography variant="h4" color="primary">
                          {count}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Tabs
          value={selectedTab}
          onChange={(_, value) => setSelectedTab(value)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 3 }}
        >
          {subjects.map((subject) => (
            <Tab key={subject} label={subject} />
          ))}
        </Tabs>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Topic</TableCell>
                <TableCell>Competency</TableCell>
                <TableCell>Marks</TableCell>
                <TableCell>%</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell>Examiner</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAssessments.map((assessment) => (
                <TableRow key={assessment.id} hover>
                  <TableCell>{assessment.date}</TableCell>
                  <TableCell>
                    <Chip label={assessment.type} size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell>{assessment.subject}</TableCell>
                  <TableCell>{assessment.topic}</TableCell>
                  <TableCell>
                    <Chip label={assessment.competencyCode} size="small" />
                  </TableCell>
                  <TableCell>
                    {assessment.marksObtained}/{assessment.totalMarks}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={assessment.percentage}
                        sx={{ width: 60, height: 6, borderRadius: 1 }}
                      />
                      <Typography variant="body2">{assessment.percentage}%</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={assessment.grade}
                      size="small"
                      color={getGradeColor(assessment.grade) as any}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{assessment.examiner}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredAssessments.some((a) => a.remarks) && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Recent Feedback
            </Typography>
            {filteredAssessments
              .filter((a) => a.remarks)
              .slice(0, 3)
              .map((assessment) => (
                <Paper key={assessment.id} variant="outlined" sx={{ p: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {assessment.subject} - {assessment.topic}
                    </Typography>
                    <Chip label={assessment.date} size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {assessment.remarks}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    — {assessment.examiner}
                  </Typography>
                </Paper>
              ))}
          </Box>
        )}
      </Paper>
    </Box>
  );
}
