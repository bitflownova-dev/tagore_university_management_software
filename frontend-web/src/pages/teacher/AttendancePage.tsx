import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
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
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';

export default function AttendancePage() {
  const [selectedClass, setSelectedClass] = useState('CS-3A');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [openDialog, setOpenDialog] = useState(false);

  const students = [
    { id: 1, rollNo: 'CS2021001', name: 'Amit Kumar', present: true },
    { id: 2, rollNo: 'CS2021002', name: 'Priya Singh', present: true },
    { id: 3, rollNo: 'CS2021003', name: 'Rahul Sharma', present: false },
    { id: 4, rollNo: 'CS2021004', name: 'Sneha Patel', present: true },
    { id: 5, rollNo: 'CS2021005', name: 'Vikram Joshi', present: true },
  ];

  const [attendance, setAttendance] = useState(students);

  const handleToggle = (id: number) => {
    setAttendance((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, present: !student.present } : student
      )
    );
  };

  const presentCount = attendance.filter((s) => s.present).length;
  const percentage = ((presentCount / attendance.length) * 100).toFixed(1);

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Mark Attendance
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Students
              </Typography>
              <Typography variant="h3" fontWeight="bold">
                {attendance.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Present Today
              </Typography>
              <Typography variant="h3" fontWeight="bold" color="success.main">
                {presentCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Attendance %
              </Typography>
              <Typography variant="h3" fontWeight="bold" color="primary.main">
                {percentage}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            select
            label="Select Class"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="CS-3A">CS-3A (Data Structures)</MenuItem>
            <MenuItem value="CS-3B">CS-3B (DBMS)</MenuItem>
            <MenuItem value="CS-4A">CS-4A (OS)</MenuItem>
          </TextField>
          <TextField
            label="Date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <Button variant="outlined" onClick={() => setOpenDialog(true)}>
            View History
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Roll No</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Mark</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendance.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.rollNo}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={student.present ? 'Present' : 'Absent'}
                      color={student.present ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={student.present}
                      onChange={() => handleToggle(student.id)}
                      color="success"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button variant="contained" startIcon={<SaveIcon />} size="large">
            Submit Attendance
          </Button>
        </Box>
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Attendance History - {selectedClass}</DialogTitle>
        <DialogContent>
          <Typography>Attendance records for the selected class will appear here.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
