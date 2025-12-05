import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  LinearProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  TrendingUp,
  Assessment,
  AttachMoney,
  CalendarToday,
  School,
  Notifications,
} from '@mui/icons-material';
import { useAuthStore } from '../../stores/authStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface AttendanceData {
  subject: string;
  present: number;
  total: number;
  percentage: number;
}

interface MarksData {
  subject: string;
  marks: number;
  maxMarks: number;
  grade: string;
}

interface FeeData {
  description: string;
  amount: number;
  paid: number;
  pending: number;
  dueDate: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
}

export default function StudentDashboard() {
  const { user } = useAuthStore();
  
  const [attendanceData] = useState<AttendanceData[]>([
    { subject: 'Data Structures', present: 42, total: 48, percentage: 87.5 },
    { subject: 'Database Management', present: 45, total: 48, percentage: 93.8 },
    { subject: 'Web Technologies', present: 40, total: 48, percentage: 83.3 },
    { subject: 'Operating Systems', present: 44, total: 48, percentage: 91.7 },
  ]);

  const [marksData] = useState<MarksData[]>([
    { subject: 'Data Structures', marks: 85, maxMarks: 100, grade: 'A' },
    { subject: 'Database Management', marks: 92, maxMarks: 100, grade: 'A+' },
    { subject: 'Web Technologies', marks: 78, maxMarks: 100, grade: 'B+' },
    { subject: 'Operating Systems', marks: 88, maxMarks: 100, grade: 'A' },
  ]);

  const [feeData] = useState<FeeData[]>([
    {
      description: 'Tuition Fee - Semester 1',
      amount: 45000,
      paid: 45000,
      pending: 0,
      dueDate: '2025-08-15',
      status: 'PAID',
    },
    {
      description: 'Hostel Fee - Semester 1',
      amount: 25000,
      paid: 25000,
      pending: 0,
      dueDate: '2025-08-15',
      status: 'PAID',
    },
    {
      description: 'Tuition Fee - Semester 2',
      amount: 45000,
      paid: 0,
      pending: 45000,
      dueDate: '2026-01-15',
      status: 'PENDING',
    },
  ]);

  const overallAttendance = Math.round(
    (attendanceData.reduce((sum, item) => sum + item.present, 0) /
      attendanceData.reduce((sum, item) => sum + item.total, 0)) *
      100
  );

  const cgpa = (
    marksData.reduce((sum, item) => sum + (item.marks / item.maxMarks) * 10, 0) / marksData.length
  ).toFixed(2);

  const totalPending = feeData.reduce((sum, item) => sum + item.pending, 0);

  const chartData = marksData.map(item => ({
    subject: item.subject.split(' ').slice(0, 2).join(' '),
    percentage: Math.round((item.marks / item.maxMarks) * 100),
  }));

  return (
    <Box>
      {/* Header */}
      <Paper sx={{ p: 3, mb: 3, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h4" gutterBottom>
          Student Portal
        </Typography>
        <Typography variant="body1">
          Welcome, {user?.firstName} {user?.lastName}
        </Typography>
        <Typography variant="caption">
          Student ID: {user?.studentId || '21CS042'} | BCA Year 2 - Section A
        </Typography>
      </Paper>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="textSecondary" variant="caption">
                    Overall Attendance
                  </Typography>
                  <Typography variant="h4">{overallAttendance}%</Typography>
                  <Typography variant="caption" color={overallAttendance >= 75 ? 'success.main' : 'error'}>
                    {overallAttendance >= 75 ? 'Good Standing' : 'Below 75%'}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: overallAttendance >= 75 ? 'success.main' : 'error.main' }}>
                  <CheckCircle />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="textSecondary" variant="caption">
                    CGPA
                  </Typography>
                  <Typography variant="h4">{cgpa}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Out of 10.0
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                  <Assessment />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="textSecondary" variant="caption">
                    Fee Pending
                  </Typography>
                  <Typography variant="h5">₹{totalPending.toLocaleString()}</Typography>
                  <Typography variant="caption" color={totalPending > 0 ? 'warning.main' : 'success.main'}>
                    {totalPending > 0 ? 'Payment Due' : 'All Paid'}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: totalPending > 0 ? 'warning.main' : 'success.main' }}>
                  <AttachMoney />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="textSecondary" variant="caption">
                    Current Semester
                  </Typography>
                  <Typography variant="h5">Sem 2</Typography>
                  <Typography variant="caption" color="textSecondary">
                    2024-2025
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'info.main' }}>
                  <School />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Subject-wise Attendance */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Subject-wise Attendance
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Subject</TableCell>
                    <TableCell align="center">Present/Total</TableCell>
                    <TableCell align="right">Percentage</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendanceData.map((item) => (
                    <TableRow key={item.subject}>
                      <TableCell>{item.subject}</TableCell>
                      <TableCell align="center">
                        {item.present}/{item.total}
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                          <LinearProgress
                            variant="determinate"
                            value={item.percentage}
                            sx={{ width: 60, height: 8, borderRadius: 4 }}
                            color={item.percentage >= 75 ? 'success' : 'error'}
                          />
                          <Typography variant="caption" sx={{ minWidth: 40 }}>
                            {item.percentage.toFixed(1)}%
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Marks Performance Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Marks Performance
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="percentage" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.percentage >= 80 ? '#2e7d32' : entry.percentage >= 60 ? '#ed6c02' : '#d32f2f'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Detailed Marks */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Semester Marks
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Subject</TableCell>
                    <TableCell align="center">Marks</TableCell>
                    <TableCell align="center">Grade</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {marksData.map((item) => (
                    <TableRow key={item.subject}>
                      <TableCell>{item.subject}</TableCell>
                      <TableCell align="center">
                        {item.marks}/{item.maxMarks}
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={item.grade}
                          size="small"
                          color={item.grade.startsWith('A') ? 'success' : item.grade.startsWith('B') ? 'primary' : 'warning'}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Fee Payment */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Fee Payment Status
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Pending</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {feeData.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <Typography variant="body2">{item.description}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          Due: {new Date(item.dueDate).toLocaleDateString()}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">₹{item.amount.toLocaleString()}</TableCell>
                      <TableCell align="right">₹{item.pending.toLocaleString()}</TableCell>
                      <TableCell align="center">
                        <Chip
                          label={item.status}
                          size="small"
                          color={item.status === 'PAID' ? 'success' : item.status === 'PENDING' ? 'warning' : 'error'}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {totalPending > 0 && (
              <Button variant="contained" fullWidth sx={{ mt: 2 }} startIcon={<AttachMoney />}>
                Pay Now ₹{totalPending.toLocaleString()}
              </Button>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
