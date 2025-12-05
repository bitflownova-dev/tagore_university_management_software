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
import { Circle as CircleIcon } from '@mui/icons-material';

export default function MyAttendance() {
  const overallAttendance = 87.5;

  const subjectAttendance = [
    { subject: 'Data Structures', present: 42, total: 48, percentage: 87.5 },
    { subject: 'Database Management', present: 44, total: 48, percentage: 91.7 },
    { subject: 'Operating Systems', present: 40, total: 48, percentage: 83.3 },
    { subject: 'Web Technologies', present: 45, total: 48, percentage: 93.8 },
  ];

  const recentAttendance = [
    { date: '2024-12-04', subject: 'Data Structures', status: 'Present' },
    { date: '2024-12-03', subject: 'DBMS', status: 'Present' },
    { date: '2024-12-02', subject: 'OS', status: 'Absent' },
    { date: '2024-12-01', subject: 'Web Tech', status: 'Present' },
  ];

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        My Attendance
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Overall Attendance
              </Typography>
              <Typography variant="h2" fontWeight="bold" color="primary">
                {overallAttendance}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={overallAttendance}
                sx={{ mt: 2, height: 8, borderRadius: 1 }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {overallAttendance >= 75 ? 'Good Standing' : 'Below Required'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Classes Attended
              </Typography>
              <Typography variant="h2" fontWeight="bold">
                171/192
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Total classes this semester
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Required Attendance
              </Typography>
              <Typography variant="h2" fontWeight="bold">
                75%
              </Typography>
              <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>
                ✓ Meeting requirement
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Subject-wise Attendance
        </Typography>
        <Grid container spacing={2}>
          {subjectAttendance.map((item, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.subject}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {item.percentage.toFixed(1)}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={item.percentage}
                  sx={{ height: 6, borderRadius: 1 }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  {item.present}/{item.total} classes
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Recent Attendance
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentAttendance.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                  <TableCell>{record.subject}</TableCell>
                  <TableCell>
                    <Chip
                      icon={<CircleIcon sx={{ fontSize: 8 }} />}
                      label={record.status}
                      color={record.status === 'Present' ? 'success' : 'error'}
                      size="small"
                    />
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
