import {
  Box,
  Paper,
  Typography,
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
  LinearProgress,
} from '@mui/material';
import { Person, School, EventNote } from '@mui/icons-material';

const studentInfo = {
  name: 'Rahul Kumar',
  rollNo: 'AS001',
  year: 'Third Year',
  program: 'BA English',
  mentor: 'Dr. Sarah Williams',
  currentPercentage: 78.5,
  overallAttendance: 92,
};

const percentageHistory = [
  { year: 'First Year', percentage: 75, rank: 12 },
  { year: 'Second Year', percentage: 76.5, rank: 10 },
  { year: 'Third Year (Current)', percentage: 78.5, rank: 8 },
];

const attendanceDetails = [
  { type: 'Theory Sessions', attended: 88, total: 95, percentage: 92.6 },
  { type: 'Practical Sessions', attended: 42, total: 45, percentage: 93.3 },
];

const recentExams = [
  { exam: 'BA 3rd Year - Internal Assessment', subject: 'English Literature', marks: 42, maxMarks: 50, percentage: 84, grade: 'Distinction' },
  { exam: 'BA 3rd Year - Practical Exam', subject: 'English', marks: 27, maxMarks: 30, percentage: 90, grade: 'Distinction' },
  { exam: 'BA 3rd Year - Midterm', subject: 'History', marks: 68, maxMarks: 100, percentage: 68, grade: 'First Class' },
];

const upcomingAssessments = [
  { date: '2024-12-20', exam: 'BA 3rd Year Finals', subject: 'English Literature', type: 'Theory' },
  { date: '2024-12-22', exam: 'BA 3rd Year Practical', subject: 'English', type: 'Practical' },
  { date: '2024-12-25', exam: 'BA 3rd Year Viva', subject: 'History', type: 'Viva' },
];

const feeStatus = {
  totalFees: 145000,
  paid: 93000,
  pending: 52000,
  status: 'Partially Paid',
};

export default function ArtsScienceParentDashboard() {
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
          Student Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Academic progress & attendance tracking
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Person sx={{ mr: 2, color: '#5E35B1' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Student Information
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Name
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {studentInfo.name}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Roll Number
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
                {studentInfo.rollNo}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Current Year
              </Typography>
              <Chip label={studentInfo.year} color="primary" size="small" sx={{ mt: 0.5 }} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Program
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {studentInfo.program}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Mentor
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {studentInfo.mentor}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Current Percentage
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#5E35B1' }}>
                {studentInfo.currentPercentage}%
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <School sx={{ mr: 2, color: '#5E35B1' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Percentage Progress
              </Typography>
            </Box>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Academic Year</TableCell>
                    <TableCell align="right">Percentage</TableCell>
                    <TableCell align="right">Rank</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {percentageHistory.map((record) => (
                    <TableRow key={record.year} hover>
                      <TableCell>
                        <Chip label={record.year} size="small" color="primary" variant="outlined" />
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 45 }}>
                            {record.percentage}%
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={record.percentage}
                            sx={{ width: 80, height: 8, borderRadius: 1 }}
                            color={record.percentage >= 75 ? 'success' : 'primary'}
                          />
                        </Box>
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>
                        #{record.rank}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <EventNote sx={{ mr: 2, color: '#5E35B1' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Attendance Overview
              </Typography>
            </Box>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Session Type</TableCell>
                    <TableCell align="right">Attendance</TableCell>
                    <TableCell align="right">Percentage</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendanceDetails.map((att) => (
                    <TableRow key={att.type} hover>
                      <TableCell>{att.type}</TableCell>
                      <TableCell align="right">
                        {att.attended}/{att.total}
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 45 }}>
                            {att.percentage.toFixed(1)}%
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={att.percentage}
                            sx={{ width: 80, height: 8, borderRadius: 1 }}
                            color={att.percentage >= 75 ? 'success' : 'error'}
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Overall Attendance</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>
                      {attendanceDetails.reduce((sum, att) => sum + att.attended, 0)}/
                      {attendanceDetails.reduce((sum, att) => sum + att.total, 0)}
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, minWidth: 45 }}>
                          {studentInfo.overallAttendance}%
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={studentInfo.overallAttendance}
                          sx={{ width: 80, height: 8, borderRadius: 1 }}
                          color={studentInfo.overallAttendance >= 75 ? 'success' : 'error'}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Recent Exam Results
        </Typography>

        <TableContainer sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Exam Name</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell align="right">Marks Obtained</TableCell>
                <TableCell align="right">Percentage</TableCell>
                <TableCell align="center">Grade</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentExams.map((exam, index) => (
                <TableRow key={index} hover>
                  <TableCell>{exam.exam}</TableCell>
                  <TableCell>{exam.subject}</TableCell>
                  <TableCell align="right">
                    {exam.marks}/{exam.maxMarks}
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {exam.percentage}%
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={exam.percentage}
                        sx={{ width: 100, height: 8, borderRadius: 1 }}
                        color={exam.percentage >= 75 ? 'success' : 'primary'}
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Chip label={exam.grade} size="small" color={getGradeColor(exam.grade)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Upcoming Assessments
            </Typography>

            <TableContainer sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Exam Name</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {upcomingAssessments.map((assessment, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{assessment.date}</TableCell>
                      <TableCell>{assessment.exam}</TableCell>
                      <TableCell>{assessment.subject}</TableCell>
                      <TableCell>
                        <Chip
                          label={assessment.type}
                          size="small"
                          color={assessment.type === 'Theory' ? 'warning' : 'primary'}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: feeStatus.pending > 0 ? '#FFEBEE' : '#E8F5E9' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Fee Status
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Fees: ₹{feeStatus.totalFees.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Paid: ₹{feeStatus.paid.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending: ₹{feeStatus.pending.toLocaleString()}
              </Typography>
              <Chip
                label={feeStatus.status}
                size="small"
                color={feeStatus.pending === 0 ? 'success' : 'warning'}
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
