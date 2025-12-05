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
  Chip,
  Button,
  LinearProgress,
} from '@mui/material';
import { Assignment } from '@mui/icons-material';

const assessments = [
  { id: 1, name: 'Internal Assessment', year: 'Third Year', subject: 'English Literature', maxMarks: 50, type: 'Internal' },
  { id: 2, name: 'Practical Exam', year: 'Second Year', subject: 'Chemistry', maxMarks: 30, type: 'Practical' },
  { id: 3, name: 'Viva Voce', year: 'Third Year', subject: 'Economics', maxMarks: 20, type: 'Viva' },
  { id: 4, name: 'Midterm Exam', year: 'First Year', subject: 'Mathematics', maxMarks: 100, type: 'Theory' },
];

const sampleStudents = [
  { rollNo: 'AS001', name: 'Rahul Kumar', year: 'Third Year', marks: 42 },
  { rollNo: 'AS002', name: 'Priya Sharma', year: 'Third Year', marks: 38 },
  { rollNo: 'AS003', name: 'Amit Patel', year: 'Third Year', marks: 35 },
  { rollNo: 'AS004', name: 'Neha Gupta', year: 'Third Year', marks: 45 },
  { rollNo: 'AS005', name: 'Vikram Singh', year: 'Third Year', marks: 40 },
];

export default function ArtsScienceMarksEntry() {
  const [selectedAssessment, setSelectedAssessment] = useState('1');
  const [marksData, setMarksData] = useState(sampleStudents);

  const assessment = assessments.find((a) => a.id === parseInt(selectedAssessment));
  const totalStudents = marksData.length;
  const marksEntered = marksData.filter((s) => s.marks !== undefined && s.marks !== null).length;
  const pending = totalStudents - marksEntered;
  const avgMarks = marksData.reduce((sum, s) => sum + (s.marks || 0), 0) / totalStudents;

  const getGrade = (marks: number, maxMarks: number) => {
    const percentage = (marks / maxMarks) * 100;
    if (percentage >= 75) return 'Distinction';
    if (percentage >= 60) return 'First Class';
    if (percentage >= 50) return 'Second Class';
    if (percentage >= 40) return 'Pass';
    return 'Fail';
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'Distinction':
        return 'success';
      case 'First Class':
      case 'Second Class':
        return 'primary';
      case 'Pass':
        return 'warning';
      default:
        return 'error';
    }
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #5E35B1 0%, #311B92 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Arts & Science Marks Entry
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Enter marks for theory, practical & internal assessments
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#EDE7F6' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#5E35B1' }}>
                {totalStudents}
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
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#388E3C' }}>
                {marksEntered}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Marks Entered
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFEBEE' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#D32F2F' }}>
                {pending}
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
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976D2' }}>
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
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Assignment sx={{ mr: 2, color: '#5E35B1' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Select Assessment
          </Typography>
        </Box>

        <TextField
          select
          fullWidth
          value={selectedAssessment}
          onChange={(e) => setSelectedAssessment(e.target.value)}
          sx={{ mb: 3 }}
        >
          {assessments.map((assessment) => (
            <MenuItem key={assessment.id} value={assessment.id.toString()}>
              {assessment.name} - {assessment.year} - {assessment.subject} (Max: {assessment.maxMarks} marks)
            </MenuItem>
          ))}
        </TextField>

        {assessment && (
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6} sm={3}>
              <Paper sx={{ p: 2, bgcolor: '#EDE7F6' }}>
                <Typography variant="body2" color="text.secondary">
                  Type
                </Typography>
                <Chip
                  label={assessment.type}
                  size="small"
                  color={
                    assessment.type === 'Theory'
                      ? 'warning'
                      : assessment.type === 'Practical'
                      ? 'primary'
                      : 'secondary'
                  }
                  sx={{ mt: 0.5 }}
                />
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper sx={{ p: 2, bgcolor: '#F3E5F5' }}>
                <Typography variant="body2" color="text.secondary">
                  Max Marks
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {assessment.maxMarks}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper sx={{ p: 2, bgcolor: '#E8EAF6' }}>
                <Typography variant="body2" color="text.secondary">
                  Subject
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                  {assessment.subject}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper sx={{ p: 2, bgcolor: '#E1F5FE' }}>
                <Typography variant="body2" color="text.secondary">
                  Date
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  Dec 18, 2024
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        )}

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Roll No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Year</TableCell>
                <TableCell align="center">Marks</TableCell>
                <TableCell align="center">Percentage</TableCell>
                <TableCell align="center">Grade</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {marksData.map((student) => {
                const percentage = assessment ? (student.marks / assessment.maxMarks) * 100 : 0;
                const grade = assessment ? getGrade(student.marks, assessment.maxMarks) : 'N/A';
                return (
                  <TableRow key={student.rollNo} hover>
                    <TableCell sx={{ fontFamily: 'monospace' }}>{student.rollNo}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>
                      <Chip label={student.year} size="small" color="primary" variant="outlined" />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        type="number"
                        size="small"
                        value={student.marks}
                        sx={{ width: 80 }}
                        inputProps={{ min: 0, max: assessment?.maxMarks }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {percentage.toFixed(0)}%
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={percentage}
                          sx={{ width: 60, height: 6, borderRadius: 1 }}
                          color={percentage >= 75 ? 'success' : 'primary'}
                        />
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Chip label={grade} size="small" color={getGradeColor(grade)} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
          <Button variant="outlined">Export Marks</Button>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined">Cancel</Button>
            <Button variant="contained" sx={{ bgcolor: '#5E35B1', '&:hover': { bgcolor: '#311B92' } }}>
              Save Marks
            </Button>
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#5E35B1' }}>
          UGC Grading System
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          <strong>Distinction:</strong> 75% and above
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>First Class:</strong> 60% to 74%
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Second Class:</strong> 50% to 59%
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Pass:</strong> 40% to 49%
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Fail:</strong> Below 40%
        </Typography>
      </Paper>
    </Box>
  );
}
