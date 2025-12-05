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
  alpha,
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
  const [attendance, setAttendance] = useState<Record<number, string>>(
    students.reduce((acc, s) => ({ ...acc, [s.id]: s.status }), {})
  );

  const handleStatusChange = (studentId: number, status: string) => {
    setAttendance({ ...attendance, [studentId]: status });
  };

  const presentCount = Object.values(attendance).filter(s => s === 'present').length;
  const absentCount = Object.values(attendance).filter(s => s === 'absent').length;
  const lateCount = Object.values(attendance).filter(s => s === 'late').length;

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
          Mark Attendance
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.95)' }}>
          BSc Medical Laboratory Technology - Year 2 - Clinical Biochemistry
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
                Total Students
              </Typography>
              <Typography variant="h4" sx={{ color: '#00BFA5', fontWeight: 800, letterSpacing: '-0.01em' }}>
                {students.length}
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
                Present
              </Typography>
              <Typography variant="h4" sx={{ color: '#26A69A', fontWeight: 800, letterSpacing: '-0.01em' }}>
                {presentCount}
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
                Absent
              </Typography>
              <Typography variant="h4" sx={{ color: '#EF5350', fontWeight: 800, letterSpacing: '-0.01em' }}>
                {absentCount}
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
                Late
              </Typography>
              <Typography variant="h4" sx={{ color: '#FFA726', fontWeight: 800, letterSpacing: '-0.01em' }}>
                {lateCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
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
                <TableRow 
                  key={student.id} 
                  sx={{
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: alpha('#00BFA5', 0.04),
                    },
                  }}
                >
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
          <Button 
            variant="outlined" 
            startIcon={<Download />}
            sx={{
              borderColor: '#00BFA5',
              color: '#00BFA5',
              '&:hover': {
                borderColor: '#00897B',
                bgcolor: alpha('#00BFA5', 0.08),
              },
            }}
          >
            Export
          </Button>
          <Button 
            variant="contained" 
            startIcon={<Save />} 
            sx={{ 
              bgcolor: '#00BFA5',
              '&:hover': {
                bgcolor: '#00897B',
              },
            }}
          >
            Save Attendance
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
