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
import { Payment, FilterList } from '@mui/icons-material';

const payrollData = [
  { id: 1, name: 'Dr. Anjali Verma', department: 'Medical-Surgical', designation: 'Professor', basic: 160000, allowances: 80000, total: 240000, status: 'Paid' },
  { id: 2, name: 'Dr. Priya Reddy', department: 'Community Health', designation: 'Professor', basic: 155000, allowances: 77500, total: 232500, status: 'Paid' },
  { id: 3, name: 'Ms. Kavita Sharma', department: 'Child Health', designation: 'Associate Professor', basic: 120000, allowances: 60000, total: 180000, status: 'Pending' },
  { id: 4, name: 'Dr. Meera Singh', department: 'Mental Health', designation: 'Professor', basic: 150000, allowances: 75000, total: 225000, status: 'Paid' },
  { id: 5, name: 'Ms. Sunita Patel', department: 'OBG Nursing', designation: 'Associate Professor', basic: 115000, allowances: 57500, total: 172500, status: 'Pending' },
  { id: 6, name: 'Ms. Rekha Kumar', department: 'Nursing Foundation', designation: 'Assistant Professor', basic: 90000, allowances: 45000, total: 135000, status: 'Paid' },
  { id: 7, name: 'Dr. Neha Agarwal', department: 'Research & Statistics', designation: 'Professor', basic: 145000, allowances: 72500, total: 217500, status: 'Paid' },
  { id: 8, name: 'Ms. Pooja Gupta', department: 'Medical-Surgical', designation: 'Assistant Professor', basic: 95000, allowances: 47500, total: 142500, status: 'Pending' },
];

const departments = ['All', 'Medical-Surgical', 'Community Health', 'Child Health', 'Mental Health', 'OBG Nursing', 'Nursing Foundation', 'Research & Statistics'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function NursingPayrollManagement() {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('November');

  const filteredPayroll = payrollData.filter((payroll) => {
    const matchesDepartment = selectedDepartment === 'All' || payroll.department === selectedDepartment;
    return matchesDepartment;
  });

  const totalPayroll = filteredPayroll.reduce((sum, p) => sum + p.total, 0);
  const paidPayroll = filteredPayroll.filter((p) => p.status === 'Paid').reduce((sum, p) => sum + p.total, 0);
  const pendingPayroll = filteredPayroll.filter((p) => p.status === 'Pending').reduce((sum, p) => sum + p.total, 0);
  const totalFaculty = filteredPayroll.length;

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Nursing Payroll Management
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Faculty salary processing and payment tracking
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#2E7D32' }}>
                ₹{(totalPayroll / 100000).toFixed(2)}L
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Payroll
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#C8E6C9' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1B5E20' }}>
                ₹{(paidPayroll / 100000).toFixed(2)}L
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Salaries Paid
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#A5D6A7' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#C62828' }}>
                ₹{(pendingPayroll / 100000).toFixed(2)}L
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending Payments
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#81C784' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#2E7D32' }}>
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Payment sx={{ mr: 2, color: '#2E7D32' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Payroll Details - {selectedMonth} 2025
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              size="small"
              label="Department"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              InputProps={{
                startAdornment: <FilterList sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
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
              size="small"
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
        </Grid>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Faculty Name</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell align="right">Basic Salary</TableCell>
                <TableCell align="right">Allowances</TableCell>
                <TableCell align="right">Total Salary</TableCell>
                <TableCell>Status</TableCell>
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
                      sx={{
                        bgcolor: payroll.designation === 'Professor' ? '#2E7D32' : payroll.designation === 'Associate Professor' ? '#388E3C' : '#66BB6A',
                        color: 'white',
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">₹{payroll.basic.toLocaleString()}</TableCell>
                  <TableCell align="right">₹{payroll.allowances.toLocaleString()}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    ₹{payroll.total.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={payroll.status}
                      size="small"
                      sx={{
                        bgcolor: payroll.status === 'Paid' ? '#2E7D32' : '#FB8C00',
                        color: 'white',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {payroll.status === 'Pending' && (
                      <Button size="small" variant="contained" sx={{ bgcolor: '#2E7D32', '&:hover': { bgcolor: '#1B5E20' } }}>
                        Process
                      </Button>
                    )}
                    {payroll.status === 'Paid' && (
                      <Button size="small" variant="outlined" sx={{ borderColor: '#2E7D32', color: '#2E7D32' }}>
                        View Slip
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#2E7D32' }}>
          Nursing Faculty Salary Structure (INC/UGC Norms)
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          • Professor: ₹1,45,000 - ₹1,60,000 (Basic) + 50% Allowances (HRA, DA, Special)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Associate Professor: ₹1,10,000 - ₹1,25,000 (Basic) + 50% Allowances
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Assistant Professor: ₹90,000 - ₹1,00,000 (Basic) + 50% Allowances
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Allowances include: HRA (30%), DA (20%), Medical, Transport, and other benefits
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Annual increments and performance bonuses as per institutional policy
        </Typography>
      </Paper>
    </Box>
  );
}
