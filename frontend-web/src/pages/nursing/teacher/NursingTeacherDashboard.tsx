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
  LocalHospital,
  Assignment,
  People,
  Schedule,
  HealthAndSafety,
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
  { time: '08:00 AM - 01:00 PM', activity: 'Medical-Surgical Ward Posting', location: 'General Ward 3A', year: '2nd Year', students: 12 },
  { time: '09:00 AM - 10:00 AM', activity: 'Pharmacology Lecture', location: 'Lecture Hall 2', year: '2nd Year', students: 60 },
  { time: '02:00 PM - 05:00 PM', activity: 'Community Health Practical', location: 'Community Center', year: '3rd Year', students: 8 },
  { time: '03:00 PM - 04:00 PM', activity: 'Case Study Discussion', location: 'Seminar Room', year: '4th Year', students: 15 },
];

const pendingEvaluations = [
  { student: 'Pooja Sharma', procedure: 'IV Catheter Insertion', date: 'Dec 02, 2025', year: '2nd Year', competency: 'MedSurg-IV-01' },
  { student: 'Rahul Verma', procedure: 'Wound Dressing', date: 'Dec 03, 2025', year: '3rd Year', competency: 'MedSurg-WD-02' },
  { student: 'Anjali Reddy', procedure: 'Medication Administration', date: 'Dec 03, 2025', year: '2nd Year', competency: 'Pharm-Med-03' },
  { student: 'Vikram Singh', procedure: 'Patient Assessment', date: 'Dec 04, 2025', year: '4th Year', competency: 'MedSurg-PA-01' },
];

const clinicalProgress = [
  { competency: 'IV Procedures', completed: 45, target: 50, progress: 90 },
  { competency: 'Wound Care', completed: 38, target: 40, progress: 95 },
  { competency: 'Medication Admin', completed: 52, target: 60, progress: 86.7 },
  { competency: 'Patient Assessment', completed: 42, target: 45, progress: 93.3 },
];

const studentSupervision = [
  { rollNo: 'NS001', name: 'Pooja Sharma', year: '2nd Year', attendance: 96, clinicalHours: 420, competencies: 28, total: 35, performance: 'Excellent' },
  { rollNo: 'NS002', name: 'Rahul Verma', year: '3rd Year', attendance: 92, clinicalHours: 580, competencies: 42, total: 50, performance: 'Good' },
  { rollNo: 'NS003', name: 'Anjali Reddy', year: '2nd Year', attendance: 88, clinicalHours: 400, competencies: 25, total: 35, performance: 'Good' },
  { rollNo: 'NS004', name: 'Vikram Singh', year: '4th Year', attendance: 94, clinicalHours: 720, competencies: 58, total: 65, performance: 'Excellent' },
];

export default function NursingTeacherDashboard() {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Nursing Faculty Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Welcome, Prof. Meera Nair - Medical-Surgical Nursing
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocalHospital sx={{ fontSize: 40, color: '#2E7D32', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#2E7D32' }}>
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
          <Card sx={{ bgcolor: '#C8E6C9', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Assignment sx={{ fontSize: 40, color: '#1B5E20', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#1B5E20' }}>
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
          <Card sx={{ bgcolor: '#A5D6A7', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <People sx={{ fontSize: 40, color: '#2E7D32', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#2E7D32' }}>
                    95
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
          <Card sx={{ bgcolor: '#81C784', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <HealthAndSafety sx={{ fontSize: 40, color: '#1B5E20', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#1B5E20' }}>
                    177
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Competencies Done
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
          <Tab label="Clinical Progress" />
          <Tab label="Student Supervision" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Today's Clinical & Teaching Schedule - December 4, 2025
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Time</TableCell>
                  <TableCell>Activity</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Year</TableCell>
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
                      <Button size="small" variant="outlined" onClick={() => navigate('/nursing/teacher/attendance')}>
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
            Pending Clinical Competency Evaluations
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Procedure</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Year</TableCell>
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
                      <Chip label={evaluation.year} size="small" color="primary" />
                    </TableCell>
                    <TableCell>
                      <Chip label={evaluation.competency} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Button size="small" variant="contained" onClick={() => navigate('/nursing/teacher/marks')}>
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
            Clinical Competency Progress - Medical-Surgical Nursing
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Competency Area</TableCell>
                  <TableCell align="center">Completed</TableCell>
                  <TableCell align="center">Target</TableCell>
                  <TableCell>Progress</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clinicalProgress.map((item, index) => (
                  <TableRow key={index} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{item.competency}</TableCell>
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
            Students Under Clinical Supervision
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Roll No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell align="center">Attendance</TableCell>
                  <TableCell align="center">Clinical Hours</TableCell>
                  <TableCell align="center">Competencies</TableCell>
                  <TableCell>Performance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentSupervision.map((student, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{student.rollNo}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{student.name}</TableCell>
                    <TableCell>{student.year}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={`${student.attendance}%`}
                        size="small"
                        color={student.attendance >= 85 ? 'success' : student.attendance >= 75 ? 'warning' : 'error'}
                      />
                    </TableCell>
                    <TableCell align="center">{student.clinicalHours} hrs</TableCell>
                    <TableCell align="center">
                      {student.competencies}/{student.total}
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
                    onClick={() => navigate('/nursing/teacher/attendance')}
                  >
                    Mark Attendance
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button fullWidth variant="contained" startIcon={<Assessment />} onClick={() => navigate('/nursing/teacher/marks')}>
                    Evaluate Competency
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button fullWidth variant="outlined" startIcon={<LocalHospital />}>
                    Clinical Posting
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button fullWidth variant="outlined" startIcon={<HealthAndSafety />}>
                    INC Requirements
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
                    <Typography variant="body2">Clinical Hours Target</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      2,120/2,200 hrs
                    </Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={96.4} sx={{ height: 8, borderRadius: 1 }} color="success" />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Competency Achievement</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      177/195
                    </Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={90.8} sx={{ height: 8, borderRadius: 1 }} color="success" />
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">INC Compliance</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      97%
                    </Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={97} sx={{ height: 8, borderRadius: 1 }} color="success" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
