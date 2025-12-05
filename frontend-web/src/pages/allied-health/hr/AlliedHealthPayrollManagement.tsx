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
  alpha,
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
    <Box sx={{ minHeight: '100vh', bgcolor: '#F8FBFD', py: 4 }}>
      <Paper 
        elevation={0}
        sx={{ 
          p: 4, 
          mb: 4, 
          background: 'linear-gradient(135deg, #00BFA5 0%, #00897B 100%)',
          borderRadius: 3,
          boxShadow: '0 10px 40px rgba(0, 191, 165, 0.2)',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'white', letterSpacing: '-0.01em' }}>
          Payroll Management
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.95)' }}>
          Manage employee salaries and payroll processing
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card 
            elevation={0}
            sx={{
              bgcolor: '#FFFFFF',
              borderRadius: 3,
              border: '1px solid rgba(0, 0, 0, 0.06)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 24px rgba(0, 191, 165, 0.15)',
              },
            }}
          >
            <CardContent>
              <Typography sx={{ color: '#64748B', mb: 1 }} gutterBottom>
                Total Payroll
              </Typography>
              <Typography variant="h5" sx={{ color: '#00BFA5', fontWeight: 800, letterSpacing: '-0.01em' }}>
                ₹{totalPayroll.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card 
            elevation={0}
            sx={{
              bgcolor: '#FFFFFF',
              borderRadius: 3,
              border: '1px solid rgba(0, 0, 0, 0.06)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 24px rgba(0, 191, 165, 0.15)',
              },
            }}
          >
            <CardContent>
              <Typography sx={{ color: '#64748B', mb: 1 }} gutterBottom>
                Pending Payments
              </Typography>
              <Typography variant="h5" sx={{ color: '#FFA726', fontWeight: 800, letterSpacing: '-0.01em' }}>
                {pendingPayments}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card 
            elevation={0}
            sx={{
              bgcolor: '#FFFFFF',
              borderRadius: 3,
              border: '1px solid rgba(0, 0, 0, 0.06)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 24px rgba(0, 191, 165, 0.15)',
              },
            }}
          >
            <CardContent>
              <Typography sx={{ color: '#64748B', mb: 1 }} gutterBottom>
                Processed
              </Typography>
              <Typography variant="h5" sx={{ color: '#26A69A', fontWeight: 800, letterSpacing: '-0.01em' }}>
                {payrollData.length - pendingPayments}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper 
        elevation={0}
        sx={{ 
          p: 4,
          borderRadius: 3,
          border: '1px solid rgba(0, 0, 0, 0.06)',
          bgcolor: '#FFFFFF',
        }}
      >
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
            <Button 
              variant="outlined" 
              startIcon={<FileDownload />}
              sx={{
                borderColor: '#00BFA5',
                color: '#00BFA5',
                '&:hover': {
                  borderColor: '#00897B',
                  bgcolor: alpha('#00BFA5', 0.08),
                },
              }}
            >
              Export
            </Button>
            <Button 
              variant="contained" 
              startIcon={<Send />} 
              sx={{ 
                bgcolor: '#00BFA5',
                '&:hover': {
                  bgcolor: '#00897B',
                },
              }}
            >
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
                <TableRow 
                  key={emp.id} 
                  sx={{
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: alpha('#00BFA5', 0.04),
                    },
                  }}
                >
                  <TableCell>{emp.name}</TableCell>
                  <TableCell>{emp.department}</TableCell>
                  <TableCell>{emp.designation}</TableCell>
                  <TableCell align="right">₹{emp.basic.toLocaleString()}</TableCell>
                  <TableCell align="right">₹{emp.allowances.toLocaleString()}</TableCell>
                  <TableCell align="right">₹{emp.deductions.toLocaleString()}</TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#1A202C' }}>
                      ₹{emp.net.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={emp.status}
                      size="small"
                      sx={{
                        bgcolor: emp.status === 'Processed' ? alpha('#26A69A', 0.1) : alpha('#FFA726', 0.1),
                        color: emp.status === 'Processed' ? '#26A69A' : '#FFA726',
                        fontWeight: 600,
                      }}
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
