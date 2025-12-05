import { Box, Container, Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AccountBalance, Person, School, People, Work, AccountBalanceWallet } from '@mui/icons-material';

const portals = [
  {
    title: 'Principal Portal',
    description: 'Manage Arts & Science college academics, faculty, and BA/BSc/BCom programs',
    icon: AccountBalance,
    path: '/arts-science/principal',
    color: '#5E35B1',
  },
  {
    title: 'Teacher Portal',
    description: 'Manage attendance, grades, and department-specific classes',
    icon: Person,
    path: '/arts-science/teacher',
    color: '#6A1B9A',
  },
  {
    title: 'Student Portal',
    description: 'View attendance, grades, course registration, and fee payments',
    icon: School,
    path: '/arts-science/student',
    color: '#7B1FA2',
  },
  {
    title: 'Parent Portal',
    description: 'Monitor student academic progress and attendance',
    icon: People,
    path: '/arts-science/parent',
    color: '#8E24AA',
  },
  {
    title: 'HR Portal',
    description: 'Manage faculty and staff across Arts & Science departments',
    icon: Work,
    path: '/arts-science/hr',
    color: '#9C27B0',
  },
  {
    title: 'Accountant Portal',
    description: 'Track fee collection and financial management',
    icon: AccountBalanceWallet,
    path: '/arts-science/accountant',
    color: '#AB47BC',
  },
];

export default function ArtsSciencePortalSelection() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #5E35B1 0%, #311B92 100%)',
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
            Arts & Science College Portal
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', mb: 2 }}>
            BA/BSc/BCom Programs | Multi-Disciplinary Education
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
                    sx={{ height: '100%', p: 3 }}
                  >
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, ${portal.color} 0%, ${portal.color}DD 100%)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 20px',
                          boxShadow: `0 4px 12px ${portal.color}40`,
                        }}
                      >
                        <IconComponent sx={{ fontSize: 40, color: 'white' }} />
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
      </Container>
    </Box>
  );
}
