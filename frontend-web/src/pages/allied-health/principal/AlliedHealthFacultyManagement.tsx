import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  InputAdornment,
  Avatar,
} from '@mui/material';
import { Search, Add, FileDownload, Email, Phone } from '@mui/icons-material';

const faculty = [
  {
    id: 1,
    name: 'Dr. Rajeev Kumar',
    department: 'MLT',
    designation: 'Professor & HOD',
    qualification: 'PhD, MSc MLT',
    experience: '15 years',
    email: 'rajeev.k@tagore.edu',
    phone: '+91 98765 43210',
    subjects: ['Clinical Biochemistry', 'Hematology'],
    status: 'Active',
  },
  {
    id: 2,
    name: 'Dr. Priya Sharma',
    department: 'Radiology',
    designation: 'Associate Professor',
    qualification: 'MD Radiology, BSc',
    experience: '12 years',
    email: 'priya.s@tagore.edu',
    phone: '+91 98765 43211',
    subjects: ['Diagnostic Imaging', 'CT & MRI'],
    status: 'Active',
  },
  {
    id: 3,
    name: 'Dr. Anil Verma',
    department: 'Physiotherapy',
    designation: 'Professor',
    qualification: 'PhD PT, MPT',
    experience: '18 years',
    email: 'anil.v@tagore.edu',
    phone: '+91 98765 43212',
    subjects: ['Musculoskeletal PT', 'Sports Rehabilitation'],
    status: 'Active',
  },
  {
    id: 4,
    name: 'Dr. Meera Patel',
    department: 'Occupational Therapy',
    designation: 'Assistant Professor',
    qualification: 'MOT, BOT',
    experience: '8 years',
    email: 'meera.p@tagore.edu',
    phone: '+91 98765 43213',
    subjects: ['Pediatric OT', 'Hand Rehabilitation'],
    status: 'Active',
  },
  {
    id: 5,
    name: 'Dr. Suresh Reddy',
    department: 'Respiratory Therapy',
    designation: 'Senior Lecturer',
    qualification: 'MSc Respiratory Care',
    experience: '10 years',
    email: 'suresh.r@tagore.edu',
    phone: '+91 98765 43214',
    subjects: ['Mechanical Ventilation', 'Pulmonary Function'],
    status: 'Active',
  },
];

export default function AlliedHealthFacultyManagement() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F8FBFD', py: 4 }}>
      <Paper 
        elevation={0}
        sx={{ 
          p: 4, 
          mb: 4, 
          background: 'linear-gradient(135deg, #00BFA5 0%, #00897B 100%)',
          borderRadius: 3,
          boxShadow: '0 10px 40px rgba(0, 191, 165, 0.2)',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'white', letterSpacing: '-0.01em' }}>
          Faculty Management
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.95)' }}>
          Manage allied health faculty across all departments
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Faculty
              </Typography>
              <Typography variant="h4" sx={{ color: '#1565C0', fontWeight: 600 }}>
                {faculty.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Professors
              </Typography>
              <Typography variant="h4" sx={{ color: '#1976D2', fontWeight: 600 }}>
                {faculty.filter(f => f.designation.includes('Professor')).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Departments
              </Typography>
              <Typography variant="h4" sx={{ color: '#1E88E5', fontWeight: 600 }}>
                7
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Active Faculty
              </Typography>
              <Typography variant="h4" sx={{ color: '#2196F3', fontWeight: 600 }}>
                {faculty.filter(f => f.status === 'Active').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <TextField
            placeholder="Search faculty..."
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
            <Button variant="outlined" startIcon={<FileDownload />}>
              Export
            </Button>
            <Button 
              variant="contained" 
              startIcon={<Add />} 
              sx={{ 
                bgcolor: '#00BFA5',
                '&:hover': {
                  bgcolor: '#00897B',
                },
              }}
            >
              Add Faculty
            </Button>
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Faculty</strong></TableCell>
                <TableCell><strong>Department</strong></TableCell>
                <TableCell><strong>Designation</strong></TableCell>
                <TableCell><strong>Qualification</strong></TableCell>
                <TableCell><strong>Experience</strong></TableCell>
                <TableCell><strong>Contact</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {faculty.map((fac) => (
                <TableRow key={fac.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: '#1565C0' }}>
                        {fac.name.split(' ')[0][0]}{fac.name.split(' ')[1][0]}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {fac.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {fac.subjects.join(', ')}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{fac.department}</TableCell>
                  <TableCell>{fac.designation}</TableCell>
                  <TableCell>{fac.qualification}</TableCell>
                  <TableCell>{fac.experience}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Email sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="caption">{fac.email}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Phone sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="caption">{fac.phone}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip label={fac.status} size="small" color="success" />
                  </TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined">
                      View Profile
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
