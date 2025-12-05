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

const employees = [
  {
    id: 1,
    name: 'Dr. Rajeev Kumar',
    department: 'MLT',
    designation: 'Professor & HOD',
    email: 'rajeev.k@tagore.edu',
    phone: '+91 98765 43210',
    joinDate: 'Jan 15, 2010',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Dr. Priya Sharma',
    department: 'Radiology',
    designation: 'Associate Professor',
    email: 'priya.s@tagore.edu',
    phone: '+91 98765 43211',
    joinDate: 'Aug 20, 2013',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Dr. Anil Verma',
    department: 'Physiotherapy',
    designation: 'Professor',
    email: 'anil.v@tagore.edu',
    phone: '+91 98765 43212',
    joinDate: 'Mar 10, 2007',
    status: 'Active',
  },
];

export default function AlliedHealthEmployeeDirectory() {
  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Employee Directory
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Manage employee records and information
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Employees
              </Typography>
              <Typography variant="h4" sx={{ color: '#1565C0', fontWeight: 600 }}>
                47
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Teaching Staff
              </Typography>
              <Typography variant="h4" sx={{ color: '#1976D2', fontWeight: 600 }}>
                37
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Non-Teaching Staff
              </Typography>
              <Typography variant="h4" sx={{ color: '#1E88E5', fontWeight: 600 }}>
                10
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <TextField
            placeholder="Search employees..."
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
            <Button variant="contained" startIcon={<Add />} sx={{ bgcolor: '#1565C0' }}>
              Add Employee
            </Button>
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Employee</strong></TableCell>
                <TableCell><strong>Department</strong></TableCell>
                <TableCell><strong>Designation</strong></TableCell>
                <TableCell><strong>Contact</strong></TableCell>
                <TableCell><strong>Join Date</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((emp) => (
                <TableRow key={emp.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: '#1565C0' }}>
                        {emp.name.split(' ')[0][0]}{emp.name.split(' ')[1][0]}
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {emp.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{emp.department}</TableCell>
                  <TableCell>{emp.designation}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Email sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="caption">{emp.email}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Phone sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="caption">{emp.phone}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{emp.joinDate}</TableCell>
                  <TableCell>
                    <Chip label={emp.status} size="small" color="success" />
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
