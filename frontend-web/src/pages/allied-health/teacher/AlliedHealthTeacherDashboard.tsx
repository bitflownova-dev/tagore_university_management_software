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
  Biotech,
  Assignment,
  People,
  Schedule,
  MedicalServices,
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

const todaysSchedule = [
  { time: '08:00 AM - 11:00 AM', activity: 'Biochemistry Lab Session', location: 'MLT Lab A', year: 'Diploma Y2', students: 15 },
  { time: '09:00 AM - 10:00 AM', activity: 'Clinical Hematology Lecture', location: 'Lecture Hall 1', year: 'BSc MLT Y2', students: 35 },
  { time: '11:30 AM - 01:30 PM', activity: 'X-ray Positioning Practical', location: 'Radiology Lab', year: 'BSc Radiology Y1', students: 12 },
  { time: '02:00 PM - 05:00 PM', activity: 'Therapeutic Exercise Training', location: 'Physiotherapy Clinic', year: 'BSc PT Y2', students: 10 },
];

const pendingEvaluations = [
  { student: 'Amit Kumar', procedure: 'Blood Sample Collection', date: 'Dec 02, 2024', program: 'MLT Diploma', competency: 'MLT-BC-01' },
  { student: 'Sneha Patel', procedure: 'Chest X-ray Positioning', date: 'Dec 03, 2024', program: 'BSc Radiology', competency: 'RAD-XR-02' },
  { student: 'Rahul Verma', procedure: 'Range of Motion Assessment', date: 'Dec 03, 2024', program: 'BSc PT', competency: 'PT-ROM-01' },
  { student: 'Priya Reddy', procedure: 'Microscopy Analysis', date: 'Dec 04, 2024', program: 'BSc MLT', competency: 'MLT-MC-03' },
];

const certificationProgress = [
  { certification: 'Phlebotomy', completed: 42, target: 50, progress: 84 },
  { certification: 'CT Scan Operation', completed: 28, target: 30, progress: 93.3 },
  { certification: 'Manual Therapy', completed: 35, target: 40, progress: 87.5 },
  { certification: 'Dialysis Procedures', completed: 18, target: 20, progress: 90 },
];

const studentSupervision = [
  { rollNo: 'MLT21001', name: 'Amit Kumar', program: 'MLT Diploma', attendance: 94, practicalHours: 360, certifications: 12, total: 15, performance: 'Excellent' },
  { rollNo: 'RAD21002', name: 'Sneha Patel', program: 'BSc Radiology', attendance: 90, practicalHours: 420, certifications: 10, total: 12, performance: 'Good' },
  { rollNo: 'PT21003', name: 'Rahul Verma', program: 'BSc PT', attendance: 88, practicalHours: 480, certifications: 14, total: 16, performance: 'Good' },
  { rollNo: 'MLT22004', name: 'Priya Reddy', program: 'BSc MLT', attendance: 96, practicalHours: 520, certifications: 16, total: 18, performance: 'Excellent' },
];

export default function AlliedHealthTeacherDashboard() {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Allied Health Faculty Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Welcome, Dr. Suresh Reddy - Medical Laboratory Technology
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFF3E0', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Biotech sx={{ fontSize: 40, color: '#FF9800', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#FF9800' }}>
                    4
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sessions Today
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFEBEE', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Assignment sx={{ fontSize: 40, color: '#D32F2F', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#D32F2F' }}>
                    4
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pending Evaluations
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E1F5FE', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <People sx={{ fontSize: 40, color: '#0288D1', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#0288D1' }}>
                    72
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Students Supervising
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
                <MedicalServices sx={{ fontSize: 40, color: '#388E3C', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#388E3C' }}>
                    123
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Certifications Done
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
          <Tab label="Pending Evaluations" />
          <Tab label="Certification Progress" />
          <Tab label="Student Supervision" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Today's Practical & Teaching Schedule - December 4, 2024
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Time</TableCell>
                  <TableCell>Activity</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Program/Year</TableCell>
                  <TableCell>Students</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todaysSchedule.map((session, index) => (
                  <TableRow key={index} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{session.time}</TableCell>
                    <TableCell>{session.activity}</TableCell>
                    <TableCell>{session.location}</TableCell>
                    <TableCell>
                      <Chip label={session.year} size="small" color="primary" />
                    </TableCell>
                    <TableCell>{session.students}</TableCell>
                    <TableCell>
                      <Button size="small" variant="outlined" onClick={() => navigate('/allied-health/teacher/attendance')}>
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
            Pending Skill Competency Evaluations
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Procedure/Skill</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Program</TableCell>
                  <TableCell>Competency Code</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingEvaluations.map((evaluation, index) => (
                  <TableRow key={index} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{evaluation.student}</TableCell>
                    <TableCell>{evaluation.procedure}</TableCell>
                    <TableCell>{evaluation.date}</TableCell>
                    <TableCell>
                      <Chip label={evaluation.program} size="small" color="primary" />
                    </TableCell>
                    <TableCell>
                      <Chip label={evaluation.competency} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Button size="small" variant="contained" onClick={() => navigate('/allied-health/teacher/marks')}>
                        Evaluate
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
            Certification & Skill Training Progress
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Certification Area</TableCell>
                  <TableCell align="center">Completed</TableCell>
                  <TableCell align="center">Target</TableCell>
                  <TableCell>Progress</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {certificationProgress.map((item, index) => (
                  <TableRow key={index} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{item.certification}</TableCell>
                    <TableCell align="center">{item.completed}</TableCell>
                    <TableCell align="center">{item.target}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={item.progress}
                          sx={{ flex: 1, height: 8, borderRadius: 1 }}
                          color={item.progress >= 90 ? 'success' : item.progress >= 75 ? 'primary' : 'warning'}
                        />
                        <Typography variant="body2" sx={{ minWidth: 50 }}>
                          {item.progress.toFixed(1)}%
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Students Under Practical Training
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Roll No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Program</TableCell>
                  <TableCell align="center">Attendance</TableCell>
                  <TableCell align="center">Practical Hours</TableCell>
                  <TableCell align="center">Certifications</TableCell>
                  <TableCell>Performance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentSupervision.map((student, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{student.rollNo}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{student.name}</TableCell>
                    <TableCell>{student.program}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={`${student.attendance}%`}
                        size="small"
                        color={student.attendance >= 85 ? 'success' : student.attendance >= 75 ? 'warning' : 'error'}
                      />
                    </TableCell>
                    <TableCell align="center">{student.practicalHours} hrs</TableCell>
                    <TableCell align="center">
                      {student.certifications}/{student.total}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={student.performance}
                        size="small"
                        color={student.performance === 'Excellent' ? 'success' : 'primary'}
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
                    startIcon={<Schedule />}
                    onClick={() => navigate('/allied-health/teacher/attendance')}
                  >
                    Mark Attendance
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Assessment />}
                    onClick={() => navigate('/allied-health/teacher/marks')}
                  >
                    Evaluate Skill
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button fullWidth variant="outlined" startIcon={<Biotech />}>
                    Lab Schedule
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button fullWidth variant="outlined" startIcon={<MedicalServices />}>
                    Equipment Training
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
                Department Goals Progress
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Practical Hours Target</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      1,780/1,900 hrs
                    </Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={93.7} sx={{ height: 8, borderRadius: 1 }} color="success" />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Certification Achievement</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      123/140
                    </Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={87.9} sx={{ height: 8, borderRadius: 1 }} color="primary" />
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Equipment Training</Typography>
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
