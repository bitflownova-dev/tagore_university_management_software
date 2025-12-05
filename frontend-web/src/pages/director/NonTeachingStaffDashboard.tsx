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

const nonTeachingStaff = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    department: 'University Administration',
    designation: 'Administrative Officer',
    email: 'rajesh.k@tagore.edu',
    phone: '+91 98765 00001',
    joinDate: 'Jan 15, 2015',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Sunita Sharma',
    department: 'Engineering College',
    designation: 'Lab Technician',
    email: 'sunita.s@tagore.edu',
    phone: '+91 98765 00002',
    joinDate: 'Mar 20, 2018',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Amit Verma',
    department: 'Medical College',
    designation: 'Medical Equipment Technician',
    email: 'amit.v@tagore.edu',
    phone: '+91 98765 00003',
    joinDate: 'Jul 10, 2019',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Priya Patel',
    department: 'Library Services',
    designation: 'Senior Librarian',
    email: 'priya.p@tagore.edu',
    phone: '+91 98765 00004',
    joinDate: 'Sep 5, 2016',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Vikas Reddy',
    department: 'IT Services',
    designation: 'System Administrator',
    email: 'vikas.r@tagore.edu',
    phone: '+91 98765 00005',
    joinDate: 'Nov 12, 2017',
    status: 'Active',
  },
  {
    id: 6,
    name: 'Kavita Singh',
    department: 'Hostel Management',
    designation: 'Warden',
    email: 'kavita.s@tagore.edu',
    phone: '+91 98765 00006',
    joinDate: 'Apr 8, 2020',
    status: 'Active',
  },
];

export default function NonTeachingStaffDashboard() {
  const staffByCategory = [
    { category: 'Administrative Staff', count: 110 },
    { category: 'Lab Technicians', count: 85 },
    { category: 'Library Staff', count: 42 },
    { category: 'IT Support', count: 38 },
    { category: 'Medical/Hospital Staff', count: 78 },
    { category: 'Maintenance', count: 55 },
    { category: 'Security', count: 45 },
    { category: 'Housekeeping', count: 62 },
    { category: 'Transport', count: 28 },
    { category: 'Hostel Staff', count: 35 },
  ];

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #F57C00 0%, #E65100 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Non-Teaching Staff Management
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Administrative and Support Staff - University Wide
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Non-Teaching Staff
              </Typography>
              <Typography variant="h4" sx={{ color: '#F57C00', fontWeight: 600 }}>
                {staffByCategory.reduce((sum, s) => sum + s.count, 0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Categories
              </Typography>
              <Typography variant="h4" sx={{ color: '#E65100', fontWeight: 600 }}>
                {staffByCategory.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Average Attendance
              </Typography>
              <Typography variant="h4" sx={{ color: '#FF6F00', fontWeight: 600 }}>
                96.5%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Active Staff
              </Typography>
              <Typography variant="h4" sx={{ color: '#2E7D32', fontWeight: 600 }}>
                {staffByCategory.reduce((sum, s) => sum + s.count, 0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
              Staff by Category
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Category</strong></TableCell>
                    <TableCell align="right"><strong>Count</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {staffByCategory.map((cat) => (
                    <TableRow key={cat.category} hover>
                      <TableCell>{cat.category}</TableCell>
                      <TableCell align="right">
                        <Chip label={cat.count} size="small" color="primary" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Recent Additions
              </Typography>
              <Button variant="contained" startIcon={<Add />} size="small" sx={{ bgcolor: '#F57C00' }}>
                Add Staff
              </Button>
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Name</strong></TableCell>
                    <TableCell><strong>Department</strong></TableCell>
                    <TableCell><strong>Join Date</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {nonTeachingStaff.slice(0, 5).map((staff) => (
                    <TableRow key={staff.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ width: 32, height: 32, bgcolor: '#F57C00', fontSize: 14 }}>
                            {staff.name.split(' ')[0][0]}
                          </Avatar>
                          <Typography variant="body2">{staff.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption">{staff.department}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption">{staff.joinDate}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <TextField
            placeholder="Search staff..."
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
            <Button variant="contained" startIcon={<Add />} sx={{ bgcolor: '#F57C00' }}>
              Add Staff Member
            </Button>
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Staff Member</strong></TableCell>
                <TableCell><strong>Department</strong></TableCell>
                <TableCell><strong>Designation</strong></TableCell>
                <TableCell><strong>Contact</strong></TableCell>
                <TableCell><strong>Join Date</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {nonTeachingStaff.map((staff) => (
                <TableRow key={staff.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: '#F57C00' }}>
                        {staff.name.split(' ')[0][0]}{staff.name.split(' ')[1][0]}
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {staff.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{staff.department}</TableCell>
                  <TableCell>{staff.designation}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Email sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="caption">{staff.email}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Phone sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="caption">{staff.phone}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{staff.joinDate}</TableCell>
                  <TableCell>
                    <Chip label={staff.status} size="small" color="success" />
                  </TableCell>
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
