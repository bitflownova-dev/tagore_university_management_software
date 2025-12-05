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
  Tabs,
  Tab,
  Chip,
} from '@mui/material';
import { useState } from 'react';

export default function MyMarks() {
  const [tabValue, setTabValue] = useState(0);

  const cgpa = 8.5;
  const sgpa = 8.7;

  const currentSemesterMarks = [
    { subject: 'Data Structures', midTerm: 45, endTerm: 42, practical: 48, total: 135, grade: 'A' },
    { subject: 'Database Management', midTerm: 48, endTerm: 45, practical: 47, total: 140, grade: 'A+' },
    { subject: 'Operating Systems', midTerm: 42, endTerm: 40, practical: 45, total: 127, grade: 'A' },
    { subject: 'Web Technologies', midTerm: 46, endTerm: 44, practical: 49, total: 139, grade: 'A+' },
  ];

  const previousSemesters = [
    { semester: 'Semester 5', sgpa: 8.5, status: 'Completed' },
    { semester: 'Semester 4', sgpa: 8.3, status: 'Completed' },
    { semester: 'Semester 3', sgpa: 8.6, status: 'Completed' },
    { semester: 'Semester 2', sgpa: 8.4, status: 'Completed' },
    { semester: 'Semester 1', sgpa: 8.7, status: 'Completed' },
  ];

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        My Marks
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Current SGPA
              </Typography>
              <Typography variant="h2" fontWeight="bold" color="primary">
                {sgpa}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Semester 6
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Overall CGPA
              </Typography>
              <Typography variant="h2" fontWeight="bold" color="secondary">
                {cgpa}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Cumulative Grade Point Average
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ mt: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab label="Current Semester" />
          <Tab label="Previous Semesters" />
        </Tabs>
      </Paper>

      {tabValue === 0 && (
        <Paper sx={{ p: 3, mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Semester 6 - Marks
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell align="center">Mid Term (50)</TableCell>
                  <TableCell align="center">End Term (50)</TableCell>
                  <TableCell align="center">Practical (50)</TableCell>
                  <TableCell align="center">Total (150)</TableCell>
                  <TableCell align="center">Grade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentSemesterMarks.map((mark, index) => (
                  <TableRow key={index}>
                    <TableCell>{mark.subject}</TableCell>
                    <TableCell align="center">{mark.midTerm}</TableCell>
                    <TableCell align="center">{mark.endTerm}</TableCell>
                    <TableCell align="center">{mark.practical}</TableCell>
                    <TableCell align="center">
                      <strong>{mark.total}</strong>
                    </TableCell>
                    <TableCell align="center">
                      <Chip label={mark.grade} color="primary" size="small" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {tabValue === 1 && (
        <Paper sx={{ p: 3, mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Previous Semesters Performance
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Semester</TableCell>
                  <TableCell align="center">SGPA</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {previousSemesters.map((sem, index) => (
                  <TableRow key={index}>
                    <TableCell>{sem.semester}</TableCell>
                    <TableCell align="center">
                      <strong>{sem.sgpa}</strong>
                    </TableCell>
                    <TableCell align="center">
                      <Chip label={sem.status} color="success" size="small" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
}
