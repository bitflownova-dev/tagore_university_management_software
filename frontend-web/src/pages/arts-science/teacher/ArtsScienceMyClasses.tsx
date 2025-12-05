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
} from '@mui/material';
import { CalendarToday, Group, Assignment } from '@mui/icons-material';

const todaysClasses = [
  { time: '09:00 - 11:00', year: 'Second Year', type: 'Theory', subject: 'English Literature', topic: 'Romantic Poetry', venue: 'Room 201', students: 30 },
  { time: '11:30 - 13:00', year: 'Third Year', type: 'Practical', subject: 'Chemistry', topic: 'Organic Reactions', venue: 'Lab 3', students: 25 },
  { time: '14:00 - 16:00', year: 'First Year', type: 'Theory', subject: 'Economics', topic: 'Microeconomics Basics', venue: 'Room 105', students: 35 },
];

const upcomingClasses = [
  { date: '2024-12-14', year: 'Third Year', subject: 'English Literature', topic: 'Modern Drama', type: 'Theory' },
  { date: '2024-12-15', year: 'First Year', subject: 'Economics', topic: 'Supply and Demand', type: 'Theory' },
  { date: '2024-12-16', year: 'Second Year', subject: 'Chemistry', topic: 'Acid-Base Titration', type: 'Practical' },
  { date: '2024-12-17', year: 'Third Year', subject: 'English Literature', topic: 'Victorian Poetry', type: 'Theory' },
];

export default function ArtsScienceMyClasses() {
  const totalClasses = todaysClasses.length;
  const totalStudents = todaysClasses.reduce((sum, cls) => sum + cls.students, 0);
  const upcomingCount = upcomingClasses.length;

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #5E35B1 0%, #311B92 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          My Arts & Science Classes
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Today's schedule and upcoming class management
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#EDE7F6' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#5E35B1' }}>
                {totalClasses}
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
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#388E3C' }}>
                {totalStudents}
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
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976D2' }}>
                {upcomingCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Upcoming Classes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFF3E0' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#F57C00' }}>
                3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Programs Teaching
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <CalendarToday sx={{ mr: 2, color: '#5E35B1' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Today's Schedule
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Topic</TableCell>
                <TableCell>Venue</TableCell>
                <TableCell align="center">Students</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todaysClasses.map((cls, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{cls.time}</TableCell>
                  <TableCell>
                    <Chip label={cls.year} size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={cls.type}
                      size="small"
                      color={cls.type === 'Theory' ? 'warning' : 'primary'}
                    />
                  </TableCell>
                  <TableCell>{cls.subject}</TableCell>
                  <TableCell>{cls.topic}</TableCell>
                  <TableCell>{cls.venue}</TableCell>
                  <TableCell align="center">{cls.students}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Assignment sx={{ mr: 2, color: '#5E35B1' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Upcoming Classes
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Year</TableCell>
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
                    <Chip label={cls.year} size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell>{cls.subject}</TableCell>
                  <TableCell>{cls.topic}</TableCell>
                  <TableCell>
                    <Chip
                      label={cls.type}
                      size="small"
                      color={cls.type === 'Theory' ? 'warning' : 'primary'}
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
