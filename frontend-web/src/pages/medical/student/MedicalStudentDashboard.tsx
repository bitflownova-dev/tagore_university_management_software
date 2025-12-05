import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  LinearProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  LibraryBooks,
  EventNote,
  Assessment,
  LocalHospital,
  TrendingUp,
  Schedule,
  VideoLibrary,
} from '@mui/icons-material';

export default function MedicalStudentDashboard() {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Learning Portal (LMS)',
      icon: <VideoLibrary sx={{ fontSize: 40 }} />,
      color: '#DC2626',
      description: 'Videos & Assessments',
      path: '/medical/student/lms',
    },
    {
      title: 'Competency Browser',
      icon: <LibraryBooks sx={{ fontSize: 40 }} />,
      color: '#1976D2',
      description: 'Browse & track CBME competencies',
      path: '/medical/student/competencies',
    },
    {
      title: 'Clinical Logbook',
      icon: <EventNote sx={{ fontSize: 40 }} />,
      color: '#2E7D32',
      description: 'Record clinical procedures',
      path: '/medical/student/logbook',
    },
    {
      title: 'Assessments',
      icon: <Assessment sx={{ fontSize: 40 }} />,
      color: '#ED6C02',
      description: 'View assessment results',
      path: '/medical/student/assessments',
    },
  ];

  const upcomingAssessments = [
    { date: '2024-12-10', type: 'OSPE', subject: 'Anatomy', topic: 'Upper Limb' },
    { date: '2024-12-15', type: 'Viva', subject: 'Physiology', topic: 'CVS' },
    { date: '2024-12-20', type: 'Theory', subject: 'Biochemistry', topic: 'Proteins' },
  ];

  const recentLogbookEntries = [
    {
      date: '2024-12-02',
      procedure: 'Antenatal Examination',
      department: 'OBG',
      status: 'Pending',
    },
    {
      date: '2024-12-01',
      procedure: 'Newborn Examination',
      department: 'Pediatrics',
      status: 'Pending',
    },
    {
      date: '2024-11-29',
      procedure: 'Suturing - Simple interrupted',
      department: 'Surgery',
      status: 'Approved',
    },
  ];

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #D32F2F 0%, #C62828 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Welcome, Rahul Sharma
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          MBBS - Phase 1 | Roll No: MED-2024-1523
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
                    Overall Progress
                  </Typography>
                  <Typography variant="h4" color="success.main">
                    68%
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
                Competencies
              </Typography>
              <Typography variant="h4" color="primary">
                45/126
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Completed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Logbook Entries
              </Typography>
              <Typography variant="h4" color="primary">
                38
              </Typography>
              <Typography variant="body2" color="text.secondary">
                2 Pending Approval
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Current Rotation
              </Typography>
              <Typography variant="h6" color="error.main">
                Surgery
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Week 3 of 6
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {quickActions.map((action) => (
          <Grid item xs={12} sm={6} md={3} key={action.title}>
            <Card
              sx={{
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 8px 16px ${action.color}40`,
                },
              }}
            >
              <CardActionArea onClick={() => navigate(action.path)} sx={{ p: 3, height: '100%' }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: `${action.color}20`,
                    color: action.color,
                    margin: '0 auto 16px',
                  }}
                >
                  {action.icon}
                </Box>
                <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 600 }}>
                  {action.title}
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary">
                  {action.description}
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Schedule color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Upcoming Assessments
              </Typography>
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Topic</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {upcomingAssessments.map((assessment, index) => (
                    <TableRow key={index}>
                      <TableCell>{assessment.date}</TableCell>
                      <TableCell>
                        <Chip label={assessment.type} size="small" color="primary" />
                      </TableCell>
                      <TableCell>{assessment.subject}</TableCell>
                      <TableCell>{assessment.topic}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <EventNote color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Recent Logbook Entries
              </Typography>
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Procedure</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentLogbookEntries.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>{entry.procedure}</TableCell>
                      <TableCell>{entry.department}</TableCell>
                      <TableCell>
                        <Chip
                          label={entry.status}
                          size="small"
                          color={entry.status === 'Approved' ? 'success' : 'warning'}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 0 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Phase 1 Competency Progress
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={4}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Anatomy
                </Typography>
                <LinearProgress variant="determinate" value={72} sx={{ height: 8, mb: 1 }} />
                <Typography variant="caption">28/39 completed (72%)</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Physiology
                </Typography>
                <LinearProgress variant="determinate" value={65} sx={{ height: 8, mb: 1 }} />
                <Typography variant="caption">26/40 completed (65%)</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Biochemistry
                </Typography>
                <LinearProgress variant="determinate" value={58} sx={{ height: 8, mb: 1 }} />
                <Typography variant="caption">19/33 completed (58%)</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
