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
} from '@mui/material';
import { Add, Search } from '@mui/icons-material';

const faculty = [
  { id: 1, name: 'Dr. Ramesh Kumar', specialization: 'Cardiology', department: 'Medicine', qualification: 'MD, DM', experience: 15, type: 'Professor' },
  { id: 2, name: 'Dr. Priya Sharma', specialization: 'General Surgery', department: 'Surgery', qualification: 'MS, MCh', experience: 12, type: 'Associate Professor' },
  { id: 3, name: 'Dr. Anil Verma', specialization: 'Pediatrics', department: 'Pediatrics', qualification: 'MD (Pediatrics)', experience: 10, type: 'Assistant Professor' },
  { id: 4, name: 'Dr. Meena Reddy', specialization: 'Obstetrics', department: 'OBG', qualification: 'MD (OBG)', experience: 8, type: 'Assistant Professor' },
  { id: 5, name: 'Dr. Suresh Patel', specialization: 'Anatomy', department: 'Anatomy', qualification: 'MD (Anatomy)', experience: 14, type: 'Professor' },
  { id: 6, name: 'Dr. Kavita Singh', specialization: 'Physiology', department: 'Physiology', qualification: 'MD (Physiology)', experience: 11, type: 'Associate Professor' },
  { id: 7, name: 'Dr. Rajesh Gupta', specialization: 'Pathology', department: 'Pathology', qualification: 'MD (Path)', experience: 13, type: 'Professor' },
  { id: 8, name: 'Dr. Anjali Nair', specialization: 'Microbiology', department: 'Microbiology', qualification: 'MD (Micro)', experience: 9, type: 'Associate Professor' },
];

const departments = ['All', 'Anatomy', 'Physiology', 'Biochemistry', 'Pathology', 'Pharmacology', 'Microbiology', 'Forensic Medicine', 'Community Medicine', 'Medicine', 'Surgery', 'OBG', 'Pediatrics', 'Orthopedics', 'ENT', 'Ophthalmology', 'Dermatology', 'Psychiatry'];

export default function MedicalFacultyManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [openDialog, setOpenDialog] = useState(false);

  const filteredFaculty = faculty.filter(
    (f) =>
      (selectedDepartment === 'All' || f.department === selectedDepartment) &&
      (f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.specialization.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #D32F2F 0%, #C62828 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Medical Faculty Management
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Manage medical college faculty & specialists
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
                42
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
                58
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
                42
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Assistant Professors
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              placeholder="Search by name or specialization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
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
            <Button fullWidth variant="contained" color="error" startIcon={<Add />} onClick={() => setOpenDialog(true)}>
              Add Faculty
            </Button>
          </Grid>
        </Grid>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Specialization</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Qualification</TableCell>
                <TableCell align="center">Experience (Years)</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredFaculty.map((member) => (
                <TableRow key={member.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{member.name}</TableCell>
                  <TableCell>{member.specialization}</TableCell>
                  <TableCell>
                    <Chip label={member.department} size="small" color="error" variant="outlined" />
                  </TableCell>
                  <TableCell>{member.qualification}</TableCell>
                  <TableCell align="center">{member.experience}</TableCell>
                  <TableCell>
                    <Chip
                      label={member.type}
                      size="small"
                      color={
                        member.type === 'Professor'
                          ? 'success'
                          : member.type === 'Associate Professor'
                          ? 'primary'
                          : 'warning'
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined" sx={{ mr: 1 }}>
                      View
                    </Button>
                    <Button size="small" variant="text">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Medical Faculty</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Full Name" required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Specialization" required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField select fullWidth label="Department" required>
                {departments.filter((d) => d !== 'All').map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Qualification (MBBS, MD, MS, etc.)" required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth type="number" label="Years of Experience" required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField select fullWidth label="Designation" required>
                <MenuItem value="Professor">Professor</MenuItem>
                <MenuItem value="Associate Professor">Associate Professor</MenuItem>
                <MenuItem value="Assistant Professor">Assistant Professor</MenuItem>
                <MenuItem value="Senior Resident">Senior Resident</MenuItem>
                <MenuItem value="Junior Resident">Junior Resident</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Email" type="email" required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Phone Number" required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Medical Council Registration Number" required />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" color="error">
            Add Faculty
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
