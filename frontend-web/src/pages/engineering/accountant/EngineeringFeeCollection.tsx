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
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import { AttachMoney, TrendingUp, People, Assessment } from '@mui/icons-material';

const semesterCollection = [
  { semester: 'Sem 1', totalStudents: 600, collected: 580, pending: 20, amountCollected: 48140000, collectionRate: 96.7 },
  { semester: 'Sem 2', totalStudents: 600, collected: 590, pending: 10, amountCollected: 48970000, collectionRate: 98.3 },
  { semester: 'Sem 3', totalStudents: 580, collected: 550, pending: 30, amountCollected: 49225000, collectionRate: 94.8 },
  { semester: 'Sem 4', totalStudents: 580, collected: 570, pending: 10, amountCollected: 51015000, collectionRate: 98.3 },
  { semester: 'Sem 5', totalStudents: 560, collected: 520, pending: 40, amountCollected: 49920000, collectionRate: 92.9 },
  { semester: 'Sem 6', totalStudents: 560, collected: 540, pending: 20, amountCollected: 51840000, collectionRate: 96.4 },
  { semester: 'Sem 7', totalStudents: 540, collected: 500, pending: 40, amountCollected: 50500000, collectionRate: 92.6 },
  { semester: 'Sem 8', totalStudents: 540, collected: 520, pending: 20, amountCollected: 52520000, collectionRate: 96.3 },
];

const recentPayments = [
  { id: 1, date: '2024-12-12', rollNo: 'ENG001', name: 'Rahul Sharma', semester: 'Sem 5', amount: 96000, method: 'Online', status: 'Completed' },
  { id: 2, date: '2024-12-11', rollNo: 'ENG142', name: 'Priya Singh', semester: 'Sem 3', amount: 89500, method: 'Bank Transfer', status: 'Completed' },
  { id: 3, date: '2024-12-10', rollNo: 'ENG235', name: 'Amit Kumar', semester: 'Sem 7', amount: 101000, method: 'Online', status: 'Completed' },
  { id: 4, date: '2024-12-09', rollNo: 'ENG078', name: 'Neha Patel', semester: 'Sem 2', amount: 83000, method: 'Cheque', status: 'Completed' },
  { id: 5, date: '2024-12-08', rollNo: 'ENG456', name: 'Vikram Reddy', semester: 'Sem 6', amount: 96000, method: 'Online', status: 'Completed' },
];

const pendingPayments = [
  { id: 1, rollNo: 'ENG089', name: 'Anjali Gupta', semester: 'Sem 5', amountDue: 96000, dueDate: '2024-12-15', status: 'Overdue' },
  { id: 2, rollNo: 'ENG123', name: 'Suresh Nair', semester: 'Sem 3', amountDue: 89500, dueDate: '2024-12-20', status: 'Pending' },
  { id: 3, rollNo: 'ENG267', name: 'Kavita Sharma', semester: 'Sem 7', amountDue: 101000, dueDate: '2024-12-18', status: 'Overdue' },
  { id: 4, rollNo: 'ENG345', name: 'Anil Kumar', semester: 'Sem 1', amountDue: 83000, dueDate: '2024-12-25', status: 'Pending' },
];

export default function EngineeringFeeCollection() {
  const [searchQuery, setSearchQuery] = useState('');

  const totalCollection = semesterCollection.reduce((sum, sem) => sum + sem.amountCollected, 0);
  const totalCollected = semesterCollection.reduce((sum, sem) => sum + sem.collected, 0);
  const totalPending = semesterCollection.reduce((sum, sem) => sum + sem.pending, 0);
  const totalStudents = semesterCollection.reduce((sum, sem) => sum + sem.totalStudents, 0);
  const overallCollectionRate = (totalCollected / totalStudents) * 100;

  const filteredPending = pendingPayments.filter(
    (payment) =>
      payment.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #1976D2 0%, #1565C0 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Engineering Fee Collection
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Track semester-wise fee payments & collections
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E3F2FD' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AttachMoney sx={{ color: '#1976D2', mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Total Collection
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976D2' }}>
                ₹{(totalCollection / 10000000).toFixed(2)}Cr
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TrendingUp sx={{ color: '#388E3C', mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Fees Collected
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#388E3C' }}>
                {totalCollected} Students
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFEBEE' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <People sx={{ color: '#D32F2F', mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Pending Students
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#D32F2F' }}>
                {totalPending}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E3F2FD' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Assessment sx={{ color: '#1976D2', mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Collection Rate
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976D2' }}>
                {overallCollectionRate.toFixed(1)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Semester-wise Fee Collection
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Semester</TableCell>
                <TableCell align="center">Total Students</TableCell>
                <TableCell align="center">Collected</TableCell>
                <TableCell align="center">Pending</TableCell>
                <TableCell align="right">Amount Collected</TableCell>
                <TableCell>Collection Rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {semesterCollection.map((sem) => (
                <TableRow key={sem.semester} hover>
                  <TableCell>
                    <Chip label={sem.semester} size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell align="center">{sem.totalStudents}</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, color: '#388E3C' }}>
                    {sem.collected}
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, color: '#D32F2F' }}>
                    {sem.pending}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    ₹{(sem.amountCollected / 10000000).toFixed(2)}Cr
                  </TableCell>
                  <TableCell sx={{ width: 200 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LinearProgress
                        variant="determinate"
                        value={sem.collectionRate}
                        sx={{ flexGrow: 1, mr: 1, height: 8, borderRadius: 4 }}
                        color={sem.collectionRate >= 95 ? 'success' : sem.collectionRate >= 90 ? 'primary' : 'warning'}
                      />
                      <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 50 }}>
                        {sem.collectionRate.toFixed(1)}%
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={4} align="right" sx={{ fontWeight: 700 }}>
                  Total Collection:
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: '#1976D2' }}>
                  ₹{(totalCollection / 10000000).toFixed(2)}Cr
                </TableCell>
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Recent Payments
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Roll No</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Semester</TableCell>
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
                  <TableCell sx={{ fontWeight: 600 }}>{payment.name}</TableCell>
                  <TableCell>
                    <Chip label={payment.semester} size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    ₹{payment.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell align="center">
                    <Chip label={payment.status} size="small" color="success" />
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
            Pending Payments
          </Typography>
          <TextField
            size="small"
            placeholder="Search by Roll No or Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: 300 }}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Roll No</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Semester</TableCell>
                <TableCell align="right">Amount Due</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPending.map((payment) => (
                <TableRow key={payment.id} hover>
                  <TableCell sx={{ fontFamily: 'monospace' }}>{payment.rollNo}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{payment.name}</TableCell>
                  <TableCell>
                    <Chip label={payment.semester} size="small" color="primary" variant="outlined" />
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
                    <Button size="small" variant="outlined" color="primary">
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
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#1976D2' }}>
          AICTE Fee Compliance
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          • Fee structure approved by AICTE and Fee Regulatory Committee
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Transparent fee collection process with detailed receipts
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Refund policy as per AICTE guidelines and state government norms
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Scholarship disbursement tracking for government-sponsored schemes
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Regular audits and financial reporting to AICTE and university
        </Typography>
      </Paper>
    </Box>
  );
}
