import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Tab,
  Tabs,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  Avatar,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  Edit,
  Save,
  Schedule,
  Assessment,
  AttachMoney,
  School,
  Download,
} from '@mui/icons-material';
import { useAuthStore } from '../../stores/authStore';

interface Student {
  studentId: string;
  name: string;
  rollNumber: string;
  attendance: 'PRESENT' | 'ABSENT' | 'LATE' | null;
}

interface ClassSession {
  classId: number;
  className: string;
  subject: string;
  schedule: string;
  studentCount: number;
}

interface Mark {
  studentId: string;
  name: string;
  rollNumber: string;
  marks: number;
  maxMarks: number;
}

interface Payslip {
  month: string;
  year: number;
  grossSalary: number;
  netSalary: number;
  daysPresent: number;
  daysAbsent: number;
  status: 'PAID' | 'PENDING';
}

export default function TeacherDashboard() {
  const { user } = useAuthStore();
  const [tabValue, setTabValue] = useState(0);
  const [attendanceDialogOpen, setAttendanceDialogOpen] = useState(false);
  const [marksDialogOpen, setMarksDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassSession | null>(null);

  const [classes] = useState<ClassSession[]>([
    {
      classId: 1,
      className: 'BCA Year 2 - Section A',
      subject: 'Data Structures',
      schedule: 'Mon, Wed, Fri - 9:00 AM',
      studentCount: 45,
    },
    {
      classId: 2,
      className: 'BCA Year 3 - Section B',
      subject: 'Database Management',
      schedule: 'Tue, Thu - 10:00 AM',
      studentCount: 42,
    },
  ]);

  const [students, setStudents] = useState<Student[]>([
    { studentId: '21CS001', name: 'Aarav Kumar', rollNumber: '001', attendance: null },
    { studentId: '21CS002', name: 'Priya Sharma', rollNumber: '002', attendance: null },
    { studentId: '21CS003', name: 'Vikram Singh', rollNumber: '003', attendance: null },
    { studentId: '21CS004', name: 'Ananya Reddy', rollNumber: '004', attendance: null },
  ]);

  const [marks, setMarks] = useState<Mark[]>([
    { studentId: '21CS001', name: 'Aarav Kumar', rollNumber: '001', marks: 0, maxMarks: 100 },
    { studentId: '21CS002', name: 'Priya Sharma', rollNumber: '002', marks: 0, maxMarks: 100 },
    { studentId: '21CS003', name: 'Vikram Singh', rollNumber: '003', marks: 0, maxMarks: 100 },
  ]);

  const [payslips] = useState<Payslip[]>([
    {
      month: 'November',
      year: 2025,
      grossSalary: 65000,
      netSalary: 53600,
      daysPresent: 24,
      daysAbsent: 2,
      status: 'PAID',
    },
    {
      month: 'October',
      year: 2025,
      grossSalary: 65000,
      netSalary: 55100,
      daysPresent: 25,
      daysAbsent: 1,
      status: 'PAID',
    },
  ]);

  const handleOpenAttendance = (classSession: ClassSession) => {
    setSelectedClass(classSession);
    setAttendanceDialogOpen(true);
  };

  const handleOpenMarks = (classSession: ClassSession) => {
    setSelectedClass(classSession);
    setMarksDialogOpen(true);
  };

  const handleAttendanceToggle = (studentId: string, status: 'PRESENT' | 'ABSENT' | 'LATE') => {
    setStudents(
      students.map((s) => (s.studentId === studentId ? { ...s, attendance: status } : s))
    );
  };

  const handleMarkAllPresent = () => {
    setStudents(students.map((s) => ({ ...s, attendance: 'PRESENT' })));
  };

  const handleSaveAttendance = () => {
    // API call to save attendance
    console.log('Saving attendance:', students);
    setAttendanceDialogOpen(false);
  };

  const handleMarksChange = (studentId: string, value: number) => {
    setMarks(marks.map((m) => (m.studentId === studentId ? { ...m, marks: value } : m)));
  };

  const handleSaveMarks = () => {
    // API call to save marks
    console.log('Saving marks:', marks);
    setMarksDialogOpen(false);
  };

  return (
    <Box>
      {/* Header */}
      <Paper sx={{ p: 3, mb: 3, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h4" gutterBottom>
          Teacher Portal
        </Typography>
        <Typography variant="body1">
          Welcome, {user?.firstName} {user?.lastName}
        </Typography>
        <Typography variant="caption">Faculty ID: {user?.employeeId || 'E1001'}</Typography>
      </Paper>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
          <Tab label="My Classes" icon={<School />} iconPosition="start" />
          <Tab label="Attendance" icon={<CheckCircle />} iconPosition="start" />
          <Tab label="Marks Entry" icon={<Assessment />} iconPosition="start" />
          <Tab label="Payslips" icon={<AttachMoney />} iconPosition="start" />
        </Tabs>
      </Paper>

      {/* Tab: My Classes */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          {classes.map((cls) => (
            <Grid item xs={12} md={6} key={cls.classId}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {cls.className}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Subject: {cls.subject}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <Schedule fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                    {cls.schedule}
                  </Typography>
                  <Chip label={`${cls.studentCount} Students`} size="small" sx={{ mt: 1 }} />
                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<CheckCircle />}
                      onClick={() => handleOpenAttendance(cls)}
                    >
                      Mark Attendance
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Assessment />}
                      onClick={() => handleOpenMarks(cls)}
                    >
                      Enter Marks
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Tab: Attendance Summary */}
      {tabValue === 1 && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Attendance Summary
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Select a class from "My Classes" tab to mark today's attendance
          </Typography>
        </Paper>
      )}

      {/* Tab: Marks Summary */}
      {tabValue === 2 && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Marks Entry
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Select a class from "My Classes" tab to enter assessment marks
          </Typography>
        </Paper>
      )}

      {/* Tab: Payslips */}
      {tabValue === 3 && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            My Payslips
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell align="right">Days Present</TableCell>
                  <TableCell align="right">Days Absent</TableCell>
                  <TableCell align="right">Gross Salary</TableCell>
                  <TableCell align="right">Net Salary</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payslips.map((slip, idx) => (
                  <TableRow key={idx} hover>
                    <TableCell>{slip.month}</TableCell>
                    <TableCell>{slip.year}</TableCell>
                    <TableCell align="right">{slip.daysPresent}</TableCell>
                    <TableCell align="right">{slip.daysAbsent}</TableCell>
                    <TableCell align="right">₹{slip.grossSalary.toLocaleString()}</TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight="bold">
                        ₹{slip.netSalary.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={slip.status}
                        color={slip.status === 'PAID' ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton size="small" color="primary">
                        <Download />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* Attendance Dialog */}
      <Dialog
        open={attendanceDialogOpen}
        onClose={() => setAttendanceDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Mark Attendance - {selectedClass?.className}
          <Typography variant="caption" display="block">
            {new Date().toLocaleDateString()} - {selectedClass?.subject}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Button variant="outlined" size="small" onClick={handleMarkAllPresent} sx={{ mb: 2 }}>
            Mark All Present
          </Button>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Roll No</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell align="center">Present</TableCell>
                  <TableCell align="center">Absent</TableCell>
                  <TableCell align="center">Late</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.studentId}>
                    <TableCell>{student.rollNumber}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell align="center">
                      <Checkbox
                        checked={student.attendance === 'PRESENT'}
                        onChange={() => handleAttendanceToggle(student.studentId, 'PRESENT')}
                        color="success"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox
                        checked={student.attendance === 'ABSENT'}
                        onChange={() => handleAttendanceToggle(student.studentId, 'ABSENT')}
                        color="error"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox
                        checked={student.attendance === 'LATE'}
                        onChange={() => handleAttendanceToggle(student.studentId, 'LATE')}
                        color="warning"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAttendanceDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveAttendance} startIcon={<Save />}>
            Save Attendance
          </Button>
        </DialogActions>
      </Dialog>

      {/* Marks Entry Dialog */}
      <Dialog open={marksDialogOpen} onClose={() => setMarksDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Enter Marks - {selectedClass?.className}
          <Typography variant="caption" display="block">
            {selectedClass?.subject}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Roll No</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell align="center">Marks Obtained</TableCell>
                  <TableCell align="center">Max Marks</TableCell>
                  <TableCell align="center">Percentage</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {marks.map((mark) => (
                  <TableRow key={mark.studentId}>
                    <TableCell>{mark.rollNumber}</TableCell>
                    <TableCell>{mark.name}</TableCell>
                    <TableCell align="center">
                      <TextField
                        type="number"
                        size="small"
                        value={mark.marks}
                        onChange={(e) => handleMarksChange(mark.studentId, Number(e.target.value))}
                        inputProps={{ min: 0, max: mark.maxMarks, style: { textAlign: 'center' } }}
                        sx={{ width: 80 }}
                      />
                    </TableCell>
                    <TableCell align="center">{mark.maxMarks}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={`${((mark.marks / mark.maxMarks) * 100).toFixed(1)}%`}
                        size="small"
                        color={mark.marks / mark.maxMarks >= 0.4 ? 'success' : 'error'}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMarksDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveMarks} startIcon={<Save />}>
            Save Marks
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
