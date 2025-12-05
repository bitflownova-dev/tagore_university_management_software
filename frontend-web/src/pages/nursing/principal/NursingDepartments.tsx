import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import { LocalHospital, Add } from '@mui/icons-material';

const departments = [
  { name: 'Medical-Surgical Nursing', hod: 'Dr. Anjali Verma', faculty: 15, students: 380, programs: 3 },
  { name: 'Community Health Nursing', hod: 'Dr. Priya Reddy', faculty: 12, students: 340, programs: 3 },
  { name: 'Child Health Nursing', hod: 'Dr. Meera Sharma', faculty: 10, students: 280, programs: 2 },
  { name: 'Mental Health Nursing', hod: 'Dr. Kavita Singh', faculty: 8, students: 240, programs: 2 },
  { name: 'Obstetrics & Gynecological Nursing', hod: 'Dr. Sunita Patel', faculty: 11, students: 300, programs: 3 },
  { name: 'Nursing Foundation', hod: 'Dr. Rekha Kumar', faculty: 9, students: 260, programs: 2 },
  { name: 'Nursing Research & Statistics', hod: 'Dr. Neha Agarwal', faculty: 6, students: 180, programs: 2 },
];

export default function NursingDepartments() {
  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Nursing College Departments
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          B.Sc Nursing & GNM program departments
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#2E7D32' }}>
                7
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Departments
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#C8E6C9' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1B5E20' }}>
                71
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Faculty
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#A5D6A7' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#2E7D32' }}>
                1,980
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Students
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#81C784' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1B5E20' }}>
                17
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Programs
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocalHospital sx={{ mr: 2, color: '#2E7D32' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Department Overview
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<Add />} sx={{ bgcolor: '#2E7D32', '&:hover': { bgcolor: '#1B5E20' } }}>
            Add Department
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Department Name</TableCell>
                <TableCell>Head of Department</TableCell>
                <TableCell align="center">Faculty</TableCell>
                <TableCell align="center">Students</TableCell>
                <TableCell align="center">Programs</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departments.map((dept, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{dept.name}</TableCell>
                  <TableCell>{dept.hod}</TableCell>
                  <TableCell align="center">{dept.faculty}</TableCell>
                  <TableCell align="center">{dept.students}</TableCell>
                  <TableCell align="center">{dept.programs}</TableCell>
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
    </Box>
  );
}
