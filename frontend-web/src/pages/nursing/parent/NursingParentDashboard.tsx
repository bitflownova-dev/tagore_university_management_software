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
import { School, Assessment, CalendarToday, Receipt } from '@mui/icons-material';

const studentInfo = {
  name: 'Priya Sharma',
  rollNo: 'NS001',
  year: 'Third Year',
  program: 'B.Sc Nursing',
  mentor: 'Dr. Anjali Verma',
  currentPercentage: 85,
};

const percentageProgress = [
  { year: 'First Year', percentage: 78, rank: 15 },
  { year: 'Second Year', percentage: 82, rank: 12 },
  { year: 'Third Year', percentage: 85, rank: 8 },
];

const attendanceOverview = [
  { sessionType: 'Clinical Training', percentage: 95, total: 120, attended: 114 },
  { sessionType: 'Practical Sessions', percentage: 88, total: 80, attended: 70 },
  { sessionType: 'Theory Classes', percentage: 92, total: 150, attended: 138 },
];

const recentAssessments = [
  { exam: 'Internal Assessment', subject: 'Medical-Surgical', marks: 42, maxMarks: 50, percentage: 84, grade: 'Distinction' },
  { exam: 'Clinical Evaluation', subject: 'Community Health', marks: 27, maxMarks: 30, percentage: 90, grade: 'Distinction' },
  { exam: 'Viva Voce', subject: 'OBG Nursing', marks: 17, maxMarks: 20, percentage: 85, grade: 'Distinction' },
];

const upcomingExams = [
  { date: 'Dec 20, 2025', exam: 'Midterm', subject: 'Mental Health Nursing', type: 'Theory' },
  { date: 'Dec 22, 2025', exam: 'Practical Exam', subject: 'Child Health Nursing', type: 'Practical' },
];

export default function NursingParentDashboard() {
  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Nursing Parent Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Academic progress, clinical training & performance monitoring
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 3, bgcolor: '#E8F5E9' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <School sx={{ mr: 2, color: '#2E7D32', fontSize: 32 }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {studentInfo.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {studentInfo.rollNo} • {studentInfo.year} • {studentInfo.program}
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Mentor Faculty
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {studentInfo.mentor}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Current Percentage
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#2E7D32' }}>
              {studentInfo.currentPercentage}%
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Assessment sx={{ mr: 2, color: '#2E7D32' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Academic Performance Progress
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Academic Year</TableCell>
                <TableCell align="center">Percentage</TableCell>
                <TableCell align="center">Rank</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {percentageProgress.map((item, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{item.year}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={item.percentage}
                          sx={{
                            height: 8,
                            borderRadius: 1,
                            bgcolor: '#E8F5E9',
                            '& .MuiLinearProgress-bar': { bgcolor: '#2E7D32' },
                          }}
                        />
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 45 }}>
                        {item.percentage}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Chip label={`Rank ${item.rank}`} size="small" sx={{ bgcolor: '#2E7D32', color: 'white' }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
          Attendance Overview
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Session Type</TableCell>
                <TableCell align="center">Attended / Total</TableCell>
                <TableCell align="center">Percentage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceOverview.map((item, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{item.sessionType}</TableCell>
                  <TableCell align="center">
                    {item.attended} / {item.total}
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={item.percentage}
                          sx={{
                            height: 8,
                            borderRadius: 1,
                            bgcolor: '#E8F5E9',
                            '& .MuiLinearProgress-bar': { bgcolor: item.percentage >= 75 ? '#2E7D32' : '#C62828' },
                          }}
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          minWidth: 45,
                          color: item.percentage >= 75 ? '#2E7D32' : '#C62828',
                        }}
                      >
                        {item.percentage}%
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Recent Assessment Results
            </Typography>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Exam</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell align="center">Marks</TableCell>
                    <TableCell align="center">Grade</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentAssessments.map((assessment, index) => (
                    <TableRow key={index} hover>
                      <TableCell sx={{ fontWeight: 600 }}>{assessment.exam}</TableCell>
                      <TableCell>{assessment.subject}</TableCell>
                      <TableCell align="center">
                        {assessment.marks}/{assessment.maxMarks}
                      </TableCell>
                      <TableCell align="center">
                        <Chip label={assessment.grade} size="small" sx={{ bgcolor: '#2E7D32', color: 'white' }} />
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
              <CalendarToday sx={{ mr: 2, color: '#2E7D32' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Upcoming Exams
              </Typography>
            </Box>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Exam</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {upcomingExams.map((exam, index) => (
                    <TableRow key={index} hover>
                      <TableCell sx={{ fontWeight: 600 }}>{exam.date}</TableCell>
                      <TableCell>{exam.exam}</TableCell>
                      <TableCell>{exam.subject}</TableCell>
                      <TableCell>
                        <Chip
                          label={exam.type}
                          size="small"
                          sx={{
                            bgcolor: exam.type === 'Theory' ? '#66BB6A' : '#388E3C',
                            color: 'white',
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Receipt sx={{ mr: 2, color: '#2E7D32' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Fee Status
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ bgcolor: '#E8F5E9' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#2E7D32' }}>
                  ₹3,40,000
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Fees (4 Years)
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ bgcolor: '#C8E6C9' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1B5E20' }}>
                  ₹1,27,500
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Amount Paid
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ bgcolor: '#A5D6A7' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#C62828' }}>
                  ₹2,12,500
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pending Dues
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
