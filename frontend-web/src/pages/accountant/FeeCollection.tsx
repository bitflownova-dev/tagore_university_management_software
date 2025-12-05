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
  Button,
  Chip,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Search as SearchIcon, Payment as PaymentIcon } from '@mui/icons-material';
import { useState } from 'react';

export default function FeeCollection() {
  const [searchTerm, setSearchTerm] = useState('');

  const collectionSummary = {
    totalCollected: 13750000,
    todayCollection: 125000,
    pendingAmount: 1250000,
    totalStudents: 1750,
  };

  const recentPayments = [
    {
      receiptNo: 'RCP12345',
      studentName: 'Amit Kumar',
      rollNo: 'CS2021001',
      amount: 25000,
      paymentMode: 'Online',
      date: '2024-12-04',
      status: 'Success',
    },
    {
      receiptNo: 'RCP12346',
      studentName: 'Priya Singh',
      rollNo: 'CS2021002',
      amount: 50000,
      paymentMode: 'Card',
      date: '2024-12-04',
      status: 'Success',
    },
    {
      receiptNo: 'RCP12347',
      studentName: 'Rahul Sharma',
      rollNo: 'MT2022001',
      amount: 30000,
      paymentMode: 'Cash',
      date: '2024-12-03',
      status: 'Success',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Fee Collection
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Collected
              </Typography>
              <Typography variant="h5" fontWeight="bold" color="success.main">
                ₹{(collectionSummary.totalCollected / 10000000).toFixed(2)}Cr
              </Typography>
              <Typography variant="caption" color="text.secondary">
                This Academic Year
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Today's Collection
              </Typography>
              <Typography variant="h5" fontWeight="bold" color="primary.main">
                ₹{(collectionSummary.todayCollection / 100000).toFixed(2)}L
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date().toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Pending Amount
              </Typography>
              <Typography variant="h5" fontWeight="bold" color="error.main">
                ₹{(collectionSummary.pendingAmount / 100000).toFixed(2)}L
              </Typography>
              <Typography variant="caption" color="text.secondary">
                To be collected
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Students
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {collectionSummary.totalStudents}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Active enrollment
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">Recent Payments</Typography>
          <Button variant="contained" startIcon={<PaymentIcon />}>
            Add Payment
          </Button>
        </Box>

        <TextField
          fullWidth
          placeholder="Search by receipt no, student name, or roll number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Receipt No</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Roll No</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Payment Mode</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentPayments.map((payment, index) => (
                <TableRow key={index}>
                  <TableCell>{payment.receiptNo}</TableCell>
                  <TableCell>{payment.studentName}</TableCell>
                  <TableCell>{payment.rollNo}</TableCell>
                  <TableCell align="right">₹{payment.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip label={payment.paymentMode} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Chip label={payment.status} color="success" size="small" />
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
