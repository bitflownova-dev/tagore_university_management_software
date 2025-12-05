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
  alpha,
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
      color: '#00BFA5',
      path: '/allied-health/teacher/attendance',
    },
    {
      title: 'Enter Marks',
      icon: <Assignment sx={{ fontSize: 40 }} />,
      color: '#00897B',
      path: '/allied-health/teacher/marks',
    },
    {
      title: 'Assignments',
      icon: <AssignmentTurnedIn sx={{ fontSize: 40 }} />,
      color: '#26A69A',
      path: '/allied-health/teacher/assignments',
    },
  ];

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
          My Classes
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.95)' }}>
          Manage your classes and student groups
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
                Total Classes
              </Typography>
              <Typography variant="h4" sx={{ color: '#00BFA5', fontWeight: 800, letterSpacing: '-0.01em' }}>
                {classes.length}
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
                Total Students
              </Typography>
              <Typography variant="h4" sx={{ color: '#00897B', fontWeight: 800, letterSpacing: '-0.01em' }}>
                {classes.reduce((sum, c) => sum + c.students, 0)}
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
                Avg Attendance
              </Typography>
              <Typography variant="h4" sx={{ color: '#26A69A', fontWeight: 800, letterSpacing: '-0.01em' }}>
                92%
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
                Next Class
              </Typography>
              <Typography variant="body2" sx={{ color: '#4DB6AC', fontWeight: 600, mt: 1 }}>
                Today, 2:00 PM
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {quickActions.map((action) => (
          <Grid item xs={12} md={4} key={action.title}>
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
              <CardActionArea onClick={() => navigate(action.path)}>
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <Box sx={{ color: action.color, mb: 2 }}>
                    {action.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: action.color }}>
                    {action.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
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
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1A202C', mb: 3 }}>
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
                <TableRow 
                  key={cls.id} 
                  sx={{
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: alpha('#00BFA5', 0.04),
                    },
                  }}
                >
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#1A202C' }}>
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
                      sx={{
                        bgcolor: cls.attendance >= 90 ? alpha('#26A69A', 0.1) : alpha('#FFA726', 0.1),
                        color: cls.attendance >= 90 ? '#26A69A' : '#FFA726',
                        fontWeight: 600,
                      }}
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
