import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import { School, Assessment, EventAvailable, Assignment } from '@mui/icons-material';

const studentInfo = {
  name: 'Rahul Sharma',
  rollNo: 'MB001',
  phase: 'Phase 2',
  currentRotation: 'Medicine Ward',
  mentor: 'Dr. Priya Singh',
};

const competencyProgress = [
  { phase: 'Phase 1', completed: 210, total: 250, percentage: 84 },
  { phase: 'Phase 2', completed: 273, total: 350, percentage: 78 },
  { phase: 'Phase 3 Part 1', completed: 0, total: 400, percentage: 0 },
  { phase: 'Phase 3 Part 2', completed: 0, total: 300, percentage: 0 },
];

const recentAssessments = [
  { name: 'Phase 2 Medicine OSCE', date: '2024-12-10', marks: 16, maxMarks: 20, percentage: 80, grade: 'Distinction' },
  { name: 'Phase 2 Pathology Viva', date: '2024-12-05', marks: 22, maxMarks: 30, percentage: 73, grade: 'First Class' },
  { name: 'Phase 2 Block Assessment', date: '2024-11-28', marks: 72, maxMarks: 100, percentage: 72, grade: 'First Class' },
];

const attendanceData = [
  { type: 'Clinical Postings', attended: 88, total: 95, percentage: 93 },
  { type: 'Theory Classes', attended: 82, total: 90, percentage: 91 },
  { type: 'Practical Sessions', attended: 45, total: 48, percentage: 94 },
];

const upcomingRotations = [
  { department: 'Surgery', startDate: '2024-12-20', endDate: '2025-01-31', duration: '6 weeks' },
  { department: 'Pediatrics', startDate: '2025-02-01', endDate: '2025-03-15', duration: '6 weeks' },
];

export default function MedicalParentDashboard() {
  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #D32F2F 0%, #C62828 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          MBBS Student Progress Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          {studentInfo.name} - Roll No: {studentInfo.rollNo}
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <School sx={{ mr: 2, color: '#D32F2F', fontSize: 32 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Current Phase
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    CBME Academic Year
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ p: 2, bgcolor: '#FFEBEE', borderRadius: 1, mb: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#D32F2F' }}>
                  {studentInfo.phase}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Current Rotation: <strong>{studentInfo.currentRotation}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Faculty Mentor: <strong>{studentInfo.mentor}</strong>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EventAvailable sx={{ mr: 2, color: '#1976D2', fontSize: 32 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Overall Attendance
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    NMC Requirement: 75% minimum
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ p: 2, bgcolor: '#E3F2FD', borderRadius: 1, mb: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976D2' }}>
                  92%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={92}
                color="success"
                sx={{ height: 10, borderRadius: 5 }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Attendance status: <Chip label="Excellent" size="small" color="success" />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          CBME Competency Progress
        </Typography>
        {competencyProgress.map((phase) => (
          <Box key={phase.phase} sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {phase.phase}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {phase.completed} / {phase.total} competencies ({phase.percentage}%)
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={phase.percentage}
              color={phase.percentage >= 80 ? 'success' : phase.percentage >= 70 ? 'primary' : phase.percentage > 0 ? 'warning' : 'inherit'}
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Box>
        ))}
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Attendance Breakdown
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Session Type</TableCell>
                <TableCell align="center">Attended</TableCell>
                <TableCell align="center">Total Sessions</TableCell>
                <TableCell align="center">Percentage</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceData.map((item) => (
                <TableRow key={item.type} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{item.type}</TableCell>
                  <TableCell align="center">{item.attended}</TableCell>
                  <TableCell align="center">{item.total}</TableCell>
                  <TableCell align="center">{item.percentage}%</TableCell>
                  <TableCell>
                    <Chip
                      label={item.percentage >= 75 ? 'Good Standing' : 'Below Required'}
                      size="small"
                      color={item.percentage >= 75 ? 'success' : 'error'}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Recent Assessment Results
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Assessment Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="center">Marks Obtained</TableCell>
                <TableCell align="center">Max Marks</TableCell>
                <TableCell align="center">Percentage</TableCell>
                <TableCell>Grade</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentAssessments.map((assessment, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{assessment.name}</TableCell>
                  <TableCell>{assessment.date}</TableCell>
                  <TableCell align="center">{assessment.marks}</TableCell>
                  <TableCell align="center">{assessment.maxMarks}</TableCell>
                  <TableCell align="center">{assessment.percentage}%</TableCell>
                  <TableCell>
                    <Chip
                      label={assessment.grade}
                      size="small"
                      color={
                        assessment.grade === 'Distinction'
                          ? 'success'
                          : assessment.grade === 'First Class'
                          ? 'primary'
                          : 'warning'
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Upcoming Clinical Rotations
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Department</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Duration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {upcomingRotations.map((rotation, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{rotation.department}</TableCell>
                  <TableCell>{rotation.startDate}</TableCell>
                  <TableCell>{rotation.endDate}</TableCell>
                  <TableCell>
                    <Chip label={rotation.duration} size="small" color="error" variant="outlined" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
