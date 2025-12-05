import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Button,
  LinearProgress,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Class,
  Assignment,
  People,
  Schedule,
  TrendingUp,
  Assessment,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const todaysClasses = [
  { time: '09:00 AM - 10:30 AM', subject: 'Data Structures', year: '2nd Year', section: 'CSE-A', room: 'Lab 301', type: 'Lab' },
  { time: '11:00 AM - 12:00 PM', subject: 'Algorithms', year: '3rd Year', section: 'CSE-B', room: 'Room 205', type: 'Lecture' },
  { time: '02:00 PM - 03:30 PM', subject: 'Database Systems', year: '2nd Year', section: 'CSE-A', room: 'Lab 302', type: 'Lab' },
  { time: '04:00 PM - 05:00 PM', subject: 'Software Engineering', year: '4th Year', section: 'CSE-A', room: 'Room 301', type: 'Lecture' },
];

const pendingAssignments = [
  { assignment: 'DSA Lab Assignment 5', subject: 'Data Structures', class: '2nd Year CSE-A', dueDate: 'Dec 10, 2024', submitted: 32, total: 45 },
  { assignment: 'DBMS Project Report', subject: 'Database Systems', class: '2nd Year CSE-A', dueDate: 'Dec 12, 2024', submitted: 28, total: 45 },
  { assignment: 'Algorithm Analysis', subject: 'Algorithms', class: '3rd Year CSE-B', dueDate: 'Dec 15, 2024', submitted: 38, total: 50 },
  { assignment: 'SE Case Study', subject: 'Software Engineering', class: '4th Year CSE-A', dueDate: 'Dec 18, 2024', submitted: 15, total: 40 },
];

const examSchedule = [
  { date: 'Dec 15, 2024', subject: 'Data Structures', class: '2nd Year CSE-A', type: 'Mid-Term', duration: '2 hours' },
  { date: 'Dec 18, 2024', subject: 'Algorithms', class: '3rd Year CSE-B', type: 'Mid-Term', duration: '2 hours' },
  { date: 'Dec 20, 2024', subject: 'Database Systems', class: '2nd Year CSE-A', type: 'Lab Exam', duration: '3 hours' },
  { date: 'Dec 22, 2024', subject: 'Software Engineering', class: '4th Year CSE-A', type: 'Viva', duration: '1 hour' },
];

const studentPerformance = [
  { rollNo: 'CSE21001', name: 'Rahul Kumar', attendance: 92, avgMarks: 85, assignments: 8, total: 10, status: 'Excellent' },
  { rollNo: 'CSE21002', name: 'Priya Sharma', attendance: 88, avgMarks: 78, assignments: 7, total: 10, status: 'Good' },
  { rollNo: 'CSE21003', name: 'Amit Patel', attendance: 75, avgMarks: 68, assignments: 6, total: 10, status: 'Average' },
  { rollNo: 'CSE21004', name: 'Sneha Reddy', attendance: 68, avgMarks: 62, assignments: 5, total: 10, status: 'Needs Attention' },
  { rollNo: 'CSE21005', name: 'Vikram Singh', attendance: 95, avgMarks: 92, assignments: 10, total: 10, status: 'Excellent' },
];

export default function EngineeringTeacherDashboard() {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #1976D2 0%, #1565C0 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Engineering Faculty Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Welcome, Dr. Rajesh Kumar - Computer Science & Engineering
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E3F2FD', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Class sx={{ fontSize: 40, color: '#1976D2', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976D2' }}>
                    4
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Classes Today
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFF3E0', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Assignment sx={{ fontSize: 40, color: '#F57C00', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#F57C00' }}>
                    4
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pending Assignments
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <People sx={{ fontSize: 40, color: '#388E3C', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#388E3C' }}>
                    180
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Students
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#F3E5F5', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Assessment sx={{ fontSize: 40, color: '#7B1FA2', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#7B1FA2' }}>
                    4
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Upcoming Exams
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="Today's Schedule" />
          <Tab label="Assignments" />
          <Tab label="Exam Schedule" />
          <Tab label="Student Performance" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Today's Classes - December 4, 2024
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Time</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Room</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todaysClasses.map((cls, index) => (
                  <TableRow key={index} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{cls.time}</TableCell>
                    <TableCell>{cls.subject}</TableCell>
                    <TableCell>
                      <Chip label={`${cls.year} ${cls.section}`} size="small" color="primary" />
                    </TableCell>
                    <TableCell>{cls.room}</TableCell>
                    <TableCell>
                      <Chip label={cls.type} size="small" color={cls.type === 'Lab' ? 'success' : 'default'} />
                    </TableCell>
                    <TableCell>
                      <Button size="small" variant="outlined" onClick={() => navigate('/engineering/teacher/attendance')}>
                        Attendance
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Pending Assignment Evaluations
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Assignment</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Submission Progress</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingAssignments.map((assignment, index) => (
                  <TableRow key={index} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{assignment.assignment}</TableCell>
                    <TableCell>{assignment.subject}</TableCell>
                    <TableCell>{assignment.class}</TableCell>
                    <TableCell>{assignment.dueDate}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={(assignment.submitted / assignment.total) * 100}
                          sx={{ flex: 1, height: 8, borderRadius: 1 }}
                        />
                        <Typography variant="body2" sx={{ minWidth: 60 }}>
                          {assignment.submitted}/{assignment.total}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Button size="small" variant="contained" onClick={() => navigate('/engineering/teacher/marks')}>
                        Grade
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Upcoming Examination Schedule
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {examSchedule.map((exam, index) => (
                  <TableRow key={index} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{exam.date}</TableCell>
                    <TableCell>{exam.subject}</TableCell>
                    <TableCell>{exam.class}</TableCell>
                    <TableCell>
                      <Chip label={exam.type} size="small" color="primary" />
                    </TableCell>
                    <TableCell>{exam.duration}</TableCell>
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
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Student Performance - 2nd Year CSE-A
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Roll No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Attendance</TableCell>
                  <TableCell>Avg Marks</TableCell>
                  <TableCell>Assignments</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentPerformance.map((student, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{student.rollNo}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{student.name}</TableCell>
                    <TableCell>
                      <Chip
                        label={`${student.attendance}%`}
                        size="small"
                        color={student.attendance >= 85 ? 'success' : student.attendance >= 75 ? 'warning' : 'error'}
                      />
                    </TableCell>
                    <TableCell>{student.avgMarks}%</TableCell>
                    <TableCell>
                      {student.assignments}/{student.total}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={student.status}
                        size="small"
                        color={
                          student.status === 'Excellent'
                            ? 'success'
                            : student.status === 'Good'
                            ? 'primary'
                            : student.status === 'Average'
                            ? 'warning'
                            : 'error'
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Button size="small" variant="text">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Quick Actions
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Schedule />}
                    onClick={() => navigate('/engineering/teacher/attendance')}
                  >
                    Mark Attendance
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Assignment />}
                    onClick={() => navigate('/engineering/teacher/marks')}
                  >
                    Enter Marks
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button fullWidth variant="outlined" startIcon={<Class />} onClick={() => navigate('/engineering/teacher/classes')}>
                    My Classes
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button fullWidth variant="outlined" startIcon={<TrendingUp />}>
                    Class Analytics
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Semester Progress
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Syllabus Coverage</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      75%
                    </Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={75} sx={{ height: 8, borderRadius: 1 }} color="primary" />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Assignments Completed</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      8/10
                    </Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={80} sx={{ height: 8, borderRadius: 1 }} color="success" />
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Exam Preparation</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      90%
                    </Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={90} sx={{ height: 8, borderRadius: 1 }} color="success" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
