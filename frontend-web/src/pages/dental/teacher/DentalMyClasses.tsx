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
  { id: 1, time: '09:00 AM - 11:00 AM', year: '3rd Year BDS', type: 'Clinical', subject: 'Conservative Dentistry', topic: 'Root Canal Treatment', venue: 'Clinical Unit 1', students: 25 },
  { id: 2, time: '11:30 AM - 01:00 PM', year: '2nd Year BDS', type: 'Practical', subject: 'Dental Materials', topic: 'Impression Taking', venue: 'Lab 2', students: 30 },
  { id: 3, time: '02:00 PM - 04:00 PM', year: '4th Year BDS', type: 'Clinical', subject: 'Oral Surgery', topic: 'Tooth Extraction', venue: 'OPD Unit 3', students: 20 },
];

const upcomingClasses = [
  { date: '2024-12-14', year: '3rd Year BDS', subject: 'Prosthodontics', topic: 'Complete Dentures', type: 'Clinical' },
  { date: '2024-12-15', year: '1st Year BDS', subject: 'Dental Anatomy', topic: 'Tooth Morphology', type: 'Theory' },
  { date: '2024-12-16', year: '4th Year BDS', subject: 'Periodontology', topic: 'Scaling & Polishing', type: 'Clinical' },
  { date: '2024-12-17', year: '2nd Year BDS', subject: 'Oral Pathology', topic: 'Oral Lesions', type: 'Practical' },
];

const clinicalGroups = [
  { id: 1, name: 'Group A', year: '3rd Year BDS', subject: 'Conservative Dentistry', students: 12, timing: 'Mon, Wed 9:00 AM' },
  { id: 2, name: 'Group B', year: '3rd Year BDS', subject: 'Conservative Dentistry', students: 13, timing: 'Tue, Thu 9:00 AM' },
  { id: 3, name: 'Group 1', year: '4th Year BDS', subject: 'Oral Surgery', students: 10, timing: 'Mon, Fri 2:00 PM' },
  { id: 4, name: 'Group 2', year: '4th Year BDS', subject: 'Oral Surgery', students: 10, timing: 'Wed, Fri 2:00 PM' },
];

export default function DentalMyClasses() {
  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #00796B 0%, #004D40 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          My Dental Classes
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Today's schedule and clinical group management
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E0F2F1' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#00796B' }}>
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
                {clinicalGroups.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Clinical Groups
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
          <CalendarToday sx={{ mr: 2, color: '#00796B' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Today's Schedule
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell>Academic Year</TableCell>
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
                    <Chip label={cls.year} size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={cls.type}
                      size="small"
                      color={cls.type === 'Clinical' ? 'success' : cls.type === 'Practical' ? 'primary' : 'warning'}
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
          <Group sx={{ mr: 2, color: '#00796B' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            My Clinical Groups
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Group Name</TableCell>
                <TableCell>Academic Year</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell align="center">Students</TableCell>
                <TableCell>Timing</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clinicalGroups.map((group) => (
                <TableRow key={group.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{group.name}</TableCell>
                  <TableCell>
                    <Chip label={group.year} size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell>{group.subject}</TableCell>
                  <TableCell align="center">{group.students}</TableCell>
                  <TableCell>{group.timing}</TableCell>
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
          <Assignment sx={{ mr: 2, color: '#00796B' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Upcoming Classes
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Academic Year</TableCell>
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
                      color={cls.type === 'Clinical' ? 'success' : cls.type === 'Practical' ? 'primary' : 'warning'}
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
