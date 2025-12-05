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
  Engineering as EngineeringIcon,
  CalendarToday,
  TrendingUp,
  EmojiEvents,
} from '@mui/icons-material';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const semesterData = [
  { sem: 'Sem 1', students: 480, avgCgpa: 7.8 },
  { sem: 'Sem 2', students: 475, avgCgpa: 7.9 },
  { sem: 'Sem 3', students: 470, avgCgpa: 8.1 },
  { sem: 'Sem 4', students: 465, avgCgpa: 8.0 },
  { sem: 'Sem 5', students: 460, avgCgpa: 8.2 },
  { sem: 'Sem 6', students: 455, avgCgpa: 8.3 },
  { sem: 'Sem 7', students: 450, avgCgpa: 8.4 },
  { sem: 'Sem 8', students: 445, avgCgpa: 8.5 },
];

const placementData = [
  { company: 'Google', placed: 12, package: '28 LPA' },
  { company: 'Microsoft', placed: 10, package: '26 LPA' },
  { company: 'Amazon', placed: 15, package: '24 LPA' },
  { company: 'TCS', placed: 45, package: '7 LPA' },
  { company: 'Infosys', placed: 38, package: '6.5 LPA' },
];

const departmentPerformance = [
  { dept: 'Computer Science', students: 480, faculty: 35, avgCgpa: 8.5, placement: 92 },
  { dept: 'Electronics & Communication', students: 420, faculty: 28, avgCgpa: 8.2, placement: 88 },
  { dept: 'Mechanical Engineering', students: 450, faculty: 32, avgCgpa: 8.0, placement: 85 },
  { dept: 'Civil Engineering', students: 360, faculty: 25, avgCgpa: 7.8, placement: 80 },
  { dept: 'Electrical Engineering', students: 330, faculty: 22, avgCgpa: 7.9, placement: 82 },
  { dept: 'Information Technology', students: 300, faculty: 20, avgCgpa: 8.3, placement: 90 },
  { dept: 'AI & Machine Learning', students: 180, faculty: 12, avgCgpa: 8.7, placement: 95 },
  { dept: 'Cyber Security', students: 120, faculty: 6, avgCgpa: 8.4, placement: 93 },
];

const COLORS = ['#1976D2', '#2E7D32', '#ED6C02', '#9C27B0', '#D32F2F'];

export default function EngineeringPrincipalDashboard() {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Academic Calendar',
      icon: <CalendarToday sx={{ fontSize: 40 }} />,
      color: '#1976D2',
      value: '18',
      subtitle: 'Upcoming Exams',
      path: '/engineering/principal/academic',
    },
    {
      title: 'Course Management',
      icon: <School sx={{ fontSize: 40 }} />,
      color: '#2E7D32',
      value: '156',
      subtitle: 'Active Courses',
      path: '/engineering/principal/faculty',
    },
    {
      title: 'Semester Exams',
      icon: <Assessment sx={{ fontSize: 40 }} />,
      color: '#ED6C02',
      value: '245',
      subtitle: 'This Month',
      path: '/engineering/principal/reports',
    },
    {
      title: 'Placement Rate',
      icon: <EmojiEvents sx={{ fontSize: 40 }} />,
      color: '#9C27B0',
      value: '87%',
      subtitle: 'Current Year',
      path: '/engineering/principal/analytics',
    },
  ];

  const upcomingExams = [
    { subject: 'Data Structures', semester: 'Sem 3', type: 'Theory', date: 'Dec 15, 2024', students: 470 },
    { subject: 'Digital Electronics', semester: 'Sem 4', type: 'Practical', date: 'Dec 18, 2024', students: 465 },
    { subject: 'Operating Systems', semester: 'Sem 5', type: 'Theory', date: 'Dec 20, 2024', students: 460 },
    { subject: 'Computer Networks', semester: 'Sem 6', type: 'Practical', date: 'Dec 22, 2024', students: 455 },
    { subject: 'Machine Learning', semester: 'Sem 7', type: 'Project', date: 'Dec 25, 2024', students: 450 },
  ];

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #1976D2 0%, #1565C0 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Engineering Academic Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Tagore Engineering College - Principal's Overview
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
              Semester-wise Student Performance & CGPA
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={semesterData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sem" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="students" fill="#1976D2" name="Students" />
                <Bar yAxisId="right" dataKey="avgCgpa" fill="#2E7D32" name="Avg CGPA" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Key Academic Metrics
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <Card sx={{ bgcolor: '#E3F2FD', p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="primary" fontWeight={700}>
                    2400
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Students
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ bgcolor: '#E8F5E9', p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main" fontWeight={700}>
                    180
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Faculty Members
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ bgcolor: '#FFF3E0', p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="warning.main" fontWeight={700}>
                    92%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pass Rate
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ bgcolor: '#FCE4EC', p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="error.main" fontWeight={700}>
                    1:13.3
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Faculty Ratio
                  </Typography>
                </Card>
              </Grid>
            </Grid>
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                AICTE Compliance Status
              </Typography>
              <LinearProgress
                variant="determinate"
                value={94}
                sx={{ height: 10, borderRadius: 1, mb: 1 }}
                color="success"
              />
              <Typography variant="caption" color="text.secondary">
                94% - Excellent compliance with AICTE norms
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Upcoming Semester Examinations
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Subject</TableCell>
                    <TableCell>Semester</TableCell>
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
                        <Chip label={exam.semester} size="small" color="primary" />
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
              Top Campus Placements
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Company</TableCell>
                    <TableCell align="center">Students</TableCell>
                    <TableCell align="right">Package</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {placementData.map((placement, index) => (
                    <TableRow key={index} hover>
                      <TableCell sx={{ fontWeight: 600 }}>{placement.company}</TableCell>
                      <TableCell align="center">
                        <Chip label={placement.placed} size="small" color="success" />
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600, color: '#2E7D32' }}>
                        {placement.package}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, bgcolor: '#f5f5f5' }}>Total Placed</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700, bgcolor: '#f5f5f5' }}>
                      120
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700, bgcolor: '#f5f5f5' }}>
                      Avg: 12.5 LPA
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
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
                <TableCell align="center">Avg CGPA</TableCell>
                <TableCell>Placement Rate</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departmentPerformance.map((dept) => (
                <TableRow key={dept.dept} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{dept.dept}</TableCell>
                  <TableCell align="center">{dept.students}</TableCell>
                  <TableCell align="center">{dept.faculty}</TableCell>
                  <TableCell align="center">{dept.avgCgpa}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={dept.placement}
                        sx={{ flex: 1, height: 8, borderRadius: 1 }}
                        color={dept.placement > 90 ? 'success' : dept.placement > 80 ? 'primary' : 'warning'}
                      />
                      <Typography variant="body2" sx={{ minWidth: 45 }}>
                        {dept.placement}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={dept.placement > 85 ? 'Excellent' : 'Good'}
                      size="small"
                      color={dept.placement > 85 ? 'success' : 'primary'}
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
