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
  Biotech,
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

const todaysClinics = [
  { time: '09:00 AM - 12:00 PM', procedure: 'Root Canal Therapy', patient: 'PT-2401', year: '3rd Year', students: 3, location: 'Clinic 2A' },
  { time: '10:00 AM - 11:00 AM', procedure: 'Oral Surgery Lecture', patient: '-', year: '4th Year', students: 45, location: 'Lecture Hall 3' },
  { time: '02:00 PM - 04:00 PM', procedure: 'Prosthodontics Lab', patient: 'PT-2402', year: '3rd Year', students: 5, location: 'Lab 4B' },
  { time: '04:00 PM - 05:00 PM', procedure: 'Case Presentations', patient: 'Multiple', year: 'Interns', students: 8, location: 'Seminar Room' },
];

const pendingEvaluations = [
  { student: 'Anjali Mehta', procedure: 'Crown Preparation', date: 'Dec 02, 2024', year: '3rd Year', status: 'Pending Review' },
  { student: 'Rohit Kumar', procedure: 'Tooth Extraction', date: 'Dec 03, 2024', year: '4th Year', status: 'Pending Review' },
  { student: 'Kavya Reddy', procedure: 'Cavity Filling', date: 'Dec 03, 2024', year: '2nd Year', status: 'Pending Review' },
  { student: 'Arjun Singh', procedure: 'Orthodontic Wire Placement', date: 'Dec 04, 2024', year: '3rd Year', status: 'Pending Review' },
];

const clinicalStats = [
  { procedure: 'Root Canal', thisWeek: 12, thisMonth: 48, target: 50, status: 96 },
  { procedure: 'Extractions', thisWeek: 8, thisMonth: 35, target: 40, status: 87.5 },
  { procedure: 'Fillings', thisWeek: 15, thisMonth: 58, target: 60, status: 96.7 },
  { procedure: 'Crown & Bridge', thisWeek: 6, thisMonth: 22, target: 25, status: 88 },
];

const studentSupervision = [
  { rollNo: 'BDS21001', name: 'Anjali Mehta', year: '3rd Year', procedures: 45, attendance: 92, clinicalHours: 280, performance: 'Excellent' },
  { rollNo: 'BDS21002', name: 'Rohit Kumar', year: '4th Year', procedures: 68, attendance: 88, clinicalHours: 420, performance: 'Good' },
  { rollNo: 'BDS21003', name: 'Kavya Reddy', year: '2nd Year', procedures: 28, attendance: 95, clinicalHours: 180, performance: 'Excellent' },
  { rollNo: 'BDS21004', name: 'Arjun Singh', year: '3rd Year', procedures: 38, attendance: 78, clinicalHours: 250, performance: 'Average' },
];

export default function DentalTeacherDashboard() {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #0288D1 0%, #0277BD 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Dental Faculty Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Welcome, Dr. Priya Sharma - Conservative Dentistry & Endodontics
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E1F5FE', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocalHospital sx={{ fontSize: 40, color: '#0288D1', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#0288D1' }}>
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
          <Card sx={{ bgcolor: '#FFF3E0', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Assignment sx={{ fontSize: 40, color: '#F57C00', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#F57C00' }}>
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
          <Card sx={{ bgcolor: '#E8F5E9', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <People sx={{ fontSize: 40, color: '#388E3C', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#388E3C' }}>
                    61
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
          <Card sx={{ bgcolor: '#F3E5F5', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Biotech sx={{ fontSize: 40, color: '#7B1FA2', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#7B1FA2' }}>
                    163
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Procedures This Month
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
          <Tab label="Clinical Statistics" />
          <Tab label="Student Supervision" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Today's Clinical & Teaching Schedule - December 4, 2024
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Time</TableCell>
                  <TableCell>Procedure/Activity</TableCell>
                  <TableCell>Patient/Details</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell>Students</TableCell>
                  <TableCell>Location</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todaysClinics.map((session, index) => (
                  <TableRow key={index} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{session.time}</TableCell>
                    <TableCell>{session.procedure}</TableCell>
                    <TableCell>{session.patient}</TableCell>
                    <TableCell>
                      <Chip label={session.year} size="small" color="primary" />
                    </TableCell>
                    <TableCell>{session.students}</TableCell>
                    <TableCell>{session.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Pending Clinical Procedure Evaluations
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Procedure</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell>Status</TableCell>
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
                      <Chip label={evaluation.status} size="small" color="warning" />
                    </TableCell>
                    <TableCell>
                      <Button size="small" variant="contained" onClick={() => navigate('/dental/teacher/marks')}>
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
            Clinical Procedures Statistics
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Procedure Type</TableCell>
                  <TableCell align="center">This Week</TableCell>
                  <TableCell align="center">This Month</TableCell>
                  <TableCell align="center">Monthly Target</TableCell>
                  <TableCell>Progress</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clinicalStats.map((stat, index) => (
                  <TableRow key={index} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{stat.procedure}</TableCell>
                    <TableCell align="center">{stat.thisWeek}</TableCell>
                    <TableCell align="center">{stat.thisMonth}</TableCell>
                    <TableCell align="center">{stat.target}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={stat.status}
                          sx={{ flex: 1, height: 8, borderRadius: 1 }}
                          color={stat.status >= 90 ? 'success' : stat.status >= 75 ? 'primary' : 'warning'}
                        />
                        <Typography variant="body2" sx={{ minWidth: 50 }}>
                          {stat.status.toFixed(1)}%
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
            Students Under Supervision
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Roll No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell align="center">Procedures</TableCell>
                  <TableCell align="center">Attendance</TableCell>
                  <TableCell align="center">Clinical Hours</TableCell>
                  <TableCell>Performance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentSupervision.map((student, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{student.rollNo}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{student.name}</TableCell>
                    <TableCell>{student.year}</TableCell>
                    <TableCell align="center">{student.procedures}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={`${student.attendance}%`}
                        size="small"
                        color={student.attendance >= 85 ? 'success' : student.attendance >= 75 ? 'warning' : 'error'}
                      />
                    </TableCell>
                    <TableCell align="center">{student.clinicalHours} hrs</TableCell>
                    <TableCell>
                      <Chip
                        label={student.performance}
                        size="small"
                        color={
                          student.performance === 'Excellent'
                            ? 'success'
                            : student.performance === 'Good'
                            ? 'primary'
                            : 'warning'
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
                    startIcon={<Schedule />}
                    onClick={() => navigate('/dental/teacher/attendance')}
                  >
                    Mark Attendance
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button fullWidth variant="contained" startIcon={<Assessment />} onClick={() => navigate('/dental/teacher/marks')}>
                    Evaluate Procedure
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button fullWidth variant="outlined" startIcon={<LocalHospital />}>
                    Clinical Schedule
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button fullWidth variant="outlined" startIcon={<Biotech />}>
                    Patient Records
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
                    <Typography variant="body2">Patient Treatment Target</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      163/180
                    </Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={90.5} sx={{ height: 8, borderRadius: 1 }} color="success" />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Student Clinical Hours</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      1,130/1,200 hrs
                    </Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={94.2} sx={{ height: 8, borderRadius: 1 }} color="success" />
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">DCI Compliance</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      96%
                    </Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={96} sx={{ height: 8, borderRadius: 1 }} color="success" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
