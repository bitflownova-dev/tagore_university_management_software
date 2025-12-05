import { useState } from 'react';
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
  Button,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';

export default function FacultyManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  const faculty = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      department: 'Computer Science',
      designation: 'Professor',
      subjects: ['Data Structures', 'Algorithms'],
      experience: '15 years',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Prof. Anita Sharma',
      department: 'Mathematics',
      designation: 'Associate Professor',
      subjects: ['Calculus', 'Linear Algebra'],
      experience: '12 years',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Dr. Suresh Patel',
      department: 'Physics',
      designation: 'Assistant Professor',
      subjects: ['Quantum Mechanics', 'Thermodynamics'],
      experience: '8 years',
      status: 'Active',
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Faculty Management
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add Faculty
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <TextField
          fullWidth
          placeholder="Search faculty by name, department, or designation..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Subjects</TableCell>
                <TableCell>Experience</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {faculty.map((member) => (
                <TableRow key={member.id} hover>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.department}</TableCell>
                  <TableCell>{member.designation}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {member.subjects.map((subject, idx) => (
                        <Chip key={idx} label={subject} size="small" />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>{member.experience}</TableCell>
                  <TableCell>
                    <Chip label={member.status} color="success" size="small" />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" color="info">
                      <ViewIcon />
                    </IconButton>
                    <IconButton size="small" color="primary">
                      <EditIcon />
                    </IconButton>
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
