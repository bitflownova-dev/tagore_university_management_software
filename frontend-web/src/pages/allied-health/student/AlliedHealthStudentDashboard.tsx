import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  School,
  EventAvailable,
  Assessment,
  AccountBalanceWallet,
  LocalHospital,
  TrendingUp,
} from '@mui/icons-material';

export default function AlliedHealthStudentDashboard() {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'My Attendance',
      icon: <EventAvailable sx={{ fontSize: 40 }} />,
      color: '#1565C0',
      value: '91%',
      subtitle: 'Overall',
      path: '/allied-health/student/attendance',
    },
    {
      title: 'My Marks',
      icon: <Assessment sx={{ fontSize: 40 }} />,
      color: '#1976D2',
      value: '8.5',
      subtitle: 'CGPA',
      path: '/allied-health/student/marks',
    },
    {
      title: 'Fee Payments',
      icon: <AccountBalanceWallet sx={{ fontSize: 40 }} />,
      color: '#1E88E5',
      value: '₹12,500',
      subtitle: 'Pending',
      path: '/allied-health/student/fees',
    },
    {
      title: 'Clinical Hours',
      icon: <LocalHospital sx={{ fontSize: 40 }} />,
      color: '#2196F3',
      value: '420',
      subtitle: 'of 600 hrs',
      path: '/allied-health/student/clinical',
    },
  ];

  const recentActivities = [
    { date: 'Dec 4, 2025', activity: 'Clinical Biochemistry Lab', type: 'Lab Session', status: 'Completed' },
    { date: 'Dec 3, 2025', activity: 'Mid-Term Practical', type: 'Assessment', status: 'Completed' },
    { date: 'Dec 2, 2025', activity: 'Hematology Theory', type: 'Lecture', status: 'Completed' },
  ];

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Student Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          BSc Medical Laboratory Technology - Year 2
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {quickActions.map((action) => (
          <Grid item xs={12} sm={6} md={3} key={action.title}>
            <Card>
              <CardActionArea onClick={() => navigate(action.path)}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ color: action.color, mb: 1 }}>
                    {action.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: action.color, mb: 0.5 }}>
                    {action.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {action.subtitle}
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {action.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Recent Activities
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Date</strong></TableCell>
                    <TableCell><strong>Activity</strong></TableCell>
                    <TableCell><strong>Type</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentActivities.map((activity, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{activity.date}</TableCell>
                      <TableCell>{activity.activity}</TableCell>
                      <TableCell>{activity.type}</TableCell>
                      <TableCell>
                        <Chip label={activity.status} size="small" color="success" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Semester Progress
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">70% Complete</Typography>
              <LinearProgress variant="determinate" value={70} sx={{ mt: 1 }} />
            </Box>
            <Typography variant="caption" color="text.secondary">
              10 weeks completed of 14 weeks
            </Typography>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Upcoming Events
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>Lab Competency Test</Typography>
                <Typography variant="caption" color="text.secondary">Dec 18, 2025 - 10:00 AM</Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>Clinical Posting</Typography>
                <Typography variant="caption" color="text.secondary">Dec 20, 2025 - All Day</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
