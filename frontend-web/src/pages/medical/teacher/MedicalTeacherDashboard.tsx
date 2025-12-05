import { useNavigate } from 'react-router-dom';
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
  Avatar,
  Button,
} from '@mui/material';
import {
  Assignment,
  People,
  CheckCircle,
  Schedule,
  Pending,
  Assessment,
  VideoLibrary,
} from '@mui/icons-material';

export default function MedicalTeacherDashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'LMS Portal',
      value: '24',
      subtitle: 'Videos & Assessments',
      icon: <VideoLibrary sx={{ fontSize: 40 }} />,
      color: '#DC2626',
      path: '/medical/teacher/lms',
    },
    {
      title: 'My Students',
      value: '45',
      subtitle: 'Assigned for supervision',
      icon: <People sx={{ fontSize: 40 }} />,
      color: '#1976D2',
      path: '/medical/teacher/students',
    },
    {
      title: 'Pending Logbook',
      value: '12',
      subtitle: 'Awaiting approval',
      icon: <Pending sx={{ fontSize: 40 }} />,
      color: '#ED6C02',
      path: '/medical/teacher/logbook-approval',
    },
    {
      title: 'Assessments',
      value: '8',
      subtitle: 'This month',
      icon: <Assessment sx={{ fontSize: 40 }} />,
      color: '#2E7D32',
      path: '/medical/teacher/marks',
    },
  ];

  const todaySchedule = [
    {
      time: '09:00 AM - 10:00 AM',
      subject: 'General Surgery',
      topic: 'Abdominal Trauma Management',
      phase: 'Phase 3.1',
      students: 158,
      location: 'Lecture Hall 3',
      competencies: ['SU4.1', 'SU4.2', 'SU4.3'],
    },
    {
      time: '11:00 AM - 01:00 PM',
      subject: 'Clinical Rotation',
      topic: 'Ward Rounds & Case Discussion',
      phase: 'Phase 3.2',
      students: 12,
      location: 'Surgery Ward',
      competencies: ['SU5.1', 'SU5.2', 'SU6.1'],
    },
    {
      time: '02:00 PM - 04:00 PM',
      subject: 'Practical Training',
      topic: 'Suturing Techniques (OSPE)',
      phase: 'Phase 3.1',
      students: 30,
      location: 'Skill Lab',
      competencies: ['SU3.1', 'SU3.2'],
    },
  ];

  const pendingApprovals = [
    {
      student: 'Rahul Sharma',
      rollNo: 'MBBS-2021-045',
      procedure: 'Suturing of laceration',
      competency: 'SU3.2',
      date: 'Dec 2, 2024',
      avatar: 'RS',
    },
    {
      student: 'Priya Patel',
      rollNo: 'MBBS-2021-089',
      procedure: 'Wound dressing',
      competency: 'SU2.1',
      date: 'Dec 3, 2024',
      avatar: 'PP',
    },
    {
      student: 'Aditya Singh',
      rollNo: 'MBBS-2022-012',
      procedure: 'IV cannulation',
      competency: 'SU1.3',
      date: 'Dec 3, 2024',
      avatar: 'AS',
    },
    {
      student: 'Neha Gupta',
      rollNo: 'MBBS-2022-056',
      procedure: 'Nasogastric tube insertion',
      competency: 'SU2.4',
      date: 'Dec 4, 2024',
      avatar: 'NG',
    },
  ];

  const recentAssessments = [
    { subject: 'Surgery OSPE', date: 'Nov 28, 2024', students: 30, evaluated: 30, pending: 0 },
    { subject: 'Clinical Viva', date: 'Nov 25, 2024', students: 25, evaluated: 22, pending: 3 },
    { subject: 'Ward Assessment', date: 'Nov 22, 2024', students: 15, evaluated: 15, pending: 0 },
  ];

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #D32F2F 0%, #C62828 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Faculty Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Dr. Ramesh Kumar - General Surgery Department
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Card
              sx={{
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 8px 16px ${stat.color}40`,
                },
              }}
            >
              <CardActionArea onClick={() => navigate(stat.path)} sx={{ p: 3, height: '100%' }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: `${stat.color}20`,
                    color: stat.color,
                    margin: '0 auto 16px',
                  }}
                >
                  {stat.icon}
                </Box>
                <Typography variant="h3" align="center" sx={{ fontWeight: 700, color: stat.color, mb: 1 }}>
                  {stat.value}
                </Typography>
                <Typography variant="subtitle1" align="center" sx={{ fontWeight: 600 }} gutterBottom>
                  {stat.title}
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary">
                  {stat.subtitle}
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Schedule color="primary" />
              Today's Schedule
            </Typography>
            <Box sx={{ mt: 2 }}>
              {todaySchedule.map((schedule, index) => (
                <Card key={index} sx={{ mb: 2, border: '1px solid', borderColor: 'divider' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {schedule.subject}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {schedule.topic}
                        </Typography>
                      </Box>
                      <Chip label={schedule.phase} color="primary" size="small" />
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          Time
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                          {schedule.time}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          Location
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                          {schedule.location}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          Students
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                          {schedule.students}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          Competencies
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
                          {schedule.competencies.map((comp) => (
                            <Chip key={comp} label={comp} size="small" />
                          ))}
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Pending color="warning" />
                Pending Logbook Approvals
              </Typography>
              <Button
                size="small"
                onClick={() => navigate('/medical/teacher/logbook-approval')}
              >
                View All
              </Button>
            </Box>
            <Box>
              {pendingApprovals.map((entry, index) => (
                <Card key={index} sx={{ mb: 2, border: '1px solid', borderColor: 'divider' }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                      <Avatar sx={{ bgcolor: '#D32F2F' }}>{entry.avatar}</Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {entry.student}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {entry.rollNo}
                        </Typography>
                      </Box>
                      <Chip label={entry.competency} size="small" color="primary" />
                    </Box>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {entry.procedure}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Submitted: {entry.date}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Assessment color="success" />
              Recent Assessments
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Assessment</TableCell>
                    <TableCell align="center">Students</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentAssessments.map((assessment, index) => (
                    <TableRow key={index} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>
                          {assessment.subject}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {assessment.date}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">{assessment.students}</TableCell>
                      <TableCell align="center">
                        {assessment.pending === 0 ? (
                          <Chip label="Complete" size="small" color="success" icon={<CheckCircle />} />
                        ) : (
                          <Chip label={`${assessment.pending} Pending`} size="small" color="warning" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
