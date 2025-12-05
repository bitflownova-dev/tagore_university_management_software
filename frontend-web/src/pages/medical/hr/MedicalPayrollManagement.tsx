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
import { FileDownload, Payment } from '@mui/icons-material';

const payrollData = [
  { id: 1, name: 'Dr. Ramesh Kumar', department: 'Medicine', designation: 'Professor', basicSalary: 120000, clinicalAllowance: 40000, dutiesAllowance: 15000, total: 175000, status: 'Pending' },
  { id: 2, name: 'Dr. Priya Sharma', department: 'Surgery', designation: 'Associate Professor', basicSalary: 95000, clinicalAllowance: 35000, dutiesAllowance: 12000, total: 142000, status: 'Paid' },
  { id: 3, name: 'Dr. Anil Verma', department: 'Pediatrics', designation: 'Assistant Professor', basicSalary: 75000, clinicalAllowance: 28000, dutiesAllowance: 10000, total: 113000, status: 'Paid' },
  { id: 4, name: 'Dr. Meena Reddy', department: 'OBG', designation: 'Assistant Professor', basicSalary: 75000, clinicalAllowance: 30000, dutiesAllowance: 11000, total: 116000, status: 'Pending' },
  { id: 5, name: 'Dr. Suresh Patel', department: 'Anatomy', designation: 'Professor', basicSalary: 110000, clinicalAllowance: 0, dutiesAllowance: 8000, total: 118000, status: 'Paid' },
];

const departments = ['All', 'Anatomy', 'Physiology', 'Biochemistry', 'Pathology', 'Pharmacology', 'Microbiology', 'Forensic Medicine', 'Community Medicine', 'Medicine', 'Surgery', 'OBG', 'Pediatrics'];

export default function MedicalPayrollManagement() {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('December 2024');

  const filteredPayroll = payrollData.filter(
    (emp) => selectedDepartment === 'All' || emp.department === selectedDepartment
  );

  const totalPayroll = filteredPayroll.reduce((sum, emp) => sum + emp.total, 0);
  const pendingCount = filteredPayroll.filter((emp) => emp.status === 'Pending').length;
  const paidCount = filteredPayroll.filter((emp) => emp.status === 'Paid').length;

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #D32F2F 0%, #C62828 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Medical Faculty Payroll
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Salary management for medical college faculty
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFEBEE' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#D32F2F' }}>
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
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#388E3C' }}>
                {paidCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Salaries Paid
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFF3E0' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#F57C00' }}>
                {pendingCount}
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
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976D2' }}>
                142
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Faculty
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={4}>
            <TextField
              select
              fullWidth
              label="Month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <MenuItem value="December 2024">December 2024</MenuItem>
              <MenuItem value="November 2024">November 2024</MenuItem>
              <MenuItem value="October 2024">October 2024</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button fullWidth variant="outlined" color="error" startIcon={<FileDownload />} sx={{ height: '56px' }}>
              Export Payroll
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
                <TableCell align="right">Clinical Allowance</TableCell>
                <TableCell align="right">Duty Allowance</TableCell>
                <TableCell align="right">Total Salary</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPayroll.map((employee) => (
                <TableRow key={employee.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{employee.name}</TableCell>
                  <TableCell>
                    <Chip label={employee.department} size="small" color="error" variant="outlined" />
                  </TableCell>
                  <TableCell>{employee.designation}</TableCell>
                  <TableCell align="right">₹{employee.basicSalary.toLocaleString()}</TableCell>
                  <TableCell align="right">
                    {employee.clinicalAllowance > 0 ? `₹${employee.clinicalAllowance.toLocaleString()}` : '-'}
                  </TableCell>
                  <TableCell align="right">₹{employee.dutiesAllowance.toLocaleString()}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    ₹{employee.total.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={employee.status}
                      size="small"
                      color={employee.status === 'Paid' ? 'success' : 'warning'}
                    />
                  </TableCell>
                  <TableCell>
                    {employee.status === 'Pending' ? (
                      <Button size="small" variant="contained" color="error" startIcon={<Payment />}>
                        Process
                      </Button>
                    ) : (
                      <Button size="small" variant="outlined">
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
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#D32F2F' }}>
          Medical Faculty Salary Structure
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          • <strong>Basic Salary:</strong> As per designation and NMC pay scales
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • <strong>Clinical Allowance:</strong> For clinical faculty involved in patient care (Medicine, Surgery, OBG, Pediatrics, etc.)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • <strong>Duty Allowance:</strong> For on-call duties, night shifts, and emergency services
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • <strong>Other Components:</strong> HRA, Medical allowance, and other benefits as per institution policy
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          • Non-clinical faculty (Anatomy, Physiology, Biochemistry) receive basic salary and duty allowance
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Clinical faculty receive additional clinical allowance based on patient care involvement
        </Typography>
      </Paper>
    </Box>
  );
}
