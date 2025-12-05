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
import {
  AccountBalance,
  TrendingUp,
  Receipt,
  School,
  LocalHospital,
  Warning,
} from '@mui/icons-material';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const monthlyRevenue = [
  { month: 'Jul', studentFees: 4500000, hospitalRevenue: 8200000, research: 500000 },
  { month: 'Aug', studentFees: 4800000, hospitalRevenue: 8500000, research: 550000 },
  { month: 'Sep', studentFees: 5200000, hospitalRevenue: 9100000, research: 600000 },
  { month: 'Oct', studentFees: 5500000, hospitalRevenue: 9400000, research: 650000 },
  { month: 'Nov', studentFees: 5800000, hospitalRevenue: 9800000, research: 700000 },
  { month: 'Dec', studentFees: 6200000, hospitalRevenue: 10200000, research: 750000 },
];

const expenseBreakdown = [
  { name: 'Salaries', value: 12500000, color: '#1976D2' },
  { name: 'Infrastructure', value: 3200000, color: '#2E7D32' },
  { name: 'Medical Equipment', value: 2800000, color: '#ED6C02' },
  { name: 'Utilities', value: 1500000, color: '#9C27B0' },
  { name: 'Research Grants', value: 800000, color: '#D32F2F' },
  { name: 'Others', value: 1200000, color: '#00897B' },
];

export default function MedicalAccountantDashboard() {
  const stats = [
    {
      title: 'Total Revenue',
      value: '₹1.71 Cr',
      change: '+12.5%',
      icon: <AccountBalance sx={{ fontSize: 40 }} />,
      color: '#1976D2',
      subtitle: 'This Month',
    },
    {
      title: 'Hospital Revenue',
      value: '₹1.02 Cr',
      change: '+8.3%',
      icon: <LocalHospital sx={{ fontSize: 40 }} />,
      color: '#2E7D32',
      subtitle: 'OPD + IPD + Surgery',
    },
    {
      title: 'Student Fees',
      value: '₹62 Lakh',
      change: '+5.2%',
      icon: <School sx={{ fontSize: 40 }} />,
      color: '#ED6C02',
      subtitle: 'Fee Collection',
    },
    {
      title: 'Pending Dues',
      value: '₹18 Lakh',
      subtitle: '142 Students',
      icon: <Warning sx={{ fontSize: 40 }} />,
      color: '#D32F2F',
    },
  ];

  const feeCollection = [
    { phase: 'Phase 1 (Year 1)', total: 180, paid: 165, pending: 15, amount: 4500000 },
    { phase: 'Phase 1 (Year 2)', total: 175, paid: 168, pending: 7, amount: 4200000 },
    { phase: 'Phase 2', total: 165, paid: 158, pending: 7, amount: 3950000 },
    { phase: 'Phase 3.1', total: 158, paid: 152, pending: 6, amount: 3800000 },
    { phase: 'Phase 3.2', total: 152, paid: 147, pending: 5, amount: 3675000 },
  ];

  const hospitalFinancials = [
    { dept: 'OPD Services', revenue: 3200000, patients: 6200 },
    { dept: 'IPD Services', revenue: 4500000, patients: 360 },
    { dept: 'Surgery', revenue: 2100000, cases: 98 },
    { dept: 'Diagnostics', revenue: 1800000, tests: 4500 },
    { dept: 'Pharmacy', revenue: 1600000, bills: 8200 },
  ];

  const formatCurrency = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
    return `₹${(value / 1000).toFixed(0)} K`;
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #D32F2F 0%, #C62828 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Financial Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Tagore Medical College & Hospital - Accounts Overview
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: `${stat.color}20`,
                      color: stat.color,
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: stat.color }}>
                      {stat.value}
                    </Typography>
                    {stat.change && (
                      <Chip
                        label={stat.change}
                        size="small"
                        color={stat.change.startsWith('+') ? 'success' : 'error'}
                        icon={<TrendingUp />}
                      />
                    )}
                  </Box>
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {stat.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.subtitle}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Revenue Trend - Last 6 Months
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Bar dataKey="studentFees" fill="#1976D2" name="Student Fees" />
                <Bar dataKey="hospitalRevenue" fill="#2E7D32" name="Hospital Revenue" />
                <Bar dataKey="research" fill="#ED6C02" name="Research Grants" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Expense Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  dataKey="value"
                >
                  {expenseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Student Fee Collection by Phase
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Phase</TableCell>
                    <TableCell align="center">Total</TableCell>
                    <TableCell align="center">Paid</TableCell>
                    <TableCell align="center">Pending</TableCell>
                    <TableCell>Collection %</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {feeCollection.map((row) => {
                    const collectionPercent = (row.paid / row.total) * 100;
                    return (
                      <TableRow key={row.phase} hover>
                        <TableCell sx={{ fontWeight: 600 }}>{row.phase}</TableCell>
                        <TableCell align="center">{row.total}</TableCell>
                        <TableCell align="center">
                          <Chip label={row.paid} size="small" color="success" />
                        </TableCell>
                        <TableCell align="center">
                          <Chip label={row.pending} size="small" color="warning" />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={collectionPercent}
                              sx={{ flex: 1, height: 8, borderRadius: 1 }}
                              color={collectionPercent > 90 ? 'success' : 'warning'}
                            />
                            <Typography variant="body2" sx={{ minWidth: 45 }}>
                              {collectionPercent.toFixed(0)}%
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>
                          {formatCurrency(row.amount)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ mt: 2, p: 2, bgcolor: '#FFF3E0', borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary">
                <strong>Total Fee Collection:</strong> ₹2.01 Cr | <strong>Pending:</strong> ₹18 Lakh (40 students)
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Hospital Revenue Breakdown
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Department</TableCell>
                    <TableCell align="right">Revenue</TableCell>
                    <TableCell align="center">Volume</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {hospitalFinancials.map((row) => (
                    <TableRow key={row.dept} hover>
                      <TableCell sx={{ fontWeight: 600 }}>{row.dept}</TableCell>
                      <TableCell align="right">{formatCurrency(row.revenue)}</TableCell>
                      <TableCell align="center">
                        <Chip
                          label={row.patients || row.cases || row.tests || row.bills}
                          size="small"
                          color="primary"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Total Hospital Revenue</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>
                      {formatCurrency(hospitalFinancials.reduce((sum, row) => sum + row.revenue, 0))}
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Key Financial Metrics
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <Box sx={{ p: 2, bgcolor: '#E3F2FD', borderRadius: 1, textAlign: 'center' }}>
                  <Typography variant="h5" color="primary" fontWeight={700}>
                    89.2%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Collection Rate
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 2, bgcolor: '#E8F5E9', borderRadius: 1, textAlign: 'center' }}>
                  <Typography variant="h5" color="success.main" fontWeight={700}>
                    ₹22 Cr
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Annual Budget
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 2, bgcolor: '#FFF3E0', borderRadius: 1, textAlign: 'center' }}>
                  <Typography variant="h5" color="warning.main" fontWeight={700}>
                    72%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Budget Utilized
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 2, bgcolor: '#FCE4EC', borderRadius: 1, textAlign: 'center' }}>
                  <Typography variant="h5" color="error.main" fontWeight={700}>
                    ₹6.2 Cr
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Remaining Budget
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
