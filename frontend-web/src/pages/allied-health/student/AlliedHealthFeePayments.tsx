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
  alpha,
} from '@mui/material';
import { GetApp } from '@mui/icons-material';

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
    <Box sx={{ minHeight: '100vh', bgcolor: '#F8FBFD', py: 4 }}>
      <Paper 
        elevation={0}
        sx={{ 
          p: 4, 
          mb: 4, 
          background: 'linear-gradient(135deg, #00BFA5 0%, #00897B 100%)',
          borderRadius: 3,
          boxShadow: '0 10px 40px rgba(0, 191, 165, 0.2)',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'white', letterSpacing: '-0.01em' }}>
          Fee Payments
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.95)' }}>
          BSc MLT program fee management & payment history
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card 
            elevation={0}
            sx={{
              bgcolor: '#FFFFFF',
              borderRadius: 3,
              border: '1px solid rgba(0, 0, 0, 0.06)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 24px rgba(0, 191, 165, 0.15)',
              },
            }}
          >
            <CardContent>
              <Typography sx={{ color: '#64748B', mb: 1 }} gutterBottom>
                Total Fees
              </Typography>
              <Typography variant="h5" sx={{ color: '#00BFA5', fontWeight: 800, letterSpacing: '-0.01em' }}>
                ₹{totalFees.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card 
            elevation={0}
            sx={{
              bgcolor: '#FFFFFF',
              borderRadius: 3,
              border: '1px solid rgba(0, 0, 0, 0.06)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 24px rgba(0, 191, 165, 0.15)',
              },
            }}
          >
            <CardContent>
              <Typography sx={{ color: '#64748B', mb: 1 }} gutterBottom>
                Amount Paid
              </Typography>
              <Typography variant="h5" sx={{ color: '#26A69A', fontWeight: 800, letterSpacing: '-0.01em' }}>
                ₹{amountPaid.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card 
            elevation={0}
            sx={{
              bgcolor: '#FFFFFF',
              borderRadius: 3,
              border: '1px solid rgba(0, 0, 0, 0.06)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 24px rgba(0, 191, 165, 0.15)',
              },
            }}
          >
            <CardContent>
              <Typography sx={{ color: '#64748B', mb: 1 }} gutterBottom>
                Pending Dues
              </Typography>
              <Typography variant="h5" sx={{ color: '#EF5350', fontWeight: 800, letterSpacing: '-0.01em' }}>
                ₹{pendingDues.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card 
            elevation={0}
            sx={{
              bgcolor: '#FFFFFF',
              borderRadius: 3,
              border: '1px solid rgba(0, 0, 0, 0.06)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 24px rgba(0, 191, 165, 0.15)',
              },
            }}
          >
            <CardContent>
              <Typography sx={{ color: '#64748B', mb: 1 }} gutterBottom>
                Next Payment
              </Typography>
              <Typography variant="body2" sx={{ color: '#FFA726', fontWeight: 600, mt: 1 }}>
                Jan 15, 2026
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper 
        elevation={0}
        sx={{ 
          p: 4, 
          mb: 4,
          borderRadius: 3,
          border: '1px solid rgba(0, 0, 0, 0.06)',
          bgcolor: '#FFFFFF',
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1A202C', mb: 3 }}>
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
                    <Button 
                      variant="contained" 
                      size="small" 
                      sx={{ 
                        bgcolor: '#00BFA5',
                        '&:hover': {
                          bgcolor: '#00897B',
                        },
                      }}
                    >
                      Pay Now
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper 
        elevation={0}
        sx={{ 
          p: 4,
          borderRadius: 3,
          border: '1px solid rgba(0, 0, 0, 0.06)',
          bgcolor: '#FFFFFF',
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1A202C', mb: 3 }}>
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
                <TableRow 
                  key={index} 
                  sx={{
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: alpha('#00BFA5', 0.04),
                    },
                  }}
                >
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.semester}</TableCell>
                  <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>{payment.receipt}</TableCell>
                  <TableCell>
                    <Chip 
                      label={payment.status} 
                      size="small" 
                      sx={{
                        bgcolor: alpha('#26A69A', 0.1),
                        color: '#26A69A',
                        fontWeight: 600,
                      }}
                    />
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
