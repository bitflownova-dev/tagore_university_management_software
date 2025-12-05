import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  Button,
} from '@mui/material';
import { School } from '@mui/icons-material';

const students = [
  { id: 1, rollNo: 'AS001', name: 'Rahul Kumar', year: 'Third Year', program: 'BA English', percentage: 78, attendance: 92 },
  { id: 2, rollNo: 'AS002', name: 'Priya Sharma', year: 'Second Year', program: 'BSc Physics', percentage: 82, attendance: 88 },
  { id: 3, rollNo: 'AS003', name: 'Amit Patel', year: 'First Year', program: 'BCom', percentage: 72, attendance: 85 },
  { id: 4, rollNo: 'AS004', name: 'Neha Gupta', year: 'Third Year', program: 'BSc Computer Science', percentage: 85, attendance: 95 },
  { id: 5, rollNo: 'AS005', name: 'Vikram Singh', year: 'Second Year', program: 'BA History', percentage: 75, attendance: 82 },
  { id: 6, rollNo: 'AS006', name: 'Anjali Reddy', year: 'Third Year', program: 'BSc Mathematics', percentage: 88, attendance: 98 },
  { id: 7, rollNo: 'AS007', name: 'Suresh Nair', year: 'First Year', program: 'BA Economics', percentage: 80, attendance: 78 },
  { id: 8, rollNo: 'AS008', name: 'Divya Joshi', year: 'Second Year', program: 'BCom', percentage: 86, attendance: 93 },
];

const years = ['All Years', 'First Year', 'Second Year', 'Third Year'];
const programs = ['All Programs', 'BA English', 'BA History', 'BA Economics', 'BSc Physics', 'BSc Mathematics', 'BSc Computer Science', 'BCom'];

export default function ArtsScienceStudentRecords() {
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [selectedProgram, setSelectedProgram] = useState('All Programs');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = students.filter((student) => {
    const matchesYear = selectedYear === 'All Years' || student.year === selectedYear;
    const matchesProgram = selectedProgram === 'All Programs' || student.program === selectedProgram;
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesYear && matchesProgram && matchesSearch;
  });

  const avgPercentage = students.reduce((sum, s) => sum + s.percentage, 0) / students.length;
  const avgAttendance = students.reduce((sum, s) => sum + s.attendance, 0) / students.length;

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #5E35B1 0%, #311B92 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Arts & Science Student Records
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Student performance tracking & academic progress monitoring
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#EDE7F6' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#5E35B1' }}>
                {students.length}
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
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#388E3C' }}>
                {avgPercentage.toFixed(1)}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Avg Percentage
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E3F2FD' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976D2' }}>
                {avgAttendance.toFixed(0)}%
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
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#F57C00' }}>
                3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Programs Offered
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <School sx={{ mr: 2, color: '#5E35B1' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Student Records
            </Typography>
          </Box>
          <Button variant="outlined" sx={{ borderColor: '#5E35B1', color: '#5E35B1' }}>
            Export Data
          </Button>
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search by Name/Roll No"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              label="Year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              label="Program"
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
            >
              {programs.map((program) => (
                <MenuItem key={program} value={program}>
                  {program}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Roll No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Program</TableCell>
                <TableCell align="center">Percentage</TableCell>
                <TableCell align="center">Attendance</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id} hover>
                  <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
                    {student.rollNo}
                  </TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    <Chip label={student.year} size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Chip label={student.program} size="small" color="secondary" variant="outlined" />
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 40 }}>
                        {student.percentage}%
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={student.percentage}
                        sx={{ width: 80, height: 8, borderRadius: 1 }}
                        color={student.percentage >= 75 ? 'success' : student.percentage >= 60 ? 'primary' : 'warning'}
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 40 }}>
                        {student.attendance}%
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={student.attendance}
                        sx={{ width: 80, height: 8, borderRadius: 1 }}
                        color={student.attendance >= 75 ? 'success' : 'error'}
                      />
                    </Box>
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
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#5E35B1' }}>
          UGC Compliance Status
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          • Average Attendance: {avgAttendance.toFixed(0)}% (UGC Requirement: 75% minimum)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Course Completion Rate: 88% (Target: 85% minimum)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Student Progression Rate: 92% (Students moving to next year)
        </Typography>
      </Paper>
    </Box>
  );
}
