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
import { School, CalendarToday, Assessment } from '@mui/icons-material';

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

const yearStructure = [
  { year: 'First Year B.Sc', students: 520, courses: 8, avgPercentage: 74, focus: 'Foundation' },
  { year: 'Second Year B.Sc', students: 495, courses: 10, avgPercentage: 76, focus: 'Clinical Basics' },
  { year: 'Third Year B.Sc', students: 480, courses: 9, avgPercentage: 78, focus: 'Clinical Specialties' },
  { year: 'Fourth Year B.Sc', students: 465, courses: 11, avgPercentage: 80, focus: 'Community & Management' },
  { year: 'First Year GNM', students: 180, courses: 6, avgPercentage: 72, focus: 'Nursing Foundation' },
  { year: 'Second Year GNM', students: 170, courses: 7, avgPercentage: 74, focus: 'Clinical Practice' },
];

const departments = [
  { name: 'Medical-Surgical Nursing', faculty: 15, students: 380, courses: 3, type: 'Clinical' },
  { name: 'Community Health Nursing', faculty: 12, students: 340, courses: 3, type: 'Community' },
  { name: 'Child Health Nursing', faculty: 10, students: 280, courses: 2, type: 'Clinical' },
  { name: 'Mental Health Nursing', faculty: 8, students: 240, courses: 2, type: 'Clinical' },
  { name: 'OBG Nursing', faculty: 11, students: 300, courses: 3, type: 'Clinical' },
  { name: 'Nursing Foundation', faculty: 9, students: 260, courses: 2, type: 'Foundation' },
  { name: 'Research & Statistics', faculty: 6, students: 180, courses: 2, type: 'Theory' },
];

const examSchedule = [
  { exam: 'B.Sc First Year Finals', date: 'Dec 20, 2025', type: 'Theory + Practical', students: 520 },
  { exam: 'B.Sc Second Year Midterm', date: 'Dec 18, 2025', type: 'Theory', students: 495 },
  { exam: 'B.Sc Third Year Clinical', date: 'Dec 22, 2025', type: 'Clinical Practicals', students: 480 },
  { exam: 'GNM First Year Finals', date: 'Dec 25, 2025', type: 'Theory + Practical', students: 180 },
  { exam: 'B.Sc Fourth Year Community', date: 'Jan 5, 2026', type: 'Community Project', students: 465 },
];

export default function NursingAcademicManagement() {
  const [tabValue, setTabValue] = useState(0);

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Nursing Academic Management
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          B.Sc Nursing & GNM curriculum management & INC compliance
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#2E7D32' }}>
                2,310
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
                56
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Courses
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#A5D6A7' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#2E7D32' }}>
                5
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Upcoming Exams
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#81C784' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1B5E20' }}>
                76%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Avg Percentage
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab icon={<School />} label="Year Structure" iconPosition="start" />
          <Tab icon={<CalendarToday />} label="Departments" iconPosition="start" />
          <Tab icon={<Assessment />} label="Examination Schedule" iconPosition="start" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Year/Program</TableCell>
                  <TableCell align="center">Students</TableCell>
                  <TableCell align="center">Courses</TableCell>
                  <TableCell align="center">Avg Percentage</TableCell>
                  <TableCell>Focus Area</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {yearStructure.map((year, index) => (
                  <TableRow key={index} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{year.year}</TableCell>
                    <TableCell align="center">{year.students}</TableCell>
                    <TableCell align="center">{year.courses}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={year.avgPercentage}
                          sx={{
                            width: 100,
                            height: 8,
                            borderRadius: 1,
                            bgcolor: '#E8F5E9',
                            '& .MuiLinearProgress-bar': { bgcolor: '#2E7D32' },
                          }}
                        />
                        <Typography variant="body2" sx={{ minWidth: 45 }}>
                          {year.avgPercentage}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip label={year.focus} size="small" sx={{ bgcolor: '#C8E6C9', color: '#1B5E20' }} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
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
                {departments.map((dept, index) => (
                  <TableRow key={index} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{dept.name}</TableCell>
                    <TableCell align="center">{dept.faculty}</TableCell>
                    <TableCell align="center">{dept.students}</TableCell>
                    <TableCell align="center">{dept.courses}</TableCell>
                    <TableCell>
                      <Chip
                        label={dept.type}
                        size="small"
                        color={dept.type === 'Clinical' ? 'success' : dept.type === 'Community' ? 'primary' : 'default'}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Examination</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell align="center">Students</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {examSchedule.map((exam, index) => (
                  <TableRow key={index} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{exam.exam}</TableCell>
                    <TableCell>{exam.date}</TableCell>
                    <TableCell>
                      <Chip label={exam.type} size="small" color="primary" />
                    </TableCell>
                    <TableCell align="center">{exam.students}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#2E7D32' }}>
          INC Compliance Status
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          • Faculty-Student Ratio: 1:20 for Clinical, 1:30 for Theory (Current: 1:27.9) ✓
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Clinical Training Hours: Minimum 2400 hours for B.Sc Nursing (Current: 2580 hours) ✓
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Hospital Affiliation: Minimum 200 beds required (Current: 350 beds) ✓
        </Typography>
      </Paper>
    </Box>
  );
}
