import { useState } from 'react';
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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Visibility,
  CheckCircle,
  Pending,
} from '@mui/icons-material';

interface LogbookEntry {
  id: number;
  date: string;
  competencyCode: string;
  procedure: string;
  department: string;
  supervisor: string;
  patientId: string;
  observations: string;
  status: 'pending' | 'approved' | 'rejected';
  feedback?: string;
}

const logbookEntries: LogbookEntry[] = [
  {
    id: 1,
    date: '2024-11-28',
    competencyCode: 'IM4.1',
    procedure: 'Physical Examination - CVS',
    department: 'Internal Medicine',
    supervisor: 'Dr. Ramesh Kumar',
    patientId: 'MED-2024-1523',
    observations: 'Patient presented with chest pain. Conducted complete CVS examination including inspection, palpation, percussion, and auscultation. Identified mitral regurgitation murmur.',
    status: 'approved',
    feedback: 'Good examination technique. Pay attention to patient positioning.',
  },
  {
    id: 2,
    date: '2024-11-29',
    competencyCode: 'SU3.2',
    procedure: 'Suturing - Simple interrupted',
    department: 'Surgery',
    supervisor: 'Dr. Priya Sharma',
    patientId: 'SUR-2024-892',
    observations: 'Performed simple interrupted suturing on laceration (4cm) on forearm. Maintained aseptic technique. 8 stitches applied with appropriate tension.',
    status: 'approved',
    feedback: 'Excellent suturing technique. Good knot tying.',
  },
  {
    id: 3,
    date: '2024-12-01',
    competencyCode: 'PE2.1',
    procedure: 'Newborn Examination',
    department: 'Pediatrics',
    supervisor: 'Dr. Anjali Verma',
    patientId: 'PED-2024-445',
    observations: 'Conducted complete newborn examination. Assessed APGAR score, anthropometry, reflexes, and cardiovascular system. All parameters within normal limits.',
    status: 'pending',
  },
  {
    id: 4,
    date: '2024-12-02',
    competencyCode: 'OG5.3',
    procedure: 'Antenatal Examination',
    department: 'Obstetrics & Gynecology',
    supervisor: 'Dr. Meena Patel',
    patientId: 'OBG-2024-678',
    observations: 'Performed antenatal examination on 32-week pregnant patient. Measured fundal height, assessed fetal position, and listened to fetal heart sounds.',
    status: 'pending',
  },
];

export default function ClinicalLogbook() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [viewEntry, setViewEntry] = useState<LogbookEntry | null>(null);

  const handleViewEntry = (entry: LogbookEntry) => {
    setViewEntry(entry);
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'approved':
        return <Chip label="Approved" color="success" size="small" icon={<CheckCircle />} />;
      case 'pending':
        return <Chip label="Pending" color="warning" size="small" icon={<Pending />} />;
      case 'rejected':
        return <Chip label="Rejected" color="error" size="small" />;
      default:
        return null;
    }
  };

  const filteredEntries = logbookEntries.filter((entry) => {
    if (selectedTab === 0) return true; // All
    if (selectedTab === 1) return entry.status === 'pending';
    if (selectedTab === 2) return entry.status === 'approved';
    return false;
  });

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              Clinical Logbook
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Record and track your clinical procedures and patient encounters
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Add Entry
          </Button>
        </Box>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Entries
              </Typography>
              <Typography variant="h3" color="primary">
                {logbookEntries.length}
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
                {logbookEntries.filter((e) => e.status === 'approved').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Pending
              </Typography>
              <Typography variant="h3" color="warning.main">
                {logbookEntries.filter((e) => e.status === 'pending').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                This Week
              </Typography>
              <Typography variant="h3" color="info.main">
                4
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Tabs value={selectedTab} onChange={(_, value) => setSelectedTab(value)} sx={{ mb: 3 }}>
          <Tab label="All Entries" />
          <Tab label="Pending Approval" />
          <Tab label="Approved" />
        </Tabs>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Competency</TableCell>
                <TableCell>Procedure</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Supervisor</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>
                    <Chip label={entry.competencyCode} size="small" color="primary" />
                  </TableCell>
                  <TableCell>{entry.procedure}</TableCell>
                  <TableCell>{entry.department}</TableCell>
                  <TableCell>{entry.supervisor}</TableCell>
                  <TableCell>{getStatusChip(entry.status)}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleViewEntry(entry)}>
                      <Visibility />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add Entry Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add Logbook Entry</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Date" type="date" InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Competency Code" placeholder="e.g., IM4.1" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Procedure/Activity" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Department"
                defaultValue=""
              >
                <MenuItem value="Internal Medicine">Internal Medicine</MenuItem>
                <MenuItem value="Surgery">Surgery</MenuItem>
                <MenuItem value="Pediatrics">Pediatrics</MenuItem>
                <MenuItem value="Obstetrics & Gynecology">Obstetrics & Gynecology</MenuItem>
                <MenuItem value="Orthopedics">Orthopedics</MenuItem>
                <MenuItem value="ENT">ENT</MenuItem>
                <MenuItem value="Ophthalmology">Ophthalmology</MenuItem>
                <MenuItem value="Psychiatry">Psychiatry</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Supervisor Name" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Patient ID" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Patient Age/Gender" placeholder="e.g., 45/M" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Observations & Learning Points"
                placeholder="Describe the procedure, patient condition, findings, and your learning..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Submit for Approval
          </Button>
        </DialogActions>
      </Dialog>

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
                    Date
                  </Typography>
                  <Typography variant="body1">{viewEntry.date}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Status
                  </Typography>
                  {getStatusChip(viewEntry.status)}
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Competency Code
                  </Typography>
                  <Typography variant="body1">{viewEntry.competencyCode}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Department
                  </Typography>
                  <Typography variant="body1">{viewEntry.department}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Procedure
                  </Typography>
                  <Typography variant="body1">{viewEntry.procedure}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Supervisor
                  </Typography>
                  <Typography variant="body1">{viewEntry.supervisor}</Typography>
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
                {viewEntry.feedback && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Supervisor Feedback
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2, bgcolor: 'success.50' }}>
                      <Typography variant="body2">{viewEntry.feedback}</Typography>
                    </Paper>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewEntry(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
