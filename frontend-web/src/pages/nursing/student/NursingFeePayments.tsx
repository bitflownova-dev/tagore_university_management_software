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
} from '@mui/material';
import { Receipt, GetApp } from '@mui/icons-material';

const feeStructure = [
  { year: 'First Year', tuition: 50000, hostel: 20000, lab: 8000, exam: 7000, total: 85000 },
  { year: 'Second Year', tuition: 50000, hostel: 20000, lab: 8000, exam: 7000, total: 85000 },
  { year: 'Third Year', tuition: 50000, hostel: 20000, lab: 8000, exam: 7000, total: 85000 },
  { year: 'Fourth Year', tuition: 50000, hostel: 20000, lab: 8000, exam: 7000, total: 85000 },
];

const paymentHistory = [
  { date: 'Aug 5, 2025', year: 'First Year', amount: 85000, method: 'Online', receipt: 'NUR2025001', status: 'Paid' },
  { date: 'Jan 10, 2025', year: 'First Year (Jan)', amount: 42500, method: 'Bank Transfer', receipt: 'NUR2025045', status: 'Paid' },
];

const pendingPayments = [
  { year: 'Second Year', amount: 85000, dueDate: 'Dec 15, 2025', status: 'Pending' },
];

export default function NursingFeePayments() {
  const totalFees = 340000; // 4 years B.Sc Nursing
  const amountPaid = 127500;
  const pendingDues = 212500;
  const paymentProgress = ((amountPaid / totalFees) * 100).toFixed(1);

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Nursing Fee Payments
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          B.Sc Nursing program fee management & payment history
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#2E7D32' }}>
                ₹{totalFees.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Fees (4 Years)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#C8E6C9' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1B5E20' }}>
                ₹{amountPaid.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Amount Paid
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#A5D6A7' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#C62828' }}>
                ₹{pendingDues.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending Dues
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#81C784' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#2E7D32' }}>
                {paymentProgress}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Payment Progress
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Receipt sx={{ mr: 2, color: '#2E7D32' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            B.Sc Nursing Fee Structure (Year-wise)
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Year</TableCell>
                <TableCell align="right">Tuition Fee</TableCell>
                <TableCell align="right">Hostel Fee</TableCell>
                <TableCell align="right">Lab Fee</TableCell>
                <TableCell align="right">Exam Fee</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feeStructure.map((fee, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{fee.year}</TableCell>
                  <TableCell align="right">₹{fee.tuition.toLocaleString()}</TableCell>
                  <TableCell align="right">₹{fee.hostel.toLocaleString()}</TableCell>
                  <TableCell align="right">₹{fee.lab.toLocaleString()}</TableCell>
                  <TableCell align="right">₹{fee.exam.toLocaleString()}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    ₹{fee.total.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {index === 0 ? (
                      <Chip label="Paid" size="small" sx={{ bgcolor: '#2E7D32', color: 'white' }} />
                    ) : (
                      <Chip label="Pending" size="small" color="warning" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Payment History
          </Typography>
          <Button variant="outlined" startIcon={<GetApp />} sx={{ borderColor: '#2E7D32', color: '#2E7D32' }}>
            Download Receipts
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Year</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Receipt No</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paymentHistory.map((payment, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{payment.date}</TableCell>
                  <TableCell>{payment.year}</TableCell>
                  <TableCell align="right">₹{payment.amount.toLocaleString()}</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>{payment.receipt}</TableCell>
                  <TableCell>
                    <Chip label={payment.status} size="small" sx={{ bgcolor: '#2E7D32', color: 'white' }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
          Pending Payments
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Year</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingPayments.map((payment, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{payment.year}</TableCell>
                  <TableCell align="right" sx={{ color: '#C62828', fontWeight: 600 }}>
                    ₹{payment.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>{payment.dueDate}</TableCell>
                  <TableCell>
                    <Chip label={payment.status} size="small" color="warning" />
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" size="small" sx={{ bgcolor: '#2E7D32', '&:hover': { bgcolor: '#1B5E20' } }}>
                      Pay Now
                    </Button>
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
