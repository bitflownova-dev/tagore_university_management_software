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
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Fee Collection
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Manage student fee payments and records
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Collection
              </Typography>
              <Typography variant="h5" sx={{ color: '#2E7D32', fontWeight: 600 }}>
                ₹{totalCollection.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Pending Amount
              </Typography>
              <Typography variant="h5" sx={{ color: '#D32F2F', fontWeight: 600 }}>
                ₹{totalPending.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Students Paid
              </Typography>
              <Typography variant="h5" sx={{ color: '#1565C0', fontWeight: 600 }}>
                {feeRecords.filter(r => r.status === 'Paid').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Collection Rate
              </Typography>
              <Typography variant="h5" sx={{ color: '#1976D2', fontWeight: 600 }}>
                92%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
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
            <Button variant="outlined" startIcon={<FileDownload />}>
              Export
            </Button>
            <Button variant="contained" startIcon={<Add />} sx={{ bgcolor: '#1565C0' }}>
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
                <TableRow key={record.id} hover>
                  <TableCell>{record.rollNo}</TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {record.name}
                    </Typography>
                  </TableCell>
                  <TableCell>{record.program}</TableCell>
                  <TableCell>{record.semester}</TableCell>
                  <TableCell align="right">₹{record.amount.toLocaleString()}</TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ color: '#2E7D32', fontWeight: 600 }}>
                      ₹{record.paid.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ color: record.pending > 0 ? '#D32F2F' : 'inherit' }}>
                      ₹{record.pending.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={record.status}
                      size="small"
                      color={record.status === 'Paid' ? 'success' : record.status === 'Partial' ? 'warning' : 'error'}
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
