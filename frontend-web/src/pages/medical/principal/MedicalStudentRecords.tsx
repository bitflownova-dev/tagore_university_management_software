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
  LinearProgress,
  Card,
  CardContent,
} from '@mui/material';
import { Search, FileDownload } from '@mui/icons-material';

const students = [
  { id: 1, rollNo: 'MB001', name: 'Rahul Sharma', phase: 'Phase 1', competency: 85, attendance: 92, rotation: 'Anatomy', logbook: 78, status: 'Active' },
  { id: 2, rollNo: 'MB002', name: 'Priya Singh', phase: 'Phase 2', competency: 78, attendance: 88, rotation: 'Medicine', logbook: 82, status: 'Active' },
  { id: 3, rollNo: 'MB003', name: 'Amit Kumar', phase: 'Phase 3 Part 1', competency: 72, attendance: 85, rotation: 'Surgery', logbook: 75, status: 'Active' },
  { id: 4, rollNo: 'MB004', name: 'Neha Patel', phase: 'Phase 1', competency: 88, attendance: 95, rotation: 'Physiology', logbook: 85, status: 'Active' },
  { id: 5, rollNo: 'MB005', name: 'Vikram Reddy', phase: 'Phase 2', competency: 75, attendance: 82, rotation: 'Pathology', logbook: 70, status: 'Active' },
  { id: 6, rollNo: 'MB006', name: 'Anjali Verma', phase: 'Internship', competency: 92, attendance: 98, rotation: 'OBG', logbook: 95, status: 'Active' },
  { id: 7, rollNo: 'MB007', name: 'Suresh Gupta', phase: 'Phase 3 Part 2', competency: 68, attendance: 78, rotation: 'Pediatrics', logbook: 65, status: 'Active' },
  { id: 8, rollNo: 'MB008', name: 'Divya Nair', phase: 'Phase 1', competency: 90, attendance: 93, rotation: 'Biochemistry', logbook: 88, status: 'Active' },
];

const phases = ['All', 'Phase 1', 'Phase 2', 'Phase 3 Part 1', 'Phase 3 Part 2', 'Internship'];

export default function MedicalStudentRecords() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhase, setSelectedPhase] = useState('All');

  const filteredStudents = students.filter(
    (s) =>
      (selectedPhase === 'All' || s.phase === selectedPhase) &&
      (s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.rollNo.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getCompetencyColor = (value: number) => {
    if (value >= 80) return 'success';
    if (value >= 70) return 'primary';
    if (value >= 60) return 'warning';
    return 'error';
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #D32F2F 0%, #C62828 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          MBBS Student Records
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Student performance & competency tracking
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFEBEE' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#D32F2F' }}>
                800
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Students
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#388E3C' }}>
                79%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Avg Competency
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E3F2FD' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976D2' }}>
                88%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Avg Attendance
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFF3E0' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#F57C00' }}>
                45
              </Typography>
              <Typography variant="body2" color="text.secondary">
                In Internship
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
              placeholder="Search by name or roll number..."
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
              label="CBME Phase"
              value={selectedPhase}
              onChange={(e) => setSelectedPhase(e.target.value)}
            >
              {phases.map((phase) => (
                <MenuItem key={phase} value={phase}>
                  {phase}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button fullWidth variant="contained" color="error" startIcon={<FileDownload />}>
              Export Records
            </Button>
          </Grid>
        </Grid>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Roll No</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>CBME Phase</TableCell>
                <TableCell>Current Rotation</TableCell>
                <TableCell align="center">Competency %</TableCell>
                <TableCell align="center">Attendance %</TableCell>
                <TableCell align="center">Logbook %</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{student.rollNo}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    <Chip label={student.phase} size="small" color="error" variant="outlined" />
                  </TableCell>
                  <TableCell>{student.rotation}</TableCell>
                  <TableCell align="center">
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {student.competency}%
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={student.competency}
                        color={getCompetencyColor(student.competency)}
                        sx={{ height: 6, borderRadius: 3 }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {student.attendance}%
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={student.attendance}
                        color={student.attendance >= 75 ? 'success' : 'error'}
                        sx={{ height: 6, borderRadius: 3 }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {student.logbook}%
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={student.logbook}
                        color={getCompetencyColor(student.logbook)}
                        sx={{ height: 6, borderRadius: 3 }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip label={student.status} size="small" color="success" />
                  </TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined" sx={{ mr: 1 }}>
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#D32F2F' }}>
          NMC Compliance Summary
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Minimum Attendance Compliance
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LinearProgress
                variant="determinate"
                value={92}
                color="success"
                sx={{ flex: 1, height: 10, borderRadius: 5 }}
              />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                92%
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Competency Achievement
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LinearProgress
                variant="determinate"
                value={79}
                color="primary"
                sx={{ flex: 1, height: 10, borderRadius: 5 }}
              />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                79%
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Clinical Exposure Hours
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LinearProgress
                variant="determinate"
                value={85}
                color="success"
                sx={{ flex: 1, height: 10, borderRadius: 5 }}
              />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                85%
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
