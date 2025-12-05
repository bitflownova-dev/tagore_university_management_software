import { useState } from 'react';
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
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  InputAdornment,
  Avatar,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit,
  LocalHospital,
  School,
  Work,
} from '@mui/icons-material';

interface Faculty {
  id: number;
  employeeId: string;
  name: string;
  department: string;
  designation: string;
  qualification: string;
  specialization: string;
  experience: number;
  email: string;
  phone: string;
  isLogbookApprover: boolean;
  isExaminer: boolean;
  status: 'active' | 'on-leave' | 'retired';
}

const medicalFaculty: Faculty[] = [
  {
    id: 1,
    employeeId: 'FAC-2018-001',
    name: 'Dr. Ramesh Kumar',
    department: 'Internal Medicine',
    designation: 'Professor & HOD',
    qualification: 'MBBS, MD, DM (Cardiology)',
    specialization: 'Cardiology',
    experience: 18,
    email: 'ramesh.kumar@tagoremch.edu.in',
    phone: '+91 98765 43210',
    isLogbookApprover: true,
    isExaminer: true,
    status: 'active',
  },
  {
    id: 2,
    employeeId: 'FAC-2019-015',
    name: 'Dr. Priya Sharma',
    department: 'General Surgery',
    designation: 'Associate Professor',
    qualification: 'MBBS, MS, MCh (Surgical Oncology)',
    specialization: 'Surgical Oncology',
    experience: 14,
    email: 'priya.sharma@tagoremch.edu.in',
    phone: '+91 98765 43211',
    isLogbookApprover: true,
    isExaminer: true,
    status: 'active',
  },
  {
    id: 3,
    employeeId: 'FAC-2020-028',
    name: 'Dr. Anjali Verma',
    department: 'Pediatrics',
    designation: 'Assistant Professor',
    qualification: 'MBBS, MD (Pediatrics)',
    specialization: 'Neonatology',
    experience: 10,
    email: 'anjali.verma@tagoremch.edu.in',
    phone: '+91 98765 43212',
    isLogbookApprover: true,
    isExaminer: true,
    status: 'active',
  },
  {
    id: 4,
    employeeId: 'FAC-2021-042',
    name: 'Dr. Suresh Iyer',
    department: 'Anatomy',
    designation: 'Professor',
    qualification: 'MBBS, MS (Anatomy)',
    specialization: 'Gross Anatomy',
    experience: 22,
    email: 'suresh.iyer@tagoremch.edu.in',
    phone: '+91 98765 43213',
    isLogbookApprover: false,
    isExaminer: true,
    status: 'active',
  },
  {
    id: 5,
    employeeId: 'FAC-2021-055',
    name: 'Dr. Kavita Desai',
    department: 'Physiology',
    designation: 'Associate Professor',
    qualification: 'MBBS, MD (Physiology)',
    specialization: 'Cardiovascular Physiology',
    experience: 12,
    email: 'kavita.desai@tagoremch.edu.in',
    phone: '+91 98765 43214',
    isLogbookApprover: false,
    isExaminer: true,
    status: 'active',
  },
  {
    id: 6,
    employeeId: 'FAC-2022-068',
    name: 'Dr. Meena Patel',
    department: 'Obstetrics & Gynecology',
    designation: 'Associate Professor',
    qualification: 'MBBS, MD (OBG)',
    specialization: 'High Risk Pregnancy',
    experience: 11,
    email: 'meena.patel@tagoremch.edu.in',
    phone: '+91 98765 43215',
    isLogbookApprover: true,
    isExaminer: true,
    status: 'active',
  },
  {
    id: 7,
    employeeId: 'FAC-2022-072',
    name: 'Dr. Vikram Singh',
    department: 'Orthopedics',
    designation: 'Assistant Professor',
    qualification: 'MBBS, MS (Ortho)',
    specialization: 'Trauma & Joint Replacement',
    experience: 9,
    email: 'vikram.singh@tagoremch.edu.in',
    phone: '+91 98765 43216',
    isLogbookApprover: true,
    isExaminer: false,
    status: 'active',
  },
  {
    id: 8,
    employeeId: 'FAC-2023-085',
    name: 'Dr. Anil Gupta',
    department: 'Biochemistry',
    designation: 'Assistant Professor',
    qualification: 'MBBS, MD (Biochemistry)',
    specialization: 'Clinical Biochemistry',
    experience: 7,
    email: 'anil.gupta@tagoremch.edu.in',
    phone: '+91 98765 43217',
    isLogbookApprover: false,
    isExaminer: true,
    status: 'active',
  },
];

