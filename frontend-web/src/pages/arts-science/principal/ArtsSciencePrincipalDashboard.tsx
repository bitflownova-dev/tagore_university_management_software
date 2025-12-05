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
  CalendarToday,
  TrendingUp,
  Science,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const yearData = [
  { year: 'First Year', students: 520, avgPercentage: 76 },
  { year: 'Second Year', students: 495, avgPercentage: 74 },
  { year: 'Third Year', students: 480, avgPercentage: 78 },
];

const departmentPerformance = [
  { dept: 'English', students: 280, faculty: 12, avgPercentage: 76, research: 8 },
  { dept: 'History', students: 240, faculty: 10, avgPercentage: 74, research: 6 },
  { dept: 'Economics', students: 320, faculty: 11, avgPercentage: 77, research: 9 },
  { dept: 'Political Science', students: 200, faculty: 9, avgPercentage: 75, research: 5 },
  { dept: 'Mathematics', students: 350, faculty: 14, avgPercentage: 79, research: 12 },
  { dept: 'Physics', students: 300, faculty: 13, avgPercentage: 78, research: 10 },
  { dept: 'Chemistry', students: 290, faculty: 12, avgPercentage: 77, research: 9 },
  { dept: 'Commerce', students: 400, faculty: 15, avgPercentage: 73, research: 5 },
  { dept: 'Computer Science', students: 420, faculty: 16, avgPercentage: 82, research: 15 },
  { dept: 'Psychology', students: 160, faculty: 7, avgPercentage: 76, research: 7 },
];

export default function ArtsSciencePrincipalDashboard() {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Academic Calendar',
      icon: <CalendarToday sx={{ fontSize: 40 }} />,
      color: '#5E35B1',
      value: '24',
      subtitle: 'Upcoming Exams',
      path: '/arts-science/principal/academic',
    },
    {
      title: 'BA/BSc/BCom Programs',
      icon: <MenuBook sx={{ fontSize: 40 }} />,
      color: '#7B1FA2',
      value: '30',
      subtitle: 'Active Programs',
      path: '/arts-science/principal/departments',
    },
    {
      title: 'Assessments',
      icon: <Assessment sx={{ fontSize: 40 }} />,
      color: '#6A1B9A',
      value: '156',
      subtitle: 'This Month',
      path: '/arts-science/principal/academic',
    },
    {
      title: 'Research Papers',
      icon: <Science sx={{ fontSize: 40 }} />,
      color: '#4A148C',
      value: '77',
      subtitle: 'Published',
      path: '/arts-science/principal/analytics',
    },
  ];

  const upcomingExams = [
    { subject: 'BA English', year: 'First Year', type: 'Finals', date: 'Dec 20, 2024', students: 95 },
    { subject: 'BSc Physics', year: 'Second Year', type: 'Midterm', date: 'Dec 18, 2024', students: 88 },
    { subject: 'BCom', year: 'Third Year', type: 'Finals', date: 'Dec 22, 2024', students: 102 },
    { subject: 'BA History', year: 'Second Year', type: 'Midterm', date: 'Dec 25, 2024', students: 78 },
    { subject: 'BSc Mathematics', year: 'Third Year', type: 'Finals', date: 'Jan 5, 2025', students: 92 },
  ];

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #5E35B1 0%, #311B92 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Arts & Science Academic Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Tagore Arts & Science College - Principal's Overview
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
              Year-wise Student Performance
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={yearData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="students" fill="#5E35B1" name="Students" />
                <Bar yAxisId="right" dataKey="avgPercentage" fill="#7B1FA2" name="Avg Percentage" />
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
                <Card sx={{ bgcolor: '#EDE7F6', p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ color: '#5E35B1' }} fontWeight={700}>
                    1,495
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Students
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ bgcolor: '#F3E5F5', p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ color: '#7B1FA2' }} fontWeight={700}>
                    136
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Faculty
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ bgcolor: '#E1BEE7', p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ color: '#6A1B9A' }} fontWeight={700}>
                    76%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Avg Percentage
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ bgcolor: '#D1C4E9', p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ color: '#4A148C' }} fontWeight={700}>
                    1:24.6
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Faculty Ratio
                  </Typography>
                </Card>
              </Grid>
            </Grid>
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                UGC Compliance Status
              </Typography>
              <LinearProgress
                variant="determinate"
                value={95}
                sx={{ height: 10, borderRadius: 1, mb: 1, bgcolor: '#EDE7F6', '& .MuiLinearProgress-bar': { bgcolor: '#5E35B1' } }}
              />
              <Typography variant="caption" color="text.secondary">
                95% - UGC norms compliance
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
              Academic Highlights
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Research Publications</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    77 Papers
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={88} sx={{ height: 8, borderRadius: 1 }} color="success" />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Student Placements</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    65%
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={65} sx={{ height: 8, borderRadius: 1, bgcolor: '#EDE7F6', '& .MuiLinearProgress-bar': { bgcolor: '#7B1FA2' } }} />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Student Satisfaction</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    86%
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={86} sx={{ height: 8, borderRadius: 1, bgcolor: '#EDE7F6', '& .MuiLinearProgress-bar': { bgcolor: '#5E35B1' } }} />
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
                <TableCell align="center">Avg Percentage</TableCell>
                <TableCell align="center">Research Papers</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departmentPerformance.map((dept) => (
                <TableRow key={dept.dept} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{dept.dept}</TableCell>
                  <TableCell align="center">{dept.students}</TableCell>
                  <TableCell align="center">{dept.faculty}</TableCell>
                  <TableCell align="center">{dept.avgPercentage}%</TableCell>
                  <TableCell align="center">{dept.research}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={dept.avgPercentage >= 75 ? 'Excellent' : 'Good'}
                      size="small"
                      sx={{ bgcolor: dept.avgPercentage >= 75 ? '#5E35B1' : '#7B1FA2', color: 'white' }}
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
