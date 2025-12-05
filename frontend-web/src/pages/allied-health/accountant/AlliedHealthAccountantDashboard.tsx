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
import { AttachMoney, Receipt, TrendingUp, People } from '@mui/icons-material';

export default function AlliedHealthAccountantDashboard() {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Fee Collection',
      icon: <AttachMoney sx={{ fontSize: 40 }} />,
      color: '#00BFA5',
      value: '₹42L',
      subtitle: 'This Month',
      path: '/allied-health/accountant/fees',
    },
    {
      title: 'Pending Payments',
      icon: <Receipt sx={{ fontSize: 40 }} />,
      color: '#00897B',
      value: '₹8.5L',
      subtitle: 'Outstanding',
      path: '/allied-health/accountant/pending',
    },
    {
      title: 'Collection Rate',
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      color: '#26A69A',
      value: '92%',
      subtitle: 'This Semester',
      path: '/allied-health/accountant/reports',
    },
    {
      title: 'Total Students',
      icon: <People sx={{ fontSize: 40 }} />,
      color: '#4DB6AC',
      value: '530',
      subtitle: 'Enrolled',
      path: '/allied-health/accountant/students',
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
          Accountant Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.95)' }}>
          Allied Health Sciences Financial Management
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
