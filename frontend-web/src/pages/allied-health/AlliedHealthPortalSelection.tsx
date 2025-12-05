import { Box, Container, Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AccountBalance, Person, School, People, Work, AccountBalanceWallet } from '@mui/icons-material';

const portals = [
  {
    title: 'Principal Portal',
    description: 'Manage allied health programs, faculty, and paramedical courses',
    icon: AccountBalance,
    path: '/allied-health/principal',
    color: '#1565C0',
  },
  {
    title: 'Teacher Portal',
    description: 'Manage clinical training, lab work, and allied health education',
    icon: Person,
    path: '/allied-health/teacher',
    color: '#1976D2',
  },
  {
    title: 'Student Portal',
    description: 'View attendance, clinical rotations, assessments, and fee payments',
    icon: School,
    path: '/allied-health/student',
    color: '#1E88E5',
  },
  {
    title: 'Parent Portal',
    description: 'Monitor student academic and clinical training progress',
    icon: People,
    path: '/allied-health/parent',
    color: '#2196F3',
  },
  {
    title: 'HR Portal',
    description: 'Manage faculty and staff across allied health departments',
    icon: Work,
    path: '/allied-health/hr',
    color: '#42A5F5',
  },
  {
    title: 'Accountant Portal',
    description: 'Track fee collection and financial management',
    icon: AccountBalanceWallet,
    path: '/allied-health/accountant',
    color: '#64B5F6',
  },
];

export default function AlliedHealthPortalSelection() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
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
            Allied Health Sciences Portal
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', mb: 2 }}>
            Paramedical | MLT | Radiology | Physiotherapy | OT | Pharmacy Tech
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            Select your portal to access college services and information
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {portals.map((portal) => {
            const IconComponent = portal.icon;
            return (
              <Grid item xs={12} sm={6} md={4} key={portal.title}>
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
                    onClick={() => navigate(portal.path)}
                    sx={{ height: '100%' }}
                  >
                    <CardContent sx={{ textAlign: 'center', py: 4 }}>
                      <Box
                        sx={{
                          mb: 2,
                          display: 'flex',
                          justifyContent: 'center',
                          color: portal.color,
                        }}
                      >
                        <IconComponent sx={{ fontSize: 60 }} />
                      </Box>
                      <Typography
                        variant="h5"
                        gutterBottom
                        sx={{ fontWeight: 600, color: portal.color }}
                      >
                        {portal.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {portal.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
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
