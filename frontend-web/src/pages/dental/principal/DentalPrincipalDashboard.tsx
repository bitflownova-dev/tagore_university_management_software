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
  LocalHospital,
  Assessment,
  CalendarToday,
  People,
  TrendingUp,
  Biotech,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const yearData = [
  { year: '1st Year', students: 100, avgGrade: 7.8 },
  { year: '2nd Year', students: 95, avgGrade: 8.0 },
  { year: '3rd Year', students: 92, avgGrade: 8.2 },
  { year: '4th Year', students: 90, avgGrade: 8.4 },
  { year: 'Internship', students: 23, avgGrade: 8.6 },
];

const departmentPerformance = [
  { dept: 'Conservative Dentistry', students: 80, faculty: 10, avgGrade: 8.3, clinicalHours: 450 },
  { dept: 'Oral Surgery', students: 75, faculty: 9, avgGrade: 8.5, clinicalHours: 480 },
  { dept: 'Orthodontics', students: 70, faculty: 8, avgGrade: 8.2, clinicalHours: 420 },
  { dept: 'Prosthodontics', students: 70, faculty: 8, avgGrade: 8.4, clinicalHours: 460 },
  { dept: 'Periodontics', students: 65, faculty: 7, avgGrade: 8.1, clinicalHours: 400 },
  { dept: 'Oral Pathology', students: 60, faculty: 6, avgGrade: 8.0, clinicalHours: 380 },
  { dept: 'Pedodontics', students: 55, faculty: 6, avgGrade: 8.2, clinicalHours: 410 },
];

export default function DentalPrincipalDashboard() {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Academic Calendar',
      icon: <CalendarToday sx={{ fontSize: 40 }} />,
      color: '#0288D1',
      value: '12',
      subtitle: 'Upcoming Exams',
      path: '/dental/principal/academic',
    },
    {
      title: 'Clinical Hours',
      icon: <LocalHospital sx={{ fontSize: 40 }} />,
      color: '#00796B',
      value: '3,000',
      subtitle: 'Total This Month',
      path: '/dental/principal/reports',
    },
    {
      title: 'Assessments',
      icon: <Assessment sx={{ fontSize: 40 }} />,
      color: '#F57C00',
      value: '78',
      subtitle: 'This Month',
      path: '/dental/principal/reports',
    },
    {
      title: 'DCI Compliance',
      icon: <Biotech sx={{ fontSize: 40 }} />,
      color: '#7B1FA2',
      value: '96%',
      subtitle: 'Accreditation',
      path: '/dental/principal/analytics',
    },
  ];

  const upcomingExams = [
    { subject: 'Dental Anatomy', year: '1st Year', type: 'Theory', date: 'Dec 15, 2024', students: 100 },
    { subject: 'Oral Pathology', year: '2nd Year', type: 'Practical', date: 'Dec 18, 2024', students: 95 },
    { subject: 'Conservative Dentistry', year: '3rd Year', type: 'Clinical', date: 'Dec 20, 2024', students: 92 },
    { subject: 'Oral Surgery', year: '4th Year', type: 'Clinical', date: 'Dec 22, 2024', students: 90 },
    { subject: 'Orthodontics', year: 'Final Year', type: 'Viva', date: 'Dec 25, 2024', students: 88 },
  ];

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #0288D1 0%, #0277BD 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Dental Academic Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Tagore Dental College & Hospital - Principal's Overview
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
              Year-wise Student Performance & Grades
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={yearData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="students" fill="#0288D1" name="Students" />
                <Bar yAxisId="right" dataKey="avgGrade" fill="#00796B" name="Avg Grade" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Key Metrics
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <Card sx={{ bgcolor: '#E1F5FE', p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="primary" fontWeight={700}>
                    400
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Students
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ bgcolor: '#E0F2F1', p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ color: '#00796B' }} fontWeight={700}>
                    65
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Faculty
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ bgcolor: '#FFF3E0', p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="warning.main" fontWeight={700}>
                    94%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pass Rate
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ bgcolor: '#F3E5F5', p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ color: '#7B1FA2' }} fontWeight={700}>
                    1:6.2
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Faculty Ratio
                  </Typography>
                </Card>
              </Grid>
            </Grid>
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                DCI Compliance Status
              </Typography>
              <LinearProgress
                variant="determinate"
                value={96}
                sx={{ height: 10, borderRadius: 1, mb: 1 }}
                color="success"
              />
              <Typography variant="caption" color="text.secondary">
                96% - Excellent compliance with DCI norms
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Upcoming Examinations
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Subject</TableCell>
                    <TableCell>Year</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {upcomingExams.map((exam, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{exam.subject}</TableCell>
                      <TableCell>
                        <Chip label={exam.year} size="small" color="primary" />
                      </TableCell>
                      <TableCell>{exam.type}</TableCell>
                      <TableCell>{exam.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Hospital Statistics
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">OPD Patients (Monthly)</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    2,400
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={85} sx={{ height: 8, borderRadius: 1 }} color="primary" />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Clinical Procedures</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    3,000 hrs
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={92} sx={{ height: 8, borderRadius: 1 }} color="success" />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Student Satisfaction</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    91%
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={91} sx={{ height: 8, borderRadius: 1 }} color="success" />
              </Box>
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
                <TableCell align="center">Students</TableCell>
                <TableCell align="center">Faculty</TableCell>
                <TableCell align="center">Avg Grade</TableCell>
                <TableCell align="center">Clinical Hours</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departmentPerformance.map((dept) => (
                <TableRow key={dept.dept} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{dept.dept}</TableCell>
                  <TableCell align="center">{dept.students}</TableCell>
                  <TableCell align="center">{dept.faculty}</TableCell>
                  <TableCell align="center">{dept.avgGrade}</TableCell>
                  <TableCell align="center">{dept.clinicalHours}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={dept.avgGrade > 8.2 ? 'Excellent' : 'Good'}
                      size="small"
                      color={dept.avgGrade > 8.2 ? 'success' : 'primary'}
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
