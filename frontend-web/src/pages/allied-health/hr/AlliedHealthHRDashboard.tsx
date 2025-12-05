import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { People, AttachMoney, TrendingUp, Assignment } from '@mui/icons-material';

export default function AlliedHealthHRDashboard() {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Employee Directory',
      icon: <People sx={{ fontSize: 40 }} />,
      color: '#1565C0',
      value: '47',
      subtitle: 'Total Employees',
      path: '/allied-health/hr/employees',
    },
    {
      title: 'Payroll Management',
      icon: <AttachMoney sx={{ fontSize: 40 }} />,
      color: '#1976D2',
      value: '₹12.5L',
      subtitle: 'This Month',
      path: '/allied-health/hr/payroll',
    },
    {
      title: 'Performance',
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      color: '#1E88E5',
      value: '94%',
      subtitle: 'Avg Rating',
      path: '/allied-health/hr/performance',
    },
    {
      title: 'Leave Management',
      icon: <Assignment sx={{ fontSize: 40 }} />,
      color: '#2196F3',
      value: '8',
      subtitle: 'Pending Requests',
      path: '/allied-health/hr/leaves',
    },
  ];

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          HR Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Allied Health Sciences HR Management
        </Typography>
      </Paper>

      <Grid container spacing={3}>
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
    </Box>
  );
}
