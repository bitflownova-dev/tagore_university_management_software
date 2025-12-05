import { Box, Container, Typography, Grid, Card, CardActionArea, alpha } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AccountBalance, Person, School, People, Work, AccountBalanceWallet, ArrowForward } from '@mui/icons-material';

const portals = [
  {
    title: 'Principal Portal',
    description: 'Manage allied health programs, faculty, and paramedical courses',
    icon: AccountBalance,
    path: '/allied-health/principal',
    color: '#00BFA5',
    gradient: 'linear-gradient(135deg, #00BFA5 0%, #00897B 100%)',
  },
  {
    title: 'Teacher Portal',
    description: 'Manage clinical training, lab work, and allied health education',
    icon: Person,
    path: '/allied-health/teacher',
    color: '#00897B',
    gradient: 'linear-gradient(135deg, #00897B 0%, #00695C 100%)',
  },
  {
    title: 'Student Portal',
    description: 'View attendance, clinical rotations, assessments, and fee payments',
    icon: School,
    path: '/allied-health/student',
    color: '#00796B',
    gradient: 'linear-gradient(135deg, #00796B 0%, #004D40 100%)',
  },
  {
    title: 'Parent Portal',
    description: 'Monitor student academic and clinical training progress',
    icon: People,
    path: '/allied-health/parent',
    color: '#26A69A',
    gradient: 'linear-gradient(135deg, #26A69A 0%, #00897B 100%)',
  },
  {
    title: 'HR Portal',
    description: 'Manage faculty and staff across allied health departments',
    icon: Work,
    path: '/allied-health/hr',
    color: '#4DB6AC',
    gradient: 'linear-gradient(135deg, #4DB6AC 0%, #26A69A 100%)',
  },
  {
    title: 'Accountant Portal',
    description: 'Track fee collection and financial management',
    icon: AccountBalanceWallet,
    path: '/allied-health/accountant',
    color: '#80CBC4',
    gradient: 'linear-gradient(135deg, #80CBC4 0%, #4DB6AC 100%)',
  },
];

export default function AlliedHealthPortalSelection() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #F8FBFD 0%, #F0F4F8 100%)',
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Header Section */}
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 4,
            mb: 6,
            background: 'linear-gradient(135deg, #00BFA5 0%, #00897B 100%)',
            boxShadow: '0 20px 60px rgba(0, 191, 165, 0.25)',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              px: { xs: 3, md: 6 },
              py: { xs: 6, md: 8 },
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                fontWeight: 800,
                color: 'white',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                letterSpacing: '-0.02em',
                mb: 2,
              }}
            >
              Allied Health Sciences
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.95)',
                fontWeight: 400,
                fontSize: { xs: '1rem', md: '1.25rem' },
                maxWidth: 700,
                mx: 'auto',
                lineHeight: 1.6,
                mb: 1,
              }}
            >
              Paramedical | MLT | Radiology | Physiotherapy | OT | Pharmacy Tech
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255, 255, 255, 0.85)',
                fontSize: '0.95rem',
              }}
            >
              Choose your portal to access personalized dashboard and tools
            </Typography>
          </Box>

          {/* Decorative Elements */}
          <Box
            sx={{
              position: 'absolute',
              top: -50,
              right: -50,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              filter: 'blur(40px)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -30,
              left: -30,
              width: 150,
              height: 150,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              filter: 'blur(40px)',
            }}
          />
        </Box>

        {/* Portal Cards Grid */}
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {portals.map((portal) => {
            const IconComponent = portal.icon;
            return (
              <Grid item xs={12} sm={6} md={4} key={portal.title}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'rgba(0, 0, 0, 0.06)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    background: '#FFFFFF',
                    '&:hover': {
                      transform: 'translateY(-12px)',
                      boxShadow: '0 24px 48px rgba(0, 0, 0, 0.12)',
                      borderColor: portal.color,
                      '& .portal-icon-wrapper': {
                        transform: 'scale(1.1) rotate(5deg)',
                        background: portal.gradient,
                      },
                      '& .portal-arrow': {
                        transform: 'translateX(8px)',
                        opacity: 1,
                      },
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: portal.gradient,
                      opacity: 0,
                      transition: 'opacity 0.4s ease',
                    },
                    '&:hover::before': {
                      opacity: 1,
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => navigate(portal.path)}
                    sx={{
                      height: '100%',
                      p: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box sx={{ width: '100%' }}>
                      {/* Icon Container */}
                      <Box
                        className="portal-icon-wrapper"
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: 3,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 3,
                          background: alpha(portal.color, 0.1),
                          color: portal.color,
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      >
                        <IconComponent sx={{ fontSize: 48 }} />
                      </Box>

                      {/* Content */}
                      <Typography
                        variant="h5"
                        gutterBottom
                        sx={{
                          fontWeight: 700,
                          color: '#1A202C',
                          fontSize: '1.375rem',
                          mb: 1.5,
                          lineHeight: 1.3,
                        }}
                      >
                        {portal.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#64748B',
                          lineHeight: 1.7,
                          fontSize: '0.9375rem',
                          mb: 3,
                        }}
                      >
                        {portal.description}
                      </Typography>
                    </Box>

                    {/* Action Indicator */}
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
                      <ArrowForward
                        className="portal-arrow"
                        sx={{
                          fontSize: 18,
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          opacity: 0.7,
                        }}
                      />
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* Footer Navigation */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography
            variant="body2"
            onClick={() => navigate('/')}
            sx={{
              color: '#64748B',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              fontSize: '0.875rem',
              transition: 'color 0.3s ease',
              '&:hover': {
                color: '#00BFA5',
              },
            }}
          >
            ← Back to College Selection
          </Typography>
          <Box sx={{ mt: 3, color: '#64748B' }}>
            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
              Need assistance? Contact IT Support at{' '}
              <Box component="span" sx={{ color: '#00BFA5', fontWeight: 600 }}>
                support@tagore.edu
              </Box>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
