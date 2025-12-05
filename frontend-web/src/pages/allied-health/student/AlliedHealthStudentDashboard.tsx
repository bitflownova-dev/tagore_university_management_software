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
  alpha,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  EventAvailable,
  Assessment,
  AccountBalanceWallet,
  LocalHospital,
} from '@mui/icons-material';

export default function AlliedHealthStudentDashboard() {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'My Attendance',
      icon: <EventAvailable sx={{ fontSize: 40 }} />,
      color: '#00BFA5',
      value: '91%',
      subtitle: 'Overall',
      path: '/allied-health/student/attendance',
    },
    {
      title: 'My Marks',
      icon: <Assessment sx={{ fontSize: 40 }} />,
      color: '#00897B',
      value: '8.5',
      subtitle: 'CGPA',
      path: '/allied-health/student/marks',
    },
    {
      title: 'Fee Payments',
      icon: <AccountBalanceWallet sx={{ fontSize: 40 }} />,
      color: '#26A69A',
      value: '₹12,500',
      subtitle: 'Pending',
      path: '/allied-health/student/fees',
    },
    {
      title: 'Clinical Hours',
      icon: <LocalHospital sx={{ fontSize: 40 }} />,
      color: '#4DB6AC',
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
    <Box sx={{ minHeight: '100vh', bgcolor: '#F8FBFD', py: 4 }}>
      <Paper 
        elevation={0}
        sx={{ 
          p: 4, 
          mb: 4, 
          background: 'linear-gradient(135deg, #00BFA5 0%, #00897B 100%)',
          borderRadius: 3,
          boxShadow: '0 10px 40px rgba(0, 191, 165, 0.2)',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'white', letterSpacing: '-0.01em' }}>
          Student Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.95)' }}>
          BSc Medical Laboratory Technology - Year 2
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {quickActions.map((action) => (
          <Grid item xs={12} sm={6} md={3} key={action.title}>
            <Card 
              elevation={0}
              sx={{
                bgcolor: '#FFFFFF',
                borderRadius: 3,
                border: '1px solid rgba(0, 0, 0, 0.06)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0, 191, 165, 0.15)',
                },
              }}
            >
              <CardActionArea onClick={() => navigate(action.path)}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ color: action.color, mb: 1 }}>
                    {action.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: action.color, mb: 0.5 }}>
                    {action.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748B', mb: 1 }} gutterBottom>
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
          <Paper 
            elevation={0}
            sx={{ 
              p: 4,
              borderRadius: 3,
              border: '1px solid rgba(0, 0, 0, 0.06)',
              bgcolor: '#FFFFFF',
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1A202C', mb: 3 }}>
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
                    <TableRow 
                      key={index} 
                      sx={{
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          bgcolor: alpha('#00BFA5', 0.04),
                        },
                      }}
                    >
                      <TableCell>{activity.date}</TableCell>
                      <TableCell>{activity.activity}</TableCell>
                      <TableCell>{activity.type}</TableCell>
                      <TableCell>
                        <Chip 
                          label={activity.status} 
                          size="small" 
                          sx={{
                            bgcolor: alpha('#26A69A', 0.1),
                            color: '#26A69A',
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 3, 
              mb: 2,
              borderRadius: 3,
              border: '1px solid rgba(0, 0, 0, 0.06)',
              bgcolor: '#FFFFFF',
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1A202C' }}>
              Semester Progress
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ color: '#64748B' }}>70% Complete</Typography>
              <LinearProgress 
                variant="determinate" 
                value={70} 
                sx={{ 
                  mt: 1,
                  height: 10,
                  borderRadius: 2,
                  bgcolor: alpha('#00BFA5', 0.1),
                  '& .MuiLinearProgress-bar': {
                    bgcolor: '#00BFA5',
                    borderRadius: 2,
                  },
                }} 
              />
            </Box>
            <Typography variant="caption" sx={{ color: '#64748B' }}>
              10 weeks completed of 14 weeks
            </Typography>
          </Paper>

          <Paper 
            elevation={0}
            sx={{ 
              p: 3,
              borderRadius: 3,
              border: '1px solid rgba(0, 0, 0, 0.06)',
              bgcolor: '#FFFFFF',
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1A202C' }}>
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
