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
  Card,
  CardContent,
} from '@mui/material';
import { Save, FileDownload } from '@mui/icons-material';

const assessments = [
  { id: 1, type: 'Internal', name: 'BDS 3rd Year Internal Exam', date: '2024-12-18', subject: 'Conservative Dentistry', maxMarks: 50 },
  { id: 2, type: 'Clinical', name: 'Clinical Assessment - 4th Year', date: '2024-12-20', subject: 'Oral Surgery', maxMarks: 100 },
  { id: 3, type: 'Practical', name: 'Practical Exam - 2nd Year', date: '2024-12-22', subject: 'Dental Materials', maxMarks: 25 },
  { id: 4, type: 'Viva', name: 'Viva Voce - Prosthodontics', date: '2024-12-15', subject: 'Prosthodontics', maxMarks: 20 },
];

const students = [
  { id: 1, rollNo: 'DEN001', name: 'Rahul Sharma', year: '3rd Year BDS', marks: null as number | null },
  { id: 2, rollNo: 'DEN002', name: 'Priya Singh', year: '3rd Year BDS', marks: null as number | null },
  { id: 3, rollNo: 'DEN003', name: 'Amit Kumar', year: '3rd Year BDS', marks: null as number | null },
  { id: 4, rollNo: 'DEN004', name: 'Neha Patel', year: '3rd Year BDS', marks: null as number | null },
  { id: 5, rollNo: 'DEN005', name: 'Vikram Reddy', year: '3rd Year BDS', marks: null as number | null },
];

export default function DentalMarksEntry() {
  const [selectedAssessment, setSelectedAssessment] = useState(1);
  const [marksData, setMarksData] = useState(students);

  const handleMarksChange = (studentId: number, marks: string) => {
    const numMarks = marks === '' ? null : Number(marks);
    setMarksData((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, marks: numMarks } : student
      )
    );
  };

  const currentAssessment = assessments.find((a) => a.id === selectedAssessment);
  const enteredCount = marksData.filter((s) => s.marks !== null).length;
  const avgMarks = marksData.filter((s) => s.marks !== null).reduce((sum, s) => sum + (s.marks || 0), 0) / (enteredCount || 1);

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #00796B 0%, #004D40 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Dental Marks Entry
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Enter marks for theory, clinical & practical assessments
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E0F2F1' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#00796B' }}>
                {marksData.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Students
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#388E3C' }}>
                {enteredCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Marks Entered
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFF3E0' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#F57C00' }}>
                {marksData.length - enteredCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E3F2FD' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976D2' }}>
                {avgMarks.toFixed(1)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Average Marks
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Select Assessment
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={8}>
            <TextField
              select
              fullWidth
              label="Assessment"
              value={selectedAssessment}
              onChange={(e) => setSelectedAssessment(Number(e.target.value))}
            >
              {assessments.map((assessment) => (
                <MenuItem key={assessment.id} value={assessment.id}>
                  {assessment.name} - {assessment.date} ({assessment.type})
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button fullWidth variant="outlined" startIcon={<FileDownload />} sx={{ height: '56px' }}>
              Export Marks
            </Button>
          </Grid>
        </Grid>

        {currentAssessment && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ p: 2, bgcolor: '#F5F5F5', borderRadius: 1 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Assessment Type
                </Typography>
                <Chip
                  label={currentAssessment.type}
                  size="small"
                  color={
                    currentAssessment.type === 'Clinical'
                      ? 'primary'
                      : currentAssessment.type === 'Internal'
                      ? 'success'
                      : 'warning'
                  }
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ p: 2, bgcolor: '#F5F5F5', borderRadius: 1 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Maximum Marks
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {currentAssessment.maxMarks}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ p: 2, bgcolor: '#F5F5F5', borderRadius: 1 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Subject
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {currentAssessment.subject}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ p: 2, bgcolor: '#F5F5F5', borderRadius: 1 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Assessment Date
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {currentAssessment.date}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        )}
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Enter Marks
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Roll No</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Academic Year</TableCell>
                <TableCell>Marks Obtained (Out of {currentAssessment?.maxMarks})</TableCell>
                <TableCell align="center">Percentage</TableCell>
                <TableCell align="center">Grade</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {marksData.map((student) => {
                const percentage = student.marks !== null && currentAssessment
                  ? (student.marks / currentAssessment.maxMarks) * 100
                  : 0;
                const grade =
                  percentage >= 75
                    ? 'Distinction'
                    : percentage >= 60
                    ? 'First Class'
                    : percentage >= 50
                    ? 'Second Class'
                    : percentage >= 40
                    ? 'Pass'
                    : 'Fail';

                return (
                  <TableRow key={student.id} hover>
                    <TableCell sx={{ fontWeight: 600, fontFamily: 'monospace' }}>{student.rollNo}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>
                      <Chip label={student.year} size="small" color="primary" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        size="small"
                        value={student.marks === null ? '' : student.marks}
                        onChange={(e) => handleMarksChange(student.id, e.target.value)}
                        inputProps={{
                          min: 0,
                          max: currentAssessment?.maxMarks,
                        }}
                        sx={{ width: 120 }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {student.marks !== null ? `${percentage.toFixed(1)}%` : '-'}
                    </TableCell>
                    <TableCell align="center">
                      {student.marks !== null ? (
                        <Chip
                          label={grade}
                          size="small"
                          color={
                            grade === 'Distinction'
                              ? 'success'
                              : grade === 'First Class' || grade === 'Second Class'
                              ? 'primary'
                              : grade === 'Pass'
                              ? 'warning'
                              : 'error'
                          }
                        />
                      ) : (
                        '-'
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
          <Button variant="outlined">Cancel</Button>
          <Button variant="contained" sx={{ bgcolor: '#00796B', '&:hover': { bgcolor: '#004D40' } }} startIcon={<Save />}>
            Save Marks
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#00796B' }}>
          DCI Grading System
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          • <strong>Distinction:</strong> 75% and above
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • <strong>First Class:</strong> 60-74%
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • <strong>Second Class:</strong> 50-59%
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • <strong>Pass:</strong> 40-49%
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • <strong>Fail:</strong> Below 40%
        </Typography>
      </Paper>
    </Box>
  );
}
