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
    icon: <BusinessCenter sx={{ fontSize: 60 }} />,
    color: '#0D47A1',
    description: 'Manage institution, staff, departments & analytics',
    path: '/medical/director',
  },
  {
    id: 'principal',
    title: 'Principal/Dean Portal',
    icon: <PrincipalIcon sx={{ fontSize: 60 }} />,
    color: '#1565C0',
    description: 'Academic management, faculty & CBME oversight',
    path: '/medical/principal',
  },
  {
    id: 'teacher',
    title: 'Faculty Portal',
    icon: <Person sx={{ fontSize: 60 }} />,
    color: '#1976D2',
    description: 'Competency assessment, attendance & clinical supervision',
    path: '/medical/teacher',
  },
  {
    id: 'student',
    title: 'Student Portal',
    icon: <PersonOutline sx={{ fontSize: 60 }} />,
    color: '#42A5F5',
    description: 'Competencies, logbook, assessments & clinical rotations',
    path: '/medical/student',
  },
  {
    id: 'parent',
    title: 'Parent Portal',
    icon: <FamilyRestroom sx={{ fontSize: 60 }} />,
    color: '#64B5F6',
    description: 'Monitor student progress, attendance & performance',
    path: '/medical/parent',
  },
  {
    id: 'hr',
    title: 'HR Portal',
    icon: <Engineering sx={{ fontSize: 60 }} />,
    color: '#388E3C',
    description: 'Employee management, payroll & hospital staff',
    path: '/medical/hr',
  },
  {
    id: 'accountant',
    title: 'Accounts Portal',
    icon: <AccountBalance sx={{ fontSize: 60 }} />,
    color: '#FFA726',
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
        background: 'linear-gradient(135deg, #D32F2F 0%, #C62828 100%)',
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <IconButton
          onClick={() => navigate('/')}
          sx={{
            mb: 3,
            color: 'white',
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
          }}
        >
          <ArrowBack />
        </IconButton>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 6,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: '#D32F2F',
              mb: 2,
            }}
          >
            Tagore Medical College & Hospital
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            Competency-Based Medical Education (CBME)
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Select your portal to access the system
          </Typography>
        </Paper>

        <Grid container spacing={4}>
          {portals.map((portal) => (
            <Grid item xs={12} sm={6} md={4} key={portal.id}>
              <Card
                sx={{
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 12px 24px ${portal.color}40`,
                  },
                }}
              >
                <CardActionArea
                  onClick={() => navigate(portal.path)}
                  sx={{ height: '100%', p: 3 }}
                >
                  <CardContent sx={{ textAlign: 'center', height: '100%' }}>
                    <Box
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: `${portal.color}20`,
                        color: portal.color,
                        margin: '0 auto 20px',
                      }}
                    >
                      {portal.icon}
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
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
