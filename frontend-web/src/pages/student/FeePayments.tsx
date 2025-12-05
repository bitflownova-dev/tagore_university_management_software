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
import { Payment as PaymentIcon, Download as DownloadIcon } from '@mui/icons-material';

export default function FeePayments() {
  const totalFees = 125000;
  const paidFees = 75000;
  const pendingFees = 50000;
  const paymentPercentage = (paidFees / totalFees) * 100;

  const feeStructure = [
    { item: 'Tuition Fee', amount: 80000, paid: 50000, pending: 30000 },
    { item: 'Library Fee', amount: 5000, paid: 5000, pending: 0 },
    { item: 'Laboratory Fee', amount: 15000, paid: 10000, pending: 5000 },
    { item: 'Sports Fee', amount: 5000, paid: 5000, pending: 0 },
    { item: 'Development Fee', amount: 20000, paid: 5000, pending: 15000 },
  ];

  const paymentHistory = [
    { date: '2024-09-15', amount: 25000, mode: 'Online', receipt: 'RCP001', status: 'Success' },
    { date: '2024-07-20', amount: 25000, mode: 'Card', receipt: 'RCP002', status: 'Success' },
    { date: '2024-06-10', amount: 25000, mode: 'Online', receipt: 'RCP003', status: 'Success' },
  ];

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Fee Payments
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Fees
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                ₹{totalFees.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Paid Amount
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="success.main">
                ₹{paidFees.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Pending Amount
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="error.main">
                ₹{pendingFees.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Payment Progress</Typography>
          <Typography variant="h6" color="primary">
            {paymentPercentage.toFixed(0)}%
          </Typography>
        </Box>
        <LinearProgress variant="determinate" value={paymentPercentage} sx={{ height: 10, borderRadius: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="contained" startIcon={<PaymentIcon />}>
            Pay Now
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Fee Structure
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fee Item</TableCell>
                <TableCell align="right">Total Amount</TableCell>
                <TableCell align="right">Paid</TableCell>
                <TableCell align="right">Pending</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feeStructure.map((fee, index) => (
                <TableRow key={index}>
                  <TableCell>{fee.item}</TableCell>
                  <TableCell align="right">₹{fee.amount.toLocaleString()}</TableCell>
                  <TableCell align="right">₹{fee.paid.toLocaleString()}</TableCell>
                  <TableCell align="right">₹{fee.pending.toLocaleString()}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={fee.pending === 0 ? 'Paid' : 'Pending'}
                      color={fee.pending === 0 ? 'success' : 'warning'}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Payment History
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Payment Mode</TableCell>
                <TableCell>Receipt No</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paymentHistory.map((payment, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                  <TableCell align="right">₹{payment.amount.toLocaleString()}</TableCell>
                  <TableCell>{payment.mode}</TableCell>
                  <TableCell>{payment.receipt}</TableCell>
                  <TableCell>
                    <Chip label={payment.status} color="success" size="small" />
                  </TableCell>
                  <TableCell>
                    <Button size="small" startIcon={<DownloadIcon />}>
                      Receipt
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
