import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Assignment, People, AssignmentTurnedIn } from '@mui/icons-material';

const classes = [
  {
    id: 1,
    name: 'Clinical Biochemistry',
    program: 'BSc MLT Year 2',
    students: 45,
    schedule: 'Mon, Wed, Fri - 9:00 AM',
    nextClass: 'Dec 6, 2025 - 9:00 AM',
    attendance: 92,
    completedTopics: 12,
    totalTopics: 18,
  },
  {
    id: 2,
    name: 'Hematology Lab',
    program: 'BSc MLT Year 2',
    students: 45,
    schedule: 'Tue, Thu - 2:00 PM',
    nextClass: 'Dec 5, 2025 - 2:00 PM',
    attendance: 95,
    completedTopics: 8,
    totalTopics: 12,
  },
  {
    id: 3,
    name: 'Diagnostic Microbiology',
    program: 'Diploma MLT Year 2',
    students: 50,
    schedule: 'Mon, Wed - 11:00 AM',
    nextClass: 'Dec 8, 2025 - 11:00 AM',
    attendance: 88,
    completedTopics: 10,
    totalTopics: 15,
  },
];

export default function AlliedHealthMyClasses() {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Mark Attendance',
      icon: <People sx={{ fontSize: 40 }} />,
      color: '#1565C0',
      path: '/allied-health/teacher/attendance',
    },
    {
      title: 'Enter Marks',
      icon: <Assignment sx={{ fontSize: 40 }} />,
      color: '#1976D2',
      path: '/allied-health/teacher/marks',
    },
    {
      title: 'Assignments',
      icon: <AssignmentTurnedIn sx={{ fontSize: 40 }} />,
      color: '#1E88E5',
      path: '/allied-health/teacher/assignments',
    },
  ];

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          My Classes
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Manage your classes and student groups
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Classes
              </Typography>
              <Typography variant="h4" sx={{ color: '#1565C0', fontWeight: 600 }}>
                {classes.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Students
              </Typography>
              <Typography variant="h4" sx={{ color: '#1976D2', fontWeight: 600 }}>
                {classes.reduce((sum, c) => sum + c.students, 0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Avg Attendance
              </Typography>
              <Typography variant="h4" sx={{ color: '#1E88E5', fontWeight: 600 }}>
                92%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Next Class
              </Typography>
              <Typography variant="body2" sx={{ color: '#2196F3', fontWeight: 600, mt: 1 }}>
                Today, 2:00 PM
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {quickActions.map((action) => (
          <Grid item xs={12} md={4} key={action.title}>
            <Card>
              <CardActionArea onClick={() => navigate(action.path)}>
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <Box sx={{ color: action.color, mb: 2 }}>
                    {action.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: action.color }}>
                    {action.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          Your Classes
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Class Name</strong></TableCell>
                <TableCell><strong>Program</strong></TableCell>
                <TableCell align="center"><strong>Students</strong></TableCell>
                <TableCell><strong>Schedule</strong></TableCell>
                <TableCell><strong>Next Class</strong></TableCell>
                <TableCell align="center"><strong>Attendance</strong></TableCell>
                <TableCell><strong>Progress</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {classes.map((cls) => (
                <TableRow key={cls.id} hover>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {cls.name}
                    </Typography>
                  </TableCell>
                  <TableCell>{cls.program}</TableCell>
                  <TableCell align="center">{cls.students}</TableCell>
                  <TableCell>{cls.schedule}</TableCell>
                  <TableCell>{cls.nextClass}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={`${cls.attendance}%`}
                      size="small"
                      color={cls.attendance >= 90 ? 'success' : 'warning'}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption">
                      {cls.completedTopics}/{cls.totalTopics} topics
                    </Typography>
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
