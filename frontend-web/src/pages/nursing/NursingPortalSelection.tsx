import { Box, Container, Typography, Grid, Card, CardContent, CardActionArea, IconButton, Chip, alpha } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AccountBalance, Person, School, People, Work, AccountBalanceWallet, ArrowBack, ArrowForwardIos } from '@mui/icons-material';

const portals = [
  {
    title: 'Principal Portal',
    description: 'Manage nursing college academics, faculty, and B.Sc/GNM programs',
    icon: AccountBalance,
    path: '/nursing/principal',
    color: '#065F46',
  },
  {
    title: 'Teacher Portal',
    description: 'Manage clinical training, assessments, and nursing education',
    icon: Person,
    path: '/nursing/teacher',
    color: '#047857',
  },
  {
    title: 'Student Portal',
    description: 'View attendance, clinical rotations, assessments, and fee payments',
    icon: School,
    path: '/nursing/student',
    color: '#059669',
  },
  {
    title: 'Parent Portal',
    description: 'Monitor student academic and clinical training progress',
    icon: People,
    path: '/nursing/parent',
    color: '#10B981',
  },
  {
    title: 'HR Portal',
    description: 'Manage faculty and staff across nursing departments',
    icon: Work,
    path: '/nursing/hr',
    color: '#34D399',
  },
  {
    title: 'Accountant Portal',
    description: 'Track fee collection and financial management',
    icon: AccountBalanceWallet,
    path: '/nursing/accountant',
    color: '#F59E0B',
  },
];

export default function NursingPortalSelection() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#F8FBFD',
      }}
    >
      {/* Header with gradient */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #065F46 0%, #059669 100%)',
          pt: 4,
          pb: 8,
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '100px',
            background: '#F8FBFD',
            borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
          },
        }}
      >
        <Container maxWidth="lg">
          <IconButton
            onClick={() => navigate('/')}
            sx={{
              color: 'white',
              bgcolor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              mb: 4,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.25)',
                transform: 'translateX(-4px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <ArrowBack />
          </IconButton>

          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <Chip
              label="INC Approved"
              sx={{
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'white',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
                fontWeight: 600,
                mb: 3,
              }}
            />
            
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                fontWeight: 800,
                color: 'white',
                letterSpacing: '-0.02em',
                mb: 2,
                textShadow: '0 2px 20px rgba(0,0,0,0.1)',
              }}
            >
              Tagore College of Nursing
            </Typography>
            
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255,255,255,0.95)',
                fontWeight: 400,
                mb: 1,
              }}
            >
              BSc Nursing | GNM | Post-Basic BSc
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.85)',
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              Select your portal to access college services
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Portal Cards */}
      <Container maxWidth="lg" sx={{ mt: -4, pb: 8, position: 'relative', zIndex: 2 }}>
        <Grid container spacing={3}>
          {portals.map((portal) => {
            const IconComponent = portal.icon;
            return (
              <Grid item xs={12} sm={6} lg={4} key={portal.title}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    borderRadius: 4,
                    border: '1px solid',
                    borderColor: 'rgba(0,0,0,0.08)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    background: 'white',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 20px 40px ${alpha(portal.color, 0.2)}`,
                      borderColor: portal.color,
                      '& .portal-icon-wrapper': {
                        transform: 'scale(1.05)',
                        bgcolor: portal.color,
                        '& .MuiSvgIcon-root': {
                          color: 'white',
                        },
                      },
                      '& .arrow-icon': {
                        transform: 'translateX(4px)',
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => navigate(portal.path)}
                    sx={{
                      height: '100%',
                      p: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }}
                  >
                    <CardContent sx={{ width: '100%', p: 0 }}>
                      <Box
                        className="portal-icon-wrapper"
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: 3,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: alpha(portal.color, 0.1),
                          mb: 3,
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          border: '2px solid',
                          borderColor: alpha(portal.color, 0.2),
                          '& .MuiSvgIcon-root': {
                            color: portal.color,
                            transition: 'color 0.4s ease',
                          },
                        }}
                      >
                        <IconComponent sx={{ fontSize: 48 }} />
                      </Box>

                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: '#1A202C',
                          mb: 1,
                          lineHeight: 1.3,
                        }}
                      >
                        {portal.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: '#64748B',
                          lineHeight: 1.6,
                          mb: 3,
                        }}
                      >
                        {portal.description}
                      </Typography>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          color: portal.color,
                          fontWeight: 600,
                          fontSize: '0.875rem',
                        }}
                      >
                        <span>Access Portal</span>
                        <ArrowForwardIos
                          className="arrow-icon"
                          sx={{
                            fontSize: 12,
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            opacity: 0.7,
                          }}
                        />
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Box
          sx={{
            mt: 6,
            p: 4,
            bgcolor: 'white',
            borderRadius: 4,
            border: '1px solid rgba(0,0,0,0.08)',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: '#64748B', mb: 0.5 }}>
            Need help? Contact support at{' '}
            <Box component="span" sx={{ color: '#059669', fontWeight: 600 }}>
              support@tagorenursing.edu.in
            </Box>
          </Typography>
          <Typography variant="caption" sx={{ color: '#94A3B8' }}>
            Available 24/7 for technical assistance
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
