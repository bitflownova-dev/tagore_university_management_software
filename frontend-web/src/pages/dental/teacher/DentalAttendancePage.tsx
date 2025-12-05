import { useState } from 'react';
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
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  Card,
  CardContent,
} from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';

const sessions = [
  { id: 1, time: '09:00 AM - 11:00 AM', year: '3rd Year BDS', type: 'Clinical', subject: 'Conservative Dentistry', topic: 'Root Canal Treatment', students: 25 },
  { id: 2, time: '11:30 AM - 01:00 PM', year: '2nd Year BDS', type: 'Practical', subject: 'Dental Materials', topic: 'Impression Taking', students: 30 },
  { id: 3, time: '02:00 PM - 04:00 PM', year: '4th Year BDS', type: 'Clinical', subject: 'Oral Surgery', topic: 'Tooth Extraction', students: 20 },
];

const initialStudents = [
  { id: 1, rollNo: 'DEN001', name: 'Rahul Sharma', year: '3rd Year BDS', present: true },
  { id: 2, rollNo: 'DEN002', name: 'Priya Singh', year: '3rd Year BDS', present: true },
  { id: 3, rollNo: 'DEN003', name: 'Amit Kumar', year: '3rd Year BDS', present: false },
  { id: 4, rollNo: 'DEN004', name: 'Neha Patel', year: '3rd Year BDS', present: true },
  { id: 5, rollNo: 'DEN005', name: 'Vikram Reddy', year: '3rd Year BDS', present: true },
];

export default function DentalAttendancePage() {
  const [selectedSession, setSelectedSession] = useState(1);
  const [attendanceData, setAttendanceData] = useState(initialStudents);

  const handleAttendanceToggle = (studentId: number) => {
    setAttendanceData((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, present: !student.present } : student
      )
    );
  };

  const handleMarkAll = (present: boolean) => {
    setAttendanceData((prev) => prev.map((student) => ({ ...student, present })));
  };

  const presentCount = attendanceData.filter((s) => s.present).length;
  const absentCount = attendanceData.length - presentCount;
  const attendanceRate = (presentCount / attendanceData.length) * 100;
  const currentSession = sessions.find((s) => s.id === selectedSession);

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #00796B 0%, #004D40 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Dental Attendance Management
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Mark attendance for clinical, practical & theory sessions
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#388E3C' }}>
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
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#D32F2F' }}>
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
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976D2' }}>
                {attendanceRate.toFixed(0)}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Attendance Rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E0F2F1' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#00796B' }}>
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
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Select Session
        </Typography>
        <FormControl fullWidth>
          <Select
            value={selectedSession}
            onChange={(e) => setSelectedSession(Number(e.target.value))}
          >
            {sessions.map((session) => (
              <MenuItem key={session.id} value={session.id}>
                {session.time} - {session.year} - {session.subject} ({session.type})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {currentSession && (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ p: 2, bgcolor: '#F5F5F5', borderRadius: 1 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Academic Year
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {currentSession.year}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ p: 2, bgcolor: '#F5F5F5', borderRadius: 1 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Session Type
                </Typography>
                <Chip
                  label={currentSession.type}
                  size="small"
                  color={currentSession.type === 'Clinical' ? 'primary' : currentSession.type === 'Practical' ? 'success' : 'warning'}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ p: 2, bgcolor: '#F5F5F5', borderRadius: 1 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Subject
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {currentSession.subject}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ p: 2, bgcolor: '#F5F5F5', borderRadius: 1 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Topic
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {currentSession.topic}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ p: 2, bgcolor: '#F5F5F5', borderRadius: 1 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Time
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {currentSession.time}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ p: 2, bgcolor: '#F5F5F5', borderRadius: 1 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Total Students
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {currentSession.students}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        )}
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Mark Attendance
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              color="success"
              startIcon={<CheckCircle />}
              onClick={() => handleMarkAll(true)}
            >
              Mark All Present
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Cancel />}
              onClick={() => handleMarkAll(false)}
            >
              Mark All Absent
            </Button>
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Roll No</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Academic Year</TableCell>
                <TableCell align="center">Attendance</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceData.map((student) => (
                <TableRow key={student.id} hover>
                  <TableCell sx={{ fontWeight: 600, fontFamily: 'monospace' }}>{student.rollNo}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    <Chip label={student.year} size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={student.present}
                      onChange={() => handleAttendanceToggle(student.id)}
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

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
          <Button variant="outlined">Cancel</Button>
          <Button variant="contained" sx={{ bgcolor: '#00796B', '&:hover': { bgcolor: '#004D40' } }}>
            Save Attendance
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#00796B' }}>
          DCI Attendance Requirements
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          • Minimum 75% attendance required for theory classes
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Minimum 75% attendance required for clinical/practical sessions
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Students below 75% attendance are not eligible for exams
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Clinical procedure attendance separately tracked for DCI compliance
        </Typography>
      </Paper>
    </Box>
  );
}
