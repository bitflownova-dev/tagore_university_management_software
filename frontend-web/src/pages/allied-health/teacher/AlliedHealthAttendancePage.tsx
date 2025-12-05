import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { useState } from 'react';
import { Save, Download } from '@mui/icons-material';

const students = [
  { id: 1, name: 'Amit Kumar', rollNo: 'AHS2024001', status: 'present' },
  { id: 2, name: 'Priya Singh', rollNo: 'AHS2024002', status: 'present' },
  { id: 3, name: 'Rahul Sharma', rollNo: 'AHS2023045', status: 'absent' },
  { id: 4, name: 'Sneha Patel', rollNo: 'AHS2024003', status: 'present' },
  { id: 5, name: 'Vikram Reddy', rollNo: 'AHS2023067', status: 'late' },
];

export default function AlliedHealthAttendancePage() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState(
    students.reduce((acc, s) => ({ ...acc, [s.id]: s.status }), {})
  );

  const handleStatusChange = (studentId: number, status: string) => {
    setAttendance({ ...attendance, [studentId]: status });
  };

  const presentCount = Object.values(attendance).filter(s => s === 'present').length;
  const absentCount = Object.values(attendance).filter(s => s === 'absent').length;
  const lateCount = Object.values(attendance).filter(s => s === 'late').length;

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Mark Attendance
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          BSc Medical Laboratory Technology - Year 2 - Clinical Biochemistry
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Students
              </Typography>
              <Typography variant="h4" sx={{ color: '#1565C0', fontWeight: 600 }}>
                {students.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Present
              </Typography>
              <Typography variant="h4" sx={{ color: '#2E7D32', fontWeight: 600 }}>
                {presentCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Absent
              </Typography>
              <Typography variant="h4" sx={{ color: '#D32F2F', fontWeight: 600 }}>
                {absentCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Late
              </Typography>
              <Typography variant="h4" sx={{ color: '#F57C00', fontWeight: 600 }}>
                {lateCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ width: 200 }}
          />
          <FormControl sx={{ width: 250 }}>
            <InputLabel>Department</InputLabel>
            <Select value="MLT" label="Department">
              <MenuItem value="MLT">Medical Laboratory Technology</MenuItem>
              <MenuItem value="Radiology">Radiology & Imaging</MenuItem>
              <MenuItem value="Physiotherapy">Physiotherapy</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: 200 }}>
            <InputLabel>Subject</InputLabel>
            <Select value="biochemistry" label="Subject">
              <MenuItem value="biochemistry">Clinical Biochemistry</MenuItem>
              <MenuItem value="hematology">Hematology</MenuItem>
              <MenuItem value="microbiology">Microbiology</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>#</strong></TableCell>
                <TableCell><strong>Roll No</strong></TableCell>
                <TableCell><strong>Student Name</strong></TableCell>
                <TableCell><strong>Attendance Status</strong></TableCell>
                <TableCell><strong>Remarks</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student, index) => (
                <TableRow key={student.id} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{student.rollNo}</TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {student.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                      <Select
                        value={attendance[student.id]}
                        onChange={(e) => handleStatusChange(student.id, e.target.value)}
                      >
                        <MenuItem value="present">
                          <Chip label="Present" size="small" color="success" />
                        </MenuItem>
                        <MenuItem value="absent">
                          <Chip label="Absent" size="small" color="error" />
                        </MenuItem>
                        <MenuItem value="late">
                          <Chip label="Late" size="small" color="warning" />
                        </MenuItem>
                        <MenuItem value="excused">
                          <Chip label="Excused" size="small" color="info" />
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      placeholder="Add remarks..."
                      sx={{ width: 200 }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button variant="outlined" startIcon={<Download />}>
            Export
          </Button>
          <Button variant="contained" startIcon={<Save />} sx={{ bgcolor: '#1565C0' }}>
            Save Attendance
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
