import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  Button,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Search,
  LocalHospital,
  Engineering,
  Biotech,
  MenuBook,
  HealthAndSafety,
  Science,
  School,
  PersonAdd,
  Download,
  FilterList,
} from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface Student {
  id: string;
  rollNo: string;
  name: string;
  course: string;
  year: number;
  cgpa: number;
  attendance: number;
  status: 'active' | 'on-leave' | 'graduated';
}

interface College {
  id: string;
  name: string;
  icon: JSX.Element;
  color: string;
  students: Student[];
}

const collegesData: College[] = [
  {
    id: 'medical',
    name: 'Medical College & Hospital',
    icon: <LocalHospital />,
    color: '#D32F2F',
    students: [
      { id: '1', rollNo: 'MBBS-2021-001', name: 'Rahul Sharma', course: 'MBBS', year: 3, cgpa: 8.5, attendance: 92, status: 'active' },
      { id: '2', rollNo: 'MBBS-2021-045', name: 'Priya Patel', course: 'MBBS', year: 3, cgpa: 8.2, attendance: 88, status: 'active' },
      { id: '3', rollNo: 'MBBS-2022-012', name: 'Amit Kumar', course: 'MBBS', year: 2, cgpa: 7.8, attendance: 85, status: 'active' },
      { id: '4', rollNo: 'MBBS-2022-089', name: 'Sneha Desai', course: 'MBBS', year: 2, cgpa: 8.9, attendance: 95, status: 'active' },
      { id: '5', rollNo: 'MBBS-2023-025', name: 'Vikram Singh', course: 'MBBS', year: 1, cgpa: 7.5, attendance: 80, status: 'active' },
      { id: '6', rollNo: 'MBBS-2023-078', name: 'Anjali Reddy', course: 'MBBS', year: 1, cgpa: 8.7, attendance: 93, status: 'active' },
      { id: '7', rollNo: 'MBBS-2020-032', name: 'Rajesh Nair', course: 'MBBS', year: 4, cgpa: 8.1, attendance: 89, status: 'active' },
      { id: '8', rollNo: 'MD-2022-005', name: 'Kavita Mehta', course: 'MD (Medicine)', year: 2, cgpa: 8.6, attendance: 91, status: 'active' },
    ],
  },
  {
    id: 'engineering',
    name: 'Engineering College',
    icon: <Engineering />,
    color: '#1976D2',
    students: [
      { id: '1', rollNo: 'CSE-2021-101', name: 'Arjun Sharma', course: 'B.Tech CSE', year: 3, cgpa: 8.8, attendance: 90, status: 'active' },
      { id: '2', rollNo: 'CSE-2021-145', name: 'Divya Patel', course: 'B.Tech CSE', year: 3, cgpa: 9.1, attendance: 94, status: 'active' },
      { id: '3', rollNo: 'ECE-2022-078', name: 'Karan Singh', course: 'B.Tech ECE', year: 2, cgpa: 8.3, attendance: 87, status: 'active' },
      { id: '4', rollNo: 'MECH-2021-056', name: 'Neha Gupta', course: 'B.Tech Mechanical', year: 3, cgpa: 8.0, attendance: 85, status: 'active' },
      { id: '5', rollNo: 'CIVIL-2023-089', name: 'Rohit Kumar', course: 'B.Tech Civil', year: 1, cgpa: 7.9, attendance: 88, status: 'active' },
      { id: '6', rollNo: 'IT-2022-124', name: 'Pooja Reddy', course: 'B.Tech IT', year: 2, cgpa: 8.7, attendance: 92, status: 'active' },
      { id: '7', rollNo: 'CSE-2020-032', name: 'Suresh Rao', course: 'B.Tech CSE', year: 4, cgpa: 8.5, attendance: 89, status: 'active' },
      { id: '8', rollNo: 'AIML-2022-015', name: 'Meera Shah', course: 'B.Tech AI/ML', year: 2, cgpa: 9.0, attendance: 95, status: 'active' },
    ],
  },
  {
    id: 'dental',
    name: 'Dental College & Hospital',
    icon: <Biotech />,
    color: '#0288D1',
    students: [
      { id: '1', rollNo: 'BDS-2021-023', name: 'Ankit Sharma', course: 'BDS', year: 3, cgpa: 8.4, attendance: 91, status: 'active' },
      { id: '2', rollNo: 'BDS-2022-045', name: 'Riya Patel', course: 'BDS', year: 2, cgpa: 8.6, attendance: 93, status: 'active' },
      { id: '3', rollNo: 'BDS-2023-012', name: 'Varun Kumar', course: 'BDS', year: 1, cgpa: 7.8, attendance: 86, status: 'active' },
      { id: '4', rollNo: 'MDS-2022-008', name: 'Priyanka Singh', course: 'MDS Orthodontics', year: 2, cgpa: 8.9, attendance: 94, status: 'active' },
      { id: '5', rollNo: 'BDS-2021-089', name: 'Sanjay Reddy', course: 'BDS', year: 3, cgpa: 8.2, attendance: 89, status: 'active' },
      { id: '6', rollNo: 'BDS-2022-067', name: 'Kavita Desai', course: 'BDS', year: 2, cgpa: 8.5, attendance: 90, status: 'active' },
    ],
  },
  {
    id: 'arts-science',
    name: 'Arts & Science College',
    icon: <MenuBook />,
    color: '#388E3C',
    students: [
      { id: '1', rollNo: 'BSC-CS-2021-045', name: 'Akash Sharma', course: 'B.Sc Computer Science', year: 3, cgpa: 8.3, attendance: 88, status: 'active' },
      { id: '2', rollNo: 'BCOM-2022-089', name: 'Sneha Patel', course: 'B.Com', year: 2, cgpa: 8.6, attendance: 91, status: 'active' },
      { id: '3', rollNo: 'BA-ENG-2023-012', name: 'Ravi Kumar', course: 'B.A English', year: 1, cgpa: 7.9, attendance: 85, status: 'active' },
      { id: '4', rollNo: 'BSC-MATH-2021-034', name: 'Priya Singh', course: 'B.Sc Mathematics', year: 3, cgpa: 8.8, attendance: 93, status: 'active' },
      { id: '5', rollNo: 'BCOM-2021-078', name: 'Amit Reddy', course: 'B.Com', year: 3, cgpa: 8.1, attendance: 87, status: 'active' },
      { id: '6', rollNo: 'BSC-PHY-2022-056', name: 'Neha Gupta', course: 'B.Sc Physics', year: 2, cgpa: 8.4, attendance: 90, status: 'active' },
    ],
  },
  {
    id: 'nursing',
    name: 'College of Nursing',
    icon: <HealthAndSafety />,
    color: '#7B1FA2',
    students: [
      { id: '1', rollNo: 'BSCN-2021-034', name: 'Deepa Sharma', course: 'B.Sc Nursing', year: 3, cgpa: 8.7, attendance: 94, status: 'active' },
      { id: '2', rollNo: 'BSCN-2022-056', name: 'Anjali Patel', course: 'B.Sc Nursing', year: 2, cgpa: 8.5, attendance: 92, status: 'active' },
      { id: '3', rollNo: 'BSCN-2023-012', name: 'Pooja Kumar', course: 'B.Sc Nursing', year: 1, cgpa: 8.2, attendance: 89, status: 'active' },
      { id: '4', rollNo: 'MSCN-2022-008', name: 'Kavita Singh', course: 'M.Sc Nursing', year: 2, cgpa: 8.9, attendance: 95, status: 'active' },
      { id: '5', rollNo: 'BSCN-2021-089', name: 'Meera Reddy', course: 'B.Sc Nursing', year: 3, cgpa: 8.4, attendance: 91, status: 'active' },
    ],
  },
  {
    id: 'allied-health',
    name: 'Institute of Allied Health Sciences',
    icon: <Science />,
    color: '#F57C00',
    students: [
      { id: '1', rollNo: 'MLT-2021-045', name: 'Rajesh Kumar', course: 'MLT', year: 3, cgpa: 8.3, attendance: 90, status: 'active' },
      { id: '2', rollNo: 'RAD-2022-023', name: 'Priya Sharma', course: 'Radiology Tech', year: 2, cgpa: 8.6, attendance: 92, status: 'active' },
      { id: '3', rollNo: 'PHYSIO-2021-078', name: 'Amit Patel', course: 'Physiotherapy', year: 3, cgpa: 8.4, attendance: 89, status: 'active' },
      { id: '4', rollNo: 'OPT-2022-034', name: 'Sneha Singh', course: 'Optometry', year: 2, cgpa: 8.5, attendance: 91, status: 'active' },
      { id: '5', rollNo: 'RESP-2023-012', name: 'Vikram Reddy', course: 'Respiratory Therapy', year: 1, cgpa: 7.9, attendance: 86, status: 'active' },
    ],
  },
];

