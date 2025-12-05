import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

const attendanceData = [
  { month: 'Jan', present: 85, absent: 15 },
  { month: 'Feb', present: 88, absent: 12 },
  { month: 'Mar', present: 82, absent: 18 },
  { month: 'Apr', present: 90, absent: 10 },
  { month: 'May', present: 87, absent: 13 },
  { month: 'Jun', present: 91, absent: 9 },
];

const departmentPerformance = [
  { name: 'Computer Science', score: 88 },
  { name: 'Mathematics', score: 85 },
  { name: 'Physics', score: 82 },
  { name: 'Commerce', score: 80 },
];

const enrollmentTrend = [
  { year: '2019', students: 1200 },
  { year: '2020', students: 1350 },
  { year: '2021', students: 1450 },
  { year: '2022', students: 1600 },
  { year: '2023', students: 1750 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Analytics() {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Analytics & Insights
      </Typography>

      <Grid container spacing={3}>
        {/* Attendance Trend */}
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Attendance Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" fill="#4CAF50" name="Present %" />
                <Bar dataKey="absent" fill="#f44336" name="Absent %" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Department Performance */}
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Department Performance
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentPerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip />
                <Bar dataKey="score" fill="#1976D2" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Enrollment Trend */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Student Enrollment Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={enrollmentTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="students"
                  stroke="#1976D2"
                  strokeWidth={3}
                  name="Total Students"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Key Metrics */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Students
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                1,750
              </Typography>
              <Typography variant="body2" color="success.main">
                +9.4% from last year
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Faculty Members
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                142
              </Typography>
              <Typography variant="body2" color="success.main">
                +5.2% from last year
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Average Attendance
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                87.5%
              </Typography>
              <Typography variant="body2" color="success.main">
                +2.1% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Pass Percentage
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                92.3%
              </Typography>
              <Typography variant="body2" color="success.main">
                +3.5% from last year
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
