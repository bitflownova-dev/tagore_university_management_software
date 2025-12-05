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
  Tabs,
  Tab,
} from '@mui/material';
import {
  Search as SearchIcon,
  Visibility as ViewIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';

export default function StudentRecords() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);

  const students = [
    {
      id: 1,
      rollNo: 'CS2021001',
      name: 'Amit Kumar',
      course: 'B.Tech CS',
      semester: 6,
      attendance: 88,
      cgpa: 8.5,
      status: 'Active',
    },
    {
      id: 2,
      rollNo: 'CS2021002',
      name: 'Priya Singh',
      course: 'B.Tech CS',
      semester: 6,
      attendance: 92,
      cgpa: 9.1,
      status: 'Active',
    },
    {
      id: 3,
      rollNo: 'MT2022001',
      name: 'Rahul Sharma',
      course: 'B.Sc Math',
      semester: 4,
      attendance: 85,
      cgpa: 8.0,
      status: 'Active',
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Student Records
        </Typography>
        <Button variant="contained" startIcon={<DownloadIcon />}>
          Export Records
        </Button>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab label="All Students" />
          <Tab label="Academic Records" />
          <Tab label="Attendance Records" />
          <Tab label="Disciplinary Records" />
        </Tabs>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <TextField
          fullWidth
          placeholder="Search by roll number, name, or course..."
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
                <TableCell>Roll No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Semester</TableCell>
                <TableCell>Attendance %</TableCell>
                <TableCell>CGPA</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id} hover>
                  <TableCell>{student.rollNo}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell>{student.semester}</TableCell>
                  <TableCell>
                    <Chip
                      label={`${student.attendance}%`}
                      color={student.attendance >= 75 ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{student.cgpa}</TableCell>
                  <TableCell>
                    <Chip label={student.status} color="success" size="small" />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" color="primary">
                      <ViewIcon />
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
