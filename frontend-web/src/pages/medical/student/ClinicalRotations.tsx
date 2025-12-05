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
  LinearProgress,
  Tabs,
  Tab,
} from '@mui/material';
import {
  CalendarMonth,
  CheckCircle,
  Schedule,
  TrendingUp,
} from '@mui/icons-material';

interface Rotation {
  id: number;
  department: string;
  phase: string;
  startDate: string;
  endDate: string;
  totalWeeks: number;
  currentWeek: number;
  supervisor: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  attendance: number;
  competenciesAchieved: number;
  totalCompetencies: number;
  grade?: string;
}

const rotations: Rotation[] = [
  {
    id: 1,
    department: 'Surgery',
    phase: 'Phase 3 Part 1',
    startDate: '2024-11-15',
    endDate: '2024-12-27',
    totalWeeks: 6,
    currentWeek: 3,
    supervisor: 'Dr. Priya Sharma (MS, MCh)',
    status: 'ongoing',
    attendance: 95,
    competenciesAchieved: 18,
    totalCompetencies: 32,
  },
  {
    id: 2,
    department: 'Internal Medicine',
    phase: 'Phase 3 Part 1',
    startDate: '2024-10-01',
    endDate: '2024-11-10',
    totalWeeks: 6,
    currentWeek: 6,
    supervisor: 'Dr. Ramesh Kumar (MD, DM Cardiology)',
    status: 'completed',
    attendance: 98,
    competenciesAchieved: 28,
    totalCompetencies: 30,
    grade: 'A+',
  },
  {
    id: 3,
    department: 'Pediatrics',
    phase: 'Phase 3 Part 1',
    startDate: '2024-08-15',
    endDate: '2024-09-26',
    totalWeeks: 6,
    currentWeek: 6,
    supervisor: 'Dr. Anjali Verma (MD Pediatrics)',
    status: 'completed',
    attendance: 92,
    competenciesAchieved: 24,
    totalCompetencies: 28,
    grade: 'A',
  },
  {
    id: 4,
    department: 'Obstetrics & Gynecology',
    phase: 'Phase 3 Part 1',
    startDate: '2025-01-05',
    endDate: '2025-02-15',
    totalWeeks: 6,
    currentWeek: 0,
    supervisor: 'Dr. Meena Patel (MD OBG)',
    status: 'upcoming',
    attendance: 0,
    competenciesAchieved: 0,
    totalCompetencies: 35,
  },
  {
    id: 5,
    department: 'Orthopedics',
    phase: 'Phase 3 Part 1',
    startDate: '2025-02-20',
    endDate: '2025-04-02',
    totalWeeks: 6,
    currentWeek: 0,
    supervisor: 'Dr. Vikram Singh (MS Ortho)',
    status: 'upcoming',
    attendance: 0,
    competenciesAchieved: 0,
    totalCompetencies: 30,
  },
];

export default function ClinicalRotations() {
  const [selectedTab, setSelectedTab] = useState(0);

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'ongoing':
        return <Chip label="Ongoing" color="primary" size="small" icon={<Schedule />} />;
      case 'completed':
        return <Chip label="Completed" color="success" size="small" icon={<CheckCircle />} />;
      case 'upcoming':
        return <Chip label="Upcoming" color="warning" size="small" icon={<CalendarMonth />} />;
      default:
        return null;
    }
  };

  const filteredRotations = rotations.filter((rotation) => {
    if (selectedTab === 0) return true; // All
    if (selectedTab === 1) return rotation.status === 'ongoing';
    if (selectedTab === 2) return rotation.status === 'completed';
    if (selectedTab === 3) return rotation.status === 'upcoming';
    return false;
  });

  const ongoingRotation = rotations.find((r) => r.status === 'ongoing');
  const completedCount = rotations.filter((r) => r.status === 'completed').length;
  const upcomingCount = rotations.filter((r) => r.status === 'upcoming').length;

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Clinical Rotations
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Track your clinical rotations across different departments
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Current Rotation
              </Typography>
              {ongoingRotation ? (
                <>
                  <Typography variant="h5" color="primary" gutterBottom>
                    {ongoingRotation.department}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Week {ongoingRotation.currentWeek} of {ongoingRotation.totalWeeks}
                  </Typography>
                </>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No ongoing rotation
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Completed
              </Typography>
              <Typography variant="h3" color="success.main">
                {completedCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Rotations
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming
              </Typography>
              <Typography variant="h3" color="warning.main">
                {upcomingCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Rotations
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUp sx={{ fontSize: 40, color: '#2E7D32' }} />
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Avg Attendance
                  </Typography>
                  <Typography variant="h3" color="success.main">
                    95%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {ongoingRotation && (
        <Paper sx={{ p: 3, mb: 3, bgcolor: 'primary.50' }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Current Rotation Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                Department
              </Typography>
              <Typography variant="h6">{ongoingRotation.department}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                Supervisor
              </Typography>
              <Typography variant="body1">{ongoingRotation.supervisor}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" color="text.secondary">
                Duration
              </Typography>
              <Typography variant="body1">
                {ongoingRotation.startDate} to {ongoingRotation.endDate}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" color="text.secondary">
                Progress
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(ongoingRotation.currentWeek / ongoingRotation.totalWeeks) * 100}
                sx={{ height: 8, borderRadius: 1, mt: 1 }}
              />
              <Typography variant="caption">
                Week {ongoingRotation.currentWeek} of {ongoingRotation.totalWeeks}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" color="text.secondary">
                Competencies Achieved
              </Typography>
              <LinearProgress
                variant="determinate"
                value={
                  (ongoingRotation.competenciesAchieved / ongoingRotation.totalCompetencies) * 100
                }
                sx={{ height: 8, borderRadius: 1, mt: 1 }}
                color="success"
              />
              <Typography variant="caption">
                {ongoingRotation.competenciesAchieved} of {ongoingRotation.totalCompetencies}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}

      <Paper sx={{ p: 3 }}>
        <Tabs value={selectedTab} onChange={(_, value) => setSelectedTab(value)} sx={{ mb: 3 }}>
          <Tab label="All Rotations" />
          <Tab label="Ongoing" />
          <Tab label="Completed" />
          <Tab label="Upcoming" />
        </Tabs>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Department</TableCell>
                <TableCell>Phase</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Supervisor</TableCell>
                <TableCell>Attendance</TableCell>
                <TableCell>Competencies</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRotations.map((rotation) => (
                <TableRow key={rotation.id}>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {rotation.department}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={rotation.phase} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{rotation.startDate}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      to {rotation.endDate}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{rotation.supervisor}</Typography>
                  </TableCell>
                  <TableCell>
                    {rotation.status !== 'upcoming' && (
                      <>
                        <LinearProgress
                          variant="determinate"
                          value={rotation.attendance}
                          sx={{ height: 6, borderRadius: 1, mb: 0.5 }}
                        />
                        <Typography variant="caption">{rotation.attendance}%</Typography>
                      </>
                    )}
                  </TableCell>
                  <TableCell>
                    {rotation.status !== 'upcoming' ? (
                      <Typography variant="body2">
                        {rotation.competenciesAchieved}/{rotation.totalCompetencies}
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        {rotation.totalCompetencies} required
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {rotation.grade ? (
                      <Chip
                        label={rotation.grade}
                        size="small"
                        color={
                          rotation.grade.startsWith('A')
                            ? 'success'
                            : rotation.grade.startsWith('B')
                            ? 'primary'
                            : 'warning'
                        }
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        -
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>{getStatusChip(rotation.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
