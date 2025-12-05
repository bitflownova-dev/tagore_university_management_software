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
} from '@mui/material';
import { AttachMoney, CalendarToday, Paid, Pending } from '@mui/icons-material';

const payrollData = [
  {
    id: 1,
    name: 'Dr. Rajesh Kumar',
    department: 'CSE',
    designation: 'Professor',
    basicSalary: 150000,
    hra: 45000,
    da: 30000,
    allowances: 25000,
    totalSalary: 250000,
    status: 'Paid',
  },
  {
    id: 2,
    name: 'Dr. Priya Singh',
    department: 'ECE',
    designation: 'Associate Professor',
    basicSalary: 120000,
    hra: 36000,
    da: 24000,
    allowances: 20000,
    totalSalary: 200000,
    status: 'Paid',
  },
  {
    id: 3,
    name: 'Dr. Amit Patel',
    department: 'Mechanical',
    designation: 'Assistant Professor',
    basicSalary: 90000,
    hra: 27000,
    da: 18000,
    allowances: 15000,
    totalSalary: 150000,
    status: 'Pending',
  },
  {
    id: 4,
    name: 'Dr. Meena Reddy',
    department: 'Civil',
    designation: 'Assistant Professor',
    basicSalary: 85000,
    hra: 25500,
    da: 17000,
    allowances: 12500,
    totalSalary: 140000,
    status: 'Pending',
  },
  {
    id: 5,
    name: 'Dr. Suresh Nair',
    department: 'Electrical',
    designation: 'Professor',
    basicSalary: 145000,
    hra: 43500,
    da: 29000,
    allowances: 22500,
    totalSalary: 240000,
    status: 'Paid',
  },
  {
    id: 6,
    name: 'Dr. Kavita Sharma',
    department: 'IT',
    designation: 'Associate Professor',
    basicSalary: 115000,
    hra: 34500,
    da: 23000,
    allowances: 17500,
    totalSalary: 190000,
    status: 'Pending',
  },
];

const departments = ['All', 'CSE', 'ECE', 'Mechanical', 'Civil', 'Electrical', 'IT', 'AI & ML', 'Cyber Security'];
const months = [
  'January 2025',
  'December 2024',
  'November 2024',
  'October 2024',
  'September 2024',
  'August 2024',
];

export default function EngineeringPayrollManagement() {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('December 2024');

  const filteredPayroll = payrollData.filter(
    (emp) => selectedDepartment === 'All' || emp.department === selectedDepartment
  );

  const totalPayroll = filteredPayroll.reduce((sum, emp) => sum + emp.totalSalary, 0);
  const paidSalaries = filteredPayroll.filter((e) => e.status === 'Paid').reduce((sum, e) => sum + e.totalSalary, 0);
  const pendingPayments = filteredPayroll.filter((e) => e.status === 'Pending').reduce((sum, e) => sum + e.totalSalary, 0);
  const totalFaculty = filteredPayroll.length;

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #1976D2 0%, #1565C0 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Engineering Payroll Management
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Manage faculty & staff salary payments
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E3F2FD' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AttachMoney sx={{ color: '#1976D2', mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Total Payroll
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976D2' }}>
                ₹{(totalPayroll / 100000).toFixed(2)}L
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Paid sx={{ color: '#388E3C', mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Salaries Paid
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#388E3C' }}>
                ₹{(paidSalaries / 100000).toFixed(2)}L
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFF3E0' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Pending sx={{ color: '#F57C00', mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Pending Payments
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#F57C00' }}>
                ₹{(pendingPayments / 100000).toFixed(2)}L
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E3F2FD' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CalendarToday sx={{ color: '#1976D2', mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Total Faculty
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976D2' }}>
                {totalFaculty}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={5}>
            <TextField
              select
              fullWidth
              label="Month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {months.map((month) => (
                <MenuItem key={month} value={month}>
                  {month}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={5}>
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
          <Grid item xs={12} md={2}>
            <Button fullWidth variant="outlined" sx={{ height: '56px' }}>
              Export Report
            </Button>
          </Grid>
        </Grid>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee Name</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell align="right">Basic Salary</TableCell>
                <TableCell align="right">HRA</TableCell>
                <TableCell align="right">DA</TableCell>
                <TableCell align="right">Allowances</TableCell>
                <TableCell align="right">Total Salary</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPayroll.map((employee) => (
                <TableRow key={employee.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{employee.name}</TableCell>
                  <TableCell>
                    <Chip label={employee.department} size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={employee.designation}
                      size="small"
                      color={
                        employee.designation === 'Professor'
                          ? 'success'
                          : employee.designation === 'Associate Professor'
                          ? 'primary'
                          : 'warning'
                      }
                    />
                  </TableCell>
                  <TableCell align="right">₹{employee.basicSalary.toLocaleString()}</TableCell>
                  <TableCell align="right">₹{employee.hra.toLocaleString()}</TableCell>
                  <TableCell align="right">₹{employee.da.toLocaleString()}</TableCell>
                  <TableCell align="right">₹{employee.allowances.toLocaleString()}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    ₹{employee.totalSalary.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={employee.status}
                      size="small"
                      color={employee.status === 'Paid' ? 'success' : 'warning'}
                    />
                  </TableCell>
                  <TableCell>
                    {employee.status === 'Pending' ? (
                      <Button size="small" variant="contained" color="primary">
                        Process Payment
                      </Button>
                    ) : (
                      <Button size="small" variant="outlined">
                        View Slip
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={7} align="right" sx={{ fontWeight: 700 }}>
                  Total:
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: '#1976D2' }}>
                  ₹{totalPayroll.toLocaleString()}
                </TableCell>
                <TableCell colSpan={2} />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#1976D2' }}>
          AICTE Salary Guidelines
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          • Professor: ₹1,31,400 - ₹2,17,100 (AGP ₹10,000) as per 7th Pay Commission
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Associate Professor: ₹1,01,500 - ₹1,67,400 (AGP ₹9,000)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Assistant Professor: ₹57,700 - ₹1,82,400 (AGP ₹6,000-8,000)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • HRA: 30% (Basic Salary), DA: 20% (Basic Salary), Special Allowances as per institution norms
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Annual Increments & Performance-based incentives as per AICTE regulations
        </Typography>
      </Paper>
    </Box>
  );
}
