import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Avatar,
  Paper,
} from '@mui/material';
import {
  BusinessCenter,
  School,
  Person,
  People,
  FamilyRestroom,
  AccountBalance,
  Engineering,
} from '@mui/icons-material';

interface PortalCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
}

const portals: PortalCard[] = [
  {
    title: 'Director Portal',
    description: 'System-wide analytics, multi-college management, and strategic insights',
    icon: <BusinessCenter sx={{ fontSize: 48 }} />,
    path: '/director',
    color: '#0D47A1',
  },
  {
    title: 'Principal Portal',
    description: 'College administration, department management, and approvals',
    icon: <School sx={{ fontSize: 48 }} />,
    path: '/principal',
    color: '#1565C0',
  },
  {
    title: 'Teacher Portal',
    description: 'Attendance marking, marks entry, class schedule, and payslips',
    icon: <Person sx={{ fontSize: 48 }} />,
    path: '/teacher',
    color: '#1976D2',
  },
  {
    title: 'Student Portal',
    description: 'Attendance tracking, marks view, fee payments, and assignments',
    icon: <People sx={{ fontSize: 48 }} />,
    path: '/student',
    color: '#42A5F5',
  },
  {
    title: 'Parent Portal',
    description: 'Child monitoring, attendance alerts, marks tracking, and notifications',
    icon: <FamilyRestroom sx={{ fontSize: 48 }} />,
    path: '/parent',
    color: '#64B5F6',
  },
  {
    title: 'HR Portal',
    description: 'Employee management, payroll processing, and leave approvals',
    icon: <Engineering sx={{ fontSize: 48 }} />,
    path: '/hr',
    color: '#388E3C',
  },
  {
    title: 'Accountant Portal',
    description: 'Fee collection, payment tracking, financial reports, and analytics',
    icon: <AccountBalance sx={{ fontSize: 48 }} />,
    path: '/accountant',
    color: '#FFA726',
  },
];

export default function IndexPage() {
  const navigate = useNavigate();

  const handlePortalClick = (path: string) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Paper
          elevation={4}
          sx={{
            p: 4,
            mb: 4,
            textAlign: 'center',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%)',
          }}
        >
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Tagore University
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Management System
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            Select a portal to access the system
          </Typography>
        </Paper>

        {/* Portal Cards */}
        <Grid container spacing={3}>
          {portals.map((portal) => (
            <Grid item xs={12} sm={6} md={4} key={portal.path}>
              <Card
                elevation={6}
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 12,
                  },
                }}
              >
                <CardActionArea
                  onClick={() => handlePortalClick(portal.path)}
                  sx={{ height: '100%' }}
                >
                  <CardContent
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      p: 4,
                      minHeight: 280,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        bgcolor: portal.color,
                        mb: 3,
                      }}
                    >
                      {portal.icon}
                    </Avatar>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        color: portal.color,
                      }}
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

        {/* Footer */}
        <Paper
          elevation={2}
          sx={{
            mt: 4,
            p: 3,
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.95)',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © 2024 Tagore University. All rights reserved.
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Version 1.0.0 | Powered by NestJS + React + PostgreSQL
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
