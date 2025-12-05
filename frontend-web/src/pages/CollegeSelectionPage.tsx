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
  Engineering,
  LocalHospital,
  Healing,
  School,
  HealthAndSafety,
  Biotech,
  AccountBalance,
} from '@mui/icons-material';

interface College {
  id: string;
  name: string;
  fullName: string;
  website: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const colleges: College[] = [
  {
    id: 'director',
    name: 'University Director Portal',
    fullName: 'Tagore University Administration',
    website: 'tagore.edu.in/director',
    icon: <AccountBalance sx={{ fontSize: 60 }} />,
    color: '#F57C00',
    description: 'University-wide management, analytics, and strategic oversight',
  },
  {
    id: 'engineering',
    name: 'Engineering College',
    fullName: 'Tagore Engineering College',
    website: 'tagore-engg.ac.in',
    icon: <Engineering sx={{ fontSize: 60 }} />,
    color: '#1976D2',
    description: 'B.Tech, M.Tech programs in various engineering disciplines',
  },
  {
    id: 'medical',
    name: 'Medical College & Hospital',
    fullName: 'Tagore Medical College & Hospital',
    website: 'tagoremch.edu.in',
    icon: <LocalHospital sx={{ fontSize: 60 }} />,
    color: '#D32F2F',
    description: 'MBBS with Competency-Based Medical Education (CBME) curriculum',
  },
  {
    id: 'dental',
    name: 'Dental College & Hospital',
    fullName: 'Tagore Dental College & Hospital',
    website: 'tagoredental.edu.in',
    icon: <Healing sx={{ fontSize: 60 }} />,
    color: '#0288D1',
    description: 'BDS, MDS programs with modern dental care facilities',
  },
  {
    id: 'arts-science',
    name: 'Arts & Science College',
    fullName: 'Tagore Arts & Science College',
    website: 'tagoreartsci.edu.in',
    icon: <School sx={{ fontSize: 60 }} />,
    color: '#7B1FA2',
    description: 'BA, BSc, MA, MSc programs in various disciplines',
  },
  {
    id: 'nursing',
    name: 'College of Nursing',
    fullName: 'Tagore College of Nursing',
    website: 'tagorenursing.edu.in',
    icon: <HealthAndSafety sx={{ fontSize: 60 }} />,
    color: '#C2185B',
    description: 'BSc Nursing, MSc Nursing, Post Basic BSc Nursing programs',
  },
  {
    id: 'allied-health',
    name: 'Institute of Allied Health Sciences',
    fullName: 'Tagore Institute of Allied Health Sciences',
    website: 'tagorealliedhealth.edu.in',
    icon: <Biotech sx={{ fontSize: 60 }} />,
    color: '#00796B',
    description: 'Paramedical, Medical Laboratory Technology, Radiology programs',
  },
];

export default function CollegeSelectionPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 8,
      }}
    >
      <Container maxWidth="lg">
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
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            Tagore University
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            Excellence in Education & Healthcare
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Select your college to access the portal
          </Typography>
        </Paper>

        <Grid container spacing={4}>
          {colleges.map((college) => (
            <Grid item xs={12} sm={6} md={4} key={college.id}>
              <Card
                sx={{
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 12px 24px ${college.color}40`,
                  },
                }}
              >
                <CardActionArea
                  onClick={() => navigate(`/${college.id}`)}
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
                        bgcolor: `${college.color}20`,
                        color: college.color,
                        margin: '0 auto 20px',
                      }}
                    >
                      {college.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ fontWeight: 600, color: college.color }}
                    >
                      {college.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1, fontWeight: 500 }}
                    >
                      {college.fullName}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        color: college.color,
                        mb: 2,
                        fontWeight: 500,
                      }}
                    >
                      {college.website}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {college.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="body2" sx={{ color: 'white' }}>
            © 2024 Tagore University. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
