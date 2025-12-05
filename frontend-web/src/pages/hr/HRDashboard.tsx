import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Tab,
  Tabs,
  TextField,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import {
  People,
  AttachMoney,
  EventNote,
  CheckCircle,
  Cancel,
  Visibility,
  Download,
  Send,
  Search,
} from '@mui/icons-material';
import { useAuthStore } from '../../stores/authStore';

interface Employee {
  employeeId: string;
  name: string;
  designation: string;
  department: string;
  joiningDate: string;
  salary: number;
  status: 'ACTIVE' | 'ON_LEAVE' | 'INACTIVE';
}

interface PayrollEntry {
  employeeId: string;
  employeeName: string;
  month: string;
  year: number;
  grossSalary: number;
  deductions: number;
  netSalary: number;
  daysPresent: number;
  daysAbsent: number;
  status: 'PENDING' | 'APPROVED' | 'PAID';
}

interface LeaveRequest {
  requestId: number;
  employeeName: string;
  leaveType: string;
  fromDate: string;
  toDate: string;
  days: number;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export default function HRDashboard() {
  const { user } = useAuthStore();
  const [tabValue, setTabValue] = useState(0);
  const [payrollDialogOpen, setPayrollDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<PayrollEntry | null>(null);

  const [employees] = useState<Employee[]>([
    {
      employeeId: 'E1001',
      name: 'Dr. Anitha M',
      designation: 'Associate Professor',
      department: 'Computer Science',
      joiningDate: '2020-08-15',
      salary: 65000,
      status: 'ACTIVE',
    },
    {
      employeeId: 'E1002',
      name: 'Prof. Rajesh Kumar',
      designation: 'Assistant Professor',
      department: 'Commerce',
      joiningDate: '2019-07-01',
      salary: 55000,
      status: 'ACTIVE',
    },
    {
      employeeId: 'E1003',
      name: 'Dr. Priya Sharma',
      designation: 'Professor',
      department: 'Computer Science',
      joiningDate: '2018-01-10',
      salary: 75000,
      status: 'ON_LEAVE',
    },
  ]);

  const [payrollData, setPayrollData] = useState<PayrollEntry[]>([
    {
      employeeId: 'E1001',
      employeeName: 'Dr. Anitha M',
      month: 'November',
      year: 2025,
      grossSalary: 65000,
      deductions: 11400,
      netSalary: 53600,
      daysPresent: 24,
      daysAbsent: 2,
      status: 'PENDING',
    },
    {
      employeeId: 'E1002',
      employeeName: 'Prof. Rajesh Kumar',
      month: 'November',
      year: 2025,
      grossSalary: 55000,
      deductions: 9800,
      netSalary: 45200,
      daysPresent: 26,
      daysAbsent: 0,
      status: 'PENDING',
    },
  ]);

  const [leaveRequests] = useState<LeaveRequest[]>([
    {
      requestId: 1,
      employeeName: 'Dr. Priya Sharma',
      leaveType: 'Medical Leave',
      fromDate: '2025-12-05',
      toDate: '2025-12-07',
      days: 3,
      reason: 'Medical emergency',
      status: 'PENDING',
    },
    {
      requestId: 2,
      employeeName: 'Prof. Rajesh Kumar',
      leaveType: 'Casual Leave',
      fromDate: '2025-12-10',
      toDate: '2025-12-11',
      days: 2,
      reason: 'Personal work',
      status: 'PENDING',
    },
  ]);

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.status === 'ACTIVE').length;
  const pendingPayroll = payrollData.filter((p) => p.status === 'PENDING').length;
  const pendingLeaves = leaveRequests.filter((l) => l.status === 'PENDING').length;

  const handleApprovePayroll = (entry: PayrollEntry) => {
    setPayrollData(
      payrollData.map((p) =>
        p.employeeId === entry.employeeId ? { ...p, status: 'APPROVED' } : p
      )
    );
    setPayrollDialogOpen(false);
  };

  const handleGeneratePayslips = () => {
    alert('Generating payslips for all approved entries...');
  };

  return (
    <Box>
      {/* Header */}
      <Paper sx={{ p: 3, mb: 3, bgcolor: 'info.main', color: 'white' }}>
        <Typography variant="h4" gutterBottom>
          HR Management Portal
        </Typography>
        <Typography variant="body1">Welcome, {user?.firstName} {user?.lastName}</Typography>
        <Typography variant="caption">Employee & Payroll Management System</Typography>
      </Paper>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="textSecondary" variant="caption">
                    Total Employees
                  </Typography>
                  <Typography variant="h4">{totalEmployees}</Typography>
                  <Typography variant="caption" color="success.main">
                    {activeEmployees} Active
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <People />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="textSecondary" variant="caption">
                    Pending Payroll
                  </Typography>
                  <Typography variant="h4">{pendingPayroll}</Typography>
                  <Typography variant="caption" color="warning.main">
                    Awaiting Approval
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.main' }}>
                  <AttachMoney />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="textSecondary" variant="caption">
                    Leave Requests
                  </Typography>
                  <Typography variant="h4">{pendingLeaves}</Typography>
                  <Typography variant="caption" color="error.main">
                    Pending Approval
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'error.main' }}>
                  <EventNote />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="textSecondary" variant="caption">
                    This Month Payroll
                  </Typography>
                  <Typography variant="h5">₹4.2L</Typography>
                  <Typography variant="caption" color="textSecondary">
                    November 2025
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <AttachMoney />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
          <Tab label="Employee Directory" icon={<People />} iconPosition="start" />
          <Tab label="Payroll Management" icon={<AttachMoney />} iconPosition="start" />
          <Tab label="Leave Approvals" icon={<EventNote />} iconPosition="start" />
        </Tabs>
      </Paper>

