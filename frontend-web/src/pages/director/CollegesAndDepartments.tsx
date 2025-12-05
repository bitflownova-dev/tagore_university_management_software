import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Search,
  ExpandMore,
  LocalHospital,
  Engineering,
  Biotech,
  MenuBook,
  HealthAndSafety,
  Science,
  Business,
  People,
  Edit,
} from '@mui/icons-material';

interface Department {
  id: string;
  name: string;
  hod: string;
  faculty: number;
  students: number;
  courses: number;
  status: 'active' | 'inactive';
}

interface College {
  id: string;
  name: string;
  icon: JSX.Element;
  color: string;
  departments: Department[];
}

const collegesData: College[] = [
  {
    id: 'medical',
    name: 'Medical College & Hospital',
    icon: <LocalHospital />,
    color: '#D32F2F',
    departments: [
      { id: '1', name: 'Internal Medicine', hod: 'Dr. Ramesh Kumar', faculty: 18, students: 158, courses: 5, status: 'active' },
      { id: '2', name: 'General Surgery', hod: 'Dr. Priya Sharma', faculty: 16, students: 158, courses: 5, status: 'active' },
      { id: '3', name: 'Pediatrics', hod: 'Dr. Anjali Verma', faculty: 14, students: 165, courses: 4, status: 'active' },
      { id: '4', name: 'Obstetrics & Gynecology', hod: 'Dr. Meena Patel', faculty: 12, students: 165, courses: 4, status: 'active' },
      { id: '5', name: 'Orthopedics', hod: 'Dr. Vikram Singh', faculty: 10, students: 158, courses: 3, status: 'active' },
      { id: '6', name: 'Anatomy', hod: 'Dr. Suresh Iyer', faculty: 10, students: 180, courses: 2, status: 'active' },
      { id: '7', name: 'Physiology', hod: 'Dr. Kavita Desai', faculty: 9, students: 180, courses: 2, status: 'active' },
      { id: '8', name: 'Biochemistry', hod: 'Dr. Anil Gupta', faculty: 8, students: 180, courses: 2, status: 'active' },
      { id: '9', name: 'Pharmacology', hod: 'Dr. Rajesh Rao', faculty: 8, students: 165, courses: 2, status: 'active' },
      { id: '10', name: 'Pathology', hod: 'Dr. Sneha Joshi', faculty: 7, students: 165, courses: 2, status: 'active' },
      { id: '11', name: 'Microbiology', hod: 'Dr. Amit Shah', faculty: 7, students: 165, courses: 2, status: 'active' },
      { id: '12', name: 'Forensic Medicine', hod: 'Dr. Deepak Nair', faculty: 6, students: 165, courses: 2, status: 'active' },
      { id: '13', name: 'Community Medicine', hod: 'Dr. Pooja Reddy', faculty: 7, students: 180, courses: 2, status: 'active' },
      { id: '14', name: 'Anesthesiology', hod: 'Dr. Kiran Mehta', faculty: 6, students: 152, courses: 2, status: 'active' },
      { id: '15', name: 'Radiology', hod: 'Dr. Sanjay Kumar', faculty: 5, students: 152, courses: 2, status: 'active' },
      { id: '16', name: 'Psychiatry', hod: 'Dr. Neha Gupta', faculty: 5, students: 152, courses: 2, status: 'active' },
      { id: '17', name: 'Ophthalmology', hod: 'Dr. Ravi Sharma', faculty: 4, students: 152, courses: 2, status: 'active' },
      { id: '18', name: 'ENT', hod: 'Dr. Sunita Jain', faculty: 4, students: 152, courses: 2, status: 'active' },
    ],
  },
  {
    id: 'engineering',
    name: 'Engineering College',
    icon: <Engineering />,
    color: '#1976D2',
    departments: [
      { id: '1', name: 'Computer Science & Engineering', hod: 'Dr. Rajesh Kumar', faculty: 35, students: 480, courses: 12, status: 'active' },
      { id: '2', name: 'Electronics & Communication', hod: 'Dr. Priya Singh', faculty: 28, students: 420, courses: 10, status: 'active' },
      { id: '3', name: 'Mechanical Engineering', hod: 'Dr. Amit Patel', faculty: 32, students: 450, courses: 11, status: 'active' },
      { id: '4', name: 'Civil Engineering', hod: 'Dr. Meena Reddy', faculty: 25, students: 360, courses: 9, status: 'active' },
      { id: '5', name: 'Electrical Engineering', hod: 'Dr. Suresh Nair', faculty: 22, students: 330, courses: 8, status: 'active' },
      { id: '6', name: 'Information Technology', hod: 'Dr. Kavita Sharma', faculty: 20, students: 300, courses: 8, status: 'active' },
      { id: '7', name: 'Artificial Intelligence & ML', hod: 'Dr. Anil Kumar', faculty: 12, students: 180, courses: 6, status: 'active' },
      { id: '8', name: 'Cyber Security', hod: 'Dr. Neha Gupta', faculty: 6, students: 120, courses: 4, status: 'active' },
    ],
  },
  {
    id: 'dental',
    name: 'Dental College & Hospital',
    icon: <Biotech />,
    color: '#0288D1',
    departments: [
      { id: '1', name: 'Conservative Dentistry & Endodontics', hod: 'Dr. Sunil Kumar', faculty: 10, students: 80, courses: 4, status: 'active' },
      { id: '2', name: 'Oral & Maxillofacial Surgery', hod: 'Dr. Priya Mehta', faculty: 9, students: 75, courses: 4, status: 'active' },
      { id: '3', name: 'Orthodontics', hod: 'Dr. Rajesh Shah', faculty: 8, students: 70, courses: 3, status: 'active' },
      { id: '4', name: 'Prosthodontics', hod: 'Dr. Anjali Desai', faculty: 8, students: 70, courses: 3, status: 'active' },
      { id: '5', name: 'Periodontics', hod: 'Dr. Vikram Rao', faculty: 7, students: 65, courses: 3, status: 'active' },
      { id: '6', name: 'Oral Pathology', hod: 'Dr. Meena Joshi', faculty: 6, students: 60, courses: 2, status: 'active' },
      { id: '7', name: 'Oral Medicine & Radiology', hod: 'Dr. Amit Patel', faculty: 6, students: 60, courses: 2, status: 'active' },
      { id: '8', name: 'Pedodontics', hod: 'Dr. Kavita Singh', faculty: 6, students: 55, courses: 2, status: 'active' },
      { id: '9', name: 'Public Health Dentistry', hod: 'Dr. Suresh Nair', faculty: 5, students: 50, courses: 2, status: 'active' },
    ],
  },
  {
    id: 'arts-science',
    name: 'Arts & Science College',
    icon: <MenuBook />,
    color: '#388E3C',
    departments: [
      { id: '1', name: 'English Literature', hod: 'Dr. Ramesh Kumar', faculty: 12, students: 180, courses: 8, status: 'active' },
      { id: '2', name: 'Mathematics', hod: 'Dr. Priya Sharma', faculty: 10, students: 220, courses: 10, status: 'active' },
      { id: '3', name: 'Physics', hod: 'Dr. Suresh Patel', faculty: 9, students: 150, courses: 7, status: 'active' },
      { id: '4', name: 'Chemistry', hod: 'Dr. Anjali Reddy', faculty: 9, students: 160, courses: 7, status: 'active' },
      { id: '5', name: 'Computer Science', hod: 'Dr. Vikram Singh', faculty: 11, students: 240, courses: 9, status: 'active' },
      { id: '6', name: 'Commerce', hod: 'Dr. Meena Gupta', faculty: 10, students: 200, courses: 8, status: 'active' },
      { id: '7', name: 'Economics', hod: 'Dr. Anil Kumar', faculty: 8, students: 140, courses: 6, status: 'active' },
      { id: '8', name: 'History', hod: 'Dr. Kavita Joshi', faculty: 7, students: 120, courses: 5, status: 'active' },
      { id: '9', name: 'Political Science', hod: 'Dr. Rajesh Nair', faculty: 6, students: 110, courses: 5, status: 'active' },
      { id: '10', name: 'Psychology', hod: 'Dr. Neha Shah', faculty: 5, students: 100, courses: 4, status: 'active' },
      { id: '11', name: 'Biotechnology', hod: 'Dr. Sanjay Rao', faculty: 5, students: 90, courses: 4, status: 'active' },
      { id: '12', name: 'Environmental Science', hod: 'Dr. Pooja Mehta', faculty: 3, students: 90, courses: 3, status: 'active' },
    ],
  },
  {
    id: 'nursing',
    name: 'College of Nursing',
    icon: <HealthAndSafety />,
    color: '#7B1FA2',
    departments: [
      { id: '1', name: 'Medical-Surgical Nursing', hod: 'Dr. Sunita Kumar', faculty: 10, students: 80, courses: 6, status: 'active' },
      { id: '2', name: 'Community Health Nursing', hod: 'Dr. Priya Desai', faculty: 8, students: 70, courses: 5, status: 'active' },
      { id: '3', name: 'Pediatric Nursing', hod: 'Dr. Anjali Patel', faculty: 8, students: 65, courses: 4, status: 'active' },
      { id: '4', name: 'Obstetrics & Gynecological Nursing', hod: 'Dr. Meena Sharma', faculty: 8, students: 60, courses: 4, status: 'active' },
      { id: '5', name: 'Mental Health Nursing', hod: 'Dr. Kavita Reddy', faculty: 8, students: 45, courses: 3, status: 'active' },
    ],
  },
  {
    id: 'allied-health',
    name: 'Institute of Allied Health Sciences',
    icon: <Science />,
    color: '#F57C00',
    departments: [
      { id: '1', name: 'Medical Laboratory Technology', hod: 'Dr. Rajesh Kumar', faculty: 12, students: 120, courses: 6, status: 'active' },
      { id: '2', name: 'Radiology & Imaging Technology', hod: 'Dr. Priya Singh', faculty: 10, students: 90, courses: 5, status: 'active' },
      { id: '3', name: 'Physiotherapy', hod: 'Dr. Amit Patel', faculty: 10, students: 100, courses: 5, status: 'active' },
      { id: '4', name: 'Occupational Therapy', hod: 'Dr. Meena Gupta', faculty: 8, students: 60, courses: 4, status: 'active' },
      { id: '5', name: 'Respiratory Therapy', hod: 'Dr. Suresh Nair', faculty: 6, students: 45, courses: 3, status: 'active' },
      { id: '6', name: 'Optometry', hod: 'Dr. Kavita Sharma', faculty: 6, students: 40, courses: 3, status: 'active' },
      { id: '7', name: 'Audiology & Speech Therapy', hod: 'Dr. Anil Reddy', faculty: 6, students: 25, courses: 2, status: 'active' },
    ],
  },
];

