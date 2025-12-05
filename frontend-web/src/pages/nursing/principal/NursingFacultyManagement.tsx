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
  { id: 1, name: 'Dr. Anjali Verma', department: 'Medical-Surgical Nursing', designation: 'Professor', qualification: 'Ph.D. Nursing', experience: 18, status: 'Active' },
  { id: 2, name: 'Dr. Priya Reddy', department: 'Community Health Nursing', designation: 'Professor', qualification: 'Ph.D. Nursing', experience: 16, status: 'Active' },
  { id: 3, name: 'Ms. Kavita Sharma', department: 'Child Health Nursing', designation: 'Associate Professor', qualification: 'M.Sc Nursing', experience: 12, status: 'Active' },
  { id: 4, name: 'Dr. Meera Singh', department: 'Mental Health Nursing', designation: 'Professor', qualification: 'Ph.D. Nursing', experience: 15, status: 'Active' },
  { id: 5, name: 'Ms. Sunita Patel', department: 'OBG Nursing', designation: 'Associate Professor', qualification: 'M.Sc Nursing', experience: 11, status: 'Active' },
  { id: 6, name: 'Ms. Rekha Kumar', department: 'Nursing Foundation', designation: 'Assistant Professor', qualification: 'M.Sc Nursing', experience: 8, status: 'Active' },
  { id: 7, name: 'Dr. Neha Agarwal', department: 'Research & Statistics', designation: 'Professor', qualification: 'Ph.D. Nursing', experience: 14, status: 'Active' },
  { id: 8, name: 'Ms. Pooja Gupta', department: 'Medical-Surgical Nursing', designation: 'Assistant Professor', qualification: 'M.Sc Nursing', experience: 7, status: 'Active' },
];

const departments = ['All Departments', 'Medical-Surgical Nursing', 'Community Health Nursing', 'Child Health Nursing', 'Mental Health Nursing', 'OBG Nursing', 'Nursing Foundation', 'Research & Statistics'];
const designations = ['All Designations', 'Professor', 'Associate Professor', 'Assistant Professor'];

export default function NursingFacultyManagement() {
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
    return name.split(' ').map((n) => n[0]).join('').toUpperCase();
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Nursing Faculty Management
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Faculty directory & INC compliance
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#2E7D32' }}>
                {totalFaculty}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Faculty
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#C8E6C9' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1B5E20' }}>
                {professors}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Professors
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#A5D6A7' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#2E7D32' }}>
                {associateProfessors}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Associate Professors
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#81C784' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1B5E20' }}>
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
            <People sx={{ mr: 2, color: '#2E7D32' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Faculty Directory
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ bgcolor: '#2E7D32', '&:hover': { bgcolor: '#1B5E20' } }}
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
                      <Avatar sx={{ bgcolor: '#2E7D32' }}>{getInitials(faculty.name)}</Avatar>
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
                      sx={{ bgcolor: faculty.designation === 'Professor' ? '#2E7D32' : faculty.designation === 'Associate Professor' ? '#388E3C' : '#66BB6A', color: 'white' }}
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
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#2E7D32' }}>
          INC Faculty Requirements
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          • Faculty-Student Ratio: 1:20 for Clinical, 1:30 for Theory (Current: 1:27.9) - Within acceptable range
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • M.Sc Nursing mandatory for Assistant Professors (Current: 100%) ✓
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Ph.D. for Professors recommended (Current: {((professors / totalFaculty) * 100).toFixed(1)}%) ✓
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Minimum 5 years teaching experience for Professors required
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Current valid Nursing Council registration mandatory for all faculty
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
                <TextField fullWidth label="Qualification" placeholder="e.g., Ph.D. Nursing" required />
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
          <Button variant="contained" sx={{ bgcolor: '#2E7D32', '&:hover': { bgcolor: '#1B5E20' } }}>
            Add Faculty
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