      {/* Tab: Employee Directory */}
      {tabValue === 0 && (
        <Paper sx={{ p: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Employee Directory</Typography>
            <TextField
              size="small"
              placeholder="Search employees..."
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Designation</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Joining Date</TableCell>
                  <TableCell align="right">Salary</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.employeeId} hover>
                    <TableCell>{employee.employeeId}</TableCell>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.designation}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{new Date(employee.joiningDate).toLocaleDateString()}</TableCell>
                    <TableCell align="right">₹{employee.salary.toLocaleString()}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={employee.status}
                        size="small"
                        color={
                          employee.status === 'ACTIVE'
                            ? 'success'
                            : employee.status === 'ON_LEAVE'
                            ? 'warning'
                            : 'default'
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* Tab: Payroll Management */}
      {tabValue === 1 && (
        <Paper sx={{ p: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Payroll for November 2025</Typography>
            <Button variant="contained" onClick={handleGeneratePayslips} startIcon={<Send />}>
              Generate All Payslips
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee</TableCell>
                  <TableCell align="center">Days Present</TableCell>
                  <TableCell align="center">Days Absent</TableCell>
                  <TableCell align="right">Gross Salary</TableCell>
                  <TableCell align="right">Deductions</TableCell>
                  <TableCell align="right">Net Salary</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payrollData.map((entry) => (
                  <TableRow key={entry.employeeId} hover>
                    <TableCell>
                      <Typography variant="body2">{entry.employeeName}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {entry.employeeId}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">{entry.daysPresent}</TableCell>
                    <TableCell align="center">{entry.daysAbsent}</TableCell>
                    <TableCell align="right">₹{entry.grossSalary.toLocaleString()}</TableCell>
                    <TableCell align="right">₹{entry.deductions.toLocaleString()}</TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight="bold">
                        ₹{entry.netSalary.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={entry.status}
                        size="small"
                        color={
                          entry.status === 'APPROVED'
                            ? 'success'
                            : entry.status === 'PAID'
                            ? 'info'
                            : 'warning'
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => {
                          setSelectedEmployee(entry);
                          setPayrollDialogOpen(true);
                        }}
                      >
                        <Visibility />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* Tab: Leave Approvals */}
      {tabValue === 2 && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Pending Leave Requests
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee Name</TableCell>
                  <TableCell>Leave Type</TableCell>
                  <TableCell>From Date</TableCell>
                  <TableCell>To Date</TableCell>
                  <TableCell align="center">Days</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaveRequests.map((request) => (
                  <TableRow key={request.requestId} hover>
                    <TableCell>{request.employeeName}</TableCell>
                    <TableCell>{request.leaveType}</TableCell>
                    <TableCell>{new Date(request.fromDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(request.toDate).toLocaleDateString()}</TableCell>
                    <TableCell align="center">
                      <Chip label={request.days} size="small" />
                    </TableCell>
                    <TableCell>{request.reason}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <IconButton size="small" color="success">
                          <CheckCircle />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <Cancel />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* Payroll Detail Dialog */}
      <Dialog open={payrollDialogOpen} onClose={() => setPayrollDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Payroll Details - {selectedEmployee?.employeeName}</DialogTitle>
        <DialogContent>
          {selectedEmployee && (
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="caption" color="textSecondary">
                    Month
                  </Typography>
                  <Typography variant="body1">
                    {selectedEmployee.month} {selectedEmployee.year}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="textSecondary">
                    Employee ID
                  </Typography>
                  <Typography variant="body1">{selectedEmployee.employeeId}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="textSecondary">
                    Days Present
                  </Typography>
                  <Typography variant="body1">{selectedEmployee.daysPresent}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="textSecondary">
                    Days Absent
                  </Typography>
                  <Typography variant="body1">{selectedEmployee.daysAbsent}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="textSecondary">
                    Gross Salary
                  </Typography>
                  <Typography variant="h6">₹{selectedEmployee.grossSalary.toLocaleString()}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="textSecondary">
                    Total Deductions
                  </Typography>
                  <Typography variant="h6" color="error">
                    ₹{selectedEmployee.deductions.toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" color="textSecondary">
                    Net Salary
                  </Typography>
                  <Typography variant="h5" color="success.main">
                    ₹{selectedEmployee.netSalary.toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPayrollDialogOpen(false)}>Close</Button>
          {selectedEmployee?.status === 'PENDING' && (
            <Button
              variant="contained"
              color="success"
              onClick={() => handleApprovePayroll(selectedEmployee)}
            >
              Approve Payroll
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
