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
  TextField,
  MenuItem,
  Checkbox,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { CheckCircle, Cancel, Save } from '@mui/icons-material';

const sessions = [
  {
    id: 1,
    date: '2024-12-13',
    phase: 'Phase 1',
    department: 'Anatomy',
    type: 'Theory',
    topic: 'Upper Limb Anatomy',
    competency: 'AN10.1',
    time: '09:00 AM - 10:00 AM',
    students: 45,
  },
  {
    id: 2,
    date: '2024-12-13',
    phase: 'Phase 2',
    department: 'Medicine',
    type: 'Clinical Posting',
    topic: 'Ward Round - Medicine',
    competency: 'IM5.2',
    time: '10:30 AM - 12:30 PM',
    students: 38,
  },
  {
    id: 3,
    date: '2024-12-13',
    phase: 'Phase 3 Part 1',
    department: 'Surgery',
    type: 'Clinical Posting',
    topic: 'OT Observation',
    competency: 'SU8.4',
    time: '02:00 PM - 04:00 PM',
    students: 32,
  },
];

const students = [
  { id: 1, rollNo: 'MB001', name: 'Rahul Sharma', phase: 'Phase 1', present: true },
  { id: 2, rollNo: 'MB002', name: 'Priya Singh', phase: 'Phase 1', present: true },
  { id: 3, rollNo: 'MB003', name: 'Amit Kumar', phase: 'Phase 1', present: false },
  { id: 4, rollNo: 'MB004', name: 'Neha Patel', phase: 'Phase 1', present: true },
  { id: 5, rollNo: 'MB005', name: 'Vikram Reddy', phase: 'Phase 1', present: true },
];

export default function MedicalAttendancePage() {
  const [selectedSession, setSelectedSession] = useState(1);
  const [attendanceData, setAttendanceData] = useState(students);

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

  const currentSession = sessions.find((s) => s.id === selectedSession);

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #D32F2F 0%, #C62828 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          CBME Attendance Management
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Mark attendance for clinical postings & theory sessions
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFEBEE' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#D32F2F' }}>
                {presentCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Present Today
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFEBEE' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#F44336' }}>
                {absentCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Absent
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#388E3C' }}>
                {((presentCount / attendanceData.length) * 100).toFixed(1)}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Attendance Rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E3F2FD' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976D2' }}>
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
          <InputLabel>Session</InputLabel>
          <Select
            value={selectedSession}
            label="Session"
            onChange={(e) => setSelectedSession(Number(e.target.value))}
          >
            {sessions.map((session) => (
              <MenuItem key={session.id} value={session.id}>
                {session.time} - {session.department} - {session.topic} ({session.type})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {currentSession && (
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ p: 2, bgcolor: '#F5F5F5', borderRadius: 1 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Department
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {currentSession.department}
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
                  color={currentSession.type === 'Clinical Posting' ? 'error' : 'primary'}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ p: 2, bgcolor: '#F5F5F5', borderRadius: 1 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Competency Code
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {currentSession.competency}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ p: 2, bgcolor: '#F5F5F5', borderRadius: 1 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  CBME Phase
                </Typography>
                <Chip label={currentSession.phase} size="small" color="error" variant="outlined" />
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
                <TableCell>CBME Phase</TableCell>
                <TableCell align="center">Attendance</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceData.map((student) => (
                <TableRow key={student.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{student.rollNo}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    <Chip label={student.phase} size="small" color="error" variant="outlined" />
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={student.present}
                      onChange={() => handleAttendanceToggle(student.id)}
                      color="success"
                    />
                  </TableCell>
                  <TableCell align="center">
                    {student.present ? (
                      <Chip label="Present" size="small" color="success" />
                    ) : (
                      <Chip label="Absent" size="small" color="error" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
          <Button variant="outlined">Cancel</Button>
          <Button variant="contained" color="error" startIcon={<Save />}>
            Save Attendance
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#D32F2F' }}>
          NMC Attendance Requirements
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          • Minimum 75% attendance required for Theory sessions
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Minimum 75% attendance required for Clinical Postings
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Students below 75% will not be eligible for University Examinations
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Clinical rotation attendance is linked to competency achievement
        </Typography>
      </Paper>
    </Box>
  );
}
