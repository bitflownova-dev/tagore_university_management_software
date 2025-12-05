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
  Card,
  CardContent,
  Tabs,
  Tab,
} from '@mui/material';

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

const semesters = [
  { id: 1, name: 'Semester 1 & 2', year: 'First Year', students: 600, courses: 8, completion: 92, type: 'Foundation' },
  { id: 2, name: 'Semester 3 & 4', year: 'Second Year', students: 580, courses: 10, completion: 88, type: 'Core' },
  { id: 3, name: 'Semester 5 & 6', year: 'Third Year', students: 560, courses: 12, completion: 85, type: 'Specialized' },
  { id: 4, name: 'Semester 7 & 8', year: 'Fourth Year', students: 540, courses: 10, completion: 90, type: 'Advanced' },
];

const departments = [
  { id: 1, name: 'Computer Science & Engineering', faculty: 35, students: 480, labs: 12, type: 'Core' },
  { id: 2, name: 'Electronics & Communication', faculty: 28, students: 420, labs: 10, type: 'Core' },
  { id: 3, name: 'Mechanical Engineering', faculty: 32, students: 450, labs: 8, type: 'Core' },
  { id: 4, name: 'Civil Engineering', faculty: 25, students: 360, labs: 6, type: 'Core' },
  { id: 5, name: 'Electrical Engineering', faculty: 22, students: 330, labs: 7, type: 'Core' },
  { id: 6, name: 'Information Technology', faculty: 20, students: 300, labs: 9, type: 'Core' },
  { id: 7, name: 'Artificial Intelligence & ML', faculty: 12, students: 180, labs: 5, type: 'Emerging' },
  { id: 8, name: 'Cyber Security', faculty: 6, students: 120, labs: 4, type: 'Emerging' },
];

const examSchedule = [
  { id: 1, exam: 'End Semester Exam - Sem 3', date: 'Dec 20, 2024', type: 'Theory + Practical', students: 580, status: 'Upcoming' },
  { id: 2, exam: 'Mid Semester Exam - Sem 5', date: 'Dec 18, 2024', type: 'Theory', students: 560, status: 'Scheduled' },
  { id: 3, exam: 'Practical Exam - Sem 7', date: 'Dec 22, 2024', type: 'Lab Assessment', students: 540, status: 'Upcoming' },
  { id: 4, exam: 'Project Review - Sem 8', date: 'Dec 25, 2024', type: 'Project Evaluation', students: 540, status: 'Upcoming' },
  { id: 5, exam: 'Viva Voce - Final Year', date: 'Jan 05, 2025', type: 'Oral Examination', students: 540, status: 'Scheduled' },
];

export default function EngineeringAcademicManagement() {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #1976D2 0%, #1565C0 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Engineering Academic Management
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Semester-based curriculum & AICTE compliance
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E3F2FD' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976D2' }}>
                2,640
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Students
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#388E3C' }}>
                40
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Courses
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFF3E0' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#F57C00' }}>
                5
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Upcoming Exams
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#F3E5F5' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#7B1FA2' }}>
                89%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Avg Pass Rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="Semester Structure" />
          <Tab label="Departments" />
          <Tab label="Examination Schedule" />
        </Tabs>

        <TabPanel value={currentTab} index={0}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Semester</TableCell>
                  <TableCell>Academic Year</TableCell>
                  <TableCell align="center">Students</TableCell>
                  <TableCell align="center">Courses</TableCell>
                  <TableCell align="center">Completion Rate</TableCell>
                  <TableCell>Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {semesters.map((sem) => (
                  <TableRow key={sem.id} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{sem.name}</TableCell>
                    <TableCell>{sem.year}</TableCell>
                    <TableCell align="center">{sem.students}</TableCell>
                    <TableCell align="center">{sem.courses}</TableCell>
                    <TableCell align="center">{sem.completion}%</TableCell>
                    <TableCell>
                      <Chip
                        label={sem.type}
                        size="small"
                        color={sem.type === 'Foundation' ? 'primary' : sem.type === 'Core' ? 'success' : 'warning'}
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
                  <TableCell>Department Name</TableCell>
                  <TableCell align="center">Faculty</TableCell>
                  <TableCell align="center">Students</TableCell>
                  <TableCell align="center">Labs</TableCell>
                  <TableCell>Category</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {departments.map((dept) => (
                  <TableRow key={dept.id} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{dept.name}</TableCell>
                    <TableCell align="center">{dept.faculty}</TableCell>
                    <TableCell align="center">{dept.students}</TableCell>
                    <TableCell align="center">{dept.labs}</TableCell>
                    <TableCell>
                      <Chip
                        label={dept.type}
                        size="small"
                        color={dept.type === 'Core' ? 'primary' : 'secondary'}
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
                {examSchedule.map((exam) => (
                  <TableRow key={exam.id} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{exam.exam}</TableCell>
                    <TableCell>{exam.date}</TableCell>
                    <TableCell>{exam.type}</TableCell>
                    <TableCell align="center">{exam.students}</TableCell>
                    <TableCell>
                      <Chip
                        label={exam.status}
                        size="small"
                        color={exam.status === 'Scheduled' ? 'success' : 'warning'}
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
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#1976D2' }}>
          AICTE Compliance Summary
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Faculty Requirements (1:15 ratio)
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              180/176 (102% compliance)
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Infrastructure Standards
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              98% compliant
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Outcome-Based Education (OBE)
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              95% implementation
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
