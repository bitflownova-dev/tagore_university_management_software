import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { Edit, People, School, MenuBook } from '@mui/icons-material';

interface Department {
  id: string;
  name: string;
  hod: string;
  faculty: number;
  students: number;
  courses: number;
  status: 'active' | 'inactive';
}

const medicalDepartments: Department[] = [
  { id: '1', name: 'Internal Medicine', hod: 'Dr. Ramesh Kumar', faculty: 18, students: 158, courses: 5, status: 'active' },
  { id: '2', name: 'General Surgery', hod: 'Dr. Priya Sharma', faculty: 16, students: 158, courses: 5, status: 'active' },
  { id: '3', name: 'Pediatrics', hod: 'Dr. Anjali Verma', faculty: 14, students: 165, courses: 4, status: 'active' },
  { id: '4', name: 'Obstetrics & Gynecology', hod: 'Dr. Meena Patel', faculty: 12, students: 165, courses: 4, status: 'active' },
  { id: '5', name: 'Orthopedics', hod: 'Dr. Vikram Singh', faculty: 10, students: 158, courses: 3, status: 'active' },
  { id: '6', name: 'Anatomy', hod: 'Dr. Suresh Iyer', faculty: 10, students: 180, courses: 2, status: 'active' },
  { id: '7', name: 'Physiology', hod: 'Dr. Kavita Desai', faculty: 9, students: 180, courses: 2, status: 'active' },
  { id: '8', name: 'Biochemistry', hod: 'Dr. Anil Gupta', faculty: 8, students: 180, courses: 2, status: 'active' },
  { id: '9', name: 'Pharmacology', hod: 'Dr. Rajesh Rao', faculty: 8, students: 165, courses: 2, status: 'active' },
  { id: '10', name: 'Pathology', hod: 'Dr. Sneha Joshi', faculty: 7, students: 165, courses: 2, status: 'active' },
  { id: '11', name: 'Microbiology', hod: 'Dr. Amit Shah', faculty: 7, students: 165, courses: 2, status: 'active' },
  { id: '12', name: 'Forensic Medicine', hod: 'Dr. Deepak Nair', faculty: 6, students: 165, courses: 2, status: 'active' },
  { id: '13', name: 'Community Medicine', hod: 'Dr. Pooja Reddy', faculty: 7, students: 180, courses: 2, status: 'active' },
  { id: '14', name: 'Anesthesiology', hod: 'Dr. Kiran Mehta', faculty: 6, students: 152, courses: 2, status: 'active' },
  { id: '15', name: 'Radiology', hod: 'Dr. Sanjay Kumar', faculty: 5, students: 152, courses: 2, status: 'active' },
  { id: '16', name: 'Psychiatry', hod: 'Dr. Neha Gupta', faculty: 5, students: 152, courses: 2, status: 'active' },
  { id: '17', name: 'Ophthalmology', hod: 'Dr. Ravi Sharma', faculty: 4, students: 152, courses: 2, status: 'active' },
  { id: '18', name: 'ENT', hod: 'Dr. Sunita Jain', faculty: 4, students: 152, courses: 2, status: 'active' },
];

export default function MedicalDepartments() {
  const totalFaculty = medicalDepartments.reduce((sum, dept) => sum + dept.faculty, 0);
  const totalStudents = medicalDepartments.reduce((sum, dept) => sum + dept.students, 0);
  const totalCourses = medicalDepartments.reduce((sum, dept) => sum + dept.courses, 0);

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #D32F2F 0%, #C62828 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Medical College Departments
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Department management for Medical College & Hospital
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFEBEE' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <MenuBook sx={{ color: '#D32F2F', mr: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#D32F2F' }}>
                  {medicalDepartments.length}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Total Departments
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E3F2FD' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <People sx={{ color: '#1976D2', mr: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976D2' }}>
                  {totalFaculty}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Total Faculty
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <School sx={{ color: '#388E3C', mr: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#388E3C' }}>
                  {totalStudents}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Total Students
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFF3E0' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <MenuBook sx={{ color: '#F57C00', mr: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#F57C00' }}>
                  {totalCourses}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Total Courses
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Department List
          </Typography>
          <Button variant="contained" sx={{ bgcolor: '#D32F2F', '&:hover': { bgcolor: '#C62828' } }}>
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
                <TableCell align="center">Courses</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medicalDepartments.map((dept) => (
                <TableRow key={dept.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{dept.name}</TableCell>
                  <TableCell>{dept.hod}</TableCell>
                  <TableCell align="center">{dept.faculty}</TableCell>
                  <TableCell align="center">{dept.students}</TableCell>
                  <TableCell align="center">{dept.courses}</TableCell>
                  <TableCell>
                    <Chip
                      label={dept.status === 'active' ? 'Active' : 'Inactive'}
                      size="small"
                      color={dept.status === 'active' ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell>
                    <Button size="small" startIcon={<Edit />} variant="outlined" sx={{ mr: 1 }}>
                      Edit
                    </Button>
                    <Button size="small" variant="text">
                      View
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
