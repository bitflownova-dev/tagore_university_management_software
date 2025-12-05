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
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import { School, TrendingUp, Assessment, LocalHospital } from '@mui/icons-material';

const students = [
  { id: 1, rollNo: 'DEN001', name: 'Rahul Sharma', year: '3rd Year BDS', percentage: 78, attendance: 92, procedures: 45 },
  { id: 2, rollNo: 'DEN002', name: 'Priya Singh', year: '4th Year BDS', percentage: 82, attendance: 88, procedures: 68 },
  { id: 3, rollNo: 'DEN003', name: 'Amit Kumar', year: '2nd Year BDS', percentage: 72, attendance: 85, procedures: 12 },
  { id: 4, rollNo: 'DEN004', name: 'Neha Patel', year: 'Internship', percentage: 85, attendance: 95, procedures: 92 },
  { id: 5, rollNo: 'DEN005', name: 'Vikram Reddy', year: '3rd Year BDS', percentage: 75, attendance: 82, procedures: 52 },
  { id: 6, rollNo: 'DEN006', name: 'Anjali Gupta', year: '4th Year BDS', percentage: 88, attendance: 98, procedures: 78 },
  { id: 7, rollNo: 'DEN007', name: 'Suresh Nair', year: '1st Year BDS', percentage: 80, attendance: 78, procedures: 0 },
  { id: 8, rollNo: 'DEN008', name: 'Divya Reddy', year: '2nd Year BDS', percentage: 86, attendance: 93, procedures: 18 },
];

const years = ['All', '1st Year BDS', '2nd Year BDS', '3rd Year BDS', '4th Year BDS', 'Internship'];
const departments = ['All', 'Oral Surgery', 'Conservative', 'Prosthodontics', 'Orthodontics', 'Periodontology', 'Pediatric'];

export default function DentalStudentRecords() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesYear = selectedYear === 'All' || student.year === selectedYear;
    return matchesSearch && matchesYear;
  });

  const totalStudents = students.length;
  const avgPercentage = students.reduce((sum, s) => sum + s.percentage, 0) / students.length;
  const avgAttendance = students.reduce((sum, s) => sum + s.attendance, 0) / students.length;
  const internshipStudents = students.filter(s => s.year === 'Internship').length;

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 75) return 'success';
    if (percentage >= 60) return 'primary';
    if (percentage >= 50) return 'warning';
    return 'error';
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #00796B 0%, #004D40 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Dental Student Records
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Student performance & clinical procedure tracking
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E0F2F1' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <School sx={{ color: '#00796B', mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Total Students
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#00796B' }}>
                {totalStudents}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TrendingUp sx={{ color: '#388E3C', mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Avg Percentage
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#388E3C' }}>
                {avgPercentage.toFixed(1)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E3F2FD' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Assessment sx={{ color: '#1976D2', mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Avg Attendance
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976D2' }}>
                {avgAttendance.toFixed(0)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFF3E0' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocalHospital sx={{ color: '#F57C00', mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Interns
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#F57C00' }}>
                {internshipStudents}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search by name or roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              select
              fullWidth
              label="Academic Year"
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
          <Grid item xs={12} md={3}>
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
          <Grid item xs={12} md={2}>
            <Button fullWidth variant="outlined" sx={{ height: '56px' }}>
              Export Data
            </Button>
          </Grid>
        </Grid>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Roll No</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Academic Year</TableCell>
                <TableCell>Percentage</TableCell>
                <TableCell>Attendance</TableCell>
                <TableCell align="center">Procedures</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id} hover>
                  <TableCell sx={{ fontWeight: 600, fontFamily: 'monospace' }}>{student.rollNo}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    <Chip label={student.year} size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell sx={{ width: 180 }}>
                    <Box>
                      <LinearProgress
                        variant="determinate"
                        value={student.percentage}
                        sx={{ height: 8, borderRadius: 4, mb: 0.5 }}
                        color={getPercentageColor(student.percentage)}
                      />
                      <Typography variant="caption">{student.percentage}%</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ width: 180 }}>
                    <Box>
                      <LinearProgress
                        variant="determinate"
                        value={student.attendance}
                        sx={{ height: 8, borderRadius: 4, mb: 0.5 }}
                        color={student.attendance >= 75 ? 'success' : 'error'}
                      />
                      <Typography variant="caption">{student.attendance}%</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={student.procedures}
                      size="small"
                      color={student.procedures >= 50 ? 'success' : 'warning'}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Chip label="Active" size="small" color="success" />
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
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#00796B' }}>
          DCI Clinical Requirements
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Attendance Requirement (75% minimum)
            </Typography>
            <LinearProgress variant="determinate" value={89} sx={{ height: 8, borderRadius: 4 }} color="success" />
            <Typography variant="caption" color="text.secondary">
              89% Average attendance
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Clinical Procedures Completion
            </Typography>
            <LinearProgress variant="determinate" value={75} sx={{ height: 8, borderRadius: 4 }} color="primary" />
            <Typography variant="caption" color="text.secondary">
              75% Average completion
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Patient Interaction Hours
            </Typography>
            <LinearProgress variant="determinate" value={82} sx={{ height: 8, borderRadius: 4 }} color="success" />
            <Typography variant="caption" color="text.secondary">
              82% Requirement met
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
