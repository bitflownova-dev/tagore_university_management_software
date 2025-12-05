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
  Card,
  CardContent,
  Tabs,
  Tab,
  LinearProgress,
} from '@mui/material';
import { School, Assessment, LocalHospital, TrendingUp } from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const yearData = [
  { year: '1st Year BDS', students: 100, subjects: 8, completion: 92, type: 'Pre-clinical' },
  { year: '2nd Year BDS', students: 95, subjects: 10, completion: 88, type: 'Pre-clinical' },
  { year: '3rd Year BDS', students: 92, subjects: 12, completion: 85, type: 'Clinical' },
  { year: '4th Year BDS', students: 90, subjects: 10, completion: 90, type: 'Clinical' },
  { year: 'Internship', students: 85, subjects: 0, completion: 95, type: 'Rotatory' },
];

const departments = [
  { name: 'Oral & Maxillofacial Surgery', faculty: 12, students: 180, patients: 450, type: 'Clinical' },
  { name: 'Conservative Dentistry', faculty: 10, students: 200, patients: 520, type: 'Clinical' },
  { name: 'Prosthodontics', faculty: 10, students: 180, patients: 380, type: 'Clinical' },
  { name: 'Orthodontics', faculty: 8, students: 160, patients: 320, type: 'Clinical' },
  { name: 'Periodontology', faculty: 8, students: 140, patients: 280, type: 'Clinical' },
  { name: 'Oral Pathology', faculty: 6, students: 120, patients: 0, type: 'Pre-clinical' },
  { name: 'Oral Medicine & Radiology', faculty: 7, students: 140, patients: 350, type: 'Clinical' },
  { name: 'Pediatric Dentistry', faculty: 8, students: 160, patients: 400, type: 'Clinical' },
  { name: 'Public Health Dentistry', faculty: 5, students: 100, patients: 0, type: 'Community' },
];

const examSchedule = [
  { exam: 'BDS 1st Year Finals', date: '2024-12-20', type: 'Theory + Practical', students: 100, status: 'Upcoming' },
  { exam: 'BDS 2nd Year Midterm', date: '2024-12-18', type: 'Theory', students: 95, status: 'Scheduled' },
  { exam: 'BDS 3rd Year Clinical', date: '2024-12-22', type: 'Clinical Assessment', students: 92, status: 'Upcoming' },
  { exam: 'BDS 4th Year Finals', date: '2024-12-25', type: 'Theory + Clinical', students: 90, status: 'Upcoming' },
  { exam: 'Internship Evaluation', date: '2025-01-05', type: 'Clinical Evaluation', students: 85, status: 'Scheduled' },
];

export default function DentalAcademicManagement() {
  const [currentTab, setCurrentTab] = useState(0);

  const totalStudents = yearData.reduce((sum, year) => sum + year.students, 0);
  const totalSubjects = yearData.reduce((sum, year) => sum + year.subjects, 0);
  const upcomingExams = examSchedule.filter(e => e.status === 'Upcoming').length;
  const avgCompletion = yearData.reduce((sum, year) => sum + year.completion, 0) / yearData.length;

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #00796B 0%, #004D40 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Dental Academic Management
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          BDS curriculum & DCI compliance management
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
                <Assessment sx={{ color: '#388E3C', mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Total Subjects
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#388E3C' }}>
                {totalSubjects}
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
                  Upcoming Exams
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#F57C00' }}>
                {upcomingExams}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E3F2FD' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TrendingUp sx={{ color: '#1976D2', mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Avg Completion
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976D2' }}>
                {avgCompletion.toFixed(0)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Tabs value={currentTab} onChange={(_, newValue) => setCurrentTab(newValue)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="Year-wise Structure" />
          <Tab label="Departments" />
          <Tab label="Examination Schedule" />
        </Tabs>

        <TabPanel value={currentTab} index={0}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Academic Year</TableCell>
                  <TableCell align="center">Students</TableCell>
                  <TableCell align="center">Subjects</TableCell>
                  <TableCell>Completion Rate</TableCell>
                  <TableCell>Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {yearData.map((year) => (
                  <TableRow key={year.year} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{year.year}</TableCell>
                    <TableCell align="center">{year.students}</TableCell>
                    <TableCell align="center">{year.subjects || 'Clinical Rotation'}</TableCell>
                    <TableCell sx={{ width: 250 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LinearProgress
                          variant="determinate"
                          value={year.completion}
                          sx={{ flexGrow: 1, mr: 1, height: 8, borderRadius: 4 }}
                          color="success"
                        />
                        <Typography variant="body2" sx={{ minWidth: 45 }}>
                          {year.completion}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={year.type}
                        size="small"
                        color={year.type === 'Clinical' ? 'primary' : year.type === 'Pre-clinical' ? 'success' : 'warning'}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={currentTab} index={1}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Department</TableCell>
                  <TableCell align="center">Faculty</TableCell>
                  <TableCell align="center">Students</TableCell>
                  <TableCell align="center">Patients/Month</TableCell>
                  <TableCell>Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {departments.map((dept, index) => (
                  <TableRow key={index} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{dept.name}</TableCell>
                    <TableCell align="center">{dept.faculty}</TableCell>
                    <TableCell align="center">{dept.students}</TableCell>
                    <TableCell align="center">{dept.patients || 'N/A'}</TableCell>
                    <TableCell>
                      <Chip
                        label={dept.type}
                        size="small"
                        color={dept.type === 'Clinical' ? 'primary' : dept.type === 'Pre-clinical' ? 'success' : 'warning'}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={currentTab} index={2}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Examination</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell align="center">Students</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {examSchedule.map((exam, index) => (
                  <TableRow key={index} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{exam.exam}</TableCell>
                    <TableCell>{exam.date}</TableCell>
                    <TableCell>
                      <Chip
                        label={exam.type}
                        size="small"
                        color={exam.type.includes('Clinical') ? 'primary' : 'success'}
                      />
                    </TableCell>
                    <TableCell align="center">{exam.students}</TableCell>
                    <TableCell>
                      <Chip
                        label={exam.status}
                        size="small"
                        color={exam.status === 'Upcoming' ? 'warning' : 'info'}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#00796B' }}>
          DCI Compliance Metrics
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Faculty-Student Ratio (1:10 required)
            </Typography>
            <LinearProgress variant="determinate" value={98} sx={{ height: 8, borderRadius: 4 }} color="success" />
            <Typography variant="caption" color="text.secondary">
              98% Compliance (74/462 students)
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Clinical Exposure (Required procedures)
            </Typography>
            <LinearProgress variant="determinate" value={92} sx={{ height: 8, borderRadius: 4 }} color="success" />
            <Typography variant="caption" color="text.secondary">
              92% Average completion
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Patient Load (50/student/month)
            </Typography>
            <LinearProgress variant="determinate" value={88} sx={{ height: 8, borderRadius: 4 }} color="primary" />
            <Typography variant="caption" color="text.secondary">
              88% Average patient load
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
