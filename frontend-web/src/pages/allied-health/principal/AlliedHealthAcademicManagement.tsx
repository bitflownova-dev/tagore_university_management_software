import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  InputAdornment,
} from '@mui/material';
import { useState } from 'react';
import { Search, Add, FileDownload, CalendarToday } from '@mui/icons-material';

const semesters = [
  {
    name: 'Semester 1 - 2025',
    program: 'BSc MLT Year 1',
    startDate: 'Jan 6, 2026',
    endDate: 'May 30, 2026',
    status: 'Upcoming',
    subjects: 5,
    students: 45,
  },
  {
    name: 'Semester 2 - 2025',
    program: 'Diploma Radiology Year 1',
    startDate: 'Dec 1, 2025',
    endDate: 'Apr 30, 2026',
    status: 'Active',
    subjects: 6,
    students: 50,
  },
  {
    name: 'Clinical Rotation - Winter',
    program: 'BPT Year 3',
    startDate: 'Dec 10, 2025',
    endDate: 'Feb 28, 2026',
    status: 'Active',
    subjects: 3,
    students: 40,
  },
];

const exams = [
  {
    name: 'Mid-Semester Practical',
    department: 'MLT',
    date: 'Dec 18, 2025',
    students: 120,
    status: 'Scheduled',
  },
  {
    name: 'Clinical Assessment',
    department: 'Physiotherapy',
    date: 'Dec 22, 2025',
    students: 90,
    status: 'Scheduled',
  },
  {
    name: 'Lab Competency Test',
    department: 'Radiology',
    date: 'Dec 28, 2025',
    students: 100,
    status: 'Scheduled',
  },
];

export default function AlliedHealthAcademicManagement() {
  const [tabValue, setTabValue] = useState(0);

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Academic Management
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Manage semesters, exams, and academic calendar
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Active Semesters
              </Typography>
              <Typography variant="h4" sx={{ color: '#1565C0', fontWeight: 600 }}>
                {semesters.filter(s => s.status === 'Active').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Upcoming Exams
              </Typography>
              <Typography variant="h4" sx={{ color: '#1976D2', fontWeight: 600 }}>
                {exams.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Programs
              </Typography>
              <Typography variant="h4" sx={{ color: '#1E88E5', fontWeight: 600 }}>
                14
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Clinical Rotations
              </Typography>
              <Typography variant="h4" sx={{ color: '#2196F3', fontWeight: 600 }}>
                8
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ mb: 3 }}>
          <Tab label="Semesters" />
          <Tab label="Examinations" />
          <Tab label="Academic Calendar" />
        </Tabs>

        {tabValue === 0 && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <TextField
                placeholder="Search semesters..."
                size="small"
                sx={{ width: 300 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
              <Button variant="contained" startIcon={<Add />} sx={{ bgcolor: '#1565C0' }}>
                Add Semester
              </Button>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Semester</strong></TableCell>
                    <TableCell><strong>Program</strong></TableCell>
                    <TableCell><strong>Duration</strong></TableCell>
                    <TableCell><strong>Subjects</strong></TableCell>
                    <TableCell><strong>Students</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {semesters.map((sem) => (
                    <TableRow key={sem.name} hover>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {sem.name}
                        </Typography>
                      </TableCell>
                      <TableCell>{sem.program}</TableCell>
                      <TableCell>
                        {sem.startDate} - {sem.endDate}
                      </TableCell>
                      <TableCell>{sem.subjects}</TableCell>
                      <TableCell>{sem.students}</TableCell>
                      <TableCell>
                        <Chip
                          label={sem.status}
                          size="small"
                          color={sem.status === 'Active' ? 'success' : 'default'}
                        />
                      </TableCell>
                      <TableCell>
                        <Button size="small" variant="outlined">
                          Manage
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {tabValue === 1 && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <TextField
                placeholder="Search exams..."
                size="small"
                sx={{ width: 300 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
              <Button variant="contained" startIcon={<Add />} sx={{ bgcolor: '#1565C0' }}>
                Schedule Exam
              </Button>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Exam Name</strong></TableCell>
                    <TableCell><strong>Department</strong></TableCell>
                    <TableCell><strong>Date</strong></TableCell>
                    <TableCell><strong>Students</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {exams.map((exam) => (
                    <TableRow key={exam.name} hover>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {exam.name}
                        </Typography>
                      </TableCell>
                      <TableCell>{exam.department}</TableCell>
                      <TableCell>{exam.date}</TableCell>
                      <TableCell>{exam.students}</TableCell>
                      <TableCell>
                        <Chip label={exam.status} size="small" color="primary" />
                      </TableCell>
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
          </>
        )}

        {tabValue === 2 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <CalendarToday sx={{ fontSize: 80, color: '#1565C0', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Academic Calendar View
            </Typography>
            <Typography color="text.secondary">
              Calendar component would be integrated here
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
