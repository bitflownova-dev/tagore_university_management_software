import { useState } from 'react';
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
  Button,
  Card,
  CardContent,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import { Payment, Receipt, AccountBalance } from '@mui/icons-material';

const feeStructure = [
  { year: '1st Year BDS', tuition: 180000, clinical: 20000, library: 5000, exam: 8000, total: 213000 },
  { year: '2nd Year BDS', tuition: 180000, clinical: 25000, library: 5000, exam: 8000, total: 218000 },
  { year: '3rd Year BDS', tuition: 200000, clinical: 30000, library: 5000, exam: 10000, total: 245000 },
  { year: '4th Year BDS', tuition: 200000, clinical: 35000, library: 5000, exam: 10000, total: 250000 },
  { year: 'Internship', tuition: 0, clinical: 15000, library: 0, exam: 0, total: 15000 },
];

const paymentHistory = [
  { id: 1, date: '2024-07-15', year: '2nd Year BDS', amount: 218000, method: 'Online', receipt: 'DEN-2024-001', status: 'Paid' },
  { id: 2, date: '2024-01-10', year: '1st Year BDS', amount: 213000, method: 'Bank Transfer', receipt: 'DEN-2023-012', status: 'Paid' },
];

const pendingPayments = [
  { id: 1, year: '3rd Year BDS', amount: 245000, dueDate: '2025-01-15', status: 'Pending' },
];

export default function DentalFeePayments() {
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  const totalFees = feeStructure.reduce((sum, fee) => sum + fee.total, 0);
  const amountPaid = paymentHistory.reduce((sum, payment) => sum + payment.amount, 0);
  const pendingDues = pendingPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const paymentProgress = (amountPaid / totalFees) * 100;

  const handlePayNow = (payment: any) => {
    setSelectedPayment(payment);
    setOpenPaymentDialog(true);
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #00796B 0%, #004D40 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Dental Fee Payments
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          BDS program fee structure & payment history
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E0F2F1' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#00796B' }}>
                ₹{(totalFees / 100000).toFixed(2)}L
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Fees (BDS + Internship)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#388E3C' }}>
                ₹{(amountPaid / 100000).toFixed(2)}L
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Amount Paid
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFEBEE' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#D32F2F' }}>
                ₹{(pendingDues / 100000).toFixed(2)}L
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending Dues
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E3F2FD' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976D2' }}>
                {paymentProgress.toFixed(1)}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Payment Progress
              </Typography>
              <LinearProgress variant="determinate" value={paymentProgress} sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <AccountBalance sx={{ mr: 2, color: '#00796B' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Fee Structure (Year-wise)
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Academic Year</TableCell>
                <TableCell align="right">Tuition Fee</TableCell>
                <TableCell align="right">Clinical Fee</TableCell>
                <TableCell align="right">Library Fee</TableCell>
                <TableCell align="right">Exam Fee</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feeStructure.map((fee) => (
                <TableRow key={fee.year} hover>
                  <TableCell>
                    <Chip label={fee.year} size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell align="right">₹{fee.tuition.toLocaleString()}</TableCell>
                  <TableCell align="right">₹{fee.clinical.toLocaleString()}</TableCell>
                  <TableCell align="right">₹{fee.library.toLocaleString()}</TableCell>
                  <TableCell align="right">₹{fee.exam.toLocaleString()}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    ₹{fee.total.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={5} align="right" sx={{ fontWeight: 700 }}>
                  Grand Total (BDS + Internship):
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: '#00796B' }}>
                  ₹{totalFees.toLocaleString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Receipt sx={{ mr: 2, color: '#00796B' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Payment History
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Academic Year</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Receipt No</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paymentHistory.map((payment) => (
                <TableRow key={payment.id} hover>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>
                    <Chip label={payment.year} size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    ₹{payment.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell sx={{ fontFamily: 'monospace' }}>{payment.receipt}</TableCell>
                  <TableCell align="center">
                    <Chip label={payment.status} size="small" color="success" />
                  </TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined">
                      Download Receipt
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Payment sx={{ mr: 2, color: '#F57C00' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Pending Payments
          </Typography>
        </Box>

        {pendingPayments.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Academic Year</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingPayments.map((payment) => (
                  <TableRow key={payment.id} hover>
                    <TableCell>
                      <Chip label={payment.year} size="small" color="primary" variant="outlined" />
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, color: '#D32F2F' }}>
                      ₹{payment.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>{payment.dueDate}</TableCell>
                    <TableCell align="center">
                      <Chip label={payment.status} size="small" color="warning" />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="contained"
                        sx={{ bgcolor: '#00796B', '&:hover': { bgcolor: '#004D40' } }}
                        onClick={() => handlePayNow(payment)}
                      >
                        Pay Now
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="body1" color="text.secondary">
              No pending payments
            </Typography>
          </Box>
        )}
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#00796B' }}>
          DCI Fee Guidelines
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          • Fees are structured as per DCI norms and state regulations
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Clinical fees increase for higher years due to advanced procedures and patient care
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Scholarship opportunities available for meritorious students
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Fee waivers available for economically weaker sections (EWS) as per government norms
        </Typography>
      </Paper>

      <Dialog open={openPaymentDialog} onClose={() => setOpenPaymentDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Make Payment</DialogTitle>
        <DialogContent>
          {selectedPayment && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Academic Year" value={selectedPayment.year} disabled />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Amount"
                    value={`₹${selectedPayment.amount.toLocaleString()}`}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField select fullWidth label="Payment Method" defaultValue="Online">
                    <MenuItem value="Online">Online Payment (UPI/Card/Net Banking)</MenuItem>
                    <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                    <MenuItem value="Cash">Cash</MenuItem>
                    <MenuItem value="Cheque">Cheque</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPaymentDialog(false)}>Cancel</Button>
          <Button variant="contained" sx={{ bgcolor: '#00796B', '&:hover': { bgcolor: '#004D40' } }}>
            Proceed to Payment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
