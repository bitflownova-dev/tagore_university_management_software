import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  Avatar,
} from '@mui/material';
import {
  People,
  PersonAdd,
  EventAvailable,
  LocalHospital,
  Work,
  School,
} from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const departmentStrength = [
  { dept: 'Internal Medicine', count: 18 },
  { dept: 'Surgery', count: 16 },
  { dept: 'Pediatrics', count: 14 },
  { dept: 'OBG', count: 12 },
  { dept: 'Orthopedics', count: 10 },
  { dept: 'Anatomy', count: 10 },
  { dept: 'Physiology', count: 9 },
  { dept: 'Biochemistry', count: 8 },
];

const designationData = [
  { name: 'Professor', value: 28 },
  { name: 'Assoc. Prof', value: 35 },
  { name: 'Asst. Prof', value: 42 },
  { name: 'Sr. Resident', value: 24 },
  { name: 'Jr. Resident', value: 13 },
];

const COLORS = ['#1976D2', '#2E7D32', '#ED6C02', '#9C27B0', '#D32F2F'];

export default function MedicalHRDashboard() {
  const stats = [
    { title: 'Total Faculty', value: '142', change: '+5', icon: <People sx={{ fontSize: 40 }} />, color: '#1976D2' },
    { title: 'Clinical Faculty', value: '98', change: '+3', icon: <LocalHospital sx={{ fontSize: 40 }} />, color: '#2E7D32' },
    { title: 'New Joinings', value: '8', subtitle: 'This Month', icon: <PersonAdd sx={{ fontSize: 40 }} />, color: '#ED6C02' },
    { title: 'On Leave', value: '6', subtitle: 'Today', icon: <EventAvailable sx={{ fontSize: 40 }} />, color: '#9C27B0' },
  ];

  const recentJoinings = [
    {
      name: 'Dr. Anjali Verma',
      designation: 'Assistant Professor',
      dept: 'Pediatrics',
      qualification: 'MBBS, MD',
      joinDate: 'Dec 1, 2024',
      avatar: 'AV',
    },
    {
      name: 'Dr. Suresh Kumar',
      designation: 'Senior Resident',
      dept: 'Surgery',
      qualification: 'MBBS, MS',
      joinDate: 'Nov 28, 2024',
      avatar: 'SK',
    },
    {
      name: 'Dr. Meena Patel',
      designation: 'Associate Professor',
      dept: 'OBG',
      qualification: 'MBBS, MD',
      joinDate: 'Nov 25, 2024',
      avatar: 'MP',
    },
  ];

  const leaveRequests = [
    { name: 'Dr. Ramesh Kumar', dept: 'Internal Medicine', type: 'Medical Leave', days: 3, status: 'Pending' },
    { name: 'Dr. Kavita Desai', dept: 'Physiology', type: 'Casual Leave', days: 2, status: 'Approved' },
    { name: 'Dr. Vikram Singh', dept: 'Orthopedics', type: 'Conference', days: 4, status: 'Approved' },
    { name: 'Dr. Anil Gupta', dept: 'Biochemistry', type: 'Casual Leave', days: 1, status: 'Pending' },
  ];

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #D32F2F 0%, #C62828 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Medical Faculty HR Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Human Resource Management - Tagore Medical College
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: `${stat.color}20`,
                      color: stat.color,
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>
                      {stat.value}
                    </Typography>
                    {stat.change && (
                      <Chip label={stat.change} size="small" color="success" sx={{ mt: 0.5 }} />
                    )}
                  </Box>
                </Box>
                <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 600 }}>
                  {stat.title}
                </Typography>
                {stat.subtitle && (
                  <Typography variant="body2" color="text.secondary">
                    {stat.subtitle}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Faculty Strength by Department
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentStrength}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dept" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#1976D2" name="Faculty Count" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Faculty by Designation
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={designationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {designationData.map((entry, index) => (
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
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Recent Joinings
            </Typography>
            <Box sx={{ mt: 2 }}>
              {recentJoinings.map((faculty, index) => (
                <Card key={index} sx={{ mb: 2, border: '1px solid', borderColor: 'divider' }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                      <Avatar sx={{ bgcolor: '#D32F2F', width: 50, height: 50 }}>
                        {faculty.avatar}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {faculty.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {faculty.designation}
                        </Typography>
                      </Box>
                      <Chip label="New" color="success" size="small" />
                    </Box>
                    <Grid container spacing={1} sx={{ mt: 1 }}>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          Department
                        </Typography>
                        <Typography variant="body2">{faculty.dept}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          Qualification
                        </Typography>
                        <Typography variant="body2">{faculty.qualification}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="caption" color="text.secondary">
                          Join Date: {faculty.joinDate}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Leave Requests
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Faculty</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell align="center">Days</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaveRequests.map((request, index) => (
                    <TableRow key={index} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>
                          {request.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {request.dept}
                        </Typography>
                      </TableCell>
                      <TableCell>{request.type}</TableCell>
                      <TableCell align="center">{request.days}</TableCell>
                      <TableCell align="center">
                        <Chip
                          label={request.status}
                          size="small"
                          color={request.status === 'Approved' ? 'success' : 'warning'}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Faculty Requirements
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">NMC Required: 160</Typography>
                  <Typography variant="body2" fontWeight={600}>142 / 160</Typography>
                </Box>
                <LinearProgress variant="determinate" value={(142 / 160) * 100} sx={{ height: 8, borderRadius: 1 }} />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                  18 positions to be filled for full compliance
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Clinical Faculty Required: 110</Typography>
                  <Typography variant="body2" fontWeight={600}>98 / 110</Typography>
                </Box>
                <LinearProgress variant="determinate" value={(98 / 110) * 100} sx={{ height: 8, borderRadius: 1 }} color="success" />
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
