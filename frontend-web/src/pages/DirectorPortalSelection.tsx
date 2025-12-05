import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Paper,
} from '@mui/material';
import {
  Dashboard,
  School,
  People,
  AccountBalance,
  Assessment,
  Description,
  Work,
  AccountBalanceWallet,
  AdminPanelSettings,
} from '@mui/icons-material';

const directorModules = [
  {
    title: 'Dashboard',
    description: 'University-wide overview and key metrics',
    icon: <Dashboard sx={{ fontSize: 60 }} />,
    path: '/director/dashboard',
    color: '#F57C00',
  },
  {
    title: 'Colleges & Departments',
    description: 'Manage all colleges and their departments',
    icon: <AccountBalance sx={{ fontSize: 60 }} />,
    path: '/director/colleges',
    color: '#E65100',
  },
  {
    title: 'Student Management',
    description: 'University-wide student records and analytics',
    icon: <School sx={{ fontSize: 60 }} />,
    path: '/director/students',
    color: '#FF6F00',
  },
  {
    title: 'Staff Management',
    description: 'Faculty and staff across all colleges',
    icon: <People sx={{ fontSize: 60 }} />,
    path: '/director/staff',
    color: '#EF6C00',
  },
  {
    title: 'Analytics',
    description: 'Performance metrics and insights',
    icon: <Assessment sx={{ fontSize: 60 }} />,
    path: '/director/analytics',
    color: '#FB8C00',
  },
  {
    title: 'Reports',
    description: 'Generate comprehensive university reports',
    icon: <Description sx={{ fontSize: 60 }} />,
    path: '/director/reports',
    color: '#F57C00',
  },
  {
    title: 'HR Portal',
    description: 'University-wide human resources management',
    icon: <Work sx={{ fontSize: 60 }} />,
    path: '/director/hr',
    color: '#FF9800',
  },
  {
    title: 'Accountant Portal',
    description: 'Central financial management and accounting',
    icon: <AccountBalanceWallet sx={{ fontSize: 60 }} />,
    path: '/director/accountant',
    color: '#F57C00',
  },
  {
    title: 'Non-Teaching Staff',
    description: 'Administrative and support staff management',
    icon: <AdminPanelSettings sx={{ fontSize: 60 }} />,
    path: '/director/non-teaching',
    color: '#EF6C00',
  },
];

export default function DirectorPortalSelection() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #F57C00 0%, #E65100 100%)',
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            University Director Portal
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', mb: 2 }}>
            Tagore University Administration
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            Strategic oversight and management across all colleges
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {directorModules.map((module) => (
            <Grid item xs={12} sm={6} md={4} key={module.title}>
              <Card
                sx={{
                  height: '100%',
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
                  },
                }}
              >
                <CardActionArea
                  onClick={() => navigate(module.path)}
                  sx={{ height: '100%' }}
                >
                  <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <Box
                      sx={{
                        mb: 2,
                        display: 'flex',
                        justifyContent: 'center',
                        color: module.color,
                      }}
                    >
                      {module.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ fontWeight: 600, color: module.color }}
                    >
                      {module.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {module.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography
            variant="body2"
            onClick={() => navigate('/')}
            sx={{
              color: 'rgba(255,255,255,0.9)',
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            ← Back to College Selection
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
