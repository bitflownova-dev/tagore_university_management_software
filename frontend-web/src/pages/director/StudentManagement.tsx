import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Chip,
  IconButton,
  InputAdornment,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';

interface Student {
  id: number;
  rollNo: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  semester: number;
  status: 'Active' | 'Inactive' | 'Graduated';
  admissionDate: string;
}

export default function StudentManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [tabValue, setTabValue] = useState(0);

  // Sample data
  const students: Student[] = [
    {
      id: 1,
      rollNo: 'CS2021001',
      name: 'Amit Kumar',
      email: 'amit.kumar@student.tagore.edu',
      phone: '+91 98765 11111',
      course: 'B.Tech Computer Science',
      semester: 6,
      status: 'Active',
      admissionDate: '2021-08-01',
    },
    {
      id: 2,
      rollNo: 'CS2021002',
      name: 'Priya Singh',
      email: 'priya.singh@student.tagore.edu',
      phone: '+91 98765 22222',
      course: 'B.Tech Computer Science',
      semester: 6,
      status: 'Active',
      admissionDate: '2021-08-01',
    },
    {
      id: 3,
      rollNo: 'MT2022001',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@student.tagore.edu',
      phone: '+91 98765 33333',
      course: 'B.Sc Mathematics',
      semester: 4,
      status: 'Active',
      admissionDate: '2022-08-01',
    },
  ];

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Student Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedStudent(null);
            setOpenDialog(true);
          }}
        >
          Add Student
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
          <Tab label="All Students" />
          <Tab label="Active" />
          <Tab label="Inactive" />
          <Tab label="Graduated" />
        </Tabs>

        <TextField
          fullWidth
          placeholder="Search by name, roll number, or course..."
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
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Semester</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id} hover>
                  <TableCell>{student.rollNo}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.phone}</TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell>{student.semester}</TableCell>
                  <TableCell>
                    <Chip
                      label={student.status}
                      color={
                        student.status === 'Active'
                          ? 'success'
                          : student.status === 'Graduated'
                          ? 'info'
                          : 'default'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" color="info">
                      <ViewIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => {
                        setSelectedStudent(student);
                        setOpenDialog(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add/Edit Student Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{selectedStudent ? 'Edit Student' : 'Add New Student'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField label="Roll Number" fullWidth defaultValue={selectedStudent?.rollNo} />
              <TextField label="Full Name" fullWidth defaultValue={selectedStudent?.name} />
              <TextField
                label="Email"
                type="email"
                fullWidth
                defaultValue={selectedStudent?.email}
              />
              <TextField label="Phone" fullWidth defaultValue={selectedStudent?.phone} />
              <TextField
                label="Course"
                select
                fullWidth
                defaultValue={selectedStudent?.course || 'B.Tech Computer Science'}
              >
                <MenuItem value="B.Tech Computer Science">B.Tech Computer Science</MenuItem>
                <MenuItem value="B.Sc Mathematics">B.Sc Mathematics</MenuItem>
                <MenuItem value="B.Sc Physics">B.Sc Physics</MenuItem>
                <MenuItem value="B.Com">B.Com</MenuItem>
              </TextField>
              <TextField
                label="Semester"
                type="number"
                fullWidth
                defaultValue={selectedStudent?.semester || 1}
              />
              <TextField
                label="Admission Date"
                type="date"
                fullWidth
                defaultValue={selectedStudent?.admissionDate}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Status"
                select
                fullWidth
                defaultValue={selectedStudent?.status || 'Active'}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
                <MenuItem value="Graduated">Graduated</MenuItem>
              </TextField>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            {selectedStudent ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
