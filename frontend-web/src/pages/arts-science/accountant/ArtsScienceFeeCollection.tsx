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
import { AttachMoney, Send, GetApp } from '@mui/icons-material';

const yearWiseCollection = [
  { year: 'First Year', totalStudents: 520, collected: 456, pending: 64, amount: 21204000, rate: 87.7 },
  { year: 'Second Year', totalStudents: 495, collected: 468, pending: 27, amount: 21762000, rate: 94.5 },
  { year: 'Third Year', totalStudents: 480, collected: 445, pending: 35, amount: 23140000, rate: 92.7 },
];

const recentPayments = [
  { id: 1, rollNo: 'AS345', name: 'Rahul Kumar', year: 'Third Year', amount: 52000, date: 'Dec 10, 2024', method: 'Online' },
  { id: 2, rollNo: 'AS012', name: 'Priya Sharma', year: 'First Year', amount: 46500, date: 'Dec 10, 2024', method: 'Bank Transfer' },
  { id: 3, rollNo: 'AS198', name: 'Amit Patel', year: 'Second Year', amount: 46500, date: 'Dec 9, 2024', method: 'Online' },
  { id: 4, rollNo: 'AS276', name: 'Meera Reddy', year: 'Third Year', amount: 52000, date: 'Dec 9, 2024', method: 'Cash' },
  { id: 5, rollNo: 'AS089', name: 'Vijay Singh', year: 'First Year', amount: 46500, date: 'Dec 8, 2024', method: 'Online' },
];

const pendingPayments = [
  { id: 1, rollNo: 'AS234', name: 'Anjali Mehta', year: 'Third Year', amount: 52000, dueDate: 'Dec 15, 2024', status: 'Pending' },
  { id: 2, rollNo: 'AS156', name: 'Neha Verma', year: 'Second Year', amount: 46500, dueDate: 'Dec 12, 2024', status: 'Overdue' },
  { id: 3, rollNo: 'AS389', name: 'Ravi Kumar', year: 'First Year', amount: 46500, dueDate: 'Dec 18, 2024', status: 'Pending' },
  { id: 4, rollNo: 'AS421', name: 'Pooja Sharma', year: 'Third Year', amount: 52000, dueDate: 'Dec 10, 2024', status: 'Overdue' },
];

export default function ArtsScienceFeeCollection() {
  const [selectedYear] = useState('All Years');

  const totalCollection = yearWiseCollection.reduce((sum, y) => sum + y.amount, 0);
  const totalCollected = yearWiseCollection.reduce((sum, y) => sum + y.collected, 0);
  const totalPending = yearWiseCollection.reduce((sum, y) => sum + y.pending, 0);
  const avgCollectionRate = (
    yearWiseCollection.reduce((sum, y) => sum + y.rate, 0) / yearWiseCollection.length
  ).toFixed(1);

  const handleSendReminder = (rollNo: string) => {
    console.log('Sending reminder to:', rollNo);
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #5E35B1 0%, #311B92 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Arts & Science Fee Collection
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Year-wise fee tracking & collection management
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#EDE7F6' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#5E35B1' }}>
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
                {totalCollected}
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
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976D2' }}>
                {avgCollectionRate}%
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AttachMoney sx={{ mr: 2, color: '#5E35B1' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Year-wise Fee Collection
            </Typography>
          </Box>
          <Button variant="outlined" startIcon={<GetApp />} sx={{ borderColor: '#5E35B1', color: '#5E35B1' }}>
            Export Report
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Year</TableCell>
                <TableCell align="center">Total Students</TableCell>
                <TableCell align="center">Collected</TableCell>
                <TableCell align="center">Pending</TableCell>
                <TableCell align="right">Amount Collected</TableCell>
                <TableCell>Collection Rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {yearWiseCollection.map((row, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{row.year}</TableCell>
                  <TableCell align="center">{row.totalStudents}</TableCell>
                  <TableCell align="center" sx={{ color: '#388E3C', fontWeight: 600 }}>
                    {row.collected}
                  </TableCell>
                  <TableCell align="center" sx={{ color: '#D32F2F', fontWeight: 600 }}>
                    {row.pending}
                  </TableCell>
                  <TableCell align="right">₹{row.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={row.rate}
                        sx={{
                          flex: 1,
                          height: 8,
                          borderRadius: 4,
                          bgcolor: '#f0f0f0',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: row.rate >= 90 ? '#388E3C' : row.rate >= 80 ? '#F57C00' : '#D32F2F',
                          },
                        }}
                      />
                      <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 45 }}>
                        {row.rate}%
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} align="right" sx={{ fontWeight: 700 }}>
                  Total:
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: '#D32F2F' }}>
                  {totalPending}
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: '#5E35B1' }}>
                  ₹{totalCollection.toLocaleString()}
                </TableCell>
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <AttachMoney sx={{ mr: 2, color: '#5E35B1' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Recent Payments
              </Typography>
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Roll No</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Year</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Method</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentPayments.map((payment) => (
                    <TableRow key={payment.id} hover>
                      <TableCell>{payment.rollNo}</TableCell>
                      <TableCell>{payment.name}</TableCell>
                      <TableCell>
                        <Chip label={payment.year} size="small" color="primary" />
                      </TableCell>
                      <TableCell align="right">₹{payment.amount.toLocaleString()}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>
                        <Chip label={payment.method} size="small" variant="outlined" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <AttachMoney sx={{ mr: 2, color: '#D32F2F' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Pending Payments
              </Typography>
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Roll No</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Year</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pendingPayments.map((payment) => (
                    <TableRow key={payment.id} hover>
                      <TableCell>{payment.rollNo}</TableCell>
                      <TableCell>{payment.name}</TableCell>
                      <TableCell>
                        <Chip label={payment.year} size="small" color="primary" />
                      </TableCell>
                      <TableCell align="right">₹{payment.amount.toLocaleString()}</TableCell>
                      <TableCell>{payment.dueDate}</TableCell>
                      <TableCell align="center">
                        <Chip label={payment.status} size="small" color={payment.status === 'Overdue' ? 'error' : 'warning'} />
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<Send />}
                          onClick={() => handleSendReminder(payment.rollNo)}
                        >
                          Remind
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#5E35B1' }}>
          UGC Fee Structure Guidelines
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          • Fee structure must be approved by State Government/University for aided colleges
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Fees should be reasonable and affordable for students from all backgrounds
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Refund policy must be clearly mentioned in prospectus as per UGC guidelines
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Scholarship tracking: Government scholarships (SC/ST/OBC), Merit scholarships, Need-based aid
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Fee concessions for economically weaker sections as per state/institutional policy
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • All fee collection records must be audited annually by certified auditor
        </Typography>
      </Paper>
    </Box>
  );
}
