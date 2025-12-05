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
      color: '#00BFA5',
      value: '47',
      subtitle: 'Total Employees',
      path: '/allied-health/hr/employees',
    },
    {
      title: 'Payroll Management',
      icon: <AttachMoney sx={{ fontSize: 40 }} />,
      color: '#00897B',
      value: '₹12.5L',
      subtitle: 'This Month',
      path: '/allied-health/hr/payroll',
    },
    {
      title: 'Performance',
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      color: '#26A69A',
      value: '94%',
      subtitle: 'Avg Rating',
      path: '/allied-health/hr/performance',
    },
    {
      title: 'Leave Management',
      icon: <Assignment sx={{ fontSize: 40 }} />,
      color: '#4DB6AC',
      value: '8',
      subtitle: 'Pending Requests',
      path: '/allied-health/hr/leaves',
    },
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
          HR Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.95)' }}>
          Allied Health Sciences HR Management
        </Typography>
      </Paper>

      <Grid container spacing={3}>
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
    </Box>
  );
}