export default function MedicalFacultyManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  const departments = ['All', 'Internal Medicine', 'Surgery', 'Pediatrics', 'OBG', 'Anatomy', 'Physiology', 'Biochemistry', 'Orthopedics'];

  const filteredFaculty = medicalFaculty.filter((faculty) => {
    const matchesSearch =
      faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment = selectedTab === 0 || faculty.department === departments[selectedTab];

    return matchesSearch && matchesDepartment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'on-leave':
        return 'warning';
      case 'retired':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              Medical Faculty Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage medical college faculty, specializations & clinical roles
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
            Add Faculty
          </Button>
        </Box>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <School sx={{ fontSize: 40, color: '#1976D2' }} />
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Total Faculty
                  </Typography>
                  <Typography variant="h3" color="primary">
                    142
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <LocalHospital sx={{ fontSize: 40, color: '#2E7D32' }} />
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Clinical Faculty
                  </Typography>
                  <Typography variant="h3" color="success.main">
                    98
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Logbook Approvers
              </Typography>
              <Typography variant="h3" color="primary">
                56
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Examiners
              </Typography>
              <Typography variant="h3" color="primary">
                78
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search by name, employee ID, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Tabs
          value={selectedTab}
          onChange={(_, value) => setSelectedTab(value)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 3 }}
        >
          {departments.map((dept) => (
            <Tab key={dept} label={dept} />
          ))}
        </Tabs>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Faculty</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Qualification</TableCell>
                <TableCell>Specialization</TableCell>
                <TableCell>Experience</TableCell>
                <TableCell>Roles</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredFaculty.map((faculty) => (
                <TableRow key={faculty.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: '#D32F2F' }}>
                        {faculty.name.split(' ')[1]?.charAt(0) || faculty.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {faculty.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {faculty.employeeId}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{faculty.department}</TableCell>
                  <TableCell>{faculty.designation}</TableCell>
                  <TableCell>{faculty.qualification}</TableCell>
                  <TableCell>{faculty.specialization}</TableCell>
                  <TableCell>{faculty.experience} years</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {faculty.isLogbookApprover && (
                        <Chip label="Approver" size="small" color="primary" />
                      )}
                      {faculty.isExaminer && (
                        <Chip label="Examiner" size="small" color="success" />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={faculty.status.replace('-', ' ').toUpperCase()}
                      size="small"
                      color={getStatusColor(faculty.status) as any}
                    />
                  </TableCell>
                  <TableCell>
                    <Button size="small" startIcon={<Edit />}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add Faculty Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Faculty Member</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="First Name" required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Last Name" required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Employee ID" required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Department"
                defaultValue=""
              >
                <MenuItem value="Internal Medicine">Internal Medicine</MenuItem>
                <MenuItem value="General Surgery">General Surgery</MenuItem>
                <MenuItem value="Pediatrics">Pediatrics</MenuItem>
                <MenuItem value="Obstetrics & Gynecology">Obstetrics & Gynecology</MenuItem>
                <MenuItem value="Orthopedics">Orthopedics</MenuItem>
                <MenuItem value="Anatomy">Anatomy</MenuItem>
                <MenuItem value="Physiology">Physiology</MenuItem>
                <MenuItem value="Biochemistry">Biochemistry</MenuItem>
                <MenuItem value="Pharmacology">Pharmacology</MenuItem>
                <MenuItem value="Pathology">Pathology</MenuItem>
                <MenuItem value="Microbiology">Microbiology</MenuItem>
                <MenuItem value="Forensic Medicine">Forensic Medicine</MenuItem>
                <MenuItem value="Community Medicine">Community Medicine</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Designation"
                defaultValue=""
              >
                <MenuItem value="Professor">Professor</MenuItem>
                <MenuItem value="Associate Professor">Associate Professor</MenuItem>
                <MenuItem value="Assistant Professor">Assistant Professor</MenuItem>
                <MenuItem value="Senior Resident">Senior Resident</MenuItem>
                <MenuItem value="Junior Resident">Junior Resident</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Qualification" placeholder="e.g., MBBS, MD" required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Specialization" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Email" type="email" required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Phone" required />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Years of Experience" type="number" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                label="Can Approve Logbook"
                defaultValue="no"
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                label="Is Examiner"
                defaultValue="no"
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Add Faculty
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
