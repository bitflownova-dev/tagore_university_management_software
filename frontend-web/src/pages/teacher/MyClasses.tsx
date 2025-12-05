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
import { AccessTime as TimeIcon, School as SchoolIcon } from '@mui/icons-material';

export default function MyClasses() {
  const classes = [
    {
      id: 1,
      name: 'B.Tech CS - 3A',
      subject: 'Data Structures',
      students: 45,
      schedule: 'Mon, Wed, Fri - 9:00 AM',
    },
    {
      id: 2,
      name: 'B.Tech CS - 3B',
      subject: 'Database Management',
      students: 42,
      schedule: 'Tue, Thu - 10:00 AM',
    },
    {
      id: 3,
      name: 'B.Tech CS - 4A',
      subject: 'Operating Systems',
      students: 40,
      schedule: 'Mon, Wed - 2:00 PM',
    },
  ];

  const todaySchedule = [
    { time: '9:00 - 10:00', class: 'CS-3A', subject: 'Data Structures', room: 'Lab-301' },
    { time: '11:00 - 12:00', class: 'CS-4A', subject: 'Operating Systems', room: 'Room-205' },
    { time: '2:00 - 3:00', class: 'CS-3B', subject: 'DBMS Practical', room: 'Lab-302' },
  ];

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        My Classes
      </Typography>

      <Grid container spacing={3}>
        {classes.map((cls) => (
          <Grid item xs={12} md={4} key={cls.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {cls.name}
                </Typography>
                <Typography color="primary" fontWeight="bold" gutterBottom>
                  {cls.subject}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                  <SchoolIcon fontSize="small" color="action" />
                  <Typography variant="body2">{cls.students} Students</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <TimeIcon fontSize="small" color="action" />
                  <Typography variant="body2">{cls.schedule}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Today's Schedule
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Room</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todaySchedule.map((schedule, index) => (
                <TableRow key={index}>
                  <TableCell>{schedule.time}</TableCell>
                  <TableCell>
                    <Chip label={schedule.class} size="small" />
                  </TableCell>
                  <TableCell>{schedule.subject}</TableCell>
                  <TableCell>{schedule.room}</TableCell>
                  <TableCell>
                    <Chip
                      label={index === 0 ? 'In Progress' : 'Upcoming'}
                      color={index === 0 ? 'success' : 'default'}
                      size="small"
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
