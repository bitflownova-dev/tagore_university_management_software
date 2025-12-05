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
} from '@mui/material';
import { CalendarToday, Group, Assignment } from '@mui/icons-material';

const todayClasses = [
  {
    id: 1,
    time: '09:00 AM - 10:00 AM',
    semester: 'Sem 3',
    type: 'Theory',
    subject: 'Data Structures',
    topic: 'Binary Trees & BST',
    venue: 'Room 301',
    students: 60,
  },
  {
    id: 2,
    time: '10:30 AM - 12:30 PM',
    semester: 'Sem 5',
    type: 'Lab',
    subject: 'Database Lab',
    topic: 'SQL Query Optimization',
    venue: 'Computer Lab 2',
    students: 58,
  },
  {
    id: 3,
    time: '02:00 PM - 04:00 PM',
    semester: 'Sem 7',
    type: 'Project',
    subject: 'Final Year Project',
    topic: 'Weekly Progress Review',
    venue: 'Project Lab',
    students: 52,
  },
];

const upcomingClasses = [
  { date: '2024-12-14', semester: 'Sem 3', subject: 'Data Structures', topic: 'AVL Trees', type: 'Theory' },
  { date: '2024-12-15', semester: 'Sem 5', subject: 'Database Lab', topic: 'Stored Procedures', type: 'Lab' },
  { date: '2024-12-16', semester: 'Sem 7', subject: 'Compiler Design', topic: 'Syntax Analysis', type: 'Theory' },
  { date: '2024-12-17', semester: 'Sem 3', subject: 'Data Structures Lab', topic: 'Tree Traversals', type: 'Lab' },
];

const batches = [
  { id: 1, name: 'Batch A', semester: 'Sem 3', subject: 'Data Structures', students: 30, timing: 'Mon, Wed 9:00 AM' },
  { id: 2, name: 'Batch B', semester: 'Sem 3', subject: 'Data Structures', students: 30, timing: 'Tue, Thu 9:00 AM' },
  { id: 3, name: 'Lab Group 1', semester: 'Sem 5', subject: 'Database Lab', students: 29, timing: 'Mon 10:30 AM' },
  { id: 4, name: 'Lab Group 2', semester: 'Sem 5', subject: 'Database Lab', students: 29, timing: 'Wed 10:30 AM' },
];

export default function EngineeringMyClasses() {
  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #1976D2 0%, #1565C0 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          My Engineering Classes
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Today's schedule and class management
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E3F2FD' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976D2' }}>
                {todayClasses.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Classes Today
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#388E3C' }}>
                {todayClasses.reduce((sum, c) => sum + c.students, 0)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Students
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E3F2FD' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976D2' }}>
                {batches.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Batches
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFF3E0' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#F57C00' }}>
                {upcomingClasses.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Upcoming Classes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <CalendarToday sx={{ mr: 2, color: '#1976D2' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Today's Schedule
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell>Semester</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Topic</TableCell>
                <TableCell>Venue</TableCell>
                <TableCell align="center">Students</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todayClasses.map((cls) => (
                <TableRow key={cls.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{cls.time}</TableCell>
                  <TableCell>
                    <Chip label={cls.semester} size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={cls.type}
                      size="small"
                      color={cls.type === 'Lab' ? 'primary' : cls.type === 'Theory' ? 'success' : 'warning'}
                    />
                  </TableCell>
                  <TableCell>{cls.subject}</TableCell>
                  <TableCell>{cls.topic}</TableCell>
                  <TableCell>{cls.venue}</TableCell>
                  <TableCell align="center">{cls.students}</TableCell>
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
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Group sx={{ mr: 2, color: '#1976D2' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            My Batches
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Batch Name</TableCell>
                <TableCell>Semester</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell align="center">Students</TableCell>
                <TableCell>Class Timing</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {batches.map((batch) => (
                <TableRow key={batch.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{batch.name}</TableCell>
                  <TableCell>
                    <Chip label={batch.semester} size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell>{batch.subject}</TableCell>
                  <TableCell align="center">{batch.students}</TableCell>
                  <TableCell>{batch.timing}</TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined" sx={{ mr: 1 }}>
                      View Students
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Assignment sx={{ mr: 2, color: '#1976D2' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Upcoming Classes
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Semester</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Topic</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {upcomingClasses.map((cls, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{cls.date}</TableCell>
                  <TableCell>
                    <Chip label={cls.semester} size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell>{cls.subject}</TableCell>
                  <TableCell>{cls.topic}</TableCell>
                  <TableCell>
                    <Chip
                      label={cls.type}
                      size="small"
                      color={cls.type === 'Lab' ? 'primary' : 'success'}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
