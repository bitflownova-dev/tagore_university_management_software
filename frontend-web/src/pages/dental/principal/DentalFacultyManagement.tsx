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

const faculty = [
  { id: 1, name: 'Dr. Rajesh Kumar', department: 'Oral Surgery', designation: 'Professor & HOD', qualification: 'MDS (Oral Surgery)', experience: 18, status: 'Active' },
  { id: 2, name: 'Dr. Priya Sharma', department: 'Conservative Dentistry', designation: 'Professor & HOD', qualification: 'MDS (Conservative)', experience: 16, status: 'Active' },
  { id: 3, name: 'Dr. Amit Patel', department: 'Prosthodontics', designation: 'Associate Professor', qualification: 'MDS (Prosthodontics)', experience: 12, status: 'Active' },
  { id: 4, name: 'Dr. Meera Reddy', department: 'Orthodontics', designation: 'Professor & HOD', qualification: 'MDS (Orthodontics)', experience: 15, status: 'Active' },
  { id: 5, name: 'Dr. Suresh Nair', department: 'Periodontology', designation: 'Associate Professor', qualification: 'MDS (Periodontology)', experience: 11, status: 'Active' },
  { id: 6, name: 'Dr. Kavita Singh', department: 'Oral Pathology', designation: 'Professor & HOD', qualification: 'MDS (Oral Pathology)', experience: 14, status: 'Active' },
  { id: 7, name: 'Dr. Anil Kumar', department: 'Oral Medicine', designation: 'Associate Professor', qualification: 'MDS (Oral Medicine)', experience: 10, status: 'Active' },
  { id: 8, name: 'Dr. Neha Gupta', department: 'Pediatric Dentistry', designation: 'Assistant Professor', qualification: 'MDS (Pedodontics)', experience: 8, status: 'Active' },
];

const departments = [
  'All', 'Oral Surgery', 'Conservative Dentistry', 'Prosthodontics', 'Orthodontics', 
  'Periodontology', 'Oral Pathology', 'Oral Medicine', 'Pediatric Dentistry', 'Public Health Dentistry'
];

export default function DentalFacultyManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [openDialog, setOpenDialog] = useState(false);

  const filteredFaculty = faculty.filter((fac) => {
    const matchesSearch = fac.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || fac.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const totalFaculty = faculty.length;
  const professors = faculty.filter(f => f.designation.includes('Professor')).length;
  const associateProfessors = faculty.filter(f => f.designation.includes('Associate Professor')).length;
  const assistantProfessors = faculty.filter(f => f.designation.includes('Assistant Professor')).length;

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #00796B 0%, #004D40 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Dental Faculty Management
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Manage dental college faculty & specialists
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E0F2F1' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#00796B' }}>
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
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
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
            <Button
              fullWidth
              variant="contained"
              sx={{ bgcolor: '#00796B', height: '56px', '&:hover': { bgcolor: '#004D40' } }}
              startIcon={<Add />}
              onClick={() => setOpenDialog(true)}
            >
              Add Faculty
            </Button>
          </Grid>
        </Grid>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Faculty Member</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Qualification</TableCell>
                <TableCell align="center">Experience</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredFaculty.map((fac) => (
                <TableRow key={fac.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: '#00796B', mr: 2 }}>
                        {fac.name.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {fac.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip label={fac.department} size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={fac.designation}
                      size="small"
                      color={fac.designation.includes('Professor') ? 'success' : 'primary'}
                    />
                  </TableCell>
                  <TableCell>{fac.qualification}</TableCell>
                  <TableCell align="center">{fac.experience} years</TableCell>
                  <TableCell align="center">
                    <Chip label={fac.status} size="small" color="success" />
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
          • Faculty-Student Ratio: 1:10 as per DCI norms (Current: 1:9.8 ✓)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • MDS Qualified Faculty: 100% in clinical departments (Current: 100% ✓)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Professor Cadre: Minimum 30% (Current: 37.5% ✓)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Clinical training supervisors with minimum 5 years experience
        </Typography>
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Faculty Member</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ pt: 2 }}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Full Name" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField select fullWidth label="Department">
                {departments.filter(d => d !== 'All').map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Qualification" placeholder="MDS (Specialty)" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Experience (Years)" type="number" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField select fullWidth label="Designation">
                <MenuItem value="Professor">Professor</MenuItem>
                <MenuItem value="Associate Professor">Associate Professor</MenuItem>
                <MenuItem value="Assistant Professor">Assistant Professor</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Email" type="email" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Phone Number" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" sx={{ bgcolor: '#00796B', '&:hover': { bgcolor: '#004D40' } }}>
            Add Faculty
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