export default function CollegesAndDepartments() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedCollege = collegesData[selectedTab];

  const filteredDepartments = selectedCollege.departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.hod.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalStats = {
    departments: filteredDepartments.length,
    faculty: filteredDepartments.reduce((sum, d) => sum + d.faculty, 0),
    students: filteredDepartments.reduce((sum, d) => sum + d.students, 0),
    courses: filteredDepartments.reduce((sum, d) => sum + d.courses, 0),
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              Colleges & Departments
            </Typography>
            <Typography variant="body2" color="text.secondary">
              University-wide department management across all colleges
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<Business />}>
            Add Department
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={selectedTab}
          onChange={(_, value) => setSelectedTab(value)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          {collegesData.map((college) => (
            <Tab
              key={college.id}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar sx={{ bgcolor: college.color, width: 24, height: 24 }}>
                    {React.cloneElement(college.icon, { sx: { fontSize: 14 } })}
                  </Avatar>
                  {college.name}
                </Box>
              }
            />
          ))}
        </Tabs>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: `${selectedCollege.color}10` }}>
            <CardContent>
              <Business sx={{ fontSize: 40, color: selectedCollege.color, mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, color: selectedCollege.color }}>
                {totalStats.departments}
              </Typography>
              <Typography variant="subtitle1" fontWeight={600}>
                Total Departments
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: `${selectedCollege.color}10` }}>
            <CardContent>
              <People sx={{ fontSize: 40, color: selectedCollege.color, mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, color: selectedCollege.color }}>
                {totalStats.faculty}
              </Typography>
              <Typography variant="subtitle1" fontWeight={600}>
                Total Faculty
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: `${selectedCollege.color}10` }}>
            <CardContent>
              <MenuBook sx={{ fontSize: 40, color: selectedCollege.color, mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, color: selectedCollege.color }}>
                {totalStats.students}
              </Typography>
              <Typography variant="subtitle1" fontWeight={600}>
                Total Students
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: `${selectedCollege.color}10` }}>
            <CardContent>
              <MenuBook sx={{ fontSize: 40, color: selectedCollege.color, mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, color: selectedCollege.color }}>
                {totalStats.courses}
              </Typography>
              <Typography variant="subtitle1" fontWeight={600}>
                Total Courses
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search departments by name or HOD..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box>
          {filteredDepartments.map((dept) => (
            <Accordion key={dept.id}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', pr: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: selectedCollege.color }}>
                      {dept.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {dept.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        HOD: {dept.hod}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip label={`${dept.faculty} Faculty`} size="small" color="primary" />
                    <Chip label={`${dept.students} Students`} size="small" color="success" />
                    <Chip label={`${dept.courses} Courses`} size="small" />
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Department Statistics
                    </Typography>
                    <Table size="small">
                      <TableBody>
                        <TableRow>
                          <TableCell>Faculty Members</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>
                            {dept.faculty}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Enrolled Students</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>
                            {dept.students}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Active Courses</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>
                            {dept.courses}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Faculty:Student Ratio</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>
                            1:{(dept.students / dept.faculty).toFixed(1)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Department Information
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Head of Department
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                          {dept.hod}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Status
                        </Typography>
                        <Box>
                          <Chip
                            label={dept.status.toUpperCase()}
                            size="small"
                            color={dept.status === 'active' ? 'success' : 'default'}
                          />
                        </Box>
                      </Box>
                      <Box sx={{ mt: 2 }}>
                        <Button variant="outlined" size="small" startIcon={<Edit />} sx={{ mr: 1 }}>
                          Edit Department
                        </Button>
                        <Button variant="outlined" size="small" startIcon={<People />}>
                          View Faculty
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}
