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
  MenuBook,
  Science,
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
  { time: '09:00 AM - 11:00 AM', subject: 'English Poetry', year: 'Second Year', section: 'BA', room: 'Room 201', type: 'Theory' },
  { time: '11:30 AM - 01:00 PM', subject: 'English Drama', year: 'Third Year', section: 'BA', room: 'Room 203', type: 'Theory' },
  { time: '02:00 PM - 03:30 PM', subject: 'Literary Criticism', year: 'First Year', section: 'BA', room: 'Room 105', type: 'Theory' },
];

const pendingAssignments = [
  { title: 'Poetry Analysis', subject: 'English Poetry', class: 'Second Year BA', dueDate: 'Dec 08, 2024', submitted: 42, total: 55 },
  { title: 'Drama Essay', subject: 'English Drama', class: 'Third Year BA', dueDate: 'Dec 10, 2024', submitted: 38, total: 48 },
  { title: 'Critical Review', subject: 'Literary Criticism', class: 'First Year BA', dueDate: 'Dec 12, 2024', submitted: 35, total: 52 },
];

const researchActivities = [
  { activity: 'Paper Submission', title: 'Contemporary Indian Literature', journal: 'Modern Literature Review', status: 'Under Review', date: 'Nov 20, 2024' },
  { activity: 'Conference', title: 'National Literature Conference', location: 'Delhi University', status: 'Accepted', date: 'Jan 15, 2025' },
  { activity: 'Book Chapter', title: 'English Poetry in India', publisher: 'Oxford University Press', status: 'In Progress', date: 'Dec 30, 2024' },
];

const studentPerformance = [
  { rollNo: 'AS001', name: 'Rahul Kumar', program: 'BA English', attendance: 92, avgMarks: 78, assignments: 9, total: 10, status: 'Excellent' },
  { rollNo: 'AS002', name: 'Priya Sharma', program: 'BA English', attendance: 88, avgMarks: 82, assignments: 8, total: 10, status: 'Excellent' },
  { rollNo: 'AS003', name: 'Amit Patel', program: 'BA English', attendance: 85, avgMarks: 75, assignments: 8, total: 10, status: 'Good' },
  { rollNo: 'AS004', name: 'Meera Reddy', program: 'BA English', attendance: 78, avgMarks: 70, assignments: 7, total: 10, status: 'Good' },
];

export default function ArtsScienceTeacherDashboard() {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #5E35B1 0%, #311B92 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Arts & Science Faculty Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Welcome, Dr. Sarah Williams - English Department
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#EDE7F6', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Class sx={{ fontSize: 40, color: '#5E35B1', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#5E35B1' }}>
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
          <Card sx={{ bgcolor: '#F3E5F5', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Assignment sx={{ fontSize: 40, color: '#7B1FA2', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#7B1FA2' }}>
                    4
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pending Reviews
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E1BEE7', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <People sx={{ fontSize: 40, color: '#6A1B9A', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#6A1B9A' }}>
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
          <Card sx={{ bgcolor: '#D1C4E9', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Science sx={{ fontSize: 40, color: '#4A148C', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#4A148C' }}>
                    3
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Research Papers
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="Today's Schedule" />
          <Tab label="Assignments" />
          <Tab label="Research Activities" />
          <Tab label="Student Performance" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Today's Teaching Schedule - December 4, 2024
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
                      <Chip label={cls.type} size="small" color={cls.type === 'Seminar' ? 'success' : 'default'} />
                    </TableCell>
                    <TableCell>
                      <Button size="small" variant="outlined" onClick={() => navigate('/arts-science/teacher/attendance')}>
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
            Pending Assignment Reviews
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Assignment Title</TableCell>
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
                    <TableCell sx={{ fontWeight: 600 }}>{assignment.title}</TableCell>
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
                      <Button size="small" variant="contained" onClick={() => navigate('/arts-science/teacher/marks')}>
                        Review
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
            Research & Academic Activities
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Activity Type</TableCell>
                  <TableCell>Title/Topic</TableCell>
                  <TableCell>Venue/Publisher</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {researchActivities.map((activity, index) => (
                  <TableRow key={index} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{activity.activity}</TableCell>
                    <TableCell>{activity.title}</TableCell>
                    <TableCell>{activity.location || activity.journal || activity.publisher}</TableCell>
                    <TableCell>
                      <Chip
                        label={activity.status}
                        size="small"
                        color={
                          activity.status === 'Accepted'
                            ? 'success'
                            : activity.status === 'Under Review'
                            ? 'warning'
                            : activity.status === 'Scheduled'
                            ? 'primary'
                            : 'default'
                        }
                      />
                    </TableCell>
                    <TableCell>{activity.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Student Performance - 1st Year BA English
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Roll No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Program</TableCell>
                  <TableCell>Attendance</TableCell>
                  <TableCell>Avg Marks</TableCell>
                  <TableCell>Assignments</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentPerformance.map((student, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{student.rollNo}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{student.name}</TableCell>
                    <TableCell>{student.program}</TableCell>
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
                          student.status === 'Excellent' ? 'success' : student.status === 'Good' ? 'primary' : 'warning'
                        }
                      />
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
                    startIcon={<Class />}
                    onClick={() => navigate('/arts-science/teacher/attendance')}
                  >
                    Mark Attendance
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Assignment />}
                    onClick={() => navigate('/arts-science/teacher/marks')}
                  >
                    Review Assignment
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button fullWidth variant="outlined" startIcon={<MenuBook />} onClick={() => navigate('/arts-science/teacher/classes')}>
                    My Classes
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button fullWidth variant="outlined" startIcon={<Science />}>
                    Research Portal
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
                      78%
                    </Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={78} sx={{ height: 8, borderRadius: 1, bgcolor: '#EDE7F6', '& .MuiLinearProgress-bar': { bgcolor: '#5E35B1' } }} />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Assignments Completed</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      7/10
                    </Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={70} sx={{ height: 8, borderRadius: 1, bgcolor: '#EDE7F6', '& .MuiLinearProgress-bar': { bgcolor: '#7B1FA2' } }} />
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Research Publications</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      3 Papers
                    </Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={85} sx={{ height: 8, borderRadius: 1, bgcolor: '#EDE7F6', '& .MuiLinearProgress-bar': { bgcolor: '#6A1B9A' } }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
