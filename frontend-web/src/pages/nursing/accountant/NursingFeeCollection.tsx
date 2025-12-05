import { useState } from 'react';
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
  Button,
  LinearProgress,
} from '@mui/material';
import { Receipt, GetApp, Send } from '@mui/icons-material';

const yearCollectionData = [
  { year: 'B.Sc First Year', totalStudents: 520, collected: 468, pending: 52, amountCollected: 39780000, rate: 90.0 },
  { year: 'B.Sc Second Year', totalStudents: 495, collected: 450, pending: 45, amountCollected: 38250000, rate: 90.9 },
  { year: 'B.Sc Third Year', totalStudents: 480, collected: 445, pending: 35, amountCollected: 37825000, rate: 92.7 },
  { year: 'B.Sc Fourth Year', totalStudents: 465, collected: 442, pending: 23, amountCollected: 37570000, rate: 95.1 },
  { year: 'GNM First Year', totalStudents: 180, collected: 162, pending: 18, amountCollected: 9720000, rate: 90.0 },
  { year: 'GNM Second Year', totalStudents: 170, collected: 158, pending: 12, amountCollected: 9480000, rate: 92.9 },
];

const recentPayments = [
  { date: 'Dec 3, 2025', rollNo: 'NS045', name: 'Kavita Sharma', year: 'Third Year', amount: 85000, method: 'Online', status: 'Success' },
  { date: 'Dec 3, 2025', rollNo: 'NS089', name: 'Anjali Reddy', year: 'Second Year', amount: 85000, method: 'Bank Transfer', status: 'Success' },
  { date: 'Dec 2, 2025', rollNo: 'GNM015', name: 'Priya Singh', year: 'GNM Second', amount: 60000, method: 'Online', status: 'Success' },
];

const pendingPayments = [
  { rollNo: 'NS123', name: 'Meera Patel', year: 'First Year', amountDue: 85000, dueDate: 'Dec 15, 2025', status: 'Pending' },
  { rollNo: 'NS234', name: 'Sunita Kumar', year: 'Second Year', amountDue: 85000, dueDate: 'Dec 10, 2025', status: 'Overdue' },
  { rollNo: 'GNM045', name: 'Rekha Gupta', year: 'GNM First', amountDue: 60000, dueDate: 'Dec 8, 2025', status: 'Overdue' },
];

export default function NursingFeeCollection() {
  const totalCollection = yearCollectionData.reduce((sum, y) => sum + y.amountCollected, 0);
  const totalCollected = yearCollectionData.reduce((sum, y) => sum + y.collected, 0);
  const totalPending = yearCollectionData.reduce((sum, y) => sum + y.pending, 0);
  const collectionRate = ((totalCollected / (totalCollected + totalPending)) * 100).toFixed(1);

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Nursing Fee Collection
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Year-wise collection tracking for B.Sc & GNM programs
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#2E7D32' }}>
                ₹{(totalCollection / 10000000).toFixed(2)}Cr
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Collection
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#C8E6C9' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1B5E20' }}>
                {totalCollected}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fees Collected
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#A5D6A7' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#C62828' }}>
                {totalPending}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending Students
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#81C784' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#2E7D32' }}>
                {collectionRate}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Collection Rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Receipt sx={{ mr: 2, color: '#2E7D32' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Year-wise Fee Collection
            </Typography>
          </Box>
          <Button variant="outlined" startIcon={<GetApp />} sx={{ borderColor: '#2E7D32', color: '#2E7D32' }}>
            Export Report
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Year/Program</TableCell>
                <TableCell align="center">Total Students</TableCell>
                <TableCell align="center">Collected</TableCell>
                <TableCell align="center">Pending</TableCell>
                <TableCell align="right">Amount Collected</TableCell>
                <TableCell align="center">Collection Rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {yearCollectionData.map((data, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{data.year}</TableCell>
                  <TableCell align="center">{data.totalStudents}</TableCell>
                  <TableCell align="center">{data.collected}</TableCell>
                  <TableCell align="center" sx={{ color: data.pending > 0 ? '#C62828' : 'inherit' }}>
                    {data.pending}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    ₹{(data.amountCollected / 10000000).toFixed(2)}Cr
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={data.rate}
                          sx={{
                            height: 8,
                            borderRadius: 1,
                            bgcolor: '#E8F5E9',
                            '& .MuiLinearProgress-bar': { bgcolor: data.rate >= 90 ? '#2E7D32' : data.rate >= 80 ? '#388E3C' : '#66BB6A' },
                          }}
                        />
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 50, color: '#2E7D32' }}>
                        {data.rate}%
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
              Recent Payments
            </Typography>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Roll No</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentPayments.map((payment, index) => (
                    <TableRow key={index} hover>
                      <TableCell sx={{ fontWeight: 600 }}>{payment.date}</TableCell>
                      <TableCell>{payment.rollNo}</TableCell>
                      <TableCell>{payment.name}</TableCell>
                      <TableCell align="right">₹{payment.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Chip label={payment.status} size="small" sx={{ bgcolor: '#2E7D32', color: 'white' }} />
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
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Pending Payments
            </Typography>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Roll No</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Amount Due</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pendingPayments.map((payment, index) => (
                    <TableRow key={index} hover>
                      <TableCell sx={{ fontWeight: 600 }}>{payment.rollNo}</TableCell>
                      <TableCell>{payment.name}</TableCell>
                      <TableCell align="right" sx={{ color: '#C62828', fontWeight: 600 }}>
                        ₹{payment.amountDue.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={payment.status}
                          size="small"
                          color={payment.status === 'Overdue' ? 'error' : 'warning'}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<Send />}
                          sx={{ borderColor: '#2E7D32', color: '#2E7D32' }}
                        >
                          Remind
                        </Button>
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
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#2E7D32' }}>
          INC Fee Compliance
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          • All fee structures approved by INC and State Nursing Council
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • B.Sc Nursing: ₹85,000 per year (Total ₹3,40,000 for 4 years)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • GNM Program: ₹60,000 per year (Total ₹1,20,000 for 2 years)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Fee refund policy as per INC guidelines for withdrawals
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Scholarship and fee concession tracking for eligible students
        </Typography>
      </Paper>
    </Box>
  );
}
