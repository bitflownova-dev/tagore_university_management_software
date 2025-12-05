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
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Save as SaveIcon, Edit as EditIcon } from '@mui/icons-material';

export default function MarksEntry() {
  const [selectedClass, setSelectedClass] = useState('CS-3A');
  const [selectedExam, setSelectedExam] = useState('mid-term');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const students = [
    { id: 1, rollNo: 'CS2021001', name: 'Amit Kumar', theory: 45, practical: 40, total: 85 },
    { id: 2, rollNo: 'CS2021002', name: 'Priya Singh', theory: 48, practical: 42, total: 90 },
    { id: 3, rollNo: 'CS2021003', name: 'Rahul Sharma', theory: 40, practical: 38, total: 78 },
    { id: 4, rollNo: 'CS2021004', name: 'Sneha Patel', theory: 46, practical: 41, total: 87 },
  ];

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Marks Entry
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            select
            label="Select Class"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="CS-3A">CS-3A (Data Structures)</MenuItem>
            <MenuItem value="CS-3B">CS-3B (DBMS)</MenuItem>
            <MenuItem value="CS-4A">CS-4A (OS)</MenuItem>
          </TextField>
          <TextField
            select
            label="Exam Type"
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="mid-term">Mid Term</MenuItem>
            <MenuItem value="end-term">End Term</MenuItem>
            <MenuItem value="internal">Internal Assessment</MenuItem>
          </TextField>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Roll No</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell align="center">Theory (50)</TableCell>
                <TableCell align="center">Practical (50)</TableCell>
                <TableCell align="center">Total (100)</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.rollNo}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell align="center">{student.theory}</TableCell>
                  <TableCell align="center">{student.practical}</TableCell>
                  <TableCell align="center">
                    <strong>{student.total}</strong>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => {
                        setSelectedStudent(student);
                        setOpenDialog(true);
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button variant="contained" startIcon={<SaveIcon />} size="large">
            Submit Marks
          </Button>
        </Box>
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Marks - {selectedStudent?.name}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Theory Marks"
              type="number"
              fullWidth
              defaultValue={selectedStudent?.theory}
              inputProps={{ max: 50, min: 0 }}
            />
            <TextField
              label="Practical Marks"
              type="number"
              fullWidth
              defaultValue={selectedStudent?.practical}
              inputProps={{ max: 50, min: 0 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
