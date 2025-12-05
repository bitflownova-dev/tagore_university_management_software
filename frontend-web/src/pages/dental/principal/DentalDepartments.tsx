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
  Chip,
  Button,
} from '@mui/material';
import { School, Person, LocalHospital, Description } from '@mui/icons-material';

const dentalDepartments = [
  { id: 1, name: 'Oral & Maxillofacial Surgery', hod: 'Dr. Rajesh Kumar', faculty: 12, students: 180, clinics: 4 },
  { id: 2, name: 'Conservative Dentistry & Endodontics', hod: 'Dr. Priya Sharma', faculty: 10, students: 200, clinics: 5 },
  { id: 3, name: 'Prosthodontics & Crown & Bridge', hod: 'Dr. Amit Patel', faculty: 10, students: 180, clinics: 4 },
  { id: 4, name: 'Orthodontics & Dentofacial Orthopedics', hod: 'Dr. Meera Reddy', faculty: 8, students: 160, clinics: 3 },
  { id: 5, name: 'Periodontology', hod: 'Dr. Suresh Nair', faculty: 8, students: 140, clinics: 3 },
  { id: 6, name: 'Oral Pathology & Microbiology', hod: 'Dr. Kavita Singh', faculty: 6, students: 120, clinics: 2 },
  { id: 7, name: 'Oral Medicine & Radiology', hod: 'Dr. Anil Kumar', faculty: 7, students: 140, clinics: 3 },
  { id: 8, name: 'Pediatric & Preventive Dentistry', hod: 'Dr. Neha Gupta', faculty: 8, students: 160, clinics: 3 },
  { id: 9, name: 'Public Health Dentistry', hod: 'Dr. Vikram Joshi', faculty: 5, students: 100, clinics: 2 },
];

export default function DentalDepartments() {
  const totalDepartments = dentalDepartments.length;
  const totalFaculty = dentalDepartments.reduce((sum, dept) => sum + dept.faculty, 0);
  const totalStudents = dentalDepartments.reduce((sum, dept) => sum + dept.students, 0);
  const totalClinics = dentalDepartments.reduce((sum, dept) => sum + dept.clinics, 0);

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #00796B 0%, #004D40 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Dental College Departments
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          BDS program departments & clinical specialties
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E0F2F1' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <School sx={{ color: '#00796B', mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Total Departments
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#00796B' }}>
                {totalDepartments}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Person sx={{ color: '#388E3C', mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Total Faculty
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#388E3C' }}>
                {totalFaculty}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E3F2FD' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Description sx={{ color: '#1976D2', mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Total Students
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976D2' }}>
                {totalStudents}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFF3E0' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocalHospital sx={{ color: '#F57C00', mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Clinical Units
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#F57C00' }}>
                {totalClinics}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Department Overview
          </Typography>
          <Button variant="outlined" color="primary">
            Manage Departments
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Department Name</TableCell>
                <TableCell>Head of Department</TableCell>
                <TableCell align="center">Faculty Members</TableCell>
                <TableCell align="center">Students</TableCell>
                <TableCell align="center">Clinical Units</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dentalDepartments.map((dept) => (
                <TableRow key={dept.id} hover>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {dept.name}
                    </Typography>
                  </TableCell>
                  <TableCell>{dept.hod}</TableCell>
                  <TableCell align="center">
                    <Chip label={dept.faculty} size="small" color="success" />
                  </TableCell>
                  <TableCell align="center">
                    <Chip label={dept.students} size="small" color="primary" />
                  </TableCell>
                  <TableCell align="center">
                    <Chip label={dept.clinics} size="small" color="warning" />
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
    </Box>
  );
}
