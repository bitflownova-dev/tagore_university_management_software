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
} from '@mui/material';
import { Payment, Receipt, Download } from '@mui/icons-material';

const feeStructure = [
  { phase: 'Phase 1 (Year 1)', tuition: 250000, hospital: 30000, exam: 15000, library: 5000, total: 300000, status: 'Paid', dueDate: '2024-08-15' },
  { phase: 'Phase 2 (Year 2-3)', tuition: 250000, hospital: 35000, exam: 18000, library: 5000, total: 308000, status: 'Paid', dueDate: '2024-08-15' },
  { phase: 'Phase 3 Part 1 (Year 3.5)', tuition: 260000, hospital: 40000, exam: 20000, library: 5000, total: 325000, status: 'Pending', dueDate: '2024-12-20' },
  { phase: 'Phase 3 Part 2 (Year 4.5)', tuition: 260000, hospital: 45000, exam: 22000, library: 5000, total: 332000, status: 'Upcoming', dueDate: '2025-08-15' },
  { phase: 'Internship', tuition: 150000, hospital: 50000, exam: 10000, library: 0, total: 210000, status: 'Upcoming', dueDate: '2026-08-15' },
];

const paymentHistory = [
  { id: 1, date: '2024-08-10', phase: 'Phase 1', amount: 300000, method: 'Online', receipt: 'RCP001', status: 'Success' },
  { id: 2, date: '2024-08-12', phase: 'Phase 2', amount: 308000, method: 'Bank Transfer', receipt: 'RCP002', status: 'Success' },
];

export default function MedicalFeePayments() {
  const totalPaid = paymentHistory.reduce((sum, p) => sum + p.amount, 0);
  const totalFees = feeStructure.reduce((sum, f) => sum + f.total, 0);
  const pendingFees = feeStructure.filter((f) => f.status === 'Pending').reduce((sum, f) => sum + f.total, 0);

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #D32F2F 0%, #C62828 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          MBBS Fee Payments
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Phase-wise fee structure & payment history
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFEBEE' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#D32F2F' }}>
                ₹{(totalFees / 100000).toFixed(2)}L
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total MBBS Fees
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#388E3C' }}>
                ₹{(totalPaid / 100000).toFixed(2)}L
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Amount Paid
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFF3E0' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#F57C00' }}>
                ₹{(pendingFees / 100000).toFixed(2)}L
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
                {((totalPaid / totalFees) * 100).toFixed(1)}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Payment Progress
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Phase-wise Fee Structure
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>CBME Phase</TableCell>
                <TableCell align="right">Tuition Fee</TableCell>
                <TableCell align="right">Hospital Practicum</TableCell>
                <TableCell align="right">Exam Fee</TableCell>
                <TableCell align="right">Library Fee</TableCell>
                <TableCell align="right">Total Amount</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feeStructure.map((fee, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{fee.phase}</TableCell>
                  <TableCell align="right">₹{fee.tuition.toLocaleString()}</TableCell>
                  <TableCell align="right">₹{fee.hospital.toLocaleString()}</TableCell>
                  <TableCell align="right">₹{fee.exam.toLocaleString()}</TableCell>
                  <TableCell align="right">₹{fee.library.toLocaleString()}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    ₹{fee.total.toLocaleString()}
                  </TableCell>
                  <TableCell>{fee.dueDate}</TableCell>
                  <TableCell>
                    <Chip
                      label={fee.status}
                      size="small"
                      color={
                        fee.status === 'Paid'
                          ? 'success'
                          : fee.status === 'Pending'
                          ? 'error'
                          : 'default'
                      }
                    />
                  </TableCell>
                  <TableCell>
                    {fee.status === 'Pending' ? (
                      <Button size="small" variant="contained" color="error" startIcon={<Payment />}>
                        Pay Now
                      </Button>
                    ) : fee.status === 'Paid' ? (
                      <Button size="small" variant="outlined" startIcon={<Receipt />}>
                        Receipt
                      </Button>
                    ) : (
                      <Button size="small" disabled>
                        Not Due
                      </Button>
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
          <Button variant="outlined" color="error" startIcon={<Download />}>
            Download All Receipts
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>CBME Phase</TableCell>
                <TableCell align="right">Amount Paid</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Receipt No</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paymentHistory.map((payment) => (
                <TableRow key={payment.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{payment.date}</TableCell>
                  <TableCell>
                    <Chip label={payment.phase} size="small" color="error" variant="outlined" />
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    ₹{payment.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>{payment.receipt}</TableCell>
                  <TableCell>
                    <Chip label={payment.status} size="small" color="success" />
                  </TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined" startIcon={<Receipt />}>
                      View Receipt
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#D32F2F' }}>
          Fee Payment Information
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          • <strong>Tuition Fee:</strong> Covers academic teaching, lectures, and practical sessions
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • <strong>Hospital Practicum Fee:</strong> Clinical rotation training in hospital wards and OPD
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • <strong>Examination Fee:</strong> Internal assessments, OSCE, OSPE, Viva, and University exams
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • <strong>Library Fee:</strong> Access to medical library and online journals
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          • Fees are phase-wise as per CBME curriculum structure
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Late payment may attract penalties and affect examination eligibility
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Scholarship and financial aid options are available for eligible students
        </Typography>
      </Paper>
    </Box>
  );
}
