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
  Checkbox,
  Button,
} from '@mui/material';
import { CalendarToday, CheckCircle } from '@mui/icons-material';

const sessions = [
  { id: 1, time: '09:00-11:00', year: 'Second Year', type: 'Clinical', subject: 'Medical-Surgical Nursing', topic: 'Ward Management', venue: 'Clinical Ward A', students: 30 },
  { id: 2, time: '11:30-13:00', year: 'Third Year', type: 'Practical', subject: 'Community Health', topic: 'Field Visit', venue: 'Community Center', students: 25 },
  { id: 3, time: '14:00-16:00', year: 'First Year', type: 'Theory', subject: 'Nursing Foundation', topic: 'Basic Procedures', venue: 'Room 105', students: 35 },
];

const sessionStudents = [
  { id: 1, rollNo: 'NS001', name: 'Priya Sharma', present: false },
  { id: 2, rollNo: 'NS002', name: 'Anjali Kumar', present: false },
  { id: 3, rollNo: 'NS003', name: 'Meera Patel', present: false },
  { id: 4, rollNo: 'NS004', name: 'Kavita Singh', present: false },
  { id: 5, rollNo: 'NS005', name: 'Sunita Reddy', present: false },
];

export default function NursingAttendancePage() {
  const [selectedSession, setSelectedSession] = useState('1');
  const [attendanceData, setAttendanceData] = useState<Record<number, boolean>>({});

  const session = sessions.find((s) => s.id.toString() === selectedSession);
  const presentCount = Object.values(attendanceData).filter(Boolean).length;
  const absentCount = sessionStudents.length - presentCount;
  const attendanceRate = sessionStudents.length > 0 ? ((presentCount / sessionStudents.length) * 100).toFixed(1) : '0';

  const handleAttendanceToggle = (studentId: number) => {
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  const handleMarkAll = (present: boolean) => {
    const newData: Record<number, boolean> = {};
    sessionStudents.forEach((student) => {
      newData[student.id] = present;
    });
    setAttendanceData(newData);
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Nursing Attendance Management
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Mark attendance for clinical, practical, and theory sessions
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#2E7D32' }}>
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
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#C62828' }}>
                {absentCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Absent
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#C8E6C9' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1B5E20' }}>
                {attendanceRate}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Attendance Rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#A5D6A7' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#2E7D32' }}>
                {sessionStudents.length}
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
          <CalendarToday sx={{ mr: 2, color: '#2E7D32' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Select Session
          </Typography>
        </Box>

        <TextField
          select
          fullWidth
          label="Session"
          value={selectedSession}
          onChange={(e) => setSelectedSession(e.target.value)}
          sx={{ mb: 3 }}
        >
          {sessions.map((session) => (
            <MenuItem key={session.id} value={session.id.toString()}>
              {session.time} - {session.year} - {session.type} - {session.subject} - {session.topic}
            </MenuItem>
          ))}
        </TextField>

        {session && (
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={2}>
              <Box sx={{ p: 2, bgcolor: '#E8F5E9', borderRadius: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Year
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {session.year}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Box sx={{ p: 2, bgcolor: '#E8F5E9', borderRadius: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Type
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {session.type}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Box sx={{ p: 2, bgcolor: '#E8F5E9', borderRadius: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Subject
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {session.subject}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Box sx={{ p: 2, bgcolor: '#E8F5E9', borderRadius: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Topic
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {session.topic}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Box sx={{ p: 2, bgcolor: '#E8F5E9', borderRadius: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Time
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {session.time}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Box sx={{ p: 2, bgcolor: '#E8F5E9', borderRadius: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Students
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {session.students}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        )}

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Button
            variant="outlined"
            startIcon={<CheckCircle />}
            onClick={() => handleMarkAll(true)}
            sx={{ borderColor: '#2E7D32', color: '#2E7D32', '&:hover': { borderColor: '#1B5E20', bgcolor: '#E8F5E9' } }}
          >
            Mark All Present
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleMarkAll(false)}
            sx={{ borderColor: '#C62828', color: '#C62828', '&:hover': { borderColor: '#B71C1C', bgcolor: '#FFEBEE' } }}
          >
            Mark All Absent
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Roll No</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell align="center">Attendance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sessionStudents.map((student) => (
                <TableRow key={student.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{student.rollNo}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={attendanceData[student.id] || false}
                      onChange={() => handleAttendanceToggle(student.id)}
                      sx={{ color: '#2E7D32', '&.Mui-checked': { color: '#2E7D32' } }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" sx={{ bgcolor: '#2E7D32', '&:hover': { bgcolor: '#1B5E20' } }}>
            Submit Attendance
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#2E7D32' }}>
          INC Attendance Requirements
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          • Minimum 75% attendance required for Theory classes
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Minimum 80% attendance required for Clinical training
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Minimum 75% attendance required for Practical sessions
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Students with less than required attendance may not be eligible for final examinations
        </Typography>
      </Paper>
    </Box>
  );
}
