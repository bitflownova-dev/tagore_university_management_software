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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  alpha,
} from '@mui/material';
import { useState } from 'react';
import { Save, Download } from '@mui/icons-material';

const students = [
  { id: 1, name: 'Amit Kumar', rollNo: 'AHS2024001', theory: '', practical: '', internal: '' },
  { id: 2, name: 'Priya Singh', rollNo: 'AHS2024002', theory: '', practical: '', internal: '' },
  { id: 3, name: 'Rahul Sharma', rollNo: 'AHS2023045', theory: '', practical: '', internal: '' },
  { id: 4, name: 'Sneha Patel', rollNo: 'AHS2024003', theory: '', practical: '', internal: '' },
  { id: 5, name: 'Vikram Reddy', rollNo: 'AHS2023067', theory: '', practical: '', internal: '' },
];

export default function AlliedHealthMarksEntry() {
  const [marks, setMarks] = useState(students);

  const handleMarksChange = (id: number, field: string, value: string) => {
    setMarks(marks.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

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
          Marks Entry
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.95)' }}>
          Enter and manage student assessment marks
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
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
        <Grid item xs={12} md={4}>
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
                Marks Entered
              </Typography>
              <Typography variant="h4" sx={{ color: '#00897B', fontWeight: 800, letterSpacing: '-0.01em' }}>
                0/{students.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
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
                Avg Marks
              </Typography>
              <Typography variant="h4" sx={{ color: '#26A69A', fontWeight: 800, letterSpacing: '-0.01em' }}>
                --
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
          <FormControl sx={{ width: 200 }}>
            <InputLabel>Assessment Type</InputLabel>
            <Select value="mid-term" label="Assessment Type">
              <MenuItem value="mid-term">Mid-Term Exam</MenuItem>
              <MenuItem value="practical">Practical Exam</MenuItem>
              <MenuItem value="internal">Internal Assessment</MenuItem>
              <MenuItem value="final">Final Exam</MenuItem>
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
                <TableCell align="center"><strong>Theory (100)</strong></TableCell>
                <TableCell align="center"><strong>Practical (50)</strong></TableCell>
                <TableCell align="center"><strong>Internal (30)</strong></TableCell>
                <TableCell align="center"><strong>Total (180)</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {marks.map((student, index) => {
                const total = (parseInt(student.theory) || 0) + (parseInt(student.practical) || 0) + (parseInt(student.internal) || 0);
                return (
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
                    <TableCell align="center">
                      <TextField
                        size="small"
                        type="number"
                        value={student.theory}
                        onChange={(e) => handleMarksChange(student.id, 'theory', e.target.value)}
                        inputProps={{ min: 0, max: 100 }}
                        sx={{ width: 80 }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        type="number"
                        value={student.practical}
                        onChange={(e) => handleMarksChange(student.id, 'practical', e.target.value)}
                        inputProps={{ min: 0, max: 50 }}
                        sx={{ width: 80 }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        type="number"
                        value={student.internal}
                        onChange={(e) => handleMarksChange(student.id, 'internal', e.target.value)}
                        inputProps={{ min: 0, max: 30 }}
                        sx={{ width: 80 }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {total > 0 ? total : '--'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
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
            Save Marks
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
