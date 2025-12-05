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
  alpha,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { People, EventAvailable, Assessment, Notifications } from '@mui/icons-material';

export default function AlliedHealthParentDashboard() {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'My Children',
      icon: <People sx={{ fontSize: 40 }} />,
      color: '#00BFA5',
      value: '1',
      subtitle: 'Registered',
      path: '/allied-health/parent/children',
    },
    {
      title: 'Attendance',
      icon: <EventAvailable sx={{ fontSize: 40 }} />,
      color: '#00897B',
      value: '91%',
      subtitle: 'This Month',
      path: '/allied-health/parent/attendance',
    },
    {
      title: 'Academic Performance',
      icon: <Assessment sx={{ fontSize: 40 }} />,
      color: '#26A69A',
      value: '8.5',
      subtitle: 'CGPA',
      path: '/allied-health/parent/marks',
    },
    {
      title: 'Notifications',
      icon: <Notifications sx={{ fontSize: 40 }} />,
      color: '#4DB6AC',
      value: '3',
      subtitle: 'Unread',
      path: '/allied-health/parent/notifications',
    },
  ];

  const recentUpdates = [
    { date: 'Dec 4, 2025', update: 'Attendance marked for Clinical Biochemistry Lab', type: 'Attendance', status: 'Present' },
    { date: 'Dec 3, 2025', update: 'Mid-Term Practical marks published', type: 'Assessment', status: 'Completed' },
    { date: 'Dec 2, 2025', update: 'Fee payment due on Jan 15, 2026', type: 'Fee', status: 'Pending' },
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
          Parent Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.95)' }}>
          Monitor your child's academic progress and activities
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
          Recent Updates
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Update</strong></TableCell>
                <TableCell><strong>Type</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentUpdates.map((update, index) => (
                <TableRow 
                  key={index} 
                  sx={{
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: alpha('#00BFA5', 0.04),
                    },
                  }}
                >
                  <TableCell>{update.date}</TableCell>
                  <TableCell>{update.update}</TableCell>
                  <TableCell>{update.type}</TableCell>
                  <TableCell>
                    <Chip
                      label={update.status}
                      size="small"
                      sx={{
                        bgcolor: update.status === 'Present' || update.status === 'Completed' 
                          ? alpha('#26A69A', 0.1) 
                          : alpha('#FFA726', 0.1),
                        color: update.status === 'Present' || update.status === 'Completed' ? '#26A69A' : '#FFA726',
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
    </Box>
  );
}
