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
  Avatar,
} from '@mui/material';
import { Search, PersonAdd } from '@mui/icons-material';

const employees = [
  { id: 1, name: 'Dr. Ramesh Kumar', department: 'Medicine', designation: 'Professor', qualification: 'MD, DM (Cardiology)', experience: 15, type: 'Clinical', status: 'Active' },
  { id: 2, name: 'Dr. Priya Sharma', department: 'Surgery', designation: 'Associate Professor', qualification: 'MS, MCh (General Surgery)', experience: 12, type: 'Clinical', status: 'Active' },
  { id: 3, name: 'Dr. Anil Verma', department: 'Pediatrics', designation: 'Assistant Professor', qualification: 'MD (Pediatrics)', experience: 10, type: 'Clinical', status: 'Active' },
  { id: 4, name: 'Dr. Meena Reddy', department: 'OBG', designation: 'Assistant Professor', qualification: 'MD (OBG)', experience: 8, type: 'Clinical', status: 'Active' },
  { id: 5, name: 'Dr. Suresh Patel', department: 'Anatomy', designation: 'Professor', qualification: 'MD (Anatomy)', experience: 14, type: 'Non-Clinical', status: 'Active' },
  { id: 6, name: 'Dr. Kavita Singh', department: 'Physiology', designation: 'Associate Professor', qualification: 'MD (Physiology)', experience: 11, type: 'Non-Clinical', status: 'Active' },
  { id: 7, name: 'Dr. Rajesh Gupta', department: 'Pathology', designation: 'Professor', qualification: 'MD (Pathology)', experience: 13, type: 'Clinical', status: 'Active' },
  { id: 8, name: 'Dr. Anjali Nair', department: 'Microbiology', designation: 'Associate Professor', qualification: 'MD (Microbiology)', experience: 9, type: 'Non-Clinical', status: 'Active' },
];

const departments = ['All', 'Anatomy', 'Physiology', 'Biochemistry', 'Pathology', 'Pharmacology', 'Microbiology', 'Forensic Medicine', 'Community Medicine', 'Medicine', 'Surgery', 'OBG', 'Pediatrics', 'Orthopedics', 'ENT', 'Ophthalmology', 'Dermatology', 'Psychiatry'];
const designations = ['All', 'Professor', 'Associate Professor', 'Assistant Professor', 'Senior Resident', 'Junior Resident'];

export default function MedicalEmployeeDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedDesignation, setSelectedDesignation] = useState('All');

  const filteredEmployees = employees.filter(
    (emp) =>
      (selectedDepartment === 'All' || emp.department === selectedDepartment) &&
      (selectedDesignation === 'All' || emp.designation === selectedDesignation) &&
      (emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #D32F2F 0%, #C62828 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Medical Faculty Directory
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Faculty & staff directory for medical college
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFEBEE' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#D32F2F' }}>
                142
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
                102
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Clinical Faculty
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E3F2FD' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976D2' }}>
                40
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Non-Clinical Faculty
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFF3E0' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#F57C00' }}>
                18
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Departments
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              placeholder="Search by name or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
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
          <Grid item xs={12} sm={3}>
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
          <Grid item xs={12} sm={2}>
            <Button fullWidth variant="contained" color="error" startIcon={<PersonAdd />} sx={{ height: '56px' }}>
              Add Faculty
            </Button>
          </Grid>
        </Grid>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Qualification</TableCell>
                <TableCell align="center">Experience</TableCell>
                <TableCell>Faculty Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: '#D32F2F', mr: 2 }}>
                        {employee.name.split(' ').map((n) => n[0]).join('')}
                      </Avatar>
                      <Typography sx={{ fontWeight: 600 }}>{employee.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip label={employee.department} size="small" color="error" variant="outlined" />
                  </TableCell>
                  <TableCell>{employee.designation}</TableCell>
                  <TableCell>{employee.qualification}</TableCell>
                  <TableCell align="center">{employee.experience} years</TableCell>
                  <TableCell>
                    <Chip
                      label={employee.type}
                      size="small"
                      color={employee.type === 'Clinical' ? 'error' : 'primary'}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip label={employee.status} size="small" color="success" />
                  </TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined">
                      View Profile
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#D32F2F' }}>
          NMC Faculty Requirements
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          • <strong>Clinical Departments:</strong> Minimum faculty as per NMC norms (1:10 faculty-student ratio)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • <strong>Pre-Clinical Departments:</strong> Adequate faculty for theory and practical sessions
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • <strong>Qualifications:</strong> MBBS + MD/MS/DM/MCh from recognized universities
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • <strong>Clinical Faculty:</strong> Involved in patient care, ward postings, and clinical teaching
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • <strong>Non-Clinical Faculty:</strong> Teaching pre-clinical subjects (Anatomy, Physiology, Biochemistry, etc.)
        </Typography>
      </Paper>
    </Box>
  );
}
