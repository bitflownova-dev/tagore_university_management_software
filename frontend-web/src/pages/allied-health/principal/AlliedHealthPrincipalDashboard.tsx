import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  alpha,
} from '@mui/material';
import {
  LocalHospital,
  Assessment,
  CalendarToday,
  Biotech,
  TrendingUp,
  MedicalServices,
  ArrowForward,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const yearData = [
  { year: 'Diploma Y1', students: 140, avgGrade: 7.8, practicalHours: 280 },
  { year: 'Diploma Y2', students: 135, avgGrade: 8.0, practicalHours: 360 },
  { year: 'BSc Y1', students: 90, avgGrade: 8.2, practicalHours: 320 },
  { year: 'BSc Y2', students: 85, avgGrade: 8.3, practicalHours: 400 },
  { year: 'BSc Y3', students: 80, avgGrade: 8.5, practicalHours: 480 },
];

const departmentPerformance = [
  { dept: 'Medical Laboratory Technology', students: 120, faculty: 8, avgGrade: 8.3, certifications: 15 },
  { dept: 'Radiology & Imaging', students: 100, faculty: 7, avgGrade: 8.4, certifications: 12 },
  { dept: 'Physiotherapy', students: 90, faculty: 6, avgGrade: 8.2, certifications: 10 },
  { dept: 'Occupational Therapy', students: 70, faculty: 5, avgGrade: 8.1, certifications: 8 },
  { dept: 'Respiratory Therapy', students: 60, faculty: 4, avgGrade: 8.0, certifications: 7 },
  { dept: 'Dialysis Technology', students: 50, faculty: 4, avgGrade: 8.2, certifications: 6 },
  { dept: 'OT Technology', students: 40, faculty: 3, avgGrade: 7.9, certifications: 5 },
];

export default function AlliedHealthPrincipalDashboard() {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Academic Calendar',
      icon: <CalendarToday sx={{ fontSize: 40 }} />,
      color: '#00BFA5',
      gradient: 'linear-gradient(135deg, #00BFA5 0%, #00897B 100%)',
      value: '16',
      subtitle: 'Upcoming Exams',
      path: '/allied-health/principal/academic',
    },
    {
      title: 'Clinical Placements',
      icon: <LocalHospital sx={{ fontSize: 40 }} />,
      color: '#00897B',
      gradient: 'linear-gradient(135deg, #00897B 0%, #00695C 100%)',
      value: '530',
      subtitle: 'Active Students',
      path: '/allied-health/principal/faculty',
    },
    {
      title: 'Assessments',
      icon: <Assessment sx={{ fontSize: 40 }} />,
      color: '#00796B',
      gradient: 'linear-gradient(135deg, #00796B 0%, #004D40 100%)',
      value: '68',
      subtitle: 'This Month',
      path: '/allied-health/principal/reports',
    },
    {
      title: 'Placement Rate',
      icon: <MedicalServices sx={{ fontSize: 40 }} />,
      color: '#26A69A',
      gradient: 'linear-gradient(135deg, #26A69A 0%, #00897B 100%)',
      value: '87%',
      subtitle: 'Job Success',
      path: '/allied-health/principal/analytics',
    },
  ];

  const upcomingExams = [
    { subject: 'Clinical Biochemistry', year: 'MLT Diploma', type: 'Practical', date: 'Dec 15, 2024', students: 120 },
    { subject: 'Radiographic Positioning', year: 'Radiology BSc', type: 'Clinical', date: 'Dec 18, 2024', students: 100 },
    { subject: 'Therapeutic Exercise', year: 'Physiotherapy Y2', type: 'Practical', date: 'Dec 20, 2024', students: 90 },
    { subject: 'Respiratory Care', year: 'RT Diploma', type: 'Theory', date: 'Dec 22, 2024', students: 60 },
    { subject: 'Dialysis Procedures', year: 'Dialysis Y2', type: 'Clinical', date: 'Dec 25, 2024', students: 50 },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F8FBFD', py: 4 }}>
      {/* Hero Header */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 4,
          mb: 4,
          background: 'linear-gradient(135deg, #00BFA5 0%, #00897B 100%)',
          borderRadius: 3,
          boxShadow: '0 10px 40px rgba(0, 191, 165, 0.2)',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'white', letterSpacing: '-0.01em' }}>
          Allied Health Sciences Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.95)' }}>
          Tagore College of Allied Health Sciences - Principal's Overview
        </Typography>
      </Paper>

      {/* Quick Action Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {quickActions.map((action) => (
          <Grid item xs={12} sm={6} md={3} key={action.title}>
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
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
                  borderColor: action.color,
                  '& .action-icon': {
                    transform: 'scale(1.1) rotate(-5deg)',
                    background: action.gradient,
                  },
                  '& .action-arrow': {
                    transform: 'translateX(4px)',
                    opacity: 1,
                  },
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: action.gradient,
                  opacity: 0,
                  transition: 'opacity 0.4s ease',
                },
                '&:hover::before': {
                  opacity: 1,
                },
              }}
            >
              <CardActionArea onClick={() => navigate(action.path)} sx={{ p: 3, height: '100%' }}>
                <Box
                  className="action-icon"
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: 2.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: alpha(action.color, 0.1),
                    color: action.color,
                    margin: '0 auto 20px',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  {action.icon}
                </Box>
                <Typography 
                  variant="h3" 
                  align="center" 
                  sx={{ 
                    fontWeight: 800, 
                    color: action.color, 
                    mb: 1,
                    fontSize: '2.5rem',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {action.value}
                </Typography>
                <Typography 
                  variant="subtitle1" 
                  align="center" 
                  sx={{ fontWeight: 600, color: '#1A202C', mb: 0.5 }}
                >
                  {action.title}
                </Typography>
                <Typography variant="body2" align="center" sx={{ color: '#64748B', mb: 2 }}>
                  {action.subtitle}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 0.5,
                    color: action.color,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  <span>View Details</span>
                  <ArrowForward 
                    className="action-arrow"
                    sx={{ 
                      fontSize: 16,
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

      {/* Charts and Metrics Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 4,
              borderRadius: 3,
              border: '1px solid rgba(0, 0, 0, 0.06)',
              background: '#FFFFFF',
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1A202C', mb: 3 }}>
              Program-wise Student Performance & Practical Hours
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={yearData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="year" tick={{ fill: '#64748B' }} />
                <YAxis yAxisId="left" tick={{ fill: '#64748B' }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: '#64748B' }} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: 8, 
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)' 
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="students" fill="#00BFA5" name="Students" radius={[8, 8, 0, 0]} />
                <Bar yAxisId="right" dataKey="practicalHours" fill="#00897B" name="Practical Hours" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 4,
              borderRadius: 3,
              border: '1px solid rgba(0, 0, 0, 0.06)',
              background: '#FFFFFF',
              height: '100%',
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1A202C', mb: 3 }}>
              Key Metrics
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Card 
                  elevation={0}
                  sx={{ 
                    bgcolor: alpha('#00BFA5', 0.08), 
                    p: 2.5, 
                    textAlign: 'center',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: alpha('#00BFA5', 0.2),
                  }}
                >
                  <Typography variant="h4" sx={{ color: '#00BFA5', fontWeight: 800 }}>
                    530
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748B', mt: 0.5 }}>
                    Total Students
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card 
                  elevation={0}
                  sx={{ 
                    bgcolor: alpha('#00897B', 0.08), 
                    p: 2.5, 
                    textAlign: 'center',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: alpha('#00897B', 0.2),
                  }}
                >
                  <Typography variant="h4" sx={{ color: '#00897B', fontWeight: 800 }}>
                    37
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748B', mt: 0.5 }}>
                    Faculty
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card 
                  elevation={0}
                  sx={{ 
                    bgcolor: alpha('#26A69A', 0.08), 
                    p: 2.5, 
                    textAlign: 'center',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: alpha('#26A69A', 0.2),
                  }}
                >
                  <Typography variant="h4" sx={{ color: '#26A69A', fontWeight: 800 }}>
                    91%
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748B', mt: 0.5 }}>
                    Pass Rate
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card 
                  elevation={0}
                  sx={{ 
                    bgcolor: alpha('#4DB6AC', 0.08), 
                    p: 2.5, 
                    textAlign: 'center',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: alpha('#4DB6AC', 0.2),
                  }}
                >
                  <Typography variant="h4" sx={{ color: '#4DB6AC', fontWeight: 800 }}>
                    1:14.3
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748B', mt: 0.5 }}>
                    Faculty Ratio
                  </Typography>
                </Card>
              </Grid>
            </Grid>
            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1A202C', mb: 2 }}>
                Accreditation Status
              </Typography>
              <LinearProgress
                variant="determinate"
                value={90}
                sx={{ 
                  height: 10, 
                  borderRadius: 2,
                  mb: 1.5,
                  bgcolor: alpha('#00BFA5', 0.1),
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 2,
                    bgcolor: '#00BFA5',
                  },
                }}
              />
              <Typography variant="caption" sx={{ color: '#64748B' }}>
                90% - Good standing with regulatory bodies
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Exams and Training Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 4,
              borderRadius: 3,
              border: '1px solid rgba(0, 0, 0, 0.06)',
              background: '#FFFFFF',
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1A202C', mb: 3 }}>
              Upcoming Examinations
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: '#64748B', fontSize: '0.875rem' }}>Subject</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#64748B', fontSize: '0.875rem' }}>Program</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#64748B', fontSize: '0.875rem' }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#64748B', fontSize: '0.875rem' }}>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {upcomingExams.map((exam, index) => (
                    <TableRow 
                      key={index}
                      sx={{
                        '&:hover': {
                          bgcolor: alpha('#00BFA5', 0.04),
                        },
                      }}
                    >
                      <TableCell sx={{ color: '#1A202C', fontWeight: 500 }}>{exam.subject}</TableCell>
                      <TableCell>
                        <Chip 
                          label={exam.year} 
                          size="small" 
                          sx={{ 
                            bgcolor: alpha('#00BFA5', 0.1),
                            color: '#00897B',
                            fontWeight: 600,
                            border: 'none',
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: '#64748B' }}>{exam.type}</TableCell>
                      <TableCell sx={{ color: '#64748B', fontSize: '0.875rem' }}>{exam.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 4,
              borderRadius: 3,
              border: '1px solid rgba(0, 0, 0, 0.06)',
              background: '#FFFFFF',
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1A202C', mb: 3 }}>
              Clinical Training Highlights
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography variant="body2" sx={{ color: '#1A202C', fontWeight: 500 }}>Hospital Affiliations</Typography>
                  <Typography variant="body2" sx={{ color: '#00BFA5', fontWeight: 700 }}>
                    15 Hospitals
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={94} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 2,
                    bgcolor: alpha('#00BFA5', 0.1),
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 2,
                      bgcolor: '#00BFA5',
                    },
                  }}
                />
              </Box>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography variant="body2" sx={{ color: '#1A202C', fontWeight: 500 }}>Equipment Training</Typography>
                  <Typography variant="body2" sx={{ color: '#00897B', fontWeight: 700 }}>
                    1,840 hrs
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={88} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 2,
                    bgcolor: alpha('#00897B', 0.1),
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 2,
                      bgcolor: '#00897B',
                    },
                  }}
                />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography variant="body2" sx={{ color: '#1A202C', fontWeight: 500 }}>Student Satisfaction</Typography>
                  <Typography variant="body2" sx={{ color: '#26A69A', fontWeight: 700 }}>
                    88%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={88} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 2,
                    bgcolor: alpha('#26A69A', 0.1),
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 2,
                      bgcolor: '#26A69A',
                    },
                  }}
                />
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Department Performance Table */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 4,
          borderRadius: 3,
          border: '1px solid rgba(0, 0, 0, 0.06)',
          background: '#FFFFFF',
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1A202C', mb: 3 }}>
          Department Performance Overview
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: '#64748B', fontSize: '0.875rem' }}>Department</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, color: '#64748B', fontSize: '0.875rem' }}>Students</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, color: '#64748B', fontSize: '0.875rem' }}>Faculty</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, color: '#64748B', fontSize: '0.875rem' }}>Avg Grade</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, color: '#64748B', fontSize: '0.875rem' }}>Certifications</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, color: '#64748B', fontSize: '0.875rem' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departmentPerformance.map((dept) => (
                <TableRow 
                  key={dept.dept}
                  sx={{
                    '&:hover': {
                      bgcolor: alpha('#00BFA5', 0.04),
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: 600, color: '#1A202C' }}>{dept.dept}</TableCell>
                  <TableCell align="center" sx={{ color: '#64748B' }}>{dept.students}</TableCell>
                  <TableCell align="center" sx={{ color: '#64748B' }}>{dept.faculty}</TableCell>
                  <TableCell align="center" sx={{ color: '#1A202C', fontWeight: 600 }}>{dept.avgGrade}</TableCell>
                  <TableCell align="center" sx={{ color: '#64748B' }}>{dept.certifications}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={dept.avgGrade > 8.0 ? 'Excellent' : 'Good'}
                      size="small"
                      sx={{
                        bgcolor: dept.avgGrade > 8.0 ? alpha('#00BFA5', 0.1) : alpha('#00897B', 0.1),
                        color: dept.avgGrade > 8.0 ? '#00BFA5' : '#00897B',
                        fontWeight: 600,
                        border: 'none',
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
