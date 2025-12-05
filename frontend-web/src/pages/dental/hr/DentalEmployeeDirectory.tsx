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
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { People, Add } from '@mui/icons-material';

const facultyMembers = [
  { id: 1, name: 'Dr. Rajesh Kumar', department: 'Oral & Maxillofacial Surgery', designation: 'Professor', qualification: 'MDS Oral Surgery', experience: 18, status: 'Active' },
  { id: 2, name: 'Dr. Priya Sharma', department: 'Conservative Dentistry', designation: 'Professor', qualification: 'MDS Conservative', experience: 16, status: 'Active' },
  { id: 3, name: 'Dr. Amit Patel', department: 'Prosthodontics', designation: 'Associate Professor', qualification: 'MDS Prosthodontics', experience: 12, status: 'Active' },
  { id: 4, name: 'Dr. Meera Reddy', department: 'Orthodontics', designation: 'Professor', qualification: 'MDS Orthodontics', experience: 15, status: 'Active' },
  { id: 5, name: 'Dr. Suresh Nair', department: 'Periodontology', designation: 'Associate Professor', qualification: 'MDS Periodontology', experience: 11, status: 'Active' },
  { id: 6, name: 'Dr. Kavita Singh', department: 'Oral Pathology', designation: 'Professor', qualification: 'MDS Oral Pathology', experience: 14, status: 'Active' },
  { id: 7, name: 'Dr. Anil Kumar', department: 'Oral Medicine', designation: 'Associate Professor', qualification: 'MDS Oral Medicine', experience: 10, status: 'Active' },
  { id: 8, name: 'Dr. Neha Gupta', department: 'Pediatric Dentistry', designation: 'Assistant Professor', qualification: 'MDS Pedodontics', experience: 8, status: 'Active' },
];

const departments = [
  'All Departments',
  'Oral & Maxillofacial Surgery',
  'Conservative Dentistry & Endodontics',
  'Prosthodontics & Crown & Bridge',
  'Orthodontics & Dentofacial Orthopedics',
  'Periodontology',
  'Oral Pathology & Microbiology',
  'Oral Medicine & Radiology',
  'Pediatric & Preventive Dentistry',
  'Public Health Dentistry',
];

const designations = ['All Designations', 'Professor', 'Associate Professor', 'Assistant Professor'];

export default function DentalEmployeeDirectory() {
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedDesignation, setSelectedDesignation] = useState('All Designations');
  const [searchQuery, setSearchQuery] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const filteredFaculty = facultyMembers.filter((faculty) => {
    const matchesDepartment = selectedDepartment === 'All Departments' || faculty.department === selectedDepartment;
    const matchesDesignation = selectedDesignation === 'All Designations' || faculty.designation === selectedDesignation;
    const matchesSearch = faculty.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDepartment && matchesDesignation && matchesSearch;
  });

  const totalFaculty = facultyMembers.length;
  const professors = facultyMembers.filter((f) => f.designation === 'Professor').length;
  const associateProfessors = facultyMembers.filter((f) => f.designation === 'Associate Professor').length;
  const assistantProfessors = facultyMembers.filter((f) => f.designation === 'Assistant Professor').length;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #00796B 0%, #004D40 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Dental Employee Directory
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Faculty directory & MDS specialists management
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E0F2F1' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#00796B' }}>
                {totalFaculty}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Faculty
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E3F2FD' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976D2' }}>
                {professors}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Professors
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#F3E5F5' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#7B1FA2' }}>
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
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#F57C00' }}>
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <People sx={{ mr: 2, color: '#00796B' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Faculty Directory
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ bgcolor: '#00796B', '&:hover': { bgcolor: '#004D40' } }}
            onClick={() => setOpenAddDialog(true)}
          >
            Add Faculty
          </Button>
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search by Name"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
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
          <Grid item xs={12} md={4}>
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
        </Grid>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Faculty</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Qualification</TableCell>
                <TableCell align="center">Experience</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredFaculty.map((faculty) => (
                <TableRow key={faculty.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: '#00796B' }}>{getInitials(faculty.name)}</Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {faculty.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{faculty.department}</TableCell>
                  <TableCell>
                    <Chip
                      label={faculty.designation}
                      size="small"
                      color={
                        faculty.designation === 'Professor'
                          ? 'primary'
                          : faculty.designation === 'Associate Professor'
                          ? 'secondary'
                          : 'default'
                      }
                    />
                  </TableCell>
                  <TableCell>{faculty.qualification}</TableCell>
                  <TableCell align="center">{faculty.experience} years</TableCell>
                  <TableCell align="center">
                    <Chip label={faculty.status} size="small" color="success" />
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
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#00796B' }}>
          DCI Faculty Requirements
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          • Faculty-Student Ratio: 1:10 (Current: 1:{(1380 / 74).toFixed(1)}) ✓
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • 100% MDS Qualified Faculty Required (Current: 100%) ✓
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Minimum 30% Professors (Current: {((professors / totalFaculty) * 100).toFixed(1)}%) ✓
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Clinical supervisors must have 5+ years experience
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Each clinical department must have minimum 3 faculty members
        </Typography>
      </Paper>

      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Faculty</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="Faculty Name" required />
              </Grid>
              <Grid item xs={12}>
                <TextField select fullWidth label="Department" required>
                  {departments.slice(1).map((dept) => (
                    <MenuItem key={dept} value={dept}>
                      {dept}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="MDS Qualification"
                  placeholder="e.g., MDS Oral Surgery"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Experience (Years)" type="number" required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField select fullWidth label="Designation" required>
                  <MenuItem value="Professor">Professor</MenuItem>
                  <MenuItem value="Associate Professor">Associate Professor</MenuItem>
                  <MenuItem value="Assistant Professor">Assistant Professor</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Email" type="email" required />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Phone" required />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button variant="contained" sx={{ bgcolor: '#00796B', '&:hover': { bgcolor: '#004D40' } }}>
            Add Faculty
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
