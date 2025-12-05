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
  Button,
  LinearProgress,
} from '@mui/material';
import { School, Search } from '@mui/icons-material';

const students = [
  { id: 1, rollNo: 'NS001', name: 'Priya Sharma', year: 'First Year', program: 'B.Sc Nursing', percentage: 78, attendance: 92 },
  { id: 2, rollNo: 'NS002', name: 'Anjali Kumar', year: 'Second Year', program: 'B.Sc Nursing', percentage: 82, attendance: 88 },
  { id: 3, rollNo: 'NS003', name: 'Meera Patel', year: 'Third Year', program: 'B.Sc Nursing', percentage: 85, attendance: 95 },
  { id: 4, rollNo: 'NS004', name: 'Kavita Singh', year: 'Fourth Year', program: 'B.Sc Nursing', percentage: 88, attendance: 90 },
  { id: 5, rollNo: 'GNM001', name: 'Sunita Reddy', year: 'First Year', program: 'GNM', percentage: 72, attendance: 85 },
  { id: 6, rollNo: 'GNM002', name: 'Neha Verma', year: 'Second Year', program: 'GNM', percentage: 75, attendance: 87 },
  { id: 7, rollNo: 'NS005', name: 'Rekha Agarwal', year: 'First Year', program: 'B.Sc Nursing', percentage: 80, attendance: 93 },
  { id: 8, rollNo: 'NS006', name: 'Pooja Gupta', year: 'Third Year', program: 'B.Sc Nursing', percentage: 83, attendance: 89 },
];

const years = ['All Years', 'First Year', 'Second Year', 'Third Year', 'Fourth Year'];
const programs = ['All Programs', 'B.Sc Nursing', 'GNM', 'Post-Basic B.Sc'];

export default function NursingStudentRecords() {
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

  const totalStudents = filteredStudents.length;
  const avgPercentage = (filteredStudents.reduce((sum, s) => sum + s.percentage, 0) / totalStudents).toFixed(1);
  const avgAttendance = (filteredStudents.reduce((sum, s) => sum + s.attendance, 0) / totalStudents).toFixed(1);

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Nursing Student Records
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Student performance tracking & academic progress
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#2E7D32' }}>
                {totalStudents}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Students
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#C8E6C9' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1B5E20' }}>
                {avgPercentage}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Avg Percentage
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#A5D6A7' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#2E7D32' }}>
                {avgAttendance}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Avg Attendance
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#81C784' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1B5E20' }}>
                2
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Programs Offered
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <School sx={{ mr: 2, color: '#2E7D32' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Student Directory
          </Typography>
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search by Name or Roll No"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
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
                <TableCell>Percentage</TableCell>
                <TableCell>Attendance</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{student.rollNo}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    <Chip label={student.year} size="small" color="primary" />
                  </TableCell>
                  <TableCell>
                    <Chip label={student.program} size="small" sx={{ bgcolor: '#C8E6C9', color: '#1B5E20' }} />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={student.percentage}
                        sx={{
                          width: 100,
                          height: 8,
                          borderRadius: 1,
                          bgcolor: '#E8F5E9',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: student.percentage >= 75 ? '#2E7D32' : student.percentage >= 60 ? '#388E3C' : student.percentage >= 50 ? '#66BB6A' : '#F44336',
                          },
                        }}
                      />
                      <Typography variant="body2" sx={{ minWidth: 45 }}>
                        {student.percentage}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={student.attendance}
                        sx={{
                          width: 100,
                          height: 8,
                          borderRadius: 1,
                          bgcolor: '#E8F5E9',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: student.attendance >= 75 ? '#2E7D32' : '#F44336',
                          },
                        }}
                      />
                      <Typography variant="body2" sx={{ minWidth: 45 }}>
                        {student.attendance}%
                      </Typography>
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
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#2E7D32' }}>
          INC Compliance Metrics
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          • Average Attendance: {avgAttendance}% (INC Requirement: 75% minimum) {parseFloat(avgAttendance) >= 75 ? '✓' : '⚠'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Clinical Training Completion: 88% (Target: 100% before final exams)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Student Progression Rate: 92% (B.Sc Nursing year-to-year)
        </Typography>
      </Paper>
    </Box>
  );
}
