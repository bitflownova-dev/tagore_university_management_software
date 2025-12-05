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
  MenuItem,
} from '@mui/material';
import { Download as DownloadIcon, Send as SendIcon } from '@mui/icons-material';
import { useState } from 'react';

export default function PayrollManagement() {
  const [selectedMonth, setSelectedMonth] = useState('December 2024');

  const payrollSummary = {
    totalEmployees: 142,
    totalSalary: 8540000,
    processed: 138,
    pending: 4,
  };

  const payrollRecords = [
    {
      empId: 'EMP001',
      name: 'Dr. Rajesh Kumar',
      designation: 'Professor',
      basicSalary: 80000,
      allowances: 20000,
      deductions: 5000,
      netSalary: 95000,
      status: 'Paid',
    },
    {
      empId: 'EMP002',
      name: 'Prof. Anita Sharma',
      designation: 'Associate Professor',
      basicSalary: 70000,
      allowances: 18000,
      deductions: 4500,
      netSalary: 83500,
      status: 'Paid',
    },
    {
      empId: 'EMP003',
      name: 'Mr. Suresh Patel',
      designation: 'Accountant',
      basicSalary: 45000,
      allowances: 10000,
      deductions: 2500,
      netSalary: 52500,
      status: 'Pending',
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Payroll Management
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="December 2024">December 2024</MenuItem>
            <MenuItem value="November 2024">November 2024</MenuItem>
            <MenuItem value="October 2024">October 2024</MenuItem>
          </TextField>
          <Button variant="contained" startIcon={<SendIcon />}>
            Process Payroll
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Employees
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {payrollSummary.totalEmployees}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Salary
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                ₹{(payrollSummary.totalSalary / 100000).toFixed(1)}L
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Processed
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="success.main">
                {payrollSummary.processed}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Pending
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="warning.main">
                {payrollSummary.pending}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Payroll Records - {selectedMonth}
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Emp ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell align="right">Basic Salary</TableCell>
                <TableCell align="right">Allowances</TableCell>
                <TableCell align="right">Deductions</TableCell>
                <TableCell align="right">Net Salary</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payrollRecords.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{record.empId}</TableCell>
                  <TableCell>{record.name}</TableCell>
                  <TableCell>{record.designation}</TableCell>
                  <TableCell align="right">₹{record.basicSalary.toLocaleString()}</TableCell>
                  <TableCell align="right">₹{record.allowances.toLocaleString()}</TableCell>
                  <TableCell align="right">₹{record.deductions.toLocaleString()}</TableCell>
                  <TableCell align="right">
                    <strong>₹{record.netSalary.toLocaleString()}</strong>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={record.status}
                      color={record.status === 'Paid' ? 'success' : 'warning'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button size="small" startIcon={<DownloadIcon />}>
                      Payslip
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
