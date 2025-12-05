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
  alpha,
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
    <Box sx={{ minHeight: '100vh', bgcolor: '#F8FBFD', py: 4 }}>
      <Paper 
        elevation={0}
        sx={{ 
          p: 4, 
          mb: 4, 
          background: 'linear-gradient(135deg, #00BFA5 0%, #00897B 100%)',
          borderRadius: 3,
          boxShadow: '0 10px 40px rgba(0, 191, 165, 0.2)',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'white', letterSpacing: '-0.01em' }}>
          Allied Health Faculty Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.95)' }}>
          Welcome, Dr. Suresh Reddy - Medical Laboratory Technology
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={0}
            sx={{ 
              bgcolor: '#FFFFFF',
              height: '100%',
              borderRadius: 3,
              border: '1px solid rgba(0, 0, 0, 0.06)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 24px rgba(0, 191, 165, 0.15)',
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ 
                  width: 56, 
                  height: 56, 
                  borderRadius: 2, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  bgcolor: alpha('#00BFA5', 0.1),
                  mr: 2,
                }}>
                  <Biotech sx={{ fontSize: 32, color: '#00BFA5' }} />
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#00BFA5' }}>
                    4
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748B' }}>
                    Sessions Today
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={0}
            sx={{ 
              bgcolor: '#FFFFFF',
              height: '100%',
              borderRadius: 3,
              border: '1px solid rgba(0, 0, 0, 0.06)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 24px rgba(0, 137, 123, 0.15)',
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ 
                  width: 56, 
                  height: 56, 
                  borderRadius: 2, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  bgcolor: alpha('#00897B', 0.1),
                  mr: 2,
                }}>
                  <Assignment sx={{ fontSize: 32, color: '#00897B' }} />
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#00897B' }}>
                    4
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748B' }}>
                    Pending Evaluations
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={0}
            sx={{ 
              bgcolor: '#FFFFFF',
              height: '100%',
              borderRadius: 3,
              border: '1px solid rgba(0, 0, 0, 0.06)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 24px rgba(0, 121, 107, 0.15)',
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ 
                  width: 56, 
                  height: 56, 
                  borderRadius: 2, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  bgcolor: alpha('#00796B', 0.1),
                  mr: 2,
                }}>
                  <People sx={{ fontSize: 32, color: '#00796B' }} />
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#00796B' }}>
                    72
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748B' }}>
                    Students Supervising
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={0}
            sx={{ 
              bgcolor: '#FFFFFF',
              height: '100%',
              borderRadius: 3,
              border: '1px solid rgba(0, 0, 0, 0.06)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 24px rgba(38, 166, 154, 0.15)',
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ 
                  width: 56, 
                  height: 56, 
                  borderRadius: 2, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  bgcolor: alpha('#26A69A', 0.1),
                  mr: 2,
                }}>
                  <MedicalServices sx={{ fontSize: 32, color: '#26A69A' }} />
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#26A69A' }}>
                    123
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748B' }}>
                    Certifications Done
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper 
        elevation={0}
        sx={{ 
          mb: 4,
          borderRadius: 3,
          border: '1px solid rgba(0, 0, 0, 0.06)',
        }}
      >
        <Tabs 
          value={tabValue} 
          onChange={(e, newValue) => setTabValue(newValue)} 
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            px: 2,
            '& .MuiTab-root': {
              fontWeight: 600,
              color: '#64748B',
            },
            '& .Mui-selected': {
              color: '#00BFA5',
            },
            '& .MuiTabs-indicator': {
              bgcolor: '#00BFA5',
            },
          }}
        >
          <Tab label="Today's Schedule" />
          <Tab label="Pending Evaluations" />
          <Tab label="Certification Progress" />
          <Tab label="Student Supervision" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1A202C', mb: 3 }}>
            Today's Practical & Teaching Schedule - December 4, 2024
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, color: '#1A202C' }}>Time</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#1A202C' }}>Activity</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#1A202C' }}>Location</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#1A202C' }}>Program/Year</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#1A202C' }}>Students</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#1A202C' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todaysSchedule.map((session, index) => (
                  <TableRow 
                    key={index} 
                    sx={{ 
                      transition: 'all 0.2s ease',
                      '&:hover': { 
                        bgcolor: alpha('#00BFA5', 0.04),
                      } 
                    }}
                  >
                    <TableCell sx={{ fontWeight: 600, color: '#1A202C' }}>{session.time}</TableCell>
                    <TableCell sx={{ color: '#64748B' }}>{session.activity}</TableCell>
                    <TableCell sx={{ color: '#64748B' }}>{session.location}</TableCell>
                    <TableCell>
                      <Chip 
                        label={session.year} 
                        size="small" 
                        sx={{ 
                          bgcolor: alpha('#00BFA5', 0.1),
                          color: '#00BFA5',
                          fontWeight: 600,
                          border: 'none',
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ color: '#64748B' }}>{session.students}</TableCell>
                    <TableCell>
                      <Button 
                        size="small" 
                        variant="outlined" 
                        onClick={() => navigate('/allied-health/teacher/attendance')}
                        sx={{
                          borderColor: '#00BFA5',
                          color: '#00BFA5',
                          '&:hover': {
                            borderColor: '#00897B',
                            bgcolor: alpha('#00BFA5', 0.08),
                          },
                        }}
                      >
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
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1A202C', mb: 3 }}>
            Certification & Skill Training Progress
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, color: '#1A202C' }}>Certification Area</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, color: '#1A202C' }}>Completed</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, color: '#1A202C' }}>Target</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#1A202C' }}>Progress</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {certificationProgress.map((item, index) => (
                  <TableRow 
                    key={index} 
                    sx={{ 
                      transition: 'all 0.2s ease',
                      '&:hover': { 
                        bgcolor: alpha('#00BFA5', 0.04),
                      } 
                    }}
                  >
                    <TableCell sx={{ fontWeight: 600, color: '#1A202C' }}>{item.certification}</TableCell>
                    <TableCell align="center" sx={{ color: '#64748B' }}>{item.completed}</TableCell>
                    <TableCell align="center" sx={{ color: '#64748B' }}>{item.target}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={item.progress}
                          sx={{ 
                            flex: 1, 
                            height: 10, 
                            borderRadius: 2,
                            bgcolor: alpha('#00BFA5', 0.1),
                            '& .MuiLinearProgress-bar': {
                              bgcolor: item.progress >= 90 ? '#26A69A' : item.progress >= 75 ? '#00BFA5' : '#00897B',
                              borderRadius: 2,
                            },
                          }}
                        />
                        <Typography variant="body2" sx={{ minWidth: 50, fontWeight: 600, color: '#1A202C' }}>
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
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1A202C', mb: 3 }}>
            Students Under Practical Training
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, color: '#1A202C' }}>Roll No</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#1A202C' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#1A202C' }}>Program</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, color: '#1A202C' }}>Attendance</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, color: '#1A202C' }}>Practical Hours</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, color: '#1A202C' }}>Certifications</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#1A202C' }}>Performance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentSupervision.map((student, index) => (
                  <TableRow 
                    key={index} 
                    sx={{ 
                      transition: 'all 0.2s ease',
                      '&:hover': { 
                        bgcolor: alpha('#00BFA5', 0.04),
                      } 
                    }}
                  >
                    <TableCell sx={{ color: '#64748B' }}>{student.rollNo}</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#1A202C' }}>{student.name}</TableCell>
                    <TableCell sx={{ color: '#64748B' }}>{student.program}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={`${student.attendance}%`}
                        size="small"
                        sx={{
                          bgcolor: student.attendance >= 85 
                            ? alpha('#26A69A', 0.1) 
                            : student.attendance >= 75 
                            ? alpha('#FFA726', 0.1) 
                            : alpha('#EF5350', 0.1),
                          color: student.attendance >= 85 ? '#26A69A' : student.attendance >= 75 ? '#FFA726' : '#EF5350',
                          fontWeight: 600,
                          border: 'none',
                        }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ color: '#64748B' }}>{student.practicalHours} hrs</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600, color: '#1A202C' }}>
                      {student.certifications}/{student.total}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={student.performance}
                        size="small"
                        sx={{
                          bgcolor: student.performance === 'Excellent' ? alpha('#26A69A', 0.1) : alpha('#00BFA5', 0.1),
                          color: student.performance === 'Excellent' ? '#26A69A' : '#00BFA5',
                          fontWeight: 600,
                          border: 'none',
                        }}
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
