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
} from '@mui/material';
import {
  School,
  Assessment,
  MenuBook,
  VerifiedUser,
  TrendingUp,
  CalendarToday,
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
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #D32F2F 0%, #C62828 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Academic & CBME Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Tagore Medical College - Principal's Overview
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {quickActions.map((action) => (
          <Grid item xs={12} sm={6} md={3} key={action.title}>
            <Card
              sx={{
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 8px 16px ${action.color}40`,
                },
              }}
            >
              <CardActionArea onClick={() => navigate(action.path)} sx={{ p: 3, height: '100%' }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: `${action.color}20`,
                    color: action.color,
                    margin: '0 auto 16px',
                  }}
                >
                  {action.icon}
                </Box>
                <Typography variant="h3" align="center" sx={{ fontWeight: 700, color: action.color, mb: 1 }}>
                  {action.value}
                </Typography>
                <Typography variant="subtitle1" align="center" sx={{ fontWeight: 600 }} gutterBottom>
                  {action.title}
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary">
                  {action.subtitle}
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              CBME Competency Achievement by Phase
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={competencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#2E7D32" name="Completed" />
                <Bar dataKey="total" fill="#E0E0E0" name="Total" />
              </BarChart>
            </ResponsiveContainer>
            <Box sx={{ mt: 2 }}>
              {competencyData.map((phase) => (
                <Box key={phase.name} sx={{ mb: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">{phase.name}</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {Math.round((phase.completed / phase.total) * 100)}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(phase.completed / phase.total) * 100}
                    sx={{ height: 6, borderRadius: 1 }}
                    color="success"
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
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
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Upcoming Examinations
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Subject</TableCell>
                    <TableCell>Phase</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align="center">Students</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {upcomingExams.map((exam, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{exam.subject}</TableCell>
                      <TableCell>
                        <Chip label={exam.phase} size="small" color="primary" />
                      </TableCell>
                      <TableCell>{exam.type}</TableCell>
                      <TableCell>{exam.date}</TableCell>
                      <TableCell align="center">{exam.students}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Key Academic Metrics
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <Card sx={{ bgcolor: '#E3F2FD', p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="primary" fontWeight={700}>
                    800
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Students
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ bgcolor: '#E8F5E9', p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main" fontWeight={700}>
                    142
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Faculty Members
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ bgcolor: '#FFF3E0', p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="warning.main" fontWeight={700}>
                    86.5%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Avg Pass Rate
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ bgcolor: '#FCE4EC', p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="error.main" fontWeight={700}>
                    1:5.6
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Faculty Ratio
                  </Typography>
                </Card>
              </Grid>
            </Grid>
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                NMC Compliance Status
              </Typography>
              <LinearProgress
                variant="determinate"
                value={95}
                sx={{ height: 10, borderRadius: 1, mb: 1 }}
                color="success"
              />
              <Typography variant="caption" color="text.secondary">
                95% - Excellent compliance with NMC guidelines
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Department Performance Overview
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Department</TableCell>
                <TableCell align="center">Faculty</TableCell>
                <TableCell align="center">Students</TableCell>
                <TableCell align="center">Avg Score</TableCell>
                <TableCell>CBME Compliance</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departmentPerformance.map((dept) => (
                <TableRow key={dept.dept} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{dept.dept}</TableCell>
                  <TableCell align="center">{dept.faculty}</TableCell>
                  <TableCell align="center">{dept.students}</TableCell>
                  <TableCell align="center">{dept.avgScore}%</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={dept.compliance}
                        sx={{ flex: 1, height: 8, borderRadius: 1 }}
                        color={dept.compliance > 90 ? 'success' : 'warning'}
                      />
                      <Typography variant="body2" sx={{ minWidth: 45 }}>
                        {dept.compliance}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={dept.compliance > 90 ? 'Excellent' : 'Good'}
                      size="small"
                      color={dept.compliance > 90 ? 'success' : 'warning'}
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
