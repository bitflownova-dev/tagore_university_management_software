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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
} from '@mui/material';
import { Save, FileDownload } from '@mui/icons-material';

const assessments = [
  { id: 1, type: 'OSCE', name: 'Phase 2 OSCE', date: '2024-12-18', competency: 'IM5.2', maxMarks: 20 },
  { id: 2, type: 'Theory', name: 'Phase 1 Anatomy Block', date: '2024-12-15', competency: 'AN10.1', maxMarks: 100 },
  { id: 3, type: 'Viva', name: 'Phase 3 Medicine Viva', date: '2024-12-20', competency: 'IM8.4', maxMarks: 30 },
  { id: 4, type: 'OSPE', name: 'Phase 2 Surgery OSPE', date: '2024-12-22', competency: 'SU5.1', maxMarks: 25 },
];

const students = [
  { id: 1, rollNo: 'MB001', name: 'Rahul Sharma', phase: 'Phase 1', marks: null },
  { id: 2, rollNo: 'MB002', name: 'Priya Singh', phase: 'Phase 1', marks: null },
  { id: 3, rollNo: 'MB003', name: 'Amit Kumar', phase: 'Phase 1', marks: null },
  { id: 4, rollNo: 'MB004', name: 'Neha Patel', phase: 'Phase 1', marks: null },
  { id: 5, rollNo: 'MB005', name: 'Vikram Reddy', phase: 'Phase 1', marks: null },
];

export default function MedicalMarksEntry() {
  const [selectedAssessment, setSelectedAssessment] = useState(1);
  const [marksData, setMarksData] = useState(students);
  const [openDialog, setOpenDialog] = useState(false);

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
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #D32F2F 0%, #C62828 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          CBME Assessment Marks Entry
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Enter marks for OSCE, OSPE, Viva & Theory assessments
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFEBEE' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#D32F2F' }}>
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
            <Button fullWidth variant="outlined" color="error" startIcon={<FileDownload />} sx={{ height: '56px' }}>
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
                    currentAssessment.type === 'OSCE' || currentAssessment.type === 'OSPE'
                      ? 'error'
                      : currentAssessment.type === 'Viva'
                      ? 'primary'
                      : 'success'
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
                  Competency Code
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {currentAssessment.competency}
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
                <TableCell>CBME Phase</TableCell>
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
                    <TableCell sx={{ fontWeight: 600 }}>{student.rollNo}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>
                      <Chip label={student.phase} size="small" color="error" variant="outlined" />
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
                              : grade === 'First Class'
                              ? 'primary'
                              : grade === 'Pass' || grade === 'Second Class'
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
          <Button variant="contained" color="error" startIcon={<Save />}>
            Save Marks
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#D32F2F' }}>
          CBME Assessment Guidelines
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          • <strong>OSCE (Objective Structured Clinical Examination):</strong> Practical clinical skills assessment
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • <strong>OSPE (Objective Structured Practical Examination):</strong> Laboratory & practical procedures
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • <strong>Viva Voce:</strong> Oral examination for theoretical knowledge
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • <strong>Theory Examination:</strong> Written examination for comprehensive understanding
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          • Minimum 50% marks required to pass in each assessment
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Competency-linked assessments evaluate specific NMC competencies
        </Typography>
      </Paper>
    </Box>
  );
}
