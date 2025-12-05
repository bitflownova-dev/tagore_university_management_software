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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import { People, Add, Search, FilterList } from '@mui/icons-material';

const employees = [
  {
    id: 1,
    name: 'Dr. Rajesh Kumar',
    department: 'CSE',
    designation: 'Professor',
    qualification: 'Ph.D. (CS)',
    experience: 15,
    status: 'Active',
    email: 'rajesh.kumar@tagore.edu',
  },
  {
    id: 2,
    name: 'Dr. Priya Singh',
    department: 'ECE',
    designation: 'Associate Professor',
    qualification: 'Ph.D. (ECE)',
    experience: 12,
    status: 'Active',
    email: 'priya.singh@tagore.edu',
  },
  {
    id: 3,
    name: 'Dr. Amit Patel',
    department: 'Mechanical',
    designation: 'Assistant Professor',
    qualification: 'Ph.D. (Mech)',
    experience: 10,
    status: 'Active',
    email: 'amit.patel@tagore.edu',
  },
  {
    id: 4,
    name: 'Dr. Meena Reddy',
    department: 'Civil',
    designation: 'Assistant Professor',
    qualification: 'Ph.D. (Civil)',
    experience: 8,
    status: 'Active',
    email: 'meena.reddy@tagore.edu',
  },
  {
    id: 5,
    name: 'Dr. Suresh Nair',
    department: 'Electrical',
    designation: 'Professor',
    qualification: 'Ph.D. (EE)',
    experience: 14,
    status: 'Active',
    email: 'suresh.nair@tagore.edu',
  },
  {
    id: 6,
    name: 'Dr. Kavita Sharma',
    department: 'IT',
    designation: 'Associate Professor',
    qualification: 'Ph.D. (IT)',
    experience: 11,
    status: 'Active',
    email: 'kavita.sharma@tagore.edu',
  },
  {
    id: 7,
    name: 'Dr. Anil Kumar',
    department: 'AI & ML',
    designation: 'Associate Professor',
    qualification: 'Ph.D. (CS)',
    experience: 9,
    status: 'Active',
    email: 'anil.kumar@tagore.edu',
  },
  {
    id: 8,
    name: 'Dr. Neha Gupta',
    department: 'Cyber Security',
    designation: 'Assistant Professor',
    qualification: 'Ph.D. (CS)',
    experience: 7,
    status: 'Active',
    email: 'neha.gupta@tagore.edu',
  },
];

const departments = ['All', 'CSE', 'ECE', 'Mechanical', 'Civil', 'Electrical', 'IT', 'AI & ML', 'Cyber Security'];
const designations = ['All', 'Professor', 'Associate Professor', 'Assistant Professor'];

export default function EngineeringEmployeeDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedDesignation, setSelectedDesignation] = useState('All');
  const [openDialog, setOpenDialog] = useState(false);

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || emp.department === selectedDepartment;
    const matchesDesignation = selectedDesignation === 'All' || emp.designation === selectedDesignation;
    return matchesSearch && matchesDepartment && matchesDesignation;
  });

  const totalFaculty = employees.length;
  const professors = employees.filter((e) => e.designation === 'Professor').length;
  const associateProfessors = employees.filter((e) => e.designation === 'Associate Professor').length;
  const assistantProfessors = employees.filter((e) => e.designation === 'Assistant Professor').length;

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #1976D2 0%, #1565C0 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Engineering Employee Directory
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Manage faculty & staff information
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E3F2FD' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976D2' }}>
                {totalFaculty}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Faculty
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#388E3C' }}>
                {professors}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Professors
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E3F2FD' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976D2' }}>
                {associateProfessors}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Associate Professors
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFF3E0' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#F57C00' }}>
                {assistantProfessors}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Assistant Professors
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              select
              fullWidth
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
          <Grid item xs={12} md={3}>
            <TextField
              select
              fullWidth
              label="Designation"
              value={selectedDesignation}
              onChange={(e) => setSelectedDesignation(e.target.value)}
            >
              {designations.map((desig) => (
                <MenuItem key={desig} value={desig}>
                  {desig}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={1}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={() => setOpenDialog(true)}
              sx={{ height: '56px' }}
            >
              Add
            </Button>
          </Grid>
        </Grid>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Qualification</TableCell>
                <TableCell align="center">Experience</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: '#1976D2', mr: 2 }}>
                        {employee.name.split(' ').map((n) => n[0]).join('')}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {employee.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {employee.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
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
                  <TableCell>{employee.qualification}</TableCell>
                  <TableCell align="center">{employee.experience} years</TableCell>
                  <TableCell align="center">
                    <Chip label={employee.status} size="small" color="success" />
                  </TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#1976D2' }}>
          AICTE Faculty Requirements
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          • Faculty-Student Ratio: 1:15 as per AICTE norms (Current: 1:14.67 ✓)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Ph.D. Faculty: Minimum 30% required (Current: 100% ✓)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Professor Cadre: Minimum 20% (Current: 28.9% ✓)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Regular Faculty Training & FDP participation mandatory
        </Typography>
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ pt: 2 }}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Full Name" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Email" type="email" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField select fullWidth label="Department">
                {departments.filter((d) => d !== 'All').map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField select fullWidth label="Designation">
                {designations.filter((d) => d !== 'All').map((desig) => (
                  <MenuItem key={desig} value={desig}>
                    {desig}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Qualification" placeholder="e.g., Ph.D. (CS)" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Experience (Years)" type="number" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Phone Number" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary">
            Add Employee
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
