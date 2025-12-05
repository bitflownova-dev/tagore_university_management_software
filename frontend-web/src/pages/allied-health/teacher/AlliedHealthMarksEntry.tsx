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
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Marks Entry
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Enter and manage student assessment marks
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
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
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Marks Entered
              </Typography>
              <Typography variant="h4" sx={{ color: '#1976D2', fontWeight: 600 }}>
                0/{students.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Avg Marks
              </Typography>
              <Typography variant="h4" sx={{ color: '#1E88E5', fontWeight: 600 }}>
                --
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
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
                  <TableRow key={student.id} hover>
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
          <Button variant="outlined" startIcon={<Download />}>
            Export
          </Button>
          <Button variant="contained" startIcon={<Save />} sx={{ bgcolor: '#1565C0' }}>
            Save Marks
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
