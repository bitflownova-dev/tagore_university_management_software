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
import { AttachMoney, Receipt, TrendingUp, Assessment } from '@mui/icons-material';

export default function UniversityAccountantDashboard() {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Total Collection',
      icon: <AttachMoney sx={{ fontSize: 40 }} />,
      color: '#F57C00',
      value: '₹18.5Cr',
      subtitle: 'This Academic Year',
      path: '/director/accountant/collection',
    },
    {
      title: 'Pending Fees',
      icon: <Receipt sx={{ fontSize: 40 }} />,
      color: '#E65100',
      value: '₹2.8Cr',
      subtitle: 'Outstanding',
      path: '/director/accountant/pending',
    },
    {
      title: 'Collection Rate',
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      color: '#FF6F00',
      value: '87%',
      subtitle: 'Overall',
      path: '/director/accountant/analytics',
    },
    {
      title: 'Expenses',
      icon: <Assessment sx={{ fontSize: 40 }} />,
      color: '#FB8C00',
      value: '₹12.2Cr',
      subtitle: 'This Year',
      path: '/director/accountant/expenses',
    },
  ];

  const collegeFinancials = [
    { college: 'Engineering College', students: 1850, feeCollected: 5500000, pending: 850000, rate: 87 },
    { college: 'Medical College', students: 850, feeCollected: 6200000, pending: 420000, rate: 94 },
    { college: 'Dental College', students: 520, feeCollected: 3100000, pending: 280000, rate: 92 },
    { college: 'Arts & Science College', students: 2100, feeCollected: 2800000, pending: 520000, rate: 84 },
    { college: 'Nursing College', students: 450, feeCollected: 3800000, pending: 380000, rate: 91 },
    { college: 'Allied Health Sciences', students: 530, feeCollected: 2200000, pending: 350000, rate: 86 },
  ];

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #F57C00 0%, #E65100 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          University Accountant Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Central Financial Management - All Colleges
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
          Fee Collection by College
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>College</strong></TableCell>
                <TableCell align="center"><strong>Students</strong></TableCell>
                <TableCell align="right"><strong>Collected</strong></TableCell>
                <TableCell align="right"><strong>Pending</strong></TableCell>
                <TableCell align="center"><strong>Collection Rate</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {collegeFinancials.map((college) => (
                <TableRow key={college.college} hover>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {college.college}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">{college.students}</TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ color: '#2E7D32', fontWeight: 600 }}>
                      ₹{(college.feeCollected / 100000).toFixed(1)}L
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ color: '#D32F2F' }}>
                      ₹{(college.pending / 100000).toFixed(1)}L
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={`${college.rate}%`}
                      size="small"
                      color={college.rate >= 90 ? 'success' : college.rate >= 85 ? 'warning' : 'error'}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={college.rate >= 90 ? 'Excellent' : college.rate >= 85 ? 'Good' : 'Needs Attention'}
                      size="small"
                      color={college.rate >= 90 ? 'success' : college.rate >= 85 ? 'info' : 'warning'}
                    />
                  </TableCell>
                </TableRow>
              ))}
              <TableRow sx={{ bgcolor: '#FFF3E0' }}>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    Total
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {collegeFinancials.reduce((sum, c) => sum + c.students, 0)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#2E7D32' }}>
                    ₹{(collegeFinancials.reduce((sum, c) => sum + c.feeCollected, 0) / 10000000).toFixed(1)}Cr
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#D32F2F' }}>
                    ₹{(collegeFinancials.reduce((sum, c) => sum + c.pending, 0) / 10000000).toFixed(1)}Cr
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Chip label="87%" size="small" color="warning" sx={{ fontWeight: 700 }} />
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
