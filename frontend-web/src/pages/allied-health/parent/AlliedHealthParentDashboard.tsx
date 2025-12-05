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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { People, EventAvailable, Assessment, Notifications } from '@mui/icons-material';

export default function AlliedHealthParentDashboard() {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'My Children',
      icon: <People sx={{ fontSize: 40 }} />,
      color: '#1565C0',
      value: '1',
      subtitle: 'Registered',
      path: '/allied-health/parent/children',
    },
    {
      title: 'Attendance',
      icon: <EventAvailable sx={{ fontSize: 40 }} />,
      color: '#1976D2',
      value: '91%',
      subtitle: 'This Month',
      path: '/allied-health/parent/attendance',
    },
    {
      title: 'Academic Performance',
      icon: <Assessment sx={{ fontSize: 40 }} />,
      color: '#1E88E5',
      value: '8.5',
      subtitle: 'CGPA',
      path: '/allied-health/parent/marks',
    },
    {
      title: 'Notifications',
      icon: <Notifications sx={{ fontSize: 40 }} />,
      color: '#2196F3',
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
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Parent Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Monitor your child's academic progress and activities
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

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
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
                <TableRow key={index} hover>
                  <TableCell>{update.date}</TableCell>
                  <TableCell>{update.update}</TableCell>
                  <TableCell>{update.type}</TableCell>
                  <TableCell>
                    <Chip
                      label={update.status}
                      size="small"
                      color={update.status === 'Present' || update.status === 'Completed' ? 'success' : 'warning'}
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
