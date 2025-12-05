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
  IconButton,
  alpha,
} from '@mui/material';
import {
  BusinessCenter,
  School as PrincipalIcon,
  Person,
  PersonOutline,
  FamilyRestroom,
  Engineering,
  AccountBalance,
  ArrowBack,
  ArrowForward,
} from '@mui/icons-material';

interface Portal {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  path: string;
}

const portals: Portal[] = [
  {
    id: 'director',
    title: 'Director Portal',
    icon: <BusinessCenter sx={{ fontSize: 48 }} />,
    color: '#D32F2F',
    description: 'Manage institution, staff, departments & analytics',
    path: '/medical/director',
  },
  {
    id: 'principal',
    title: 'Principal/Dean Portal',
    icon: <PrincipalIcon sx={{ fontSize: 48 }} />,
    color: '#C62828',
    description: 'Academic management, faculty & CBME oversight',
    path: '/medical/principal',
  },
  {
    id: 'teacher',
    title: 'Faculty Portal',
    icon: <Person sx={{ fontSize: 48 }} />,
    color: '#B71C1C',
    description: 'Competency assessment, attendance & clinical supervision',
    path: '/medical/teacher',
  },
  {
    id: 'student',
    title: 'Student Portal',
    icon: <PersonOutline sx={{ fontSize: 48 }} />,
    color: '#E57373',
    description: 'Competencies, logbook, assessments & clinical rotations',
    path: '/medical/student',
  },
  {
    id: 'parent',
    title: 'Parent Portal',
    icon: <FamilyRestroom sx={{ fontSize: 48 }} />,
    color: '#EF5350',
    description: 'Monitor student progress, attendance & performance',
    path: '/medical/parent',
  },
  {
    id: 'hr',
    title: 'HR Portal',
    icon: <Engineering sx={{ fontSize: 48 }} />,
    color: '#F44336',
    description: 'Employee management, payroll & hospital staff',
    path: '/medical/hr',
  },
  {
    id: 'accountant',
    title: 'Accounts Portal',
    icon: <AccountBalance sx={{ fontSize: 48 }} />,
    color: '#FF5252',
    description: 'Fee collection, financial management & reports',
    path: '/medical/accountant',
  },
];

export default function MedicalPortalSelection() {
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
            background: 'linear-gradient(135deg, #D32F2F 0%, #C62828 100%)',
            boxShadow: '0 20px 60px rgba(211, 47, 47, 0.25)',
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
              Tagore Medical College & Hospital
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
              Competency-Based Medical Education (CBME)
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
          {portals.map((portal) => (
            <Grid item xs={12} sm={6} md={4} key={portal.id}>
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
                      background: `linear-gradient(135deg, ${portal.color} 0%, ${portal.color}DD 100%)`,
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
                    background: `linear-gradient(135deg, ${portal.color} 0%, ${portal.color}DD 100%)`,
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
                      {portal.icon}
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
          ))}
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
                color: '#D32F2F',
              },
            }}
          >
            ← Back to College Selection
          </Typography>
          <Box sx={{ mt: 3, color: '#64748B' }}>
            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
              Need assistance? Contact IT Support at{' '}
              <Box component="span" sx={{ color: '#D32F2F', fontWeight: 600 }}>
                support@tagore.edu
              </Box>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
