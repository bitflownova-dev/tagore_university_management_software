import { Box, Container, Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AccountBalance, Person, School, People, Work, AccountBalanceWallet } from '@mui/icons-material';

const portals = [
  {
    title: 'Principal Portal',
    description: 'Manage nursing college academics, faculty, and B.Sc/GNM programs',
    icon: AccountBalance,
    path: '/nursing/principal',
    color: '#2E7D32',
  },
  {
    title: 'Teacher Portal',
    description: 'Manage clinical training, assessments, and nursing education',
    icon: Person,
    path: '/nursing/teacher',
    color: '#388E3C',
  },
  {
    title: 'Student Portal',
    description: 'View attendance, clinical rotations, assessments, and fee payments',
    icon: School,
    path: '/nursing/student',
    color: '#43A047',
  },
  {
    title: 'Parent Portal',
    description: 'Monitor student academic and clinical training progress',
    icon: People,
    path: '/nursing/parent',
    color: '#4CAF50',
  },
  {
    title: 'HR Portal',
    description: 'Manage faculty and staff across nursing departments',
    icon: Work,
    path: '/nursing/hr',
    color: '#66BB6A',
  },
  {
    title: 'Accountant Portal',
    description: 'Track fee collection and financial management',
    icon: AccountBalanceWallet,
    path: '/nursing/accountant',
    color: '#81C784',
  },
];

export default function NursingPortalSelection() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)',
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
            Nursing College Portal
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', mb: 2 }}>
            B.Sc Nursing | GNM | Post-Basic B.Sc | INC Accredited
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
