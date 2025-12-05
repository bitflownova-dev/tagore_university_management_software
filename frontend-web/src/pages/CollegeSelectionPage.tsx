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
  Divider,
  Chip,
  Stack,
  Avatar,
  alpha,
} from '@mui/material';
import {
  Engineering,
  LocalHospital,
  Healing,
  School,
  HealthAndSafety,
  Biotech,
  AccountBalance,
  ArrowForwardIos,
  VerifiedUser,
  EmojiEvents,
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
    icon: <AccountBalance sx={{ fontSize: 48 }} />,
    color: '#1E3A8A',
    description: 'University-wide management, analytics, and strategic oversight',
  },
  {
    id: 'engineering',
    name: 'Engineering College',
    fullName: 'Tagore Engineering College',
    website: 'tagore-engg.ac.in',
    icon: <Engineering sx={{ fontSize: 48 }} />,
    color: '#2563EB',
    description: 'B.Tech, M.Tech programs in various engineering disciplines',
  },
  {
    id: 'medical',
    name: 'Medical College & Hospital',
    fullName: 'Tagore Medical College & Hospital',
    website: 'tagoremch.edu.in',
    icon: <LocalHospital sx={{ fontSize: 48 }} />,
    color: '#DC2626',
    description: 'MBBS with Competency-Based Medical Education (CBME) curriculum',
  },
  {
    id: 'dental',
    name: 'Dental College & Hospital',
    fullName: 'Tagore Dental College & Hospital',
    website: 'tagoredental.edu.in',
    icon: <Healing sx={{ fontSize: 48 }} />,
    color: '#0891B2',
    description: 'BDS, MDS programs with modern dental care facilities',
  },
  {
    id: 'arts-science',
    name: 'Arts & Science College',
    fullName: 'Tagore Arts & Science College',
    website: 'tagoreartsci.edu.in',
    icon: <School sx={{ fontSize: 48 }} />,
    color: '#7C3AED',
    description: 'BA, BSc, MA, MSc programs in various disciplines',
  },
  {
    id: 'nursing',
    name: 'College of Nursing',
    fullName: 'Tagore College of Nursing',
    website: 'tagorenursing.edu.in',
    icon: <HealthAndSafety sx={{ fontSize: 48 }} />,
    color: '#DB2777',
    description: 'BSc Nursing, MSc Nursing, Post Basic BSc Nursing programs',
  },
  {
    id: 'allied-health',
    name: 'Institute of Allied Health Sciences',
    fullName: 'Tagore Institute of Allied Health Sciences',
    website: 'tagorealliedhealth.edu.in',
    icon: <Biotech sx={{ fontSize: 48 }} />,
    color: '#059669',
    description: 'Paramedical, Medical Laboratory Technology, Radiology programs',
  },
];

export default function CollegeSelectionPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 50%, #F0F9FF 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '400px',
          background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
          opacity: 0.95,
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: 6 }}>
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 8, pt: 4 }}>
          <Avatar
            sx={{
              width: 90,
              height: 90,
              mx: 'auto',
              mb: 3,
              bgcolor: 'white',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            }}
          >
            <AccountBalance sx={{ fontSize: 50, color: '#1E3A8A' }} />
          </Avatar>
          
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontWeight: 800,
              color: 'white',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              letterSpacing: '-0.02em',
              mb: 2,
              textShadow: '0 2px 20px rgba(0,0,0,0.1)',
            }}
          >
            Tagore University
          </Typography>
          
          <Stack 
            direction="row" 
            spacing={2} 
            justifyContent="center" 
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Chip
              icon={<VerifiedUser sx={{ fontSize: 18 }} />}
              label="NAAC A+ Accredited"
              sx={{
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'white',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
                fontWeight: 600,
                px: 1,
              }}
            />
            <Chip
              icon={<EmojiEvents sx={{ fontSize: 18 }} />}
              label="ISO 9001:2015 Certified"
              sx={{
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'white',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
                fontWeight: 600,
                px: 1,
              }}
            />
          </Stack>
          
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255,255,255,0.95)',
              fontWeight: 400,
              maxWidth: 700,
              mx: 'auto',
              lineHeight: 1.6,
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            Excellence in Education & Healthcare | Empowering Future Leaders
          </Typography>
        </Box>

        {/* Stats Bar */}
        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            p: 3,
            mb: 6,
            borderRadius: 3,
            bgcolor: 'white',
            boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box sx={{ textAlign: 'center', minWidth: 120 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1E3A8A' }}>
              7
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 600 }}>
              Colleges
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ textAlign: 'center', minWidth: 120 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#DC2626' }}>
              10K+
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 600 }}>
              Students
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ textAlign: 'center', minWidth: 120 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#059669' }}>
              500+
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 600 }}>
              Faculty
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ textAlign: 'center', minWidth: 120 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#7C3AED' }}>
              25+
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 600 }}>
              Years Legacy
            </Typography>
          </Box>
        </Paper>

        {/* College Cards */}
        <Grid container spacing={4}>
          {colleges.map((college) => (
            <Grid item xs={12} sm={6} lg={4} key={college.id}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  borderRadius: 4,
                  border: '1px solid',
                  borderColor: 'rgba(0,0,0,0.08)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'visible',
                  background: 'white',
                  '&:hover': {
                    transform: 'translateY(-12px)',
                    boxShadow: `0 30px 60px ${alpha(college.color, 0.2)}`,
                    borderColor: college.color,
                    '& .college-icon-wrapper': {
                      transform: 'scale(1.05)',
                      bgcolor: college.color,
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
                  onClick={() => navigate(`/${college.id}`)}
                  sx={{ 
                    height: '100%',
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
                  {/* Icon */}
                  <Box
                    className="college-icon-wrapper"
                    sx={{
                      width: 90,
                      height: 90,
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: alpha(college.color, 0.1),
                      mb: 3,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      border: '2px solid',
                      borderColor: alpha(college.color, 0.2),
                      '& .MuiSvgIcon-root': {
                        color: college.color,
                        transition: 'color 0.4s ease',
                      },
                    }}
                  >
                    {college.icon}
                  </Box>

                  {/* Content */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: '#1A202C',
                      mb: 1,
                      lineHeight: 1.3,
                    }}
                  >
                    {college.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: '#64748B',
                      fontWeight: 500,
                      mb: 1.5,
                    }}
                  >
                    {college.fullName}
                  </Typography>

                  <Chip
                    label={college.website}
                    size="small"
                    sx={{
                      bgcolor: alpha(college.color, 0.1),
                      color: college.color,
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      height: 24,
                      mb: 2,
                      border: 'none',
                    }}
                  />

                  <Typography
                    variant="body2"
                    sx={{
                      color: '#64748B',
                      lineHeight: 1.6,
                      mb: 3,
                      flexGrow: 1,
                    }}
                  >
                    {college.description}
                  </Typography>

                  {/* Action */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      color: college.color,
                      fontWeight: 600,
                      fontSize: '0.9375rem',
                    }}
                  >
                    <span>Access Portal</span>
                    <ArrowForwardIos
                      className="arrow-icon"
                      sx={{
                        fontSize: 14,
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

        {/* Footer */}
        <Box sx={{ textAlign: 'center', mt: 8, pb: 4 }}>
          <Typography variant="body2" sx={{ color: '#64748B', mb: 1 }}>
            © {new Date().getFullYear()} Tagore University. All rights reserved.
          </Typography>
          <Typography variant="caption" sx={{ color: '#94A3B8' }}>
            Affiliated to State University | Recognized by UGC | Approved by AICTE & MCI
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
