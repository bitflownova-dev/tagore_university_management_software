import { Box, Grid, Card, CardContent, Typography, Paper } from '@mui/material';
import {
  People,
  AttachMoney,
  School,
  TrendingUp,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Sample data
const revenueData = [
  { month: 'Jan', collected: 6800000, total: 7500000 },
  { month: 'Feb', collected: 6200000, total: 7500000 },
  { month: 'Mar', collected: 2500000, total: 7500000 },
  { month: 'Apr', collected: 7100000, total: 7500000 },
  { month: 'May', collected: 6900000, total: 7500000 },
  { month: 'Jun', collected: 7300000, total: 7500000 },
];

const collegeData = [
  { name: 'TCAS (Arts/Science)', students: 3424, capacity: 4000, revenue: 21000000, attendance: 92 },
  { name: 'TEC (Engineering)', students: 1005, capacity: 1500, revenue: 13000000, attendance: 88 },
  { name: 'TMC (Medical)', students: 800, capacity: 1200, revenue: 8000000, attendance: 95 },
];

const MetricCard = ({ title, value, subtitle, icon, color }: any) => (
  <Card elevation={2}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography color="text.secondary" gutterBottom variant="subtitle2">
            {title}
          </Typography>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
            {value}
          </Typography>
          <Typography variant="body2" color={color || 'success.main'}>
            {subtitle}
          </Typography>
        </Box>
        <Box
          sx={{
            bgcolor: `${color || 'primary'}.light`,
            borderRadius: 2,
            p: 1.5,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default function DirectorDashboard() {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Director Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        God-view across all 3 colleges
      </Typography>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Students"
            value="5,229"
            subtitle="↑ 12% YoY"
            icon={<People sx={{ color: 'primary.main', fontSize: 40 }} />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Revenue"
            value="₹4.2 Cr"
            subtitle="₹1.8Cr Due"
            icon={<AttachMoney sx={{ color: 'success.main', fontSize: 40 }} />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Staff Present"
            value="245 / 280"
            subtitle="⚠️ 35 Absent"
            icon={<School sx={{ color: 'warning.main', fontSize: 40 }} />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="System Health"
            value="98%"
            subtitle="All Systems Go"
            icon={<TrendingUp sx={{ color: 'success.main', fontSize: 40 }} />}
            color="success"
          />
        </Grid>
      </Grid>

      {/* Revenue Chart */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Revenue Collection vs Pending
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: number) => `₹${(value / 100000).toFixed(1)}L`} />
                <Legend />
                <Bar dataKey="collected" fill="#43A047" name="Collected" />
                <Bar dataKey="total" fill="#E0E0E0" name="Total" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              College Map View
            </Typography>
            <Box sx={{ mt: 2 }}>
              {collegeData.map((college) => (
                <Card key={college.name} sx={{ mb: 2, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {college.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Students: {college.students} / {college.capacity}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Revenue: ₹{(college.revenue / 10000000).toFixed(1)}Cr
                    </Typography>
                    <Typography variant="body2" color="success.main">
                      Attendance: {college.attendance}%
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* College Performance Table */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          College-Wise Performance
        </Typography>
        <Box sx={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E0E0E0' }}>
                <th style={{ textAlign: 'left', padding: '12px' }}>College</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Capacity</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Revenue</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Staff Att</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Student Att</th>
                <th style={{ textAlign: 'center', padding: '12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {collegeData.map((college, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #F5F5F5' }}>
                  <td style={{ padding: '12px' }}>{college.name}</td>
                  <td style={{ padding: '12px' }}>{college.students}/{college.capacity}</td>
                  <td style={{ padding: '12px' }}>₹{(college.revenue / 10000000).toFixed(1)}Cr</td>
                  <td style={{ padding: '12px' }}>{college.attendance}%</td>
                  <td style={{ padding: '12px' }}>{college.attendance}%</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <Box
                      component="span"
                      sx={{
                        bgcolor: college.attendance > 90 ? 'success.main' : 'warning.main',
                        color: 'white',
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                      }}
                    >
                      {college.attendance > 90 ? '🟢' : '🟡'}
                    </Box>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Paper>
    </Box>
  );
}
