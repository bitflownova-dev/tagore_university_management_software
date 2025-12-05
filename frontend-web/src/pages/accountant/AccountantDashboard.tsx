import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Tab,
  Tabs,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  IconButton,
  LinearProgress,
} from '@mui/material';
import {
  AttachMoney,
  TrendingUp,
  Warning,
  CheckCircle,
  Receipt,
  Assessment,
  Download,
  Add,
} from '@mui/icons-material';
import { useAuthStore } from '../../stores/authStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Transaction {
  transactionId: string;
  studentId: string;
  studentName: string;
  amount: number;
  paymentMode: string;
  transactionDate: string;
  feeType: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
}

interface FeeDefaulter {
  studentId: string;
  studentName: string;
  class: string;
  totalDue: number;
  overdueDays: number;
  lastPayment: string;
}

interface RevenueData {
  month: string;
  collected: number;
  pending: number;
}

export default function AccountantDashboard() {
  const { user } = useAuthStore();
  const [tabValue, setTabValue] = useState(0);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [receiptDialogOpen, setReceiptDialogOpen] = useState(false);

  const [recentTransactions] = useState<Transaction[]>([
    {
      transactionId: 'TXN001',
      studentId: '21CS001',
      studentName: 'Aarav Kumar',
      amount: 45000,
      paymentMode: 'UPI',
      transactionDate: '2025-12-04T10:30:00',
      feeType: 'Tuition Fee',
      status: 'SUCCESS',
    },
    {
      transactionId: 'TXN002',
      studentId: '21CS002',
      studentName: 'Priya Sharma',
      amount: 25000,
      paymentMode: 'Net Banking',
      transactionDate: '2025-12-04T09:15:00',
      feeType: 'Hostel Fee',
      status: 'SUCCESS',
    },
    {
      transactionId: 'TXN003',
      studentId: '21CS003',
      studentName: 'Vikram Singh',
      amount: 15000,
      paymentMode: 'Cash',
      transactionDate: '2025-12-03T14:20:00',
      feeType: 'Lab Fee',
      status: 'SUCCESS',
    },
  ]);

  const [feeDefaulters] = useState<FeeDefaulter[]>([
    {
      studentId: '21CS042',
      studentName: 'Ananya Reddy',
      class: 'BCA Year 2 - Section A',
      totalDue: 45000,
      overdueDays: 15,
      lastPayment: '2025-08-15',
    },
    {
      studentId: '21CS055',
      studentName: 'Rohit Kumar',
      class: 'BCA Year 3 - Section B',
      totalDue: 32000,
      overdueDays: 8,
      lastPayment: '2025-09-01',
    },
  ]);

  const [revenueData] = useState<RevenueData[]>([
    { month: 'Aug', collected: 6800000, pending: 320000 },
    { month: 'Sep', collected: 6200000, pending: 880000 },
    { month: 'Oct', collected: 6500000, pending: 520000 },
    { month: 'Nov', collected: 6900000, pending: 180000 },
    { month: 'Dec', collected: 2500000, pending: 4500000 },
  ]);

  const totalCollected = recentTransactions.reduce((sum, txn) => sum + txn.amount, 0);
  const totalPending = feeDefaulters.reduce((sum, def) => sum + def.totalDue, 0);
  const todayCollection = 85000;

  const paymentModeData = [
    { name: 'UPI', value: 45, color: '#4caf50' },
    { name: 'Net Banking', value: 30, color: '#2196f3' },
    { name: 'Cash', value: 15, color: '#ff9800' },
    { name: 'Card', value: 10, color: '#9c27b0' },
  ];

  return (
    <Box>
      {/* Header */}
      <Paper sx={{ p: 3, mb: 3, bgcolor: 'success.main', color: 'white' }}>
        <Typography variant="h4" gutterBottom>
          Accountant Portal
        </Typography>
        <Typography variant="body1">Welcome, {user?.firstName} {user?.lastName}</Typography>
        <Typography variant="caption">Fee Collection & Financial Management</Typography>
      </Paper>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="textSecondary" variant="caption">
                    Today's Collection
                  </Typography>
                  <Typography variant="h5">₹{todayCollection.toLocaleString()}</Typography>
                  <Typography variant="caption" color="success.main">
                    {recentTransactions.length} Transactions
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.main' }}>
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
                    Total Pending
                  </Typography>
                  <Typography variant="h5">₹{(totalPending / 100000).toFixed(2)}L</Typography>
                  <Typography variant="caption" color="warning.main">
                    {feeDefaulters.length} Defaulters
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.main' }}>
                  <Warning />
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
                    Collection Rate
                  </Typography>
                  <Typography variant="h5">94%</Typography>
                  <Typography variant="caption" color="success.main">
                    This Month
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <TrendingUp />
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
                    Receipts Issued
                  </Typography>
                  <Typography variant="h5">142</Typography>
                  <Typography variant="caption" color="textSecondary">
                    This Month
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'info.main' }}>
                  <Receipt />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
          <Tab label="Recent Transactions" icon={<AttachMoney />} iconPosition="start" />
          <Tab label="Fee Defaulters" icon={<Warning />} iconPosition="start" />
          <Tab label="Revenue Analytics" icon={<Assessment />} iconPosition="start" />
        </Tabs>
      </Paper>

      {/* Tab: Recent Transactions */}
      {tabValue === 0 && (
        <Paper sx={{ p: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Recent Transactions</Typography>
            <Button variant="contained" startIcon={<Add />} onClick={() => setPaymentDialogOpen(true)}>
              Record Payment
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Transaction ID</TableCell>
                  <TableCell>Student</TableCell>
                  <TableCell>Fee Type</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Payment Mode</TableCell>
                  <TableCell>Date & Time</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentTransactions.map((txn) => (
                  <TableRow key={txn.transactionId} hover>
                    <TableCell>{txn.transactionId}</TableCell>
                    <TableCell>
                      <Typography variant="body2">{txn.studentName}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {txn.studentId}
                      </Typography>
                    </TableCell>
                    <TableCell>{txn.feeType}</TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight="bold">
                        ₹{txn.amount.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>{txn.paymentMode}</TableCell>
                    <TableCell>{new Date(txn.transactionDate).toLocaleString()}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={txn.status}
                        size="small"
                        color={txn.status === 'SUCCESS' ? 'success' : txn.status === 'PENDING' ? 'warning' : 'error'}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton size="small" color="primary" onClick={() => setReceiptDialogOpen(true)}>
                        <Receipt />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* Tab: Fee Defaulters */}
      {tabValue === 1 && (
        <Paper sx={{ p: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Fee Defaulters ({feeDefaulters.length})</Typography>
            <Button variant="outlined" startIcon={<Download />}>
              Export List
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student ID</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell align="right">Total Due</TableCell>
                  <TableCell align="center">Overdue Days</TableCell>
                  <TableCell>Last Payment</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {feeDefaulters.map((defaulter) => (
                  <TableRow key={defaulter.studentId} hover>
                    <TableCell>{defaulter.studentId}</TableCell>
                    <TableCell>{defaulter.studentName}</TableCell>
                    <TableCell>{defaulter.class}</TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" color="error" fontWeight="bold">
                        ₹{defaulter.totalDue.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={`${defaulter.overdueDays} days`}
                        size="small"
                        color={defaulter.overdueDays > 10 ? 'error' : 'warning'}
                      />
                    </TableCell>
                    <TableCell>{new Date(defaulter.lastPayment).toLocaleDateString()}</TableCell>
                    <TableCell align="center">
                      <Button size="small" variant="outlined">
                        Send Reminder
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* Tab: Revenue Analytics */}
      {tabValue === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Monthly Revenue Trend
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="collected" fill="#4caf50" name="Collected" />
                  <Bar dataKey="pending" fill="#ff9800" name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Payment Mode Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={paymentModeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {paymentModeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Record Payment Dialog */}
      <Dialog open={paymentDialogOpen} onClose={() => setPaymentDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Record Manual Payment</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField fullWidth label="Student ID" placeholder="21CS042" />
            <TextField fullWidth label="Student Name" placeholder="Aarav Kumar" />
            <FormControl fullWidth>
              <InputLabel>Fee Type</InputLabel>
              <Select label="Fee Type">
                <MenuItem value="tuition">Tuition Fee</MenuItem>
                <MenuItem value="hostel">Hostel Fee</MenuItem>
                <MenuItem value="lab">Lab Fee</MenuItem>
                <MenuItem value="library">Library Fee</MenuItem>
              </Select>
            </FormControl>
            <TextField fullWidth type="number" label="Amount" placeholder="45000" />
            <FormControl fullWidth>
              <InputLabel>Payment Mode</InputLabel>
              <Select label="Payment Mode">
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="cheque">Cheque</MenuItem>
                <MenuItem value="dd">Demand Draft</MenuItem>
                <MenuItem value="upi">UPI</MenuItem>
              </Select>
            </FormControl>
            <TextField fullWidth label="Transaction Reference" placeholder="Optional" />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPaymentDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setPaymentDialogOpen(false)}>
            Record Payment
          </Button>
        </DialogActions>
      </Dialog>

      {/* Receipt Dialog */}
      <Dialog open={receiptDialogOpen} onClose={() => setReceiptDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Generate Receipt</DialogTitle>
        <DialogContent>
          <Typography variant="body2" gutterBottom>
            Receipt will be generated for transaction TXN001
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Amount: ₹45,000 | Student: Aarav Kumar (21CS001)
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReceiptDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" startIcon={<Download />} onClick={() => setReceiptDialogOpen(false)}>
            Download PDF
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
