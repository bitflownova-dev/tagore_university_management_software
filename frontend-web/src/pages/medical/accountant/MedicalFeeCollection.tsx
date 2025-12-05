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
  TextField,
  MenuItem,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import { FileDownload, Payment } from '@mui/icons-material';

const phaseWiseCollection = [
  { phase: 'Phase 1', totalStudents: 200, collected: 180, pending: 20, amount: 54000000, collectionRate: 90 },
  { phase: 'Phase 2', totalStudents: 190, collected: 168, pending: 22, amount: 51744000, collectionRate: 88 },
  { phase: 'Phase 3 Part 1', totalStudents: 185, collected: 160, pending: 25, amount: 52000000, collectionRate: 86 },
  { phase: 'Phase 3 Part 2', totalStudents: 180, collected: 165, pending: 15, amount: 54780000, collectionRate: 92 },
  { phase: 'Internship', totalStudents: 45, collected: 42, pending: 3, amount: 8820000, collectionRate: 93 },
];

const recentPayments = [
  { id: 1, date: '2024-12-13', rollNo: 'MB001', name: 'Rahul Sharma', phase: 'Phase 2', amount: 308000, method: 'Online', status: 'Success' },
  { id: 2, date: '2024-12-13', rollNo: 'MB045', name: 'Priya Singh', phase: 'Phase 1', amount: 300000, method: 'Bank Transfer', status: 'Success' },
  { id: 3, date: '2024-12-12', rollNo: 'MB125', name: 'Amit Kumar', phase: 'Phase 3 Part 1', amount: 325000, method: 'Cash', status: 'Success' },
  { id: 4, date: '2024-12-12', rollNo: 'MB156', name: 'Neha Patel', phase: 'Phase 1', amount: 300000, method: 'Online', status: 'Success' },
  { id: 5, date: '2024-12-11', rollNo: 'MB200', name: 'Vikram Reddy', phase: 'Internship', amount: 210000, method: 'Online', status: 'Success' },
];

const pendingPayments = [
  { rollNo: 'MB078', name: 'Ravi Gupta', phase: 'Phase 1', amount: 300000, dueDate: '2024-12-20', overdue: false },
  { rollNo: 'MB089', name: 'Sita Nair', phase: 'Phase 2', amount: 308000, dueDate: '2024-12-18', overdue: false },
  { rollNo: 'MB134', name: 'Karan Verma', phase: 'Phase 3 Part 1', amount: 325000, dueDate: '2024-12-10', overdue: true },
];

export default function MedicalFeeCollection() {
  const [selectedPhase, setSelectedPhase] = useState('All');

  const totalCollection = phaseWiseCollection.reduce((sum, p) => sum + p.amount, 0);
  const totalStudents = phaseWiseCollection.reduce((sum, p) => sum + p.totalStudents, 0);
  const totalPending = phaseWiseCollection.reduce((sum, p) => sum + p.pending, 0);
  const avgCollectionRate = (phaseWiseCollection.reduce((sum, p) => sum + p.collectionRate, 0) / phaseWiseCollection.length);

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #D32F2F 0%, #C62828 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          MBBS Fee Collection Management
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Phase-wise fee collection & tracking
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFEBEE' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#D32F2F' }}>
                ₹{(totalCollection / 10000000).toFixed(2)} Cr
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
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#388E3C' }}>
                {totalStudents - totalPending}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fees Collected
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFF3E0' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#F57C00' }}>
                {totalPending}
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
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976D2' }}>
                {avgCollectionRate.toFixed(1)}%
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
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Phase-wise Fee Collection
          </Typography>
          <Button variant="outlined" color="error" startIcon={<FileDownload />}>
            Export Report
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>CBME Phase</TableCell>
                <TableCell align="center">Total Students</TableCell>
                <TableCell align="center">Collected</TableCell>
                <TableCell align="center">Pending</TableCell>
                <TableCell align="right">Amount Collected</TableCell>
                <TableCell align="center">Collection Rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {phaseWiseCollection.map((phase) => (
                <TableRow key={phase.phase} hover>
                  <TableCell sx={{ fontWeight: 600 }}>
                    <Chip label={phase.phase} size="small" color="error" variant="outlined" />
                  </TableCell>
                  <TableCell align="center">{phase.totalStudents}</TableCell>
                  <TableCell align="center">{phase.collected}</TableCell>
                  <TableCell align="center">{phase.pending}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    ₹{(phase.amount / 100000).toFixed(2)}L
                  </TableCell>
                  <TableCell align="center">
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {phase.collectionRate}%
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={phase.collectionRate}
                        color={phase.collectionRate >= 90 ? 'success' : phase.collectionRate >= 80 ? 'primary' : 'warning'}
                        sx={{ height: 6, borderRadius: 3 }}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Recent Fee Payments
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Roll No</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>CBME Phase</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentPayments.map((payment) => (
                <TableRow key={payment.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{payment.date}</TableCell>
                  <TableCell>{payment.rollNo}</TableCell>
                  <TableCell>{payment.name}</TableCell>
                  <TableCell>
                    <Chip label={payment.phase} size="small" color="error" variant="outlined" />
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    ₹{payment.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>
                    <Chip label={payment.status} size="small" color="success" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Pending Fee Payments
          </Typography>
          <Button variant="contained" color="error" startIcon={<Payment />}>
            Send Reminders
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Roll No</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>CBME Phase</TableCell>
                <TableCell align="right">Amount Due</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingPayments.map((payment, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{payment.rollNo}</TableCell>
                  <TableCell>{payment.name}</TableCell>
                  <TableCell>
                    <Chip label={payment.phase} size="small" color="error" variant="outlined" />
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    ₹{payment.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>{payment.dueDate}</TableCell>
                  <TableCell>
                    <Chip
                      label={payment.overdue ? 'Overdue' : 'Pending'}
                      size="small"
                      color={payment.overdue ? 'error' : 'warning'}
                    />
                  </TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined" color="error">
                      Send Reminder
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
