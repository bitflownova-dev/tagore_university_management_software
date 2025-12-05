import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Chip,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

interface Staff {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  status: 'Active' | 'Inactive';
  joiningDate: string;
}

export default function StaffManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  // Sample data
  const staffList: Staff[] = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh.kumar@tagore.edu',
      phone: '+91 98765 43210',
      role: 'Principal',
      department: 'Administration',
      status: 'Active',
      joiningDate: '2020-01-15',
    },
    {
      id: 2,
      name: 'Prof. Priya Sharma',
      email: 'priya.sharma@tagore.edu',
      phone: '+91 98765 43211',
      role: 'HOD',
      department: 'Computer Science',
      status: 'Active',
      joiningDate: '2019-07-20',
    },
    {
      id: 3,
      name: 'Ms. Anita Verma',
      email: 'anita.verma@tagore.edu',
      phone: '+91 98765 43212',
      role: 'Teacher',
      department: 'Mathematics',
      status: 'Active',
      joiningDate: '2021-03-10',
    },
    {
      id: 4,
      name: 'Mr. Suresh Patel',
      email: 'suresh.patel@tagore.edu',
      phone: '+91 98765 43213',
      role: 'Accountant',
      department: 'Finance',
      status: 'Active',
      joiningDate: '2020-08-01',
    },
  ];

  const filteredStaff = staffList.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Staff Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedStaff(null);
            setOpenDialog(true);
          }}
        >
          Add Staff
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <TextField
          fullWidth
          placeholder="Search by name, email, or department..."
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
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Joining Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStaff.map((staff) => (
                <TableRow key={staff.id} hover>
                  <TableCell>{staff.name}</TableCell>
                  <TableCell>{staff.email}</TableCell>
                  <TableCell>{staff.phone}</TableCell>
                  <TableCell>{staff.role}</TableCell>
                  <TableCell>{staff.department}</TableCell>
                  <TableCell>
                    <Chip
                      label={staff.status}
                      color={staff.status === 'Active' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{new Date(staff.joiningDate).toLocaleDateString()}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => {
                        setSelectedStaff(staff);
                        setOpenDialog(true);
                      }}
                    >
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

      {/* Add/Edit Staff Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedStaff ? 'Edit Staff' : 'Add New Staff'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField label="Full Name" fullWidth defaultValue={selectedStaff?.name} />
            <TextField label="Email" type="email" fullWidth defaultValue={selectedStaff?.email} />
            <TextField label="Phone" fullWidth defaultValue={selectedStaff?.phone} />
            <TextField
              label="Role"
              select
              fullWidth
              defaultValue={selectedStaff?.role || 'Teacher'}
            >
              <MenuItem value="Principal">Principal</MenuItem>
              <MenuItem value="HOD">HOD</MenuItem>
              <MenuItem value="Teacher">Teacher</MenuItem>
              <MenuItem value="Accountant">Accountant</MenuItem>
              <MenuItem value="HR">HR</MenuItem>
            </TextField>
            <TextField
              label="Department"
              select
              fullWidth
              defaultValue={selectedStaff?.department || 'Computer Science'}
            >
              <MenuItem value="Computer Science">Computer Science</MenuItem>
              <MenuItem value="Mathematics">Mathematics</MenuItem>
              <MenuItem value="Physics">Physics</MenuItem>
              <MenuItem value="Chemistry">Chemistry</MenuItem>
              <MenuItem value="Administration">Administration</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
            </TextField>
            <TextField
              label="Joining Date"
              type="date"
              fullWidth
              defaultValue={selectedStaff?.joiningDate}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            {selectedStaff ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
