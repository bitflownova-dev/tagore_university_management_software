import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  TextField,
  MenuItem,
  LinearProgress,
  Card,
  CardContent,
} from '@mui/material';
import { Search, FileDownload } from '@mui/icons-material';

const students = [
  { id: 1, rollNo: 'ENG001', name: 'Rahul Sharma', semester: 'Sem 3', department: 'CSE', cgpa: 8.5, attendance: 92, projects: 4, status: 'Active' },
  { id: 2, rollNo: 'ENG002', name: 'Priya Singh', semester: 'Sem 5', department: 'ECE', cgpa: 8.8, attendance: 88, projects: 5, status: 'Active' },
  { id: 3, rollNo: 'ENG003', name: 'Amit Kumar', semester: 'Sem 7', department: 'Mechanical', cgpa: 7.2, attendance: 85, projects: 6, status: 'Active' },
  { id: 4, rollNo: 'ENG004', name: 'Neha Patel', semester: 'Sem 2', department: 'Civil', cgpa: 9.0, attendance: 95, projects: 2, status: 'Active' },
  { id: 5, rollNo: 'ENG005', name: 'Vikram Reddy', semester: 'Sem 4', department: 'Electrical', cgpa: 7.5, attendance: 82, projects: 3, status: 'Active' },
  { id: 6, rollNo: 'ENG006', name: 'Anjali Verma', semester: 'Sem 8', department: 'IT', cgpa: 9.2, attendance: 98, projects: 8, status: 'Active' },
  { id: 7, rollNo: 'ENG007', name: 'Suresh Gupta', semester: 'Sem 6', department: 'AI & ML', cgpa: 8.8, attendance: 78, projects: 7, status: 'Active' },
  { id: 8, rollNo: 'ENG008', name: 'Divya Nair', semester: 'Sem 1', department: 'Cyber Security', cgpa: 9.0, attendance: 93, projects: 1, status: 'Active' },
];

const semesters = ['All', 'Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'];
const departments = ['All', 'CSE', 'ECE', 'Mechanical', 'Civil', 'Electrical', 'IT', 'AI & ML', 'Cyber Security'];

export default function EngineeringStudentRecords() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const filteredStudents = students.filter(
    (s) =>
      (selectedSemester === 'All' || s.semester === selectedSemester) &&
      (selectedDepartment === 'All' || s.department === selectedDepartment) &&
      (s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.rollNo.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getCGPAColor = (cgpa: number) => {
    if (cgpa >= 8.5) return 'success';
    if (cgpa >= 7.0) return 'primary';
    if (cgpa >= 6.0) return 'warning';
    return 'error';
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #1976D2 0%, #1565C0 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Engineering Student Records
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Student performance & academic tracking
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E3F2FD' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976D2' }}>
                2,640
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Students
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#388E3C' }}>
                8.2
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Avg CGPA
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E3F2FD' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976D2' }}>
                89%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Avg Attendance
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFF3E0' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#F57C00' }}>
                540
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Final Year Students
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              placeholder="Search by name or roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              select
              fullWidth
              label="Semester"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              {semesters.map((sem) => (
                <MenuItem key={sem} value={sem}>
                  {sem}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              select
              fullWidth
              label="Department"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button fullWidth variant="contained" color="primary" startIcon={<FileDownload />}>
              Export
            </Button>
          </Grid>
        </Grid>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Roll No</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Semester</TableCell>
                <TableCell align="center">CGPA</TableCell>
                <TableCell align="center">Attendance %</TableCell>
                <TableCell align="center">Projects</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{student.rollNo}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    <Chip label={student.department} size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Chip label={student.semester} size="small" color="primary" />
                  </TableCell>
                  <TableCell align="center">
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {student.cgpa}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={(student.cgpa / 10) * 100}
                        color={getCGPAColor(student.cgpa)}
                        sx={{ height: 6, borderRadius: 3 }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {student.attendance}%
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={student.attendance}
                        color={student.attendance >= 75 ? 'success' : 'error'}
                        sx={{ height: 6, borderRadius: 3 }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="center">{student.projects}</TableCell>
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

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#1976D2' }}>
          AICTE Compliance Summary
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Minimum Attendance Compliance
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LinearProgress
                variant="determinate"
                value={93}
                color="success"
                sx={{ flex: 1, height: 10, borderRadius: 5 }}
              />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                93%
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Pass Rate
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LinearProgress
                variant="determinate"
                value={89}
                color="success"
                sx={{ flex: 1, height: 10, borderRadius: 5 }}
              />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                89%
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Placement Rate
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LinearProgress
                variant="determinate"
                value={89}
                color="success"
                sx={{ flex: 1, height: 10, borderRadius: 5 }}
              />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                89%
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
