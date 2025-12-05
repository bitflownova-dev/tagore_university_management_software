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
  HealthAndSafety,
  TrendingUp,
  Medication,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const yearData = [
  { year: '1st Year', students: 120, avgGrade: 8.0, clinicalHours: 320 },
  { year: '2nd Year', students: 115, avgGrade: 8.2, clinicalHours: 450 },
  { year: '3rd Year', students: 110, avgGrade: 8.4, clinicalHours: 580 },
  { year: '4th Year', students: 105, avgGrade: 8.6, clinicalHours: 720 },
];

const departmentPerformance = [
  { dept: 'Medical-Surgical Nursing', students: 180, faculty: 9, avgGrade: 8.3, clinicalHours: 580 },
  { dept: 'Community Health Nursing', students: 150, faculty: 7, avgGrade: 8.1, clinicalHours: 450 },
  { dept: 'Mental Health Nursing', students: 120, faculty: 6, avgGrade: 8.2, clinicalHours: 420 },
  { dept: 'Child Health Nursing', students: 130, faculty: 6, avgGrade: 8.4, clinicalHours: 490 },
  { dept: 'OB-GYN Nursing', students: 140, faculty: 7, avgGrade: 8.5, clinicalHours: 520 },
];

export default function NursingPrincipalDashboard() {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Academic Calendar',
      icon: <CalendarToday sx={{ fontSize: 40 }} />,
      color: '#2E7D32',
      value: '18',
      subtitle: 'Upcoming Exams',
      path: '/nursing/principal/academic',
    },
    {
      title: 'Clinical Postings',
      icon: <LocalHospital sx={{ fontSize: 40 }} />,
      color: '#388E3C',
      value: '450',
      subtitle: 'Active Placements',
      path: '/nursing/principal/faculty',
    },
    {
      title: 'Assessments',
      icon: <Assessment sx={{ fontSize: 40 }} />,
      color: '#43A047',
      value: '92',
      subtitle: 'This Month',
      path: '/nursing/principal/reports',
    },
    {
      title: 'INC Compliance',
      icon: <HealthAndSafety sx={{ fontSize: 40 }} />,
      color: '#1B5E20',
      value: '97%',
      subtitle: 'Recognition',
      path: '/nursing/principal/analytics',
    },
  ];

  const upcomingExams = [
    { subject: 'Fundamentals of Nursing', year: '1st Year', type: 'Practical', date: 'Dec 15, 2025', students: 120 },
    { subject: 'Medical-Surgical Nursing I', year: '2nd Year', type: 'Clinical', date: 'Dec 18, 2025', students: 115 },
    { subject: 'Community Health Nursing', year: '3rd Year', type: 'Theory', date: 'Dec 20, 2025', students: 110 },
    { subject: 'Child Health Nursing', year: '4th Year', type: 'Clinical', date: 'Dec 22, 2025', students: 105 },
    { subject: 'Obstetrics & Gynecology Nursing', year: '4th Year', type: 'Viva', date: 'Dec 25, 2025', students: 100 },
  ];

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Nursing Academic Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Tagore College of Nursing - Principal's Overview
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
              Year-wise Student Performance & Clinical Hours
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={yearData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="students" fill="#2E7D32" name="Students" />
                <Bar yAxisId="right" dataKey="clinicalHours" fill="#388E3C" name="Clinical Hours" />
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
                <Card sx={{ bgcolor: '#E8F5E9', p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ color: '#2E7D32' }} fontWeight={700}>
                    450
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Students
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ bgcolor: '#C8E6C9', p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ color: '#1B5E20' }} fontWeight={700}>
                    35
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Faculty
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ bgcolor: '#A5D6A7', p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ color: '#2E7D32' }} fontWeight={700}>
                    96%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pass Rate
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ bgcolor: '#81C784', p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ color: '#1B5E20' }} fontWeight={700}>
                    1:12.9
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Faculty Ratio
                  </Typography>
                </Card>
              </Grid>
            </Grid>
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                INC Recognition Status
              </Typography>
              <LinearProgress
                variant="determinate"
                value={97}
                sx={{ height: 10, borderRadius: 1, mb: 1 }}
                color="success"
              />
              <Typography variant="caption" color="text.secondary">
                97% - Excellent compliance with INC norms
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
              Clinical Training Highlights
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Hospital Affiliations</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    12 Hospitals
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={92} sx={{ height: 8, borderRadius: 1 }} color="success" />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Clinical Hours Completion</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    2,070 hrs
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={94} sx={{ height: 8, borderRadius: 1 }} color="primary" />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Student Satisfaction</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    93%
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={93} sx={{ height: 8, borderRadius: 1 }} color="success" />
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