const COLORS = ['#4CAF50', '#2196F3', '#FF9800', '#F44336', '#9C27B0'];

export default function UniversityStudentManagement() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const selectedCollege = collegesData[selectedTab];

  const filteredStudents = selectedCollege.students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.course.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesYear = yearFilter === 'all' || student.year.toString() === yearFilter;
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;

    return matchesSearch && matchesYear && matchesStatus;
  });

  const stats = {
    total: filteredStudents.length,
    avgCgpa: (filteredStudents.reduce((sum, s) => sum + s.cgpa, 0) / filteredStudents.length).toFixed(2),
    avgAttendance: (filteredStudents.reduce((sum, s) => sum + s.attendance, 0) / filteredStudents.length).toFixed(1),
    active: filteredStudents.filter((s) => s.status === 'active').length,
  };

  const yearDistribution = [
    { name: 'Year 1', value: filteredStudents.filter((s) => s.year === 1).length },
    { name: 'Year 2', value: filteredStudents.filter((s) => s.year === 2).length },
    { name: 'Year 3', value: filteredStudents.filter((s) => s.year === 3).length },
    { name: 'Year 4', value: filteredStudents.filter((s) => s.year === 4).length },
    { name: 'Year 5+', value: filteredStudents.filter((s) => s.year >= 5).length },
  ].filter((item) => item.value > 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'on-leave':
        return 'warning';
      case 'graduated':
        return 'default';
      default:
        return 'default';
    }
  };

  const getCgpaColor = (cgpa: number) => {
    if (cgpa >= 8.5) return 'success.main';
    if (cgpa >= 7.5) return 'primary.main';
    if (cgpa >= 6.5) return 'warning.main';
    return 'error.main';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              Student Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              University-wide student records across all colleges
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" startIcon={<Download />}>
              Export
            </Button>
            <Button variant="contained" startIcon={<PersonAdd />}>
              Add Student
            </Button>
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={selectedTab}
          onChange={(_, value) => setSelectedTab(value)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          {collegesData.map((college) => (
            <Tab
              key={college.id}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar sx={{ bgcolor: college.color, width: 24, height: 24 }}>
                    {React.cloneElement(college.icon, { sx: { fontSize: 14 } })}
                  </Avatar>
                  {college.name}
                </Box>
              }
            />
          ))}
        </Tabs>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: `${selectedCollege.color}10` }}>
            <CardContent>
              <School sx={{ fontSize: 40, color: selectedCollege.color, mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, color: selectedCollege.color }}>
                {stats.total}
              </Typography>
              <Typography variant="subtitle1" fontWeight={600}>
                Total Students
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: `${selectedCollege.color}10` }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: selectedCollege.color }}>
                {stats.avgCgpa}
              </Typography>
              <Typography variant="subtitle1" fontWeight={600}>
                Average CGPA
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: `${selectedCollege.color}10` }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: selectedCollege.color }}>
                {stats.avgAttendance}%
              </Typography>
              <Typography variant="subtitle1" fontWeight={600}>
                Avg Attendance
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: `${selectedCollege.color}10` }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: selectedCollege.color }}>
                {stats.active}
              </Typography>
              <Typography variant="subtitle1" fontWeight={600}>
                Active Students
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                placeholder="Search by name, roll number, or course..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Year</InputLabel>
                <Select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} label="Year">
                  <MenuItem value="all">All Years</MenuItem>
                  <MenuItem value="1">Year 1</MenuItem>
                  <MenuItem value="2">Year 2</MenuItem>
                  <MenuItem value="3">Year 3</MenuItem>
                  <MenuItem value="4">Year 4</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Status</InputLabel>
                <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} label="Status">
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="on-leave">On Leave</MenuItem>
                  <MenuItem value="graduated">Graduated</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Roll Number</TableCell>
                    <TableCell>Student Name</TableCell>
                    <TableCell>Course</TableCell>
                    <TableCell align="center">Year</TableCell>
                    <TableCell align="center">CGPA</TableCell>
                    <TableCell align="center">Attendance</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>
                          {student.rollNo}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ bgcolor: selectedCollege.color }}>
                            {student.name.charAt(0)}
                          </Avatar>
                          <Typography variant="subtitle2">{student.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{student.course}</TableCell>
                      <TableCell align="center">
                        <Chip label={`Year ${student.year}`} size="small" color="primary" />
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2" fontWeight={600} sx={{ color: getCgpaColor(student.cgpa) }}>
                          {student.cgpa}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          sx={{ color: student.attendance >= 85 ? 'success.main' : 'error.main' }}
                        >
                          {student.attendance}%
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={student.status.replace('-', ' ').toUpperCase()}
                          size="small"
                          color={getStatusColor(student.status) as any}
                        />
                      </TableCell>
                      <TableCell>
                        <Button size="small" variant="outlined">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Year-wise Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={yearDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {yearDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Performance Summary
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Students with CGPA ≥ 8.5
                </Typography>
                <Typography variant="h5" fontWeight={700} color="success.main">
                  {filteredStudents.filter((s) => s.cgpa >= 8.5).length}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Students with Attendance ≥ 90%
                </Typography>
                <Typography variant="h5" fontWeight={700} color="primary.main">
                  {filteredStudents.filter((s) => s.attendance >= 90).length}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Students needing attention
                </Typography>
                <Typography variant="h5" fontWeight={700} color="error.main">
                  {filteredStudents.filter((s) => s.cgpa < 7.0 || s.attendance < 75).length}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
