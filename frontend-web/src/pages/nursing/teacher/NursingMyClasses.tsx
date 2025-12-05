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
} from '@mui/material';
import { CalendarToday, Assignment } from '@mui/icons-material';

const todaysClasses = [
  { time: '09:00-11:00', year: 'Second Year', type: 'Clinical', subject: 'Medical-Surgical Nursing', topic: 'Ward Management', venue: 'Clinical Ward A', students: 30 },
  { time: '11:30-13:00', year: 'Third Year', type: 'Practical', subject: 'Community Health', topic: 'Field Visit', venue: 'Community Center', students: 25 },
  { time: '14:00-16:00', year: 'First Year', type: 'Theory', subject: 'Nursing Foundation', topic: 'Basic Procedures', venue: 'Room 105', students: 35 },
];

const upcomingClasses = [
  { date: 'Dec 5, 2025', subject: 'Medical-Surgical Nursing', topic: 'Post-Op Care', type: 'Clinical' },
  { date: 'Dec 6, 2025', subject: 'Community Health', topic: 'Health Education', type: 'Theory' },
  { date: 'Dec 7, 2025', subject: 'OBG Nursing', topic: 'Antenatal Care', type: 'Practical' },
  { date: 'Dec 8, 2025', subject: 'Mental Health Nursing', topic: 'Psychiatric Assessment', type: 'Clinical' },
];

export default function NursingMyClasses() {
  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          My Nursing Classes
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Today's schedule and upcoming class management
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#2E7D32' }}>
                3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Classes Today
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#C8E6C9' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1B5E20' }}>
                90
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Students
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#A5D6A7' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#2E7D32' }}>
                4
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Upcoming Classes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#81C784' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1B5E20' }}>
                3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Subjects Teaching
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <CalendarToday sx={{ mr: 2, color: '#2E7D32' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Today's Schedule - December 4, 2025
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
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todaysClasses.map((cls, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{cls.time}</TableCell>
                  <TableCell>
                    <Chip label={cls.year} size="small" color="primary" />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={cls.type}
                      size="small"
                      sx={{
                        bgcolor: cls.type === 'Clinical' ? '#2E7D32' : cls.type === 'Practical' ? '#388E3C' : '#66BB6A',
                        color: 'white',
                      }}
                    />
                  </TableCell>
                  <TableCell>{cls.subject}</TableCell>
                  <TableCell>{cls.topic}</TableCell>
                  <TableCell>{cls.venue}</TableCell>
                  <TableCell align="center">{cls.students}</TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined" sx={{ borderColor: '#2E7D32', color: '#2E7D32' }}>
                      View Details
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
          <Assignment sx={{ mr: 2, color: '#2E7D32' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Upcoming Classes
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Topic</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {upcomingClasses.map((cls, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{cls.date}</TableCell>
                  <TableCell>{cls.subject}</TableCell>
                  <TableCell>{cls.topic}</TableCell>
                  <TableCell>
                    <Chip
                      label={cls.type}
                      size="small"
                      sx={{
                        bgcolor: cls.type === 'Clinical' ? '#2E7D32' : cls.type === 'Practical' ? '#388E3C' : '#66BB6A',
                        color: 'white',
                      }}
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
