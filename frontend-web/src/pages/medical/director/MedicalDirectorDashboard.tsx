import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import {
  LocalHospital,
  People,
  School,
  Assessment,
  TrendingUp,
  Warning,
} from '@mui/icons-material';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const hospitalData = [
  { month: 'Jul', opd: 4500, ipd: 280, surgery: 65 },
  { month: 'Aug', opd: 4800, ipd: 295, surgery: 72 },
  { month: 'Sep', opd: 5200, ipd: 310, surgery: 78 },
  { month: 'Oct', opd: 5500, ipd: 325, surgery: 85 },
  { month: 'Nov', opd: 5800, ipd: 340, surgery: 92 },
  { month: 'Dec', opd: 6200, ipd: 360, surgery: 98 },
];

const studentData = [
  { phase: 'Phase 1', students: 180, avgProgress: 68 },
  { phase: 'Phase 2', students: 165, avgProgress: 72 },
  { phase: 'Phase 3.1', students: 158, avgProgress: 65 },
  { phase: 'Phase 3.2', students: 152, avgProgress: 70 },
  { phase: 'Internship', students: 145, avgProgress: 85 },
];

export default function MedicalDirectorDashboard() {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Faculty Management',
      icon: <People sx={{ fontSize: 40 }} />,
      color: '#1976D2',
      value: '142',
      subtitle: 'Medical Faculty',
      path: '/medical/director/staff',
    },
    {
      title: 'Student Management',
      icon: <School sx={{ fontSize: 40 }} />,
      color: '#2E7D32',
      value: '800',
      subtitle: 'MBBS Students',
      path: '/medical/director/students',
    },
    {
      title: 'Department Analytics',
      icon: <Assessment sx={{ fontSize: 40 }} />,
      color: '#ED6C02',
      value: '18',
      subtitle: 'Clinical Departments',
      path: '/medical/director/analytics',
    },
    {
      title: 'Hospital Performance',
      icon: <LocalHospital sx={{ fontSize: 40 }} />,
      color: '#D32F2F',
      value: '6200',
      subtitle: 'OPD This Month',
      path: '/medical/director/reports',
    },
  ];

  const alerts = [
    { severity: 'warning', message: 'Phase 1 Anatomy exam scheduled for Dec 15, 2024' },
    { severity: 'info', message: '45 logbook entries pending faculty approval' },
    { severity: 'success', message: 'NMC inspection preparation 95% complete' },
  ];

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #D32F2F 0%, #C62828 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Medical College & Hospital Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Tagore Medical College & Hospital - Director's Overview
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
              Hospital Operations - Last 6 Months
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hospitalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="opd" stroke="#1976D2" name="OPD Patients" strokeWidth={2} />
                <Line type="monotone" dataKey="ipd" stroke="#2E7D32" name="IPD Patients" strokeWidth={2} />
                <Line type="monotone" dataKey="surgery" stroke="#D32F2F" name="Surgeries" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Key Metrics
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">NMC Compliance</Typography>
                  <Typography variant="body2" fontWeight={600}>95%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={95} sx={{ height: 8, borderRadius: 1 }} color="success" />
              </Box>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Faculty:Student Ratio</Typography>
                  <Typography variant="body2" fontWeight={600}>1:5.6</Typography>
                </Box>
                <LinearProgress variant="determinate" value={85} sx={{ height: 8, borderRadius: 1 }} color="primary" />
              </Box>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Hospital Occupancy</Typography>
                  <Typography variant="body2" fontWeight={600}>78%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={78} sx={{ height: 8, borderRadius: 1 }} color="warning" />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Student Satisfaction</Typography>
                  <Typography variant="body2" fontWeight={600}>88%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={88} sx={{ height: 8, borderRadius: 1 }} color="success" />
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              MBBS Student Distribution by Phase
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={studentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="phase" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="students" fill="#1976D2" name="Students" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              CBME Progress by Phase
            </Typography>
            <Box sx={{ mt: 2 }}>
              {studentData.map((data) => (
                <Box key={data.phase} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">{data.phase}</Typography>
                    <Typography variant="body2" fontWeight={600}>{data.avgProgress}%</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={data.avgProgress}
                    sx={{ height: 8, borderRadius: 1 }}
                    color={data.avgProgress > 70 ? 'success' : data.avgProgress > 60 ? 'primary' : 'warning'}
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Warning color="warning" />
              Important Alerts
            </Typography>
            <Box sx={{ mt: 2 }}>
              {alerts.map((alert, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 1,
                    bgcolor: alert.severity === 'success' ? 'success.50' : alert.severity === 'warning' ? 'warning.50' : 'info.50',
                    borderLeft: `4px solid`,
                    borderColor: alert.severity === 'success' ? 'success.main' : alert.severity === 'warning' ? 'warning.main' : 'info.main',
                  }}
                >
                  <Typography variant="body2">{alert.message}</Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Clinical Departments
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Department</TableCell>
                    <TableCell align="center">Faculty</TableCell>
                    <TableCell align="center">Beds</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { dept: 'Internal Medicine', faculty: 18, beds: 85, status: 'Active' },
                    { dept: 'General Surgery', faculty: 16, beds: 72, status: 'Active' },
                    { dept: 'Pediatrics', faculty: 14, beds: 60, status: 'Active' },
                    { dept: 'OBG', faculty: 12, beds: 55, status: 'Active' },
                    { dept: 'Orthopedics', faculty: 10, beds: 45, status: 'Active' },
                  ].map((row) => (
                    <TableRow key={row.dept} hover>
                      <TableCell>{row.dept}</TableCell>
                      <TableCell align="center">{row.faculty}</TableCell>
                      <TableCell align="center">{row.beds}</TableCell>
                      <TableCell align="center">
                        <Chip label={row.status} size="small" color="success" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
