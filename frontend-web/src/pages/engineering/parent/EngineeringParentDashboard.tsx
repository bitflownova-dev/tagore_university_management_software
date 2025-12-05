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
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import { School, TrendingUp, CheckCircle, Assignment } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const studentInfo = {
  name: 'Rahul Sharma',
  rollNo: 'ENG001',
  semester: 'Sem 5',
  department: 'Computer Science',
  mentorFaculty: 'Dr. Rajesh Kumar',
  currentCGPA: 8.5,
};

const semesterCGPA = [
  { semester: 'Sem 1', cgpa: 8.2 },
  { semester: 'Sem 2', cgpa: 8.3 },
  { semester: 'Sem 3', cgpa: 8.4 },
  { semester: 'Sem 4', cgpa: 8.6 },
  { semester: 'Sem 5', cgpa: 8.5 },
];

const recentExams = [
  { id: 1, exam: 'Mid Semester', subject: 'Data Structures', marks: 42, maxMarks: 50, grade: 'A+' },
  { id: 2, exam: 'Lab Internal', subject: 'Database Lab', marks: 23, maxMarks: 25, grade: 'O' },
  { id: 3, exam: 'Assignment 2', subject: 'Operating Systems', marks: 17, maxMarks: 20, grade: 'A+' },
  { id: 4, exam: 'Quiz 3', subject: 'Computer Networks', marks: 9, maxMarks: 10, grade: 'O' },
];

const currentProjects = [
  { id: 1, name: 'E-Commerce Web Application', subject: 'Web Development', status: 'In Progress', completion: 75 },
  { id: 2, name: 'Machine Learning Model', subject: 'ML Project', status: 'In Progress', completion: 60 },
  { id: 3, name: 'Database Management System', subject: 'DBMS Project', status: 'Completed', completion: 100 },
];

const upcomingExams = [
  { id: 1, exam: 'End Semester', subject: 'Data Structures', date: '2024-12-20' },
  { id: 2, exam: 'Practical Exam', subject: 'Database Lab', date: '2024-12-22' },
  { id: 3, exam: 'Mid Semester', subject: 'Software Engineering', date: '2024-12-24' },
];

const feeStatus = {
  totalFees: 96000,
  amountPaid: 96000,
  pendingDues: 0,
  nextDueDate: 'January 15, 2025',
};

export default function EngineeringParentDashboard() {
  const theoryAttendance = 92;
  const labAttendance = 88;
  const overallAttendance = 90;

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #1976D2 0%, #1565C0 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Parent Dashboard - Engineering
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Track your child's academic progress & performance
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <School sx={{ mr: 2, color: '#1976D2' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Student Information
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2" color="text.secondary">
              Name
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {studentInfo.name}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2" color="text.secondary">
              Roll Number
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
              {studentInfo.rollNo}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2" color="text.secondary">
              Current Semester
            </Typography>
            <Chip label={studentInfo.semester} size="small" color="primary" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2" color="text.secondary">
              Department
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {studentInfo.department}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2" color="text.secondary">
              Mentor Faculty
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {studentInfo.mentorFaculty}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2" color="text.secondary">
              Current CGPA
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#388E3C' }}>
              {studentInfo.currentCGPA}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <TrendingUp sx={{ mr: 2, color: '#1976D2' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                CGPA Progress
              </Typography>
            </Box>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={semesterCGPA}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="semester" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Line type="monotone" dataKey="cgpa" stroke="#1976D2" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <CheckCircle sx={{ mr: 2, color: '#1976D2' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Attendance Overview
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Theory Classes: {theoryAttendance}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={theoryAttendance}
                  sx={{ height: 10, borderRadius: 5, bgcolor: '#E0E0E0' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Lab Sessions: {labAttendance}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={labAttendance}
                  sx={{ height: 10, borderRadius: 5, bgcolor: '#E0E0E0' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Overall Attendance: {overallAttendance}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={overallAttendance}
                  sx={{ height: 10, borderRadius: 5, bgcolor: '#E0E0E0' }}
                  color="success"
                />
              </Grid>
              <Grid item xs={12}>
                <Card sx={{ bgcolor: '#E8F5E9', mt: 2 }}>
                  <CardContent>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#388E3C' }}>
                      ✓ Meets AICTE 75% Attendance Requirement
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Recent Exam Results
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Exam Type</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell align="center">Marks Obtained</TableCell>
                <TableCell align="center">Maximum Marks</TableCell>
                <TableCell align="center">Percentage</TableCell>
                <TableCell align="center">Grade</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentExams.map((exam) => {
                const percentage = (exam.marks / exam.maxMarks) * 100;
                return (
                  <TableRow key={exam.id} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{exam.exam}</TableCell>
                    <TableCell>{exam.subject}</TableCell>
                    <TableCell align="center">{exam.marks}</TableCell>
                    <TableCell align="center">{exam.maxMarks}</TableCell>
                    <TableCell align="center">{percentage.toFixed(1)}%</TableCell>
                    <TableCell align="center">
                      <Chip label={exam.grade} size="small" color="success" />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Assignment sx={{ mr: 2, color: '#1976D2' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Current Projects
              </Typography>
            </Box>
            {currentProjects.map((project) => (
              <Box key={project.id} sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {project.name}
                  </Typography>
                  <Chip
                    label={project.status}
                    size="small"
                    color={project.status === 'Completed' ? 'success' : 'primary'}
                  />
                </Box>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                  {project.subject}
                </Typography>
                <LinearProgress variant="determinate" value={project.completion} />
                <Typography variant="caption" color="text.secondary">
                  {project.completion}% Complete
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Upcoming Exams
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Exam Type</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {upcomingExams.map((exam) => (
                    <TableRow key={exam.id} hover>
                      <TableCell sx={{ fontWeight: 600 }}>{exam.exam}</TableCell>
                      <TableCell>{exam.subject}</TableCell>
                      <TableCell>{exam.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Fee Payment Status
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#E3F2FD' }}>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Total Semester Fees
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976D2' }}>
                  ₹{feeStatus.totalFees.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#E8F5E9' }}>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Amount Paid
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#388E3C' }}>
                  ₹{feeStatus.amountPaid.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#FFEBEE' }}>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Pending Dues
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#D32F2F' }}>
                  ₹{feeStatus.pendingDues.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#FFF3E0' }}>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Next Due Date
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#F57C00' }}>
                  {feeStatus.nextDueDate}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
