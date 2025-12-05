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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  alpha,
} from '@mui/material';
import { Search, FileDownload, Add } from '@mui/icons-material';

const feeRecords = [
  {
    id: 1,
    name: 'Amit Kumar',
    rollNo: 'AHS2024001',
    program: 'BSc MLT',
    semester: 'Semester 3',
    amount: 42000,
    paid: 42000,
    pending: 0,
    status: 'Paid',
    date: 'Aug 5, 2025',
  },
  {
    id: 2,
    name: 'Priya Singh',
    rollNo: 'AHS2024002',
    program: 'Diploma Radiology',
    semester: 'Semester 2',
    amount: 38000,
    paid: 38000,
    pending: 0,
    status: 'Paid',
    date: 'Aug 10, 2025',
  },
  {
    id: 3,
    name: 'Rahul Sharma',
    rollNo: 'AHS2023045',
    program: 'BPT',
    semester: 'Semester 5',
    amount: 45000,
    paid: 32000,
    pending: 13000,
    status: 'Partial',
    date: 'Aug 15, 2025',
  },
];

export default function AlliedHealthFeeCollection() {
  const totalCollection = feeRecords.reduce((sum, r) => sum + r.paid, 0);
  const totalPending = feeRecords.reduce((sum, r) => sum + r.pending, 0);

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
          Fee Collection
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.95)' }}>
          Manage student fee payments and records
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
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
                Total Collection
              </Typography>
              <Typography variant="h5" sx={{ color: '#26A69A', fontWeight: 800, letterSpacing: '-0.01em' }}>
                ₹{totalCollection.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
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
                Pending Amount
              </Typography>
              <Typography variant="h5" sx={{ color: '#EF5350', fontWeight: 800, letterSpacing: '-0.01em' }}>
                ₹{totalPending.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
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
                Students Paid
              </Typography>
              <Typography variant="h5" sx={{ color: '#00BFA5', fontWeight: 800, letterSpacing: '-0.01em' }}>
                {feeRecords.filter(r => r.status === 'Paid').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
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
                Collection Rate
              </Typography>
              <Typography variant="h5" sx={{ color: '#00897B', fontWeight: 800, letterSpacing: '-0.01em' }}>
                92%
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
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              placeholder="Search students..."
              size="small"
              sx={{ width: 250 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl size="small" sx={{ width: 150 }}>
              <InputLabel>Program</InputLabel>
              <Select value="all" label="Program">
                <MenuItem value="all">All Programs</MenuItem>
                <MenuItem value="bsc-mlt">BSc MLT</MenuItem>
                <MenuItem value="diploma">Diploma</MenuItem>
                <MenuItem value="bpt">BPT</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ width: 130 }}>
              <InputLabel>Status</InputLabel>
              <Select value="all" label="Status">
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="partial">Partial</MenuItem>
              </Select>
            </FormControl>
          </Box>
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
              Add Payment
            </Button>
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Roll No</strong></TableCell>
                <TableCell><strong>Student Name</strong></TableCell>
                <TableCell><strong>Program</strong></TableCell>
                <TableCell><strong>Semester</strong></TableCell>
                <TableCell align="right"><strong>Total Fee</strong></TableCell>
                <TableCell align="right"><strong>Paid</strong></TableCell>
                <TableCell align="right"><strong>Pending</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Last Payment</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feeRecords.map((record) => (
                <TableRow 
                  key={record.id} 
                  sx={{
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: alpha('#00BFA5', 0.04),
                    },
                  }}
                >
                  <TableCell>{record.rollNo}</TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#1A202C' }}>
                      {record.name}
                    </Typography>
                  </TableCell>
                  <TableCell>{record.program}</TableCell>
                  <TableCell>{record.semester}</TableCell>
                  <TableCell align="right">₹{record.amount.toLocaleString()}</TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ color: '#26A69A', fontWeight: 600 }}>
                      ₹{record.paid.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ color: record.pending > 0 ? '#EF5350' : 'inherit' }}>
                      ₹{record.pending.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={record.status}
                      size="small"
                      sx={{
                        bgcolor: record.status === 'Paid' 
                          ? alpha('#26A69A', 0.1) 
                          : record.status === 'Partial' 
                          ? alpha('#FFA726', 0.1) 
                          : alpha('#EF5350', 0.1),
                        color: record.status === 'Paid' ? '#26A69A' : record.status === 'Partial' ? '#FFA726' : '#EF5350',
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell>{record.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
