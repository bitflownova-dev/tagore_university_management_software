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

const paymentHistory = [
  { date: 'Aug 5, 2025', semester: 'Semester 3', amount: 42000, method: 'Online', receipt: 'AHS2025001', status: 'Paid' },
  { date: 'Jan 10, 2025', semester: 'Semester 2', amount: 42000, method: 'Bank Transfer', receipt: 'AHS2025045', status: 'Paid' },
];

const pendingPayments = [
  { semester: 'Semester 4', amount: 42000, dueDate: 'Jan 15, 2026', status: 'Pending' },
];

export default function AlliedHealthFeePayments() {
  const totalFees = 168000; // 4 semesters BSc MLT (2 years completed out of 3)
  const amountPaid = 84000;
  const pendingDues = 84000;

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Fee Payments
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          BSc MLT program fee management & payment history
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Fees
              </Typography>
              <Typography variant="h5" sx={{ color: '#1565C0', fontWeight: 600 }}>
                ₹{totalFees.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Amount Paid
              </Typography>
              <Typography variant="h5" sx={{ color: '#2E7D32', fontWeight: 600 }}>
                ₹{amountPaid.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Pending Dues
              </Typography>
              <Typography variant="h5" sx={{ color: '#D32F2F', fontWeight: 600 }}>
                ₹{pendingDues.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Next Payment
              </Typography>
              <Typography variant="body2" sx={{ color: '#F57C00', fontWeight: 600, mt: 1 }}>
                Jan 15, 2026
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Pending Payments
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Semester</strong></TableCell>
                <TableCell><strong>Amount</strong></TableCell>
                <TableCell><strong>Due Date</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingPayments.map((payment, index) => (
                <TableRow key={index}>
                  <TableCell>{payment.semester}</TableCell>
                  <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                  <TableCell>{payment.dueDate}</TableCell>
                  <TableCell>
                    <Chip label={payment.status} size="small" color="warning" />
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" size="small" sx={{ bgcolor: '#1565C0' }}>
                      Pay Now
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Payment History
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Semester</strong></TableCell>
                <TableCell><strong>Amount</strong></TableCell>
                <TableCell><strong>Method</strong></TableCell>
                <TableCell><strong>Receipt No</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paymentHistory.map((payment, index) => (
                <TableRow key={index} hover>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.semester}</TableCell>
                  <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>{payment.receipt}</TableCell>
                  <TableCell>
                    <Chip label={payment.status} size="small" color="success" />
                  </TableCell>
                  <TableCell>
                    <Button size="small" startIcon={<GetApp />}>
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
