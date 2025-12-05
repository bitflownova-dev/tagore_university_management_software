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
  alpha,
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
          Employee Directory
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.95)' }}>
          Manage employee records and information
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card 
            elevation={0}
            sx={{
              bgcolor: '#FFFFFF',
              borderRadius: 3,
              border: '1px solid rgba(0, 0, 0, 0.06)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 24px rgba(0, 191, 165, 0.15)',
              },
            }}
          >
            <CardContent>
              <Typography sx={{ color: '#64748B', mb: 1 }} gutterBottom>
                Total Employees
              </Typography>
              <Typography variant="h4" sx={{ color: '#00BFA5', fontWeight: 800, letterSpacing: '-0.01em' }}>
                47
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card 
            elevation={0}
            sx={{
              bgcolor: '#FFFFFF',
              borderRadius: 3,
              border: '1px solid rgba(0, 0, 0, 0.06)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 24px rgba(0, 191, 165, 0.15)',
              },
            }}
          >
            <CardContent>
              <Typography sx={{ color: '#64748B', mb: 1 }} gutterBottom>
                Teaching Staff
              </Typography>
              <Typography variant="h4" sx={{ color: '#00897B', fontWeight: 800, letterSpacing: '-0.01em' }}>
                37
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card 
            elevation={0}
            sx={{
              bgcolor: '#FFFFFF',
              borderRadius: 3,
              border: '1px solid rgba(0, 0, 0, 0.06)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 24px rgba(0, 191, 165, 0.15)',
              },
            }}
          >
            <CardContent>
              <Typography sx={{ color: '#64748B', mb: 1 }} gutterBottom>
                Non-Teaching Staff
              </Typography>
              <Typography variant="h4" sx={{ color: '#26A69A', fontWeight: 800, letterSpacing: '-0.01em' }}>
                10
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper 
        elevation={0}
        sx={{ 
          p: 4,
          borderRadius: 3,
          border: '1px solid rgba(0, 0, 0, 0.06)',
          bgcolor: '#FFFFFF',
        }}
      >
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
            <Button 
              variant="outlined" 
              startIcon={<FileDownload />}
              sx={{
                borderColor: '#00BFA5',
                color: '#00BFA5',
                '&:hover': {
                  borderColor: '#00897B',
                  bgcolor: alpha('#00BFA5', 0.08),
                },
              }}
            >
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
                <TableRow 
                  key={emp.id} 
                  sx={{
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: alpha('#00BFA5', 0.04),
                    },
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: '#00BFA5' }}>
                        {emp.name.split(' ')[0][0]}{emp.name.split(' ')[1][0]}
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#1A202C' }}>
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
                    <Chip 
                      label={emp.status} 
                      size="small" 
                      sx={{
                        bgcolor: alpha('#26A69A', 0.1),
                        color: '#26A69A',
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="small" 
                      variant="outlined"
                      sx={{
                        borderColor: '#00BFA5',
                        color: '#00BFA5',
                        '&:hover': {
                          borderColor: '#00897B',
                          bgcolor: alpha('#00BFA5', 0.08),
                        },
                      }}
                    >
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
