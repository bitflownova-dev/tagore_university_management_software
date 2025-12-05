import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Checkbox,
} from '@mui/material';
import { EventNote, CheckCircle, Cancel } from '@mui/icons-material';

const sessions = [
  { id: 1, time: '09:00 - 11:00', year: 'Second Year', type: 'Theory', subject: 'English Literature', topic: 'Romantic Poetry', students: 30 },
  { id: 2, time: '11:30 - 13:00', year: 'Third Year', type: 'Practical', subject: 'Chemistry', topic: 'Organic Reactions', students: 25 },
  { id: 3, time: '14:00 - 16:00', year: 'First Year', type: 'Theory', subject: 'Economics', topic: 'Microeconomics Basics', students: 35 },
];

const sampleStudents = [
  { rollNo: 'AS001', name: 'Rahul Kumar', year: 'Second Year', present: true },
  { rollNo: 'AS002', name: 'Priya Sharma', year: 'Second Year', present: true },
  { rollNo: 'AS003', name: 'Amit Patel', year: 'Second Year', present: false },
  { rollNo: 'AS004', name: 'Neha Gupta', year: 'Second Year', present: true },
  { rollNo: 'AS005', name: 'Vikram Singh', year: 'Second Year', present: true },
];

export default function ArtsScienceAttendancePage() {
  const [selectedSession, setSelectedSession] = useState('1');
  const [attendanceData, setAttendanceData] = useState(sampleStudents);

  const session = sessions.find((s) => s.id === parseInt(selectedSession));
  const presentCount = attendanceData.filter((s) => s.present).length;
  const absentCount = attendanceData.length - presentCount;
  const attendanceRate = (presentCount / attendanceData.length) * 100;

  const handleAttendanceToggle = (rollNo: string) => {
    setAttendanceData((prev) =>
      prev.map((student) =>
        student.rollNo === rollNo ? { ...student, present: !student.present } : student
      )
    );
  };

  const handleMarkAll = (present: boolean) => {
    setAttendanceData((prev) => prev.map((student) => ({ ...student, present })));
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #5E35B1 0%, #311B92 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Arts & Science Attendance Management
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Mark attendance for theory and practical sessions
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#388E3C' }}>
                {presentCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Present
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFEBEE' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#D32F2F' }}>
                {absentCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Absent
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E3F2FD' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976D2' }}>
                {attendanceRate.toFixed(0)}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Attendance Rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFF3E0' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#F57C00' }}>
                {attendanceData.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Students
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <EventNote sx={{ mr: 2, color: '#5E35B1' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Select Session
          </Typography>
        </Box>

        <TextField
          select
          fullWidth
          value={selectedSession}
          onChange={(e) => setSelectedSession(e.target.value)}
          sx={{ mb: 3 }}
        >
          {sessions.map((session) => (
            <MenuItem key={session.id} value={session.id.toString()}>
              {session.time} - {session.year} - {session.type} - {session.subject} ({session.topic}) - {session.students} students
            </MenuItem>
          ))}
        </TextField>

        {session && (
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6} sm={4} md={2}>
              <Paper sx={{ p: 2, bgcolor: '#EDE7F6' }}>
                <Typography variant="body2" color="text.secondary">
                  Year
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {session.year}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Paper sx={{ p: 2, bgcolor: '#F3E5F5' }}>
                <Typography variant="body2" color="text.secondary">
                  Type
                </Typography>
                <Chip
                  label={session.type}
                  size="small"
                  color={session.type === 'Theory' ? 'warning' : 'primary'}
                  sx={{ mt: 0.5 }}
                />
              </Paper>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Paper sx={{ p: 2, bgcolor: '#E8EAF6' }}>
                <Typography variant="body2" color="text.secondary">
                  Subject
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {session.subject}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Paper sx={{ p: 2, bgcolor: '#E1F5FE' }}>
                <Typography variant="body2" color="text.secondary">
                  Topic
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                  {session.topic}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Paper sx={{ p: 2, bgcolor: '#E0F2F1' }}>
                <Typography variant="body2" color="text.secondary">
                  Time
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {session.time}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Paper sx={{ p: 2, bgcolor: '#FFF3E0' }}>
                <Typography variant="body2" color="text.secondary">
                  Students
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {session.students}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        )}

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Button
            variant="outlined"
            startIcon={<CheckCircle />}
            sx={{ borderColor: '#388E3C', color: '#388E3C' }}
            onClick={() => handleMarkAll(true)}
          >
            Mark All Present
          </Button>
          <Button
            variant="outlined"
            startIcon={<Cancel />}
            sx={{ borderColor: '#D32F2F', color: '#D32F2F' }}
            onClick={() => handleMarkAll(false)}
          >
            Mark All Absent
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Roll No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Year</TableCell>
                <TableCell align="center">Attendance</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceData.map((student) => (
                <TableRow key={student.rollNo} hover>
                  <TableCell sx={{ fontFamily: 'monospace' }}>{student.rollNo}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    <Chip label={student.year} size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={student.present}
                      onChange={() => handleAttendanceToggle(student.rollNo)}
                      color="success"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={student.present ? 'Present' : 'Absent'}
                      size="small"
                      color={student.present ? 'success' : 'error'}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
          <Button variant="outlined">Cancel</Button>
          <Button variant="contained" sx={{ bgcolor: '#5E35B1', '&:hover': { bgcolor: '#311B92' } }}>
            Save Attendance
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#5E35B1' }}>
          UGC Attendance Requirements
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          • Minimum 75% attendance required for theory and practical sessions
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Students with less than 75% attendance not eligible for end-semester exams
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Attendance must be uploaded to university portal within 24 hours
        </Typography>
      </Paper>
    </Box>
  );
}
