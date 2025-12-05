import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  InputAdornment,
  Avatar,
  Tabs,
  Tab,
} from '@mui/material';
import { useState } from 'react';
import { Search, Add, FileDownload, FilterList } from '@mui/icons-material';

const students = [
  {
    id: 1,
    name: 'Amit Kumar',
    rollNo: 'AHS2024001',
    program: 'BSc MLT',
    year: 'Year 2',
    department: 'MLT',
    attendance: 92,
    cgpa: 8.5,
    status: 'Active',
  },
  {
    id: 2,
    name: 'Priya Singh',
    rollNo: 'AHS2024002',
    program: 'Diploma Radiology',
    year: 'Year 1',
    department: 'Radiology',
    attendance: 95,
    cgpa: 8.8,
    status: 'Active',
  },
  {
    id: 3,
    name: 'Rahul Sharma',
    rollNo: 'AHS2023045',
    program: 'BPT',
    year: 'Year 3',
    department: 'Physiotherapy',
    attendance: 88,
    cgpa: 8.2,
    status: 'Active',
  },
  {
    id: 4,
    name: 'Sneha Patel',
    rollNo: 'AHS2024003',
    program: 'BOT',
    year: 'Year 2',
    department: 'Occupational Therapy',
    attendance: 91,
    cgpa: 8.6,
    status: 'Active',
  },
  {
    id: 5,
    name: 'Vikram Reddy',
    rollNo: 'AHS2023067',
    program: 'BSc Respiratory Therapy',
    year: 'Year 2',
    department: 'Respiratory Therapy',
    attendance: 89,
    cgpa: 8.3,
    status: 'Active',
  },
];

export default function AlliedHealthStudentRecords() {
  const [tabValue, setTabValue] = useState(0);

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Student Records
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Manage student academic records and information
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Students
              </Typography>
              <Typography variant="h4" sx={{ color: '#1565C0', fontWeight: 600 }}>
                530
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Active Students
              </Typography>
              <Typography variant="h4" sx={{ color: '#1976D2', fontWeight: 600 }}>
                {students.filter(s => s.status === 'Active').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Avg Attendance
              </Typography>
              <Typography variant="h4" sx={{ color: '#1E88E5', fontWeight: 600 }}>
                91%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Avg CGPA
              </Typography>
              <Typography variant="h4" sx={{ color: '#2196F3', fontWeight: 600 }}>
                8.48
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ mb: 3 }}>
          <Tab label="All Students" />
          <Tab label="By Department" />
          <Tab label="Academic Performance" />
        </Tabs>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <TextField
            placeholder="Search students..."
            size="small"
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" startIcon={<FilterList />}>
              Filter
            </Button>
            <Button variant="outlined" startIcon={<FileDownload />}>
              Export
            </Button>
            <Button variant="contained" startIcon={<Add />} sx={{ bgcolor: '#1565C0' }}>
              Add Student
            </Button>
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Student</strong></TableCell>
                <TableCell><strong>Roll No</strong></TableCell>
                <TableCell><strong>Program</strong></TableCell>
                <TableCell><strong>Year</strong></TableCell>
                <TableCell><strong>Department</strong></TableCell>
                <TableCell align="center"><strong>Attendance</strong></TableCell>
                <TableCell align="center"><strong>CGPA</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: '#1565C0' }}>
                        {student.name.split(' ')[0][0]}
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {student.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{student.rollNo}</TableCell>
                  <TableCell>{student.program}</TableCell>
                  <TableCell>{student.year}</TableCell>
                  <TableCell>{student.department}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={`${student.attendance}%`}
                      size="small"
                      color={student.attendance >= 90 ? 'success' : 'warning'}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={student.cgpa}
                      size="small"
                      color={student.cgpa >= 8.5 ? 'success' : 'primary'}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip label={student.status} size="small" color="success" />
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
    </Box>
  );
}
