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
} from '@mui/material';
import { Assignment, GetApp } from '@mui/icons-material';

const assessments = [
  { id: 1, name: 'Internal Assessment', year: 'Third Year', subject: 'Medical-Surgical Nursing', maxMarks: 50, type: 'Theory' },
  { id: 2, name: 'Clinical Practical', year: 'Second Year', subject: 'Community Health', maxMarks: 30, type: 'Practical' },
  { id: 3, name: 'Viva Voce', year: 'Third Year', subject: 'OBG Nursing', maxMarks: 20, type: 'Viva' },
  { id: 4, name: 'Midterm Exam', year: 'First Year', subject: 'Nursing Foundation', maxMarks: 100, type: 'Theory' },
];

const assessmentStudents = [
  { id: 1, rollNo: 'NS001', name: 'Priya Sharma', year: 'Third Year', marks: 0 },
  { id: 2, rollNo: 'NS002', name: 'Anjali Kumar', year: 'Third Year', marks: 0 },
  { id: 3, rollNo: 'NS003', name: 'Meera Patel', year: 'Third Year', marks: 0 },
  { id: 4, rollNo: 'NS004', name: 'Kavita Singh', year: 'Third Year', marks: 0 },
  { id: 5, rollNo: 'NS005', name: 'Sunita Reddy', year: 'Third Year', marks: 0 },
];

const getGrade = (percentage: number): string => {
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

export default function NursingMarksEntry() {
  const [selectedAssessment, setSelectedAssessment] = useState('1');
  const [marksData, setMarksData] = useState<Record<number, number>>({});

  const assessment = assessments.find((a) => a.id.toString() === selectedAssessment);
  const marksEntered = Object.keys(marksData).length;
  const pendingMarks = assessmentStudents.length - marksEntered;
  const avgMarks =
    marksEntered > 0
      ? (Object.values(marksData).reduce((sum, marks) => sum + marks, 0) / marksEntered).toFixed(1)
      : '0';

  const handleMarksChange = (studentId: number, marks: string) => {
    const numMarks = parseFloat(marks);
    if (!isNaN(numMarks) && numMarks >= 0 && assessment && numMarks <= assessment.maxMarks) {
      setMarksData((prev) => ({
        ...prev,
        [studentId]: numMarks,
      }));
    }
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Nursing Marks Entry
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Enter marks for theory, practical & clinical assessments
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#2E7D32' }}>
                {assessmentStudents.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Students
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#C8E6C9' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1B5E20' }}>
                {marksEntered}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Marks Entered
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#A5D6A7' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#2E7D32' }}>
                {pendingMarks}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#81C784' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1B5E20' }}>
                {avgMarks}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Average Marks
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Assignment sx={{ mr: 2, color: '#2E7D32' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Marks Entry
            </Typography>
          </Box>
          <Button variant="outlined" startIcon={<GetApp />} sx={{ borderColor: '#2E7D32', color: '#2E7D32' }}>
            Export Marks
          </Button>
        </Box>

        <TextField
          select
          fullWidth
          label="Select Assessment"
          value={selectedAssessment}
          onChange={(e) => setSelectedAssessment(e.target.value)}
          sx={{ mb: 3 }}
        >
          {assessments.map((assessment) => (
            <MenuItem key={assessment.id} value={assessment.id.toString()}>
              {assessment.name} - {assessment.year} - {assessment.subject} ({assessment.maxMarks} marks)
            </MenuItem>
          ))}
        </TextField>

        {assessment && (
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ p: 2, bgcolor: '#E8F5E9', borderRadius: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Assessment Type
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  <Chip label={assessment.type} size="small" sx={{ bgcolor: '#2E7D32', color: 'white' }} />
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ p: 2, bgcolor: '#E8F5E9', borderRadius: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Max Marks
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {assessment.maxMarks}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ p: 2, bgcolor: '#E8F5E9', borderRadius: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Subject
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {assessment.subject}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ p: 2, bgcolor: '#E8F5E9', borderRadius: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Date
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  Dec 4, 2025
                </Typography>
              </Box>
            </Grid>
          </Grid>
        )}

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Roll No</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Year</TableCell>
                <TableCell align="center">Marks Obtained</TableCell>
                <TableCell align="center">Percentage</TableCell>
                <TableCell align="center">Grade</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assessmentStudents.map((student) => {
                const marks = marksData[student.id] || 0;
                const percentage = assessment ? (marks / assessment.maxMarks) * 100 : 0;
                const grade = getGrade(percentage);

                return (
                  <TableRow key={student.id} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{student.rollNo}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>
                      <Chip label={student.year} size="small" color="primary" />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        type="number"
                        value={marksData[student.id] || ''}
                        onChange={(e) => handleMarksChange(student.id, e.target.value)}
                        placeholder="0"
                        sx={{ width: 80 }}
                        inputProps={{
                          min: 0,
                          max: assessment?.maxMarks || 100,
                          step: 0.5,
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">{percentage.toFixed(1)}%</TableCell>
                    <TableCell align="center">
                      <Chip label={grade} size="small" color={getGradeColor(grade)} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" sx={{ bgcolor: '#2E7D32', '&:hover': { bgcolor: '#1B5E20' } }}>
            Submit Marks
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#2E7D32' }}>
          INC Grading System
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          • Distinction: 75% and above
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • First Class: 60-74%
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Second Class: 50-59%
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Pass: 40-49%
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Fail: Below 40%
        </Typography>
      </Paper>
    </Box>
  );
}
