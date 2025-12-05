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
import { People, Add, Search, FilterList } from '@mui/icons-material';

const facultyData = [
  { id: 1, name: 'Dr. Anjali Verma', department: 'Medical-Surgical', designation: 'Professor', qualification: 'Ph.D. Nursing', experience: 18, status: 'Active' },
  { id: 2, name: 'Dr. Priya Reddy', department: 'Community Health', designation: 'Professor', qualification: 'Ph.D. Nursing', experience: 16, status: 'Active' },
  { id: 3, name: 'Ms. Kavita Sharma', department: 'Child Health', designation: 'Associate Professor', qualification: 'M.Sc Nursing', experience: 12, status: 'Active' },
  { id: 4, name: 'Dr. Meera Singh', department: 'Mental Health', designation: 'Professor', qualification: 'Ph.D. Nursing', experience: 15, status: 'Active' },
  { id: 5, name: 'Ms. Sunita Patel', department: 'OBG Nursing', designation: 'Associate Professor', qualification: 'M.Sc Nursing', experience: 11, status: 'Active' },
  { id: 6, name: 'Ms. Rekha Kumar', department: 'Nursing Foundation', designation: 'Assistant Professor', qualification: 'M.Sc Nursing', experience: 8, status: 'Active' },
  { id: 7, name: 'Dr. Neha Agarwal', department: 'Research & Statistics', designation: 'Professor', qualification: 'Ph.D. Nursing', experience: 14, status: 'Active' },
  { id: 8, name: 'Ms. Pooja Gupta', department: 'Medical-Surgical', designation: 'Assistant Professor', qualification: 'M.Sc Nursing', experience: 7, status: 'Active' },
];

const departments = ['All', 'Medical-Surgical', 'Community Health', 'Child Health', 'Mental Health', 'OBG Nursing', 'Nursing Foundation', 'Research & Statistics'];
const designations = ['All', 'Professor', 'Associate Professor', 'Assistant Professor'];

export default function NursingEmployeeDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedDesignation, setSelectedDesignation] = useState('All');
  const [openDialog, setOpenDialog] = useState(false);

  const filteredFaculty = facultyData.filter((faculty) => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) || faculty.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || faculty.department === selectedDepartment;
    const matchesDesignation = selectedDesignation === 'All' || faculty.designation === selectedDesignation;
    return matchesSearch && matchesDepartment && matchesDesignation;
  });

  const professors = facultyData.filter((f) => f.designation === 'Professor').length;
  const associates = facultyData.filter((f) => f.designation === 'Associate Professor').length;
  const assistants = facultyData.filter((f) => f.designation === 'Assistant Professor').length;

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Nursing Employee Directory
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Faculty & staff management for nursing education
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#2E7D32' }}>
                {facultyData.length}
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
                {associates}
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
                {assistants}
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
            onClick={() => setOpenDialog(true)}
          >
            Add Faculty
          </Button>
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by name or department"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              size="small"
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
          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              size="small"
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
                <TableCell>Name</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Qualification</TableCell>
                <TableCell align="center">Experience</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredFaculty.map((faculty) => (
                <TableRow key={faculty.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 2, bgcolor: '#2E7D32' }}>{faculty.name.charAt(0)}</Avatar>
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
                      sx={{
                        bgcolor: faculty.designation === 'Professor' ? '#2E7D32' : faculty.designation === 'Associate Professor' ? '#388E3C' : '#66BB6A',
                        color: 'white',
                      }}
                    />
                  </TableCell>
                  <TableCell>{faculty.qualification}</TableCell>
                  <TableCell align="center">{faculty.experience} years</TableCell>
                  <TableCell>
                    <Chip label={faculty.status} size="small" color="success" />
                  </TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined" sx={{ borderColor: '#2E7D32', color: '#2E7D32' }}>
                      View
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
          • Faculty-Student Ratio: 1:20 for clinical training, 1:30 for theory classes
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • M.Sc Nursing mandatory for Assistant Professors
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Ph.D. Nursing recommended for Professors
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Minimum 5 years teaching experience for Associate/Professor positions
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Valid registration with State Nursing Council mandatory for all faculty
        </Typography>
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Faculty</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField fullWidth label="Full Name" />
            </Grid>
            <Grid item xs={12}>
              <TextField select fullWidth label="Department">
                {departments.filter((d) => d !== 'All').map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField select fullWidth label="Designation">
                {designations.filter((d) => d !== 'All').map((desig) => (
                  <MenuItem key={desig} value={desig}>
                    {desig}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Qualification (M.Sc/Ph.D. Nursing)" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Experience (years)" type="number" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            sx={{ bgcolor: '#2E7D32', '&:hover': { bgcolor: '#1B5E20' } }}
            onClick={() => setOpenDialog(false)}
          >
            Add Faculty
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
