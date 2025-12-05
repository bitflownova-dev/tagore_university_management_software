import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { People, AttachMoney, TrendingUp, Assignment } from '@mui/icons-material';

export default function UniversityHRDashboard() {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Total Employees',
      icon: <People sx={{ fontSize: 40 }} />,
      color: '#F57C00',
      value: '847',
      subtitle: 'Across All Colleges',
      path: '/director/hr/employees',
    },
    {
      title: 'Payroll',
      icon: <AttachMoney sx={{ fontSize: 40 }} />,
      color: '#E65100',
      value: '₹2.4Cr',
      subtitle: 'Monthly Total',
      path: '/director/hr/payroll',
    },
    {
      title: 'Attendance',
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      color: '#FF6F00',
      value: '94.2%',
      subtitle: 'This Month',
      path: '/director/hr/attendance',
    },
    {
      title: 'Leave Requests',
      icon: <Assignment sx={{ fontSize: 40 }} />,
      color: '#FB8C00',
      value: '28',
      subtitle: 'Pending Approval',
      path: '/director/hr/leaves',
    },
  ];

  const collegeEmployees = [
    { college: 'Engineering College', teaching: 145, nonTeaching: 42, total: 187 },
    { college: 'Medical College', teaching: 98, nonTeaching: 78, total: 176 },
    { college: 'Dental College', teaching: 67, nonTeaching: 28, total: 95 },
    { college: 'Arts & Science College', teaching: 112, nonTeaching: 35, total: 147 },
    { college: 'Nursing College', teaching: 52, nonTeaching: 18, total: 70 },
    { college: 'Allied Health Sciences', teaching: 47, nonTeaching: 15, total: 62 },
    { college: 'University Administration', teaching: 0, nonTeaching: 110, total: 110 },
  ];

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #F57C00 0%, #E65100 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          University HR Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Central Human Resources Management - All Colleges
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {quickActions.map((action) => (
          <Grid item xs={12} sm={6} md={3} key={action.title}>
            <Card>
              <CardActionArea onClick={() => navigate(action.path)}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ color: action.color, mb: 1 }}>
                    {action.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: action.color, mb: 0.5 }}>
                    {action.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {action.subtitle}
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {action.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          Employee Distribution by College
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>College/Department</strong></TableCell>
                <TableCell align="center"><strong>Teaching Staff</strong></TableCell>
                <TableCell align="center"><strong>Non-Teaching Staff</strong></TableCell>
                <TableCell align="center"><strong>Total Employees</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {collegeEmployees.map((college) => (
                <TableRow key={college.college} hover>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {college.college}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">{college.teaching}</TableCell>
                  <TableCell align="center">{college.nonTeaching}</TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#F57C00' }}>
                      {college.total}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label="Active" size="small" color="success" />
                  </TableCell>
                </TableRow>
              ))}
              <TableRow sx={{ bgcolor: '#FFF3E0' }}>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    Grand Total
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {collegeEmployees.reduce((sum, c) => sum + c.teaching, 0)}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {collegeEmployees.reduce((sum, c) => sum + c.nonTeaching, 0)}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#F57C00' }}>
                    {collegeEmployees.reduce((sum, c) => sum + c.total, 0)}
                  </Typography>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
