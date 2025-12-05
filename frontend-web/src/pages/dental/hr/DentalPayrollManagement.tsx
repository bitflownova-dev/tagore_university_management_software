import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
} from '@mui/material';
import { AccountBalance, CheckCircle } from '@mui/icons-material';

const payrollData = [
  { id: 1, name: 'Dr. Rajesh Kumar', department: 'Oral Surgery', designation: 'Professor', basic: 180000, hra: 54000, da: 36000, total: 270000, status: 'Paid' },
  { id: 2, name: 'Dr. Priya Sharma', department: 'Conservative', designation: 'Professor', basic: 180000, hra: 54000, da: 36000, total: 270000, status: 'Paid' },
  { id: 3, name: 'Dr. Amit Patel', department: 'Prosthodontics', designation: 'Associate Professor', basic: 140000, hra: 42000, da: 28000, total: 210000, status: 'Paid' },
  { id: 4, name: 'Dr. Meera Reddy', department: 'Orthodontics', designation: 'Professor', basic: 180000, hra: 54000, da: 36000, total: 270000, status: 'Pending' },
  { id: 5, name: 'Dr. Suresh Nair', department: 'Periodontology', designation: 'Associate Professor', basic: 140000, hra: 42000, da: 28000, total: 210000, status: 'Pending' },
  { id: 6, name: 'Dr. Kavita Singh', department: 'Oral Pathology', designation: 'Professor', basic: 180000, hra: 54000, da: 36000, total: 270000, status: 'Paid' },
  { id: 7, name: 'Dr. Anil Kumar', department: 'Oral Medicine', designation: 'Associate Professor', basic: 140000, hra: 42000, da: 28000, total: 210000, status: 'Paid' },
  { id: 8, name: 'Dr. Neha Gupta', department: 'Pediatric', designation: 'Assistant Professor', basic: 100000, hra: 30000, da: 20000, total: 150000, status: 'Pending' },
];

const departments = [
  'All Departments',
  'Oral Surgery',
  'Conservative',
  'Prosthodontics',
  'Orthodontics',
  'Periodontology',
  'Oral Pathology',
  'Oral Medicine',
  'Pediatric',
  'Public Health',
];

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function DentalPayrollManagement() {
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedMonth, setSelectedMonth] = useState('December');

  const filteredPayroll = payrollData.filter(
    (payroll) => selectedDepartment === 'All Departments' || payroll.department === selectedDepartment
  );

  const totalPayroll = filteredPayroll.reduce((sum, p) => sum + p.total, 0);
  const salariesPaid = filteredPayroll.filter((p) => p.status === 'Paid').reduce((sum, p) => sum + p.total, 0);
  const pendingPayments = filteredPayroll.filter((p) => p.status === 'Pending').reduce((sum, p) => sum + p.total, 0);
  const totalFaculty = filteredPayroll.length;

  const handleProcessPayment = (id: number) => {
    console.log('Processing payment for faculty:', id);
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #00796B 0%, #004D40 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Dental Payroll Management
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Faculty salary management & DCI compliance
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E0F2F1' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#00796B' }}>
                ₹{(totalPayroll / 100000).toFixed(2)}L
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Payroll
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#388E3C' }}>
                ₹{(salariesPaid / 100000).toFixed(2)}L
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Salaries Paid
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFEBEE' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#D32F2F' }}>
                ₹{(pendingPayments / 100000).toFixed(2)}L
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending Payments
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E3F2FD' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976D2' }}>
                {totalFaculty}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Faculty
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <AccountBalance sx={{ mr: 2, color: '#00796B' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Payroll Overview
          </Typography>
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Department"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {months.map((month) => (
                <MenuItem key={month} value={month}>
                  {month} 2024
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Faculty Name</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell align="right">Basic Salary</TableCell>
                <TableCell align="right">HRA (30%)</TableCell>
                <TableCell align="right">DA (20%)</TableCell>
                <TableCell align="right">Total Salary</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPayroll.map((payroll) => (
                <TableRow key={payroll.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{payroll.name}</TableCell>
                  <TableCell>{payroll.department}</TableCell>
                  <TableCell>
                    <Chip
                      label={payroll.designation}
                      size="small"
                      color={
                        payroll.designation === 'Professor'
                          ? 'primary'
                          : payroll.designation === 'Associate Professor'
                          ? 'secondary'
                          : 'default'
                      }
                    />
                  </TableCell>
                  <TableCell align="right">₹{payroll.basic.toLocaleString()}</TableCell>
                  <TableCell align="right">₹{payroll.hra.toLocaleString()}</TableCell>
                  <TableCell align="right">₹{payroll.da.toLocaleString()}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    ₹{payroll.total.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    <Chip label={payroll.status} size="small" color={payroll.status === 'Paid' ? 'success' : 'warning'} />
                  </TableCell>
                  <TableCell>
                    {payroll.status === 'Pending' ? (
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<CheckCircle />}
                        sx={{ bgcolor: '#00796B', '&:hover': { bgcolor: '#004D40' } }}
                        onClick={() => handleProcessPayment(payroll.id)}
                      >
                        Process
                      </Button>
                    ) : (
                      <Button size="small" variant="outlined">
                        View Details
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={6} align="right" sx={{ fontWeight: 700 }}>
                  Total:
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: '#00796B' }}>
                  ₹{totalPayroll.toLocaleString()}
                </TableCell>
                <TableCell colSpan={2} />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#00796B' }}>
          Salary Structure Information
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          <strong>Professor:</strong> Basic ₹1,80,000/month + HRA (30%) + DA (20%) = ₹2,70,000/month
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Associate Professor:</strong> Basic ₹1,40,000/month + HRA (30%) + DA (20%) = ₹2,10,000/month
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Assistant Professor:</strong> Basic ₹1,00,000/month + HRA (30%) + DA (20%) = ₹1,50,000/month
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          • Salary structure as per 7th Pay Commission norms for government dental colleges
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Additional allowances: Medical allowance, Transport allowance as per institution policy
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Annual increment: 3% or as per state government norms
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Provident Fund (PF) and Gratuity as per statutory requirements
        </Typography>
      </Paper>
    </Box>
  );
}
