import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { useState } from 'react';

export default function EmployeeDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const employees = [
    {
      id: 1,
      empId: 'EMP001',
      name: 'Dr. Rajesh Kumar',
      department: 'Computer Science',
      designation: 'Professor',
      email: 'rajesh.kumar@tagore.edu',
      phone: '+91 98765 43210',
      status: 'Active',
    },
    {
      id: 2,
      empId: 'EMP002',
      name: 'Prof. Anita Sharma',
      department: 'Mathematics',
      designation: 'Associate Professor',
      email: 'anita.sharma@tagore.edu',
      phone: '+91 98765 43211',
      status: 'Active',
    },
    {
      id: 3,
      empId: 'EMP003',
      name: 'Mr. Suresh Patel',
      department: 'Administration',
      designation: 'Accountant',
      email: 'suresh.patel@tagore.edu',
      phone: '+91 98765 43212',
      status: 'Active',
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Employee Directory
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
          Add Employee
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <TextField
          fullWidth
          placeholder="Search employees by name, ID, department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Emp ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((emp) => (
                <TableRow key={emp.id} hover>
                  <TableCell>{emp.empId}</TableCell>
                  <TableCell>{emp.name}</TableCell>
                  <TableCell>{emp.department}</TableCell>
                  <TableCell>{emp.designation}</TableCell>
                  <TableCell>{emp.email}</TableCell>
                  <TableCell>{emp.phone}</TableCell>
                  <TableCell>
                    <Chip label={emp.status} color="success" size="small" />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" color="info">
                      <ViewIcon />
                    </IconButton>
                    <IconButton size="small" color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField label="Employee ID" fullWidth />
            <TextField label="Full Name" fullWidth />
            <TextField label="Email" type="email" fullWidth />
            <TextField label="Phone" fullWidth />
            <TextField label="Department" select fullWidth>
              <option value="CS">Computer Science</option>
              <option value="Math">Mathematics</option>
              <option value="Admin">Administration</option>
            </TextField>
            <TextField label="Designation" fullWidth />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Add Employee
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
