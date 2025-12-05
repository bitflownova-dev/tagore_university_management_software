import { useState } from 'react';
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
  LinearProgress,
} from '@mui/material';
import { MenuBook, School, EventNote } from '@mui/icons-material';

const yearData = [
  { year: 'First Year', students: 520, courses: 12, avgPercentage: 76, type: 'Foundation' },
  { year: 'Second Year', students: 495, courses: 15, avgPercentage: 74, type: 'Core' },
  { year: 'Third Year', students: 480, courses: 18, avgPercentage: 78, type: 'Specialization' },
];

const departmentData = [
  { department: 'English', faculty: 12, students: 280, courses: 8, type: 'Arts' },
  { department: 'History', faculty: 10, students: 240, courses: 6, type: 'Arts' },
  { department: 'Economics', faculty: 11, students: 320, courses: 9, type: 'Arts' },
  { department: 'Political Science', faculty: 9, students: 200, courses: 6, type: 'Arts' },
  { department: 'Mathematics', faculty: 14, students: 350, courses: 10, type: 'Science' },
  { department: 'Physics', faculty: 13, students: 300, courses: 9, type: 'Science' },
  { department: 'Chemistry', faculty: 12, students: 290, courses: 9, type: 'Science' },
  { department: 'Botany', faculty: 8, students: 180, courses: 7, type: 'Science' },
  { department: 'Zoology', faculty: 9, students: 200, courses: 7, type: 'Science' },
  { department: 'Commerce', faculty: 15, students: 400, courses: 12, type: 'Commerce' },
  { department: 'Computer Science', faculty: 16, students: 420, courses: 10, type: 'Science' },
  { department: 'Psychology', faculty: 7, students: 160, courses: 6, type: 'Arts' },
];

const examSchedule = [
  { exam: 'BA First Year Finals', date: 'December 20, 2024', program: 'BA', type: 'Theory + Practical' },
  { exam: 'BSc Second Year Midterm', date: 'December 18, 2024', program: 'BSc', type: 'Theory' },
  { exam: 'BCom Third Year Finals', date: 'December 22, 2024', program: 'BCom', type: 'Theory + Practical' },
  { exam: 'BA Second Year Midterm', date: 'December 25, 2024', program: 'BA', type: 'Theory' },
  { exam: 'BSc Third Year Finals', date: 'January 5, 2025', program: 'BSc', type: 'Theory + Practical' },
];

export default function ArtsScienceAcademicManagement() {
  const [tabValue, setTabValue] = useState(0);

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #5E35B1 0%, #311B92 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Arts & Science Academic Management
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          BA/BSc/BCom curriculum & UGC compliance management
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#EDE7F6' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#5E35B1' }}>
                1,495
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Students
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#F3E5F5' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#7B1FA2' }}>
                45
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Courses
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8EAF6' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#3F51B5' }}>
                5
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Upcoming Exams
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E1F5FE' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#0288D1' }}>
                76%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Avg Percentage
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
          <Tab label="Year Structure" icon={<MenuBook />} iconPosition="start" />
          <Tab label="Departments" icon={<School />} iconPosition="start" />
          <Tab label="Examination Schedule" icon={<EventNote />} iconPosition="start" />
        </Tabs>

        {tabValue === 0 && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Academic Year</TableCell>
                  <TableCell align="center">Total Students</TableCell>
                  <TableCell align="center">Courses</TableCell>
                  <TableCell align="center">Avg Percentage</TableCell>
                  <TableCell>Program Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {yearData.map((year) => (
                  <TableRow key={year.year} hover>
                    <TableCell>
                      <Chip label={year.year} color="primary" variant="outlined" />
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>
                      {year.students}
                    </TableCell>
                    <TableCell align="center">{year.courses}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {year.avgPercentage}%
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={year.avgPercentage}
                          sx={{ width: 100, height: 8, borderRadius: 1 }}
                          color={year.avgPercentage >= 75 ? 'success' : 'primary'}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip label={year.type} size="small" color="secondary" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {tabValue === 1 && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Department</TableCell>
                  <TableCell align="center">Faculty</TableCell>
                  <TableCell align="center">Students</TableCell>
                  <TableCell align="center">Courses</TableCell>
                  <TableCell>Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {departmentData.map((dept) => (
                  <TableRow key={dept.department} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{dept.department}</TableCell>
                    <TableCell align="center">{dept.faculty}</TableCell>
                    <TableCell align="center">{dept.students}</TableCell>
                    <TableCell align="center">{dept.courses}</TableCell>
                    <TableCell>
                      <Chip
                        label={dept.type}
                        size="small"
                        color={dept.type === 'Science' ? 'primary' : dept.type === 'Commerce' ? 'success' : 'secondary'}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {tabValue === 2 && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Exam Name</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Program</TableCell>
                  <TableCell>Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {examSchedule.map((exam, index) => (
                  <TableRow key={index} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{exam.exam}</TableCell>
                    <TableCell>{exam.date}</TableCell>
                    <TableCell>
                      <Chip label={exam.program} size="small" color="primary" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={exam.type}
                        size="small"
                        color={exam.type.includes('Practical') ? 'success' : 'warning'}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#5E35B1' }}>
          UGC Compliance Status
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Faculty-Student Ratio (1:20)</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                1:{(3340 / 136).toFixed(1)}
              </Typography>
            </Box>
            <LinearProgress variant="determinate" value={95} sx={{ height: 8, borderRadius: 1 }} color="success" />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">CBCS Implementation</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                100%
              </Typography>
            </Box>
            <LinearProgress variant="determinate" value={100} sx={{ height: 8, borderRadius: 1 }} color="success" />
          </Box>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Course Completion Rate</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                88%
              </Typography>
            </Box>
            <LinearProgress variant="determinate" value={88} sx={{ height: 8, borderRadius: 1 }} color="primary" />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
