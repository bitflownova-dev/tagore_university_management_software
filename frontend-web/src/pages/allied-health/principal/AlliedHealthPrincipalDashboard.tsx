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
  Biotech,
  TrendingUp,
  MedicalServices,
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
      color: '#FF9800',
      value: '16',
      subtitle: 'Upcoming Exams',
      path: '/allied-health/principal/academic',
    },
    {
      title: 'Clinical Placements',
      icon: <LocalHospital sx={{ fontSize: 40 }} />,
      color: '#0288D1',
      value: '530',
      subtitle: 'Active Students',
      path: '/allied-health/principal/faculty',
    },
    {
      title: 'Assessments',
      icon: <Assessment sx={{ fontSize: 40 }} />,
      color: '#D32F2F',
      value: '68',
      subtitle: 'This Month',
      path: '/allied-health/principal/reports',
    },
    {
      title: 'Placement Rate',
      icon: <MedicalServices sx={{ fontSize: 40 }} />,
      color: '#388E3C',
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
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Allied Health Sciences Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Tagore College of Allied Health Sciences - Principal's Overview
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
              Program-wise Student Performance & Practical Hours
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={yearData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="students" fill="#FF9800" name="Students" />
                <Bar yAxisId="right" dataKey="practicalHours" fill="#0288D1" name="Practical Hours" />
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
                <Card sx={{ bgcolor: '#FFF3E0', p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="warning.main" fontWeight={700}>
                    530
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Students
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ bgcolor: '#E1F5FE', p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="primary" fontWeight={700}>
                    37
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Faculty
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ bgcolor: '#E8F5E9', p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main" fontWeight={700}>
                    91%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pass Rate
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ bgcolor: '#FCE4EC', p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ color: '#C2185B' }} fontWeight={700}>
                    1:14.3
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Faculty Ratio
                  </Typography>
                </Card>
              </Grid>
            </Grid>
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Accreditation Status
              </Typography>
              <LinearProgress
                variant="determinate"
                value={90}
                sx={{ height: 10, borderRadius: 1, mb: 1 }}
                color="success"
              />
              <Typography variant="caption" color="text.secondary">
                90% - Good standing with regulatory bodies
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
                    <TableCell>Program</TableCell>
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
                    15 Hospitals
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={94} sx={{ height: 8, borderRadius: 1 }} color="success" />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Equipment Training</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    1,840 hrs
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={88} sx={{ height: 8, borderRadius: 1 }} color="primary" />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Student Satisfaction</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    88%
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={88} sx={{ height: 8, borderRadius: 1 }} color="success" />
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
                <TableCell align="center">Certifications</TableCell>
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
                  <TableCell align="center">{dept.certifications}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={dept.avgGrade > 8.0 ? 'Excellent' : 'Good'}
                      size="small"
                      color={dept.avgGrade > 8.0 ? 'success' : 'primary'}
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
