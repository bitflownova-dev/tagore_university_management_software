import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { FileDownload, Send } from '@mui/icons-material';

const payrollData = [
  {
    id: 1,
    name: 'Dr. Rajeev Kumar',
    department: 'MLT',
    designation: 'Professor',
    basic: 75000,
    allowances: 25000,
    deductions: 8000,
    net: 92000,
    status: 'Pending',
  },
  {
    id: 2,
    name: 'Dr. Priya Sharma',
    department: 'Radiology',
    designation: 'Associate Professor',
    basic: 65000,
    allowances: 20000,
    deductions: 7000,
    net: 78000,
    status: 'Pending',
  },
  {
    id: 3,
    name: 'Dr. Anil Verma',
    department: 'Physiotherapy',
    designation: 'Professor',
    basic: 75000,
    allowances: 25000,
    deductions: 8000,
    net: 92000,
    status: 'Processed',
  },
];

export default function AlliedHealthPayrollManagement() {
  const totalPayroll = payrollData.reduce((sum, p) => sum + p.net, 0);
  const pendingPayments = payrollData.filter(p => p.status === 'Pending').length;

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Payroll Management
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Manage employee salaries and payroll processing
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Payroll
              </Typography>
              <Typography variant="h5" sx={{ color: '#1565C0', fontWeight: 600 }}>
                ₹{totalPayroll.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Pending Payments
              </Typography>
              <Typography variant="h5" sx={{ color: '#F57C00', fontWeight: 600 }}>
                {pendingPayments}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Processed
              </Typography>
              <Typography variant="h5" sx={{ color: '#2E7D32', fontWeight: 600 }}>
                {payrollData.length - pendingPayments}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl size="small" sx={{ width: 150 }}>
              <InputLabel>Month</InputLabel>
              <Select value="december" label="Month">
                <MenuItem value="december">December</MenuItem>
                <MenuItem value="november">November</MenuItem>
                <MenuItem value="october">October</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ width: 120 }}>
              <InputLabel>Year</InputLabel>
              <Select value="2025" label="Year">
                <MenuItem value="2025">2025</MenuItem>
                <MenuItem value="2024">2024</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" startIcon={<FileDownload />}>
              Export
            </Button>
            <Button variant="contained" startIcon={<Send />} sx={{ bgcolor: '#1565C0' }}>
              Process All
            </Button>
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Employee</strong></TableCell>
                <TableCell><strong>Department</strong></TableCell>
                <TableCell><strong>Designation</strong></TableCell>
                <TableCell align="right"><strong>Basic</strong></TableCell>
                <TableCell align="right"><strong>Allowances</strong></TableCell>
                <TableCell align="right"><strong>Deductions</strong></TableCell>
                <TableCell align="right"><strong>Net Salary</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payrollData.map((emp) => (
                <TableRow key={emp.id} hover>
                  <TableCell>{emp.name}</TableCell>
                  <TableCell>{emp.department}</TableCell>
                  <TableCell>{emp.designation}</TableCell>
                  <TableCell align="right">₹{emp.basic.toLocaleString()}</TableCell>
                  <TableCell align="right">₹{emp.allowances.toLocaleString()}</TableCell>
                  <TableCell align="right">₹{emp.deductions.toLocaleString()}</TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      ₹{emp.net.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={emp.status}
                      size="small"
                      color={emp.status === 'Processed' ? 'success' : 'warning'}
                    />
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
