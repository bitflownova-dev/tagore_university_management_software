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
    phase: 'Phase 1',
    type: 'Theory',
    subject: 'Anatomy',
    topic: 'Upper Limb Anatomy',
    competency: 'AN10.1',
    venue: 'Lecture Hall 1',
    students: 45,
  },
  {
    id: 2,
    time: '10:30 AM - 12:30 PM',
    phase: 'Phase 2',
    type: 'Clinical Posting',
    subject: 'Medicine',
    topic: 'Ward Round - General Medicine',
    competency: 'IM5.2',
    venue: 'Medicine Ward',
    students: 38,
  },
  {
    id: 3,
    time: '02:00 PM - 04:00 PM',
    phase: 'Phase 3 Part 1',
    type: 'Clinical Posting',
    subject: 'Surgery',
    topic: 'OT Observation',
    competency: 'SU8.4',
    venue: 'Operation Theatre',
    students: 32,
  },
];

const upcomingClasses = [
  { date: '2024-12-14', phase: 'Phase 1', subject: 'Anatomy', topic: 'Lower Limb Anatomy', competency: 'AN11.2', type: 'Theory' },
  { date: '2024-12-15', phase: 'Phase 2', subject: 'Medicine', topic: 'Cardiovascular Examination', competency: 'IM6.1', type: 'Clinical Posting' },
  { date: '2024-12-16', phase: 'Phase 1', subject: 'Anatomy', topic: 'Practical - Dissection', competency: 'AN12.3', type: 'Practical' },
  { date: '2024-12-17', phase: 'Phase 3 Part 1', subject: 'Surgery', topic: 'Wound Management', competency: 'SU9.2', type: 'Clinical Posting' },
];

const rotationGroups = [
  { id: 1, name: 'Group A', phase: 'Phase 2', rotation: 'Medicine Ward', students: 12, startDate: '2024-12-01', endDate: '2024-12-31' },
  { id: 2, name: 'Group B', phase: 'Phase 3 Part 1', rotation: 'Surgery Ward', students: 10, startDate: '2024-12-01', endDate: '2024-12-31' },
  { id: 3, name: 'Group C', phase: 'Phase 2', rotation: 'Pediatrics OPD', students: 11, startDate: '2024-12-01', endDate: '2024-12-31' },
];

export default function MedicalMyClasses() {
  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #D32F2F 0%, #C62828 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          My CBME Classes & Rotations
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Today's schedule and clinical postings
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFEBEE' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#D32F2F' }}>
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
                {rotationGroups.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Rotation Groups
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
          <CalendarToday sx={{ mr: 2, color: '#D32F2F' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Today's Schedule
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell>CBME Phase</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Topic</TableCell>
                <TableCell>Competency</TableCell>
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
                    <Chip label={cls.phase} size="small" color="error" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={cls.type}
                      size="small"
                      color={cls.type === 'Clinical Posting' ? 'error' : cls.type === 'Theory' ? 'primary' : 'success'}
                    />
                  </TableCell>
                  <TableCell>{cls.subject}</TableCell>
                  <TableCell>{cls.topic}</TableCell>
                  <TableCell>
                    <Chip label={cls.competency} size="small" variant="outlined" />
                  </TableCell>
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
          <Group sx={{ mr: 2, color: '#D32F2F' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Clinical Rotation Groups
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Group Name</TableCell>
                <TableCell>CBME Phase</TableCell>
                <TableCell>Current Rotation</TableCell>
                <TableCell align="center">Students</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rotationGroups.map((group) => (
                <TableRow key={group.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{group.name}</TableCell>
                  <TableCell>
                    <Chip label={group.phase} size="small" color="error" variant="outlined" />
                  </TableCell>
                  <TableCell>{group.rotation}</TableCell>
                  <TableCell align="center">{group.students}</TableCell>
                  <TableCell>{group.startDate}</TableCell>
                  <TableCell>{group.endDate}</TableCell>
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
          <Assignment sx={{ mr: 2, color: '#D32F2F' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Upcoming Classes
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>CBME Phase</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Topic</TableCell>
                <TableCell>Competency Code</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {upcomingClasses.map((cls, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{cls.date}</TableCell>
                  <TableCell>
                    <Chip label={cls.phase} size="small" color="error" variant="outlined" />
                  </TableCell>
                  <TableCell>{cls.subject}</TableCell>
                  <TableCell>{cls.topic}</TableCell>
                  <TableCell>
                    <Chip label={cls.competency} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={cls.type}
                      size="small"
                      color={cls.type === 'Clinical Posting' ? 'error' : cls.type === 'Theory' ? 'primary' : 'success'}
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
