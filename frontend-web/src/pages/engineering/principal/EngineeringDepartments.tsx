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

const engineeringDepartments: Department[] = [
  { id: '1', name: 'Computer Science & Engineering', hod: 'Dr. Rajesh Kumar', faculty: 35, students: 480, courses: 12, status: 'active' },
  { id: '2', name: 'Electronics & Communication', hod: 'Dr. Priya Singh', faculty: 28, students: 420, courses: 10, status: 'active' },
  { id: '3', name: 'Mechanical Engineering', hod: 'Dr. Amit Patel', faculty: 32, students: 450, courses: 11, status: 'active' },
  { id: '4', name: 'Civil Engineering', hod: 'Dr. Meena Reddy', faculty: 25, students: 360, courses: 9, status: 'active' },
  { id: '5', name: 'Electrical Engineering', hod: 'Dr. Suresh Nair', faculty: 22, students: 330, courses: 8, status: 'active' },
  { id: '6', name: 'Information Technology', hod: 'Dr. Kavita Sharma', faculty: 20, students: 300, courses: 8, status: 'active' },
  { id: '7', name: 'Artificial Intelligence & ML', hod: 'Dr. Anil Kumar', faculty: 12, students: 180, courses: 6, status: 'active' },
  { id: '8', name: 'Cyber Security', hod: 'Dr. Neha Gupta', faculty: 6, students: 120, courses: 4, status: 'active' },
];

export default function EngineeringDepartments() {
  const totalFaculty = engineeringDepartments.reduce((sum, dept) => sum + dept.faculty, 0);
  const totalStudents = engineeringDepartments.reduce((sum, dept) => sum + dept.students, 0);
  const totalCourses = engineeringDepartments.reduce((sum, dept) => sum + dept.courses, 0);

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #1976D2 0%, #1565C0 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Engineering College Departments
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Department management for Engineering College
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E3F2FD' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <MenuBook sx={{ color: '#1976D2', mr: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976D2' }}>
                  {engineeringDepartments.length}
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
          <Button variant="contained" color="primary">
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
              {engineeringDepartments.map((dept) => (
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
