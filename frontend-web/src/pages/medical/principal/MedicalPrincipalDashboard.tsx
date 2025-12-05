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
  School,
  Assessment,
  MenuBook,
  VerifiedUser,
  TrendingUp,
  CalendarToday,
  ArrowForward,
} from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const competencyData = [
  { name: 'Phase 1', completed: 3420, total: 5040 },
  { name: 'Phase 2', completed: 2970, total: 4290 },
  { name: 'Phase 3.1', completed: 2530, total: 3950 },
  { name: 'Phase 3.2', completed: 2280, total: 3420 },
];

const assessmentDistribution = [
  { name: 'OSCE', value: 28 },
  { name: 'OSPE', value: 24 },
  { name: 'Viva', value: 18 },
  { name: 'Written', value: 20 },
  { name: 'MCQ', value: 10 },
];

const COLORS = ['#1976D2', '#2E7D32', '#ED6C02', '#D32F2F', '#9C27B0'];

export default function MedicalPrincipalDashboard() {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Academic Calendar',
      icon: <CalendarToday sx={{ fontSize: 40 }} />,
      color: '#1976D2',
      value: '24',
      subtitle: 'Upcoming Exams',
      path: '/medical/principal/academic',
    },
    {
      title: 'CBME Compliance',
      icon: <MenuBook sx={{ fontSize: 40 }} />,
      color: '#2E7D32',
      value: '92%',
      subtitle: 'Overall Progress',
      path: '/medical/principal/departments',
    },
    {
      title: 'Assessments',
      icon: <Assessment sx={{ fontSize: 40 }} />,
      color: '#ED6C02',
      value: '156',
      subtitle: 'This Month',
      path: '/medical/principal/reports',
    },
    {
      title: 'NMC Accreditation',
      icon: <VerifiedUser sx={{ fontSize: 40 }} />,
      color: '#D32F2F',
      value: '95%',
      subtitle: 'Compliance Score',
      path: '/medical/principal/analytics',
    },
  ];

  const upcomingExams = [
    { subject: 'Anatomy', phase: 'Phase 1', type: 'Theory', date: 'Dec 15, 2024', students: 180 },
    { subject: 'Physiology', phase: 'Phase 1', type: 'Practical', date: 'Dec 18, 2024', students: 180 },
    { subject: 'Internal Medicine', phase: 'Phase 3.1', type: 'OSCE', date: 'Dec 20, 2024', students: 158 },
    { subject: 'Surgery', phase: 'Phase 3.1', type: 'OSPE', date: 'Dec 22, 2024', students: 158 },
    { subject: 'Pediatrics', phase: 'Phase 3.2', type: 'Clinical', date: 'Dec 25, 2024', students: 152 },
  ];

  const departmentPerformance = [
    { dept: 'Internal Medicine', faculty: 18, students: 158, avgScore: 85.5, compliance: 94 },
    { dept: 'General Surgery', faculty: 16, students: 158, avgScore: 82.3, compliance: 91 },
    { dept: 'Pediatrics', faculty: 14, students: 165, avgScore: 88.7, compliance: 96 },
    { dept: 'OBG', faculty: 12, students: 165, avgScore: 86.2, compliance: 93 },
    { dept: 'Anatomy', faculty: 10, students: 180, avgScore: 79.8, compliance: 89 },
  ];

  return (
    <Box sx={{ bgcolor: '#F8FBFD', minHeight: '100vh', pb: 4 }}>
      {/* Modern Hero Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #991B1B 0%, #DC2626 100%)',
          pt: 4,
          pb: 8,
          px: 3,
          mb: -4,
          borderRadius: '0 0 32px 32px',
          boxShadow: '0 20px 60px rgba(220, 38, 38, 0.25)',
        }}
      >
        <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
          <Typography 
            variant="h3" 
            gutterBottom 
            sx={{ 
              fontWeight: 800, 
              color: 'white',
              letterSpacing: '-0.02em',
              mb: 1,
            }}
          >
            Academic & CBME Dashboard
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.95)', fontWeight: 400 }}>
            Tagore Medical College - Principal's Overview
          </Typography>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1400, mx: 'auto', px: 3, pt: 6 }}>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {quickActions.map((action) => (
          <Grid item xs={12} sm={6} md={3} key={action.title}>
            <Card
              sx={{
                height: '100%',
                border: '1px solid',
                borderColor: 'rgba(220, 38, 38, 0.08)',
                borderRadius: 3,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                background: 'white',
                elevation: 0,
                '&:hover': {
                  transform: 'translateY(-8px)',
                  borderColor: action.color,
                  boxShadow: `0 20px 40px ${alpha(action.color, 0.15)}`,
                },
              }}
            >
              <CardActionArea onClick={() => navigate(action.path)} sx={{ p: 3, height: '100%' }}>
                <Box
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: alpha(action.color, 0.1),
                    color: action.color,
                    mb: 2.5,
                  }}
                >
                  {action.icon}
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: action.color, mb: 1, fontSize: '2rem' }}>
                  {action.value}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1A202C', letterSpacing: '-0.01em' }} gutterBottom>
                  {action.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748B', mb: 2 }}>
                  {action.subtitle}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', color: action.color, fontWeight: 600, fontSize: '0.875rem' }}>
                  View Details
                  <ArrowForward sx={{ ml: 0.5, fontSize: 18 }} />
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              background: 'white',
              border: '1px solid',
              borderColor: 'rgba(220, 38, 38, 0.08)',
              borderRadius: 3,
              p: 3,
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1A202C', letterSpacing: '-0.01em' }}>
              CBME Competency Achievement by Phase
            </Typography>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={competencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" stroke="#64748B" style={{ fontSize: '0.875rem' }} />
                <YAxis stroke="#64748B" style={{ fontSize: '0.875rem' }} />
                <Tooltip
                  contentStyle={{
                    background: 'white',
                    border: '1px solid #E2E8F0',
                    borderRadius: 12,
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                  }}
                />
                <Bar dataKey="completed" fill="#DC2626" name="Completed" radius={[8, 8, 0, 0]} />
                <Bar dataKey="total" fill="#FCA5A5" name="Total" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <Box sx={{ mt: 3 }}>
              {competencyData.map((phase) => (
                <Box key={phase.name} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#1A202C' }}>{phase.name}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#DC2626' }}>
                      {Math.round((phase.completed / phase.total) * 100)}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(phase.completed / phase.total) * 100}
                    sx={{ 
                      height: 10, 
                      borderRadius: 2,
                      bgcolor: alpha('#DC2626', 0.1),
                      '& .MuiLinearProgress-bar': {
                        bgcolor: '#DC2626',
                        borderRadius: 2,
                      }
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box
            sx={{
              background: 'white',
              border: '1px solid',
              borderColor: 'rgba(220, 38, 38, 0.08)',
              borderRadius: 3,
              p: 3,
              height: '100%',
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1A202C', letterSpacing: '-0.01em' }}>
              Assessment Type Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={assessmentDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {assessmentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: 'white',
                    border: '1px solid #E2E8F0',
                    borderRadius: 12,
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={7}>
          <Box
            sx={{
              background: 'white',
              border: '1px solid',
              borderColor: 'rgba(220, 38, 38, 0.08)',
              borderRadius: 3,
              p: 3,
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1A202C', letterSpacing: '-0.01em' }}>
              Upcoming Examinations
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, color: '#64748B', fontSize: '0.875rem', borderBottom: '2px solid #E2E8F0' }}>Subject</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#64748B', fontSize: '0.875rem', borderBottom: '2px solid #E2E8F0' }}>Phase</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#64748B', fontSize: '0.875rem', borderBottom: '2px solid #E2E8F0' }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#64748B', fontSize: '0.875rem', borderBottom: '2px solid #E2E8F0' }}>Date</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700, color: '#64748B', fontSize: '0.875rem', borderBottom: '2px solid #E2E8F0' }}>Students</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {upcomingExams.map((exam, index) => (
                    <TableRow 
                      key={index} 
                      sx={{
                        '&:hover': {
                          bgcolor: alpha('#DC2626', 0.04),
                        },
                      }}
                    >
                      <TableCell sx={{ fontWeight: 600, color: '#1A202C' }}>{exam.subject}</TableCell>
                      <TableCell>
                        <Chip 
                          label={exam.phase} 
                          size="small" 
                          sx={{
                            bgcolor: alpha('#DC2626', 0.1),
                            color: '#DC2626',
                            fontWeight: 600,
                            border: 'none',
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: '#64748B' }}>{exam.type}</TableCell>
                      <TableCell sx={{ color: '#64748B' }}>{exam.date}</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600, color: '#1A202C' }}>{exam.students}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>

        <Grid item xs={12} md={5}>
          <Box
            sx={{
              background: 'white',
              border: '1px solid',
              borderColor: 'rgba(220, 38, 38, 0.08)',
              borderRadius: 3,
              p: 3,
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1A202C', letterSpacing: '-0.01em' }}>
              Key Academic Metrics
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <Box sx={{ 
                  background: alpha('#2563EB', 0.1), 
                  p: 2.5, 
                  textAlign: 'center',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: alpha('#2563EB', 0.2),
                }}>
                  <Typography variant="h4" sx={{ color: '#2563EB', fontWeight: 700, mb: 0.5 }}>
                    800
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 600 }}>
                    Total Students
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ 
                  background: alpha('#059669', 0.1), 
                  p: 2.5, 
                  textAlign: 'center',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: alpha('#059669', 0.2),
                }}>
                  <Typography variant="h4" sx={{ color: '#059669', fontWeight: 700, mb: 0.5 }}>
                    142
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 600 }}>
                    Faculty Members
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ 
                  background: alpha('#F59E0B', 0.1), 
                  p: 2.5, 
                  textAlign: 'center',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: alpha('#F59E0B', 0.2),
                }}>
                  <Typography variant="h4" sx={{ color: '#F59E0B', fontWeight: 700, mb: 0.5 }}>
                    86.5%
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 600 }}>
                    Avg Pass Rate
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ 
                  background: alpha('#DC2626', 0.1), 
                  p: 2.5, 
                  textAlign: 'center',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: alpha('#DC2626', 0.2),
                }}>
                  <Typography variant="h4" sx={{ color: '#DC2626', fontWeight: 700, mb: 0.5 }}>
                    1:5.6
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 600 }}>
                    Faculty Ratio
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 700, color: '#1A202C', mb: 1.5 }}>
                NMC Compliance Status
              </Typography>
              <LinearProgress
                variant="determinate"
                value={95}
                sx={{ 
                  height: 10, 
                  borderRadius: 2,
                  bgcolor: alpha('#059669', 0.1),
                  '& .MuiLinearProgress-bar': {
                    bgcolor: '#059669',
                    borderRadius: 2,
                  }
                }}
              />
              <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600, mt: 1, display: 'block' }}>
                95% - Excellent compliance with NMC guidelines
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box
        sx={{
          background: 'white',
          border: '1px solid',
          borderColor: 'rgba(220, 38, 38, 0.08)',
          borderRadius: 3,
          p: 3,
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1A202C', letterSpacing: '-0.01em', mb: 3 }}>
          Department Performance Overview
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: '#64748B', fontSize: '0.875rem', borderBottom: '2px solid #E2E8F0' }}>Department</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: '#64748B', fontSize: '0.875rem', borderBottom: '2px solid #E2E8F0' }}>Faculty</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: '#64748B', fontSize: '0.875rem', borderBottom: '2px solid #E2E8F0' }}>Students</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: '#64748B', fontSize: '0.875rem', borderBottom: '2px solid #E2E8F0' }}>Avg Score</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#64748B', fontSize: '0.875rem', borderBottom: '2px solid #E2E8F0' }}>CBME Compliance</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: '#64748B', fontSize: '0.875rem', borderBottom: '2px solid #E2E8F0' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departmentPerformance.map((dept) => (
                <TableRow 
                  key={dept.dept}
                  sx={{
                    '&:hover': {
                      bgcolor: alpha('#DC2626', 0.04),
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: 700, color: '#1A202C' }}>{dept.dept}</TableCell>
                  <TableCell align="center" sx={{ color: '#64748B' }}>{dept.faculty}</TableCell>
                  <TableCell align="center" sx={{ color: '#64748B' }}>{dept.students}</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, color: '#1A202C' }}>{dept.avgScore}%</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={dept.compliance}
                        sx={{ 
                          flex: 1, 
                          height: 10, 
                          borderRadius: 2,
                          bgcolor: dept.compliance > 90 ? alpha('#059669', 0.1) : alpha('#F59E0B', 0.1),
                          '& .MuiLinearProgress-bar': {
                            bgcolor: dept.compliance > 90 ? '#059669' : '#F59E0B',
                            borderRadius: 2,
                          }
                        }}
                      />
                      <Typography variant="body2" sx={{ minWidth: 45, fontWeight: 600, color: '#1A202C' }}>
                        {dept.compliance}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={dept.compliance > 90 ? 'Excellent' : 'Good'}
                      size="small"
                      sx={{
                        bgcolor: dept.compliance > 90 ? alpha('#059669', 0.1) : alpha('#F59E0B', 0.1),
                        color: dept.compliance > 90 ? '#059669' : '#F59E0B',
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
      </Box>
    </Box>
    </Box>
  );
}
