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
  alpha,
} from '@mui/material';
import { useState } from 'react';
import { Search, Add, CalendarToday } from '@mui/icons-material';

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
          Academic Management
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.95)' }}>
          Manage semesters, exams, and academic calendar
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card 
            elevation={0}
            sx={{
              bgcolor: '#FFFFFF',
              borderRadius: 3,
              border: '1px solid rgba(0, 0, 0, 0.06)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 24px rgba(0, 191, 165, 0.15)',
              },
            }}
          >
            <CardContent>
              <Typography sx={{ color: '#64748B', mb: 1 }} gutterBottom>
                Active Semesters
              </Typography>
              <Typography variant="h4" sx={{ color: '#00BFA5', fontWeight: 800, letterSpacing: '-0.01em' }}>
                {semesters.filter(s => s.status === 'Active').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card 
            elevation={0}
            sx={{
              bgcolor: '#FFFFFF',
              borderRadius: 3,
              border: '1px solid rgba(0, 0, 0, 0.06)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 24px rgba(0, 191, 165, 0.15)',
              },
            }}
          >
            <CardContent>
              <Typography sx={{ color: '#64748B', mb: 1 }} gutterBottom>
                Upcoming Exams
              </Typography>
              <Typography variant="h4" sx={{ color: '#00897B', fontWeight: 800, letterSpacing: '-0.01em' }}>
                {exams.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card 
            elevation={0}
            sx={{
              bgcolor: '#FFFFFF',
              borderRadius: 3,
              border: '1px solid rgba(0, 0, 0, 0.06)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 24px rgba(0, 191, 165, 0.15)',
              },
            }}
          >
            <CardContent>
              <Typography sx={{ color: '#64748B', mb: 1 }} gutterBottom>
                Total Programs
              </Typography>
              <Typography variant="h4" sx={{ color: '#26A69A', fontWeight: 800, letterSpacing: '-0.01em' }}>
                14
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card 
            elevation={0}
            sx={{
              bgcolor: '#FFFFFF',
              borderRadius: 3,
              border: '1px solid rgba(0, 0, 0, 0.06)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 24px rgba(0, 191, 165, 0.15)',
              },
            }}
          >
            <CardContent>
              <Typography sx={{ color: '#64748B', mb: 1 }} gutterBottom>
                Clinical Rotations
              </Typography>
              <Typography variant="h4" sx={{ color: '#4DB6AC', fontWeight: 800, letterSpacing: '-0.01em' }}>
                8
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper 
        elevation={0}
        sx={{ 
          p: 4,
          borderRadius: 3,
          border: '1px solid rgba(0, 0, 0, 0.06)',
          bgcolor: '#FFFFFF',
        }}
      >
        <Tabs 
          value={tabValue} 
          onChange={(_, v) => setTabValue(v)} 
          sx={{ 
            mb: 3,
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
                    <TableRow 
                      key={sem.name} 
                      sx={{
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          bgcolor: alpha('#00BFA5', 0.04),
                        },
                      }}
                    >
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1A202C' }}>
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
                          sx={{
                            bgcolor: sem.status === 'Active' ? alpha('#26A69A', 0.1) : alpha('#64748B', 0.1),
                            color: sem.status === 'Active' ? '#26A69A' : '#64748B',
                            fontWeight: 600,
                          }}
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
                    <TableRow 
                      key={exam.name} 
                      sx={{
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          bgcolor: alpha('#00BFA5', 0.04),
                        },
                      }}
                    >
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1A202C' }}>
                          {exam.name}
                        </Typography>
                      </TableCell>
                      <TableCell>{exam.department}</TableCell>
                      <TableCell>{exam.date}</TableCell>
                      <TableCell>{exam.students}</TableCell>
                      <TableCell>
                        <Chip 
                          label={exam.status} 
                          size="small" 
                          sx={{
                            bgcolor: alpha('#00BFA5', 0.1),
                            color: '#00BFA5',
                            fontWeight: 600,
                          }}
                        />
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
