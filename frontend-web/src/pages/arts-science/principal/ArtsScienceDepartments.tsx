import { Box, Paper, Typography, Grid, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { School } from '@mui/icons-material';

const departments = [
  { name: 'English', hod: 'Dr. Sarah Williams', faculty: 12, students: 280, programs: 3 },
  { name: 'History', hod: 'Dr. Ramesh Kumar', faculty: 10, students: 240, programs: 2 },
  { name: 'Economics', hod: 'Dr. Anjali Mehta', faculty: 11, students: 320, programs: 3 },
  { name: 'Political Science', hod: 'Dr. Vijay Singh', faculty: 9, students: 200, programs: 2 },
  { name: 'Mathematics', hod: 'Dr. Priya Sharma', faculty: 14, students: 350, programs: 3 },
  { name: 'Physics', hod: 'Dr. Amit Patel', faculty: 13, students: 300, programs: 3 },
  { name: 'Chemistry', hod: 'Dr. Meera Reddy', faculty: 12, students: 290, programs: 3 },
  { name: 'Botany', hod: 'Dr. Suresh Nair', faculty: 8, students: 180, programs: 2 },
  { name: 'Zoology', hod: 'Dr. Kavita Joshi', faculty: 9, students: 200, programs: 2 },
  { name: 'Commerce', hod: 'Dr. Rajesh Gupta', faculty: 15, students: 400, programs: 3 },
  { name: 'Computer Science', hod: 'Dr. Neha Verma', faculty: 16, students: 420, programs: 3 },
  { name: 'Psychology', hod: 'Dr. Arun Desai', faculty: 7, students: 160, programs: 2 },
];

export default function ArtsScienceDepartments() {
  const totalDepartments = departments.length;
  const totalFaculty = departments.reduce((sum, dept) => sum + dept.faculty, 0);
  const totalStudents = departments.reduce((sum, dept) => sum + dept.students, 0);
  const totalPrograms = departments.reduce((sum, dept) => sum + dept.programs, 0);

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #5E35B1 0%, #311B92 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Arts & Science College Departments
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          BA/BSc/BCom program departments & multi-disciplinary studies
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#EDE7F6' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#5E35B1' }}>
                {totalDepartments}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Departments
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#F3E5F5' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#7B1FA2' }}>
                {totalFaculty}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Faculty
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8EAF6' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#3F51B5' }}>
                {totalStudents}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Students
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E1F5FE' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#0288D1' }}>
                {totalPrograms}
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
            <School sx={{ mr: 2, color: '#5E35B1' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Department Overview
            </Typography>
          </Box>
          <Button variant="contained" sx={{ bgcolor: '#5E35B1', '&:hover': { bgcolor: '#311B92' } }}>
            Manage Departments
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
              {departments.map((dept) => (
                <TableRow key={dept.name} hover>
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
