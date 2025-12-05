import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Tabs,
  Tab,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';

export default function AcademicManagement() {
  const [tabValue, setTabValue] = useState(0);

  const courses = [
    { id: 1, name: 'B.Tech Computer Science', duration: '4 years', students: 450 },
    { id: 2, name: 'B.Sc Mathematics', duration: '3 years', students: 320 },
    { id: 3, name: 'B.Com', duration: '3 years', students: 350 },
  ];

  const subjects = [
    { id: 1, name: 'Data Structures', code: 'CS301', credits: 4, semester: 3 },
    { id: 2, name: 'Database Management', code: 'CS302', credits: 4, semester: 3 },
    { id: 3, name: 'Operating Systems', code: 'CS401', credits: 4, semester: 4 },
  ];

  const timetable = [
    { day: 'Monday', time: '9:00-10:00', subject: 'Data Structures', class: 'CS-3A', faculty: 'Dr. Kumar' },
    { day: 'Monday', time: '10:00-11:00', subject: 'DBMS', class: 'CS-3B', faculty: 'Prof. Sharma' },
    { day: 'Tuesday', time: '9:00-10:00', subject: 'OS', class: 'CS-4A', faculty: 'Dr. Patel' },
  ];

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Academic Management
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab label="Courses" />
          <Tab label="Subjects" />
          <Tab label="Timetable" />
          <Tab label="Syllabus" />
        </Tabs>
      </Paper>

      {/* Courses Tab */}
      {tabValue === 0 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">Courses</Typography>
            <Button variant="contained" startIcon={<AddIcon />}>
              Add Course
            </Button>
          </Box>
          <Grid container spacing={3}>
            {courses.map((course) => (
              <Grid item xs={12} md={4} key={course.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {course.name}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      Duration: {course.duration}
                    </Typography>
                    <Typography variant="h5" color="primary">
                      {course.students} Students
                    </Typography>
                    <Button size="small" startIcon={<EditIcon />} sx={{ mt: 2 }}>
                      Edit
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Subjects Tab */}
      {tabValue === 1 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">Subjects</Typography>
            <Button variant="contained" startIcon={<AddIcon />}>
              Add Subject
            </Button>
          </Box>
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Subject Name</TableCell>
                    <TableCell>Code</TableCell>
                    <TableCell>Credits</TableCell>
                    <TableCell>Semester</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subjects.map((subject) => (
                    <TableRow key={subject.id}>
                      <TableCell>{subject.name}</TableCell>
                      <TableCell>{subject.code}</TableCell>
                      <TableCell>{subject.credits}</TableCell>
                      <TableCell>{subject.semester}</TableCell>
                      <TableCell>
                        <Button size="small" startIcon={<EditIcon />}>
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      )}

      {/* Timetable Tab */}
      {tabValue === 2 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">Class Timetable</Typography>
            <Button variant="contained" startIcon={<AddIcon />}>
              Add Schedule
            </Button>
          </Box>
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Day</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Class</TableCell>
                    <TableCell>Faculty</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {timetable.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.day}</TableCell>
                      <TableCell>{item.time}</TableCell>
                      <TableCell>{item.subject}</TableCell>
                      <TableCell>
                        <Chip label={item.class} size="small" />
                      </TableCell>
                      <TableCell>{item.faculty}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      )}
    </Box>
  );
}
