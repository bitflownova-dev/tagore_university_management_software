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
import { AccountBalance, Receipt, Send } from '@mui/icons-material';

const yearWiseCollection = [
  { year: '1st Year BDS', totalStudents: 100, collected: 92, pending: 8, amountCollected: 19596000, totalAmount: 21300000, rate: 92 },
  { year: '2nd Year BDS', totalStudents: 95, collected: 88, pending: 7, amountCollected: 19184000, totalAmount: 20710000, rate: 92.6 },
  { year: '3rd Year BDS', totalStudents: 92, collected: 85, pending: 7, amountCollected: 20825000, totalAmount: 22540000, rate: 92.4 },
  { year: '4th Year BDS', totalStudents: 90, collected: 82, pending: 8, amountCollected: 20500000, totalAmount: 22500000, rate: 91.1 },
  { year: 'Internship', totalStudents: 85, collected: 85, pending: 0, amountCollected: 1275000, totalAmount: 1275000, rate: 100 },
];

const recentPayments = [
  { id: 1, date: '2024-12-10', rollNo: 'DEN042', name: 'Arun Verma', year: '3rd Year BDS', amount: 245000, method: 'Online', status: 'Completed' },
  { id: 2, date: '2024-12-10', rollNo: 'DEN018', name: 'Sneha Reddy', year: '2nd Year BDS', amount: 218000, method: 'Bank Transfer', status: 'Completed' },
  { id: 3, date: '2024-12-09', rollNo: 'DEN075', name: 'Vikram Singh', year: '4th Year BDS', amount: 250000, method: 'Online', status: 'Completed' },
  { id: 4, date: '2024-12-09', rollNo: 'DEN091', name: 'Pooja Sharma', year: '1st Year BDS', amount: 213000, method: 'Cheque', status: 'Processing' },
];

const pendingPayments = [
  { id: 1, rollNo: 'DEN003', name: 'Amit Kumar', year: '2nd Year BDS', amountDue: 218000, dueDate: '2024-12-15', status: 'Pending' },
  { id: 2, rollNo: 'DEN025', name: 'Priya Patel', year: '3rd Year BDS', amountDue: 245000, dueDate: '2024-12-12', status: 'Overdue' },
  { id: 3, rollNo: 'DEN047', name: 'Rahul Nair', year: '4th Year BDS', amountDue: 250000, dueDate: '2024-12-18', status: 'Pending' },
  { id: 4, rollNo: 'DEN068', name: 'Meera Gupta', year: '1st Year BDS', amountDue: 213000, dueDate: '2024-12-10', status: 'Overdue' },
];

export default function DentalFeeCollection() {
  const [selectedYear, setSelectedYear] = useState('All Years');

  const totalCollection = yearWiseCollection.reduce((sum, y) => sum + y.amountCollected, 0);
  const totalStudents = yearWiseCollection.reduce((sum, y) => sum + y.totalStudents, 0);
  const collectedStudents = yearWiseCollection.reduce((sum, y) => sum + y.collected, 0);
  const pendingStudents = yearWiseCollection.reduce((sum, y) => sum + y.pending, 0);
  const collectionRate = (collectedStudents / totalStudents) * 100;

  const handleSendReminder = (rollNo: string) => {
    console.log('Sending reminder to:', rollNo);
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #00796B 0%, #004D40 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Dental Fee Collection
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Year-wise fee collection tracking & DCI compliance
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E0F2F1' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#00796B' }}>
                ₹{(totalCollection / 10000000).toFixed(2)}Cr
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Collection
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#388E3C' }}>
                {collectedStudents}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fees Collected
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFEBEE' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#D32F2F' }}>
                {pendingStudents}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending Students
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E3F2FD' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976D2' }}>
                {collectionRate.toFixed(1)}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Collection Rate
              </Typography>
              <LinearProgress variant="determinate" value={collectionRate} sx={{ mt: 1, height: 8, borderRadius: 1 }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccountBalance sx={{ mr: 2, color: '#00796B' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Year-wise Fee Collection
            </Typography>
          </Box>
          <Button variant="outlined" sx={{ borderColor: '#00796B', color: '#00796B' }}>
            Export Report
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Academic Year</TableCell>
                <TableCell align="center">Total Students</TableCell>
                <TableCell align="center">Collected</TableCell>
                <TableCell align="center">Pending</TableCell>
                <TableCell align="right">Amount Collected</TableCell>
                <TableCell align="right">Total Amount</TableCell>
                <TableCell align="center">Collection Rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {yearWiseCollection.map((year) => (
                <TableRow key={year.year} hover>
                  <TableCell>
                    <Chip label={year.year} color="primary" variant="outlined" size="small" />
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    {year.totalStudents}
                  </TableCell>
                  <TableCell align="center">
                    <Chip label={year.collected} size="small" color="success" />
                  </TableCell>
                  <TableCell align="center">
                    <Chip label={year.pending} size="small" color={year.pending > 0 ? 'error' : 'default'} />
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    ₹{(year.amountCollected / 100000).toFixed(2)}L
                  </TableCell>
                  <TableCell align="right">₹{(year.totalAmount / 100000).toFixed(2)}L</TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 45 }}>
                        {year.rate}%
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={year.rate}
                        sx={{ width: 100, height: 8, borderRadius: 1 }}
                        color={year.rate >= 90 ? 'success' : year.rate >= 75 ? 'primary' : 'error'}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Total</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  {totalStudents}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  {collectedStudents}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  {pendingStudents}
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: '#00796B' }}>
                  ₹{(totalCollection / 10000000).toFixed(2)}Cr
                </TableCell>
                <TableCell colSpan={2} />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Receipt sx={{ mr: 2, color: '#00796B' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Recent Payments
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Roll No</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Academic Year</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentPayments.map((payment) => (
                <TableRow key={payment.id} hover>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell sx={{ fontFamily: 'monospace' }}>{payment.rollNo}</TableCell>
                  <TableCell>{payment.name}</TableCell>
                  <TableCell>
                    <Chip label={payment.year} size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    ₹{payment.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={payment.status}
                      size="small"
                      color={payment.status === 'Completed' ? 'success' : 'warning'}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Send sx={{ mr: 2, color: '#F57C00' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Pending Payments
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Roll No</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Academic Year</TableCell>
                <TableCell align="right">Amount Due</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingPayments.map((payment) => (
                <TableRow key={payment.id} hover>
                  <TableCell sx={{ fontFamily: 'monospace' }}>{payment.rollNo}</TableCell>
                  <TableCell>{payment.name}</TableCell>
                  <TableCell>
                    <Chip label={payment.year} size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: '#D32F2F' }}>
                    ₹{payment.amountDue.toLocaleString()}
                  </TableCell>
                  <TableCell>{payment.dueDate}</TableCell>
                  <TableCell align="center">
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
                      onClick={() => handleSendReminder(payment.rollNo)}
                    >
                      Send Reminder
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#00796B' }}>
          DCI Fee Compliance Guidelines
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          • Fee structure must be approved by DCI and state fee regulatory committee
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Fee receipts must be issued for all payments as per prescribed format
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Transparent fee structure display required on college website and notice boards
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Refund policy as per DCI norms for student withdrawals
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Scholarship tracking for SC/ST/OBC/EWS students as per government guidelines
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Separate accounts for tuition fees and development fees as per regulations
        </Typography>
      </Paper>
    </Box>
  );
}
