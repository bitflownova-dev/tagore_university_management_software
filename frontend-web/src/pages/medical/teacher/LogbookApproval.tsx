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
  IconButton,
  Tabs,
  Tab,
  InputAdornment,
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  Visibility,
  Search as SearchIcon,
} from '@mui/icons-material';

interface LogbookEntry {
  id: number;
  studentName: string;
  studentRollNo: string;
  date: string;
  competencyCode: string;
  procedure: string;
  department: string;
  patientId: string;
  observations: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

const entries: LogbookEntry[] = [
  {
    id: 1,
    studentName: 'Rahul Sharma',
    studentRollNo: 'MED-2024-1523',
    date: '2024-12-02',
    competencyCode: 'SU3.2',
    procedure: 'Simple Interrupted Suturing',
    department: 'Surgery',
    patientId: 'SUR-2024-892',
    observations: 'Performed simple interrupted suturing on laceration (4cm) on forearm. Maintained aseptic technique. 8 stitches applied with appropriate tension. Patient tolerated procedure well.',
    status: 'pending',
    submittedAt: '2024-12-02 14:30',
  },
  {
    id: 2,
    studentName: 'Priya Patel',
    studentRollNo: 'MED-2024-1524',
    date: '2024-12-01',
    competencyCode: 'SU2.1',
    procedure: 'Wound Examination & Dressing',
    department: 'Surgery',
    patientId: 'SUR-2024-901',
    observations: 'Examined post-operative wound. No signs of infection. Changed dressing using sterile technique. Patient educated about wound care.',
    status: 'pending',
    submittedAt: '2024-12-01 16:45',
  },
  {
    id: 3,
    studentName: 'Amit Kumar',
    studentRollNo: 'MED-2024-1525',
    date: '2024-11-30',
    competencyCode: 'SU4.3',
    procedure: 'Appendectomy Observation',
    department: 'Surgery',
    patientId: 'SUR-2024-876',
    observations: 'Observed emergency appendectomy. Identified anatomical structures. Assisted in retraction. Learned about McBurney\'s incision technique and closure methods.',
    status: 'approved',
    submittedAt: '2024-11-30 18:20',
  },
  {
    id: 4,
    studentName: 'Sneha Desai',
    studentRollNo: 'MED-2024-1526',
    date: '2024-11-29',
    competencyCode: 'SU3.1',
    procedure: 'Local Anesthesia Administration',
    department: 'Surgery',
    patientId: 'SUR-2024-888',
    observations: 'Administered local anesthesia (2% lignocaine with adrenaline) for minor procedure. Aspirated before injection. Waited for adequate anesthesia before proceeding.',
    status: 'approved',
    submittedAt: '2024-11-29 10:15',
  },
  {
    id: 5,
    studentName: 'Vikram Singh',
    studentRollNo: 'MED-2024-1527',
    date: '2024-11-28',
    competencyCode: 'SU5.2',
    procedure: 'Hernia Examination',
    department: 'Surgery',
    patientId: 'SUR-2024-865',
    observations: 'Examined patient with inguinal hernia. Performed cough impulse test. Identified type and reducibility. Discussed surgical options with supervisor.',
    status: 'rejected',
    submittedAt: '2024-11-28 11:30',
  },
];

export default function LogbookApproval() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewEntry, setViewEntry] = useState<LogbookEntry | null>(null);
  const [approvalDialog, setApprovalDialog] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<LogbookEntry | null>(null);
  const [feedback, setFeedback] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'approved':
        return <Chip label="Approved" color="success" size="small" icon={<CheckCircle />} />;
      case 'pending':
        return <Chip label="Pending" color="warning" size="small" />;
      case 'rejected':
        return <Chip label="Rejected" color="error" size="small" icon={<Cancel />} />;
      default:
        return null;
    }
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.studentRollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.competencyCode.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab =
      selectedTab === 0 ||
      (selectedTab === 1 && entry.status === 'pending') ||
      (selectedTab === 2 && entry.status === 'approved') ||
      (selectedTab === 3 && entry.status === 'rejected');

    return matchesSearch && matchesTab;
  });

  const handleApprove = (entry: LogbookEntry) => {
    setSelectedEntry(entry);
    setApprovalDialog(true);
  };

  const handleReject = (entry: LogbookEntry) => {
    setSelectedEntry(entry);
    setApprovalDialog(true);
  };

  const pendingCount = entries.filter((e) => e.status === 'pending').length;
  const approvedCount = entries.filter((e) => e.status === 'approved').length;
  const rejectedCount = entries.filter((e) => e.status === 'rejected').length;

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Logbook Approval
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Review and approve student clinical logbook entries
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Pending Review
              </Typography>
              <Typography variant="h3" color="warning.main">
                {pendingCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Approved
              </Typography>
              <Typography variant="h3" color="success.main">
                {approvedCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Rejected
              </Typography>
              <Typography variant="h3" color="error.main">
                {rejectedCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Entries
              </Typography>
              <Typography variant="h3" color="primary">
                {entries.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search by student name, roll number, or competency code..."
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

        <Tabs value={selectedTab} onChange={(_, value) => setSelectedTab(value)} sx={{ mb: 3 }}>
          <Tab label="All Entries" />
          <Tab label={`Pending (${pendingCount})`} />
          <Tab label={`Approved (${approvedCount})`} />
          <Tab label={`Rejected (${rejectedCount})`} />
        </Tabs>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Competency</TableCell>
                <TableCell>Procedure</TableCell>
                <TableCell>Patient ID</TableCell>
                <TableCell>Submitted</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEntries.map((entry) => (
                <TableRow key={entry.id} hover>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {entry.studentName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {entry.studentRollNo}
                    </Typography>
                  </TableCell>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>
                    <Chip label={entry.competencyCode} size="small" color="primary" />
                  </TableCell>
                  <TableCell>{entry.procedure}</TableCell>
                  <TableCell>{entry.patientId}</TableCell>
                  <TableCell>
                    <Typography variant="caption">{entry.submittedAt}</Typography>
                  </TableCell>
                  <TableCell>{getStatusChip(entry.status)}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => setViewEntry(entry)}>
                      <Visibility />
                    </IconButton>
                    {entry.status === 'pending' && (
                      <>
                        <IconButton
                          size="small"
                          color="success"
                          onClick={() => handleApprove(entry)}
                        >
                          <CheckCircle />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleReject(entry)}
                        >
                          <Cancel />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* View Entry Dialog */}
      <Dialog
        open={Boolean(viewEntry)}
        onClose={() => setViewEntry(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Logbook Entry Details</DialogTitle>
        <DialogContent>
          {viewEntry && (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Student
                  </Typography>
                  <Typography variant="body1">
                    {viewEntry.studentName} ({viewEntry.studentRollNo})
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Status
                  </Typography>
                  {getStatusChip(viewEntry.status)}
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Date
                  </Typography>
                  <Typography variant="body1">{viewEntry.date}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Competency Code
                  </Typography>
                  <Typography variant="body1">{viewEntry.competencyCode}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Procedure
                  </Typography>
                  <Typography variant="body1">{viewEntry.procedure}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Department
                  </Typography>
                  <Typography variant="body1">{viewEntry.department}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Patient ID
                  </Typography>
                  <Typography variant="body1">{viewEntry.patientId}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Observations
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="body2">{viewEntry.observations}</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewEntry(null)}>Close</Button>
          {viewEntry?.status === 'pending' && (
            <>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setSelectedEntry(viewEntry);
                  setViewEntry(null);
                  setApprovalDialog(true);
                }}
              >
                Reject
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  setSelectedEntry(viewEntry);
                  setViewEntry(null);
                  setApprovalDialog(true);
                }}
              >
                Approve
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {/* Approval/Rejection Dialog */}
      <Dialog open={approvalDialog} onClose={() => setApprovalDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedEntry?.status === 'pending' ? 'Review Logbook Entry' : 'Logbook Entry'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Action"
                defaultValue="approve"
              >
                <MenuItem value="approve">Approve</MenuItem>
                <MenuItem value="reject">Reject</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Feedback / Comments"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Provide constructive feedback to the student..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApprovalDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setApprovalDialog(false)}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
