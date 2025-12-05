import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Search, Add, FileDownload, FilterList } from '@mui/icons-material';

const departments = [
  {
    name: 'Medical Laboratory Technology',
    hod: 'Dr. Rajeev Kumar',
    faculty: 8,
    students: 120,
    programs: ['Diploma MLT (2yr)', 'BSc MLT (3yr)'],
    accreditation: 'NABL Approved',
    labs: 3,
  },
  {
    name: 'Radiology & Imaging Technology',
    hod: 'Dr. Priya Sharma',
    faculty: 7,
    students: 100,
    programs: ['Diploma Radiology (2yr)', 'BSc Radiology (3yr)'],
    accreditation: 'AERB Approved',
    labs: 2,
  },
  {
    name: 'Physiotherapy',
    hod: 'Dr. Anil Verma',
    faculty: 6,
    students: 90,
    programs: ['BPT (4.5yr)', 'MPT (2yr)'],
    accreditation: 'IAP Recognized',
    labs: 2,
  },
  {
    name: 'Occupational Therapy',
    hod: 'Dr. Meera Patel',
    faculty: 5,
    students: 70,
    programs: ['BOT (4.5yr)', 'MOT (2yr)'],
    accreditation: 'AIOT Recognized',
    labs: 2,
  },
  {
    name: 'Respiratory Therapy',
    hod: 'Dr. Suresh Reddy',
    faculty: 4,
    students: 60,
    programs: ['BSc Respiratory Therapy (3yr)'],
    accreditation: 'AARC Standards',
    labs: 1,
  },
  {
    name: 'Dialysis Technology',
    hod: 'Dr. Kavita Singh',
    faculty: 4,
    students: 50,
    programs: ['Diploma Dialysis (2yr)', 'BSc Dialysis (3yr)'],
    accreditation: 'ISN Guidelines',
    labs: 2,
  },
  {
    name: 'Operation Theatre Technology',
    hod: 'Dr. Ravi Shankar',
    faculty: 3,
    students: 40,
    programs: ['Diploma OTT (2yr)'],
    accreditation: 'Hospital Affiliated',
    labs: 1,
  },
];

export default function AlliedHealthDepartments() {
  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Allied Health Departments
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Manage paramedical and allied health science departments
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Departments
              </Typography>
              <Typography variant="h4" sx={{ color: '#1565C0', fontWeight: 600 }}>
                {departments.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Faculty
              </Typography>
              <Typography variant="h4" sx={{ color: '#1976D2', fontWeight: 600 }}>
                {departments.reduce((sum, d) => sum + d.faculty, 0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Students
              </Typography>
              <Typography variant="h4" sx={{ color: '#1E88E5', fontWeight: 600 }}>
                {departments.reduce((sum, d) => sum + d.students, 0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Labs
              </Typography>
              <Typography variant="h4" sx={{ color: '#2196F3', fontWeight: 600 }}>
                {departments.reduce((sum, d) => sum + d.labs, 0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <TextField
            placeholder="Search departments..."
            size="small"
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" startIcon={<FilterList />}>
              Filter
            </Button>
            <Button variant="outlined" startIcon={<FileDownload />}>
              Export
            </Button>
            <Button variant="contained" startIcon={<Add />} sx={{ bgcolor: '#1565C0' }}>
              Add Department
            </Button>
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Department</strong></TableCell>
                <TableCell><strong>HOD</strong></TableCell>
                <TableCell align="center"><strong>Faculty</strong></TableCell>
                <TableCell align="center"><strong>Students</strong></TableCell>
                <TableCell><strong>Programs</strong></TableCell>
                <TableCell><strong>Accreditation</strong></TableCell>
                <TableCell align="center"><strong>Labs</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departments.map((dept) => (
                <TableRow key={dept.name} hover>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {dept.name}
                    </Typography>
                  </TableCell>
                  <TableCell>{dept.hod}</TableCell>
                  <TableCell align="center">{dept.faculty}</TableCell>
                  <TableCell align="center">{dept.students}</TableCell>
                  <TableCell>
                    {dept.programs.map((prog, idx) => (
                      <Chip
                        key={idx}
                        label={prog}
                        size="small"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={dept.accreditation}
                      size="small"
                      color="success"
                    />
                  </TableCell>
                  <TableCell align="center">{dept.labs}</TableCell>
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
