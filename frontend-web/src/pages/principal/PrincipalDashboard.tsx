import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Button,
  Alert,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  LinearProgress,
} from '@mui/material';
import {
  School,
  People,
  AttachMoney,
  TrendingUp,
  Assessment,
  EventNote,
  Warning,
  CheckCircle,
  Schedule,
  Person,
} from '@mui/icons-material';
import { useAuthStore } from '../../stores/authStore';

interface CollegeStats {
  totalStudents: number;
  capacity: number;
  totalRevenue: number;
  pendingRevenue: number;
  staffPresent: number;
  totalStaff: number;
  staffOnLeave: number;
  studentAttendance: number;
  staffAttendance: number;
}

interface Department {
  departmentId: number;
  departmentName: string;
  hodName: string;
  totalStudents: number;
  attendance: number;
  budgetUtilization: number;
}

interface PendingAction {
  id: number;
  type: 'LEAVE' | 'FEE_WAIVER' | 'GRADE_CHANGE' | 'MEETING';
  title: string;
  description: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  requestedBy: string;
  date: string;
}

export default function PrincipalDashboard() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<CollegeStats>({
    totalStudents: 3424,
    capacity: 4000,
    totalRevenue: 21000000,
    pendingRevenue: 4800000,
    staffPresent: 142,
    totalStaff: 150,
    staffOnLeave: 8,
    studentAttendance: 89,
    staffAttendance: 94,
  });

  const [departments, setDepartments] = useState<Department[]>([
    {
      departmentId: 1,
      departmentName: 'Computer Science',
      hodName: 'Dr. Priya M',
      totalStudents: 420,
      attendance: 91,
      budgetUtilization: 78,
    },
    {
      departmentId: 2,
      departmentName: 'Commerce',
      hodName: 'Prof. Suresh Kumar',
      totalStudents: 380,
      attendance: 88,
      budgetUtilization: 82,
    },
    {
      departmentId: 3,
      departmentName: 'English Literature',
      hodName: 'Dr. Lakshmi Devi',
      totalStudents: 210,
      attendance: 85,
      budgetUtilization: 65,
    },
    {
      departmentId: 4,
      departmentName: 'Mathematics',
      hodName: 'Prof. Vijay Shankar',
      totalStudents: 190,
      attendance: 92,
      budgetUtilization: 88,
    },
  ]);

  const [pendingActions, setPendingActions] = useState<PendingAction[]>([
    {
      id: 1,
      type: 'LEAVE',
      title: 'Leave Approval - Dr. Anitha',
      description: 'Medical leave for 3 days',
      priority: 'HIGH',
      requestedBy: 'Dr. Anitha M',
      date: '2025-12-03',
    },
    {
      id: 2,
      type: 'FEE_WAIVER',
      title: 'Fee Waiver Request',
      description: 'Student ID: 21CS042 - Financial hardship',
      priority: 'MEDIUM',
      requestedBy: 'Aarav Kumar',
      date: '2025-12-02',
    },
    {
      id: 3,
      type: 'GRADE_CHANGE',
      title: 'Grade Change Request',
      description: 'CS101 - Reevaluation request',
      priority: 'LOW',
      requestedBy: 'Priya Sharma',
      date: '2025-12-01',
    },
  ]);

  const formatCurrency = (amount: number) => {
    return `₹${(amount / 10000000).toFixed(2)}Cr`;
  };

  const getCapacityPercentage = () => {
    return Math.round((stats.totalStudents / stats.capacity) * 100);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'error';
      case 'MEDIUM':
        return 'warning';
      case 'LOW':
        return 'success';
      default:
        return 'default';
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'LEAVE':
        return <EventNote />;
      case 'FEE_WAIVER':
        return <AttachMoney />;
      case 'GRADE_CHANGE':
        return <Assessment />;
      case 'MEETING':
        return <Schedule />;
      default:
        return <Warning />;
    }
  };

  return (
    <Box>
      {/* Welcome Banner */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
          color: 'white',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome, {user?.firstName} {user?.lastName}
        </Typography>
        <Typography variant="body1">
          Principal - Tagore College of Arts & Science (Chromepet)
        </Typography>
        <Typography variant="caption">
          Last Login: {new Date().toLocaleString()}
        </Typography>
      </Paper>

      {/* College Performance Overview */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="textSecondary" variant="caption">
                    Students
                  </Typography>
                  <Typography variant="h5">
                    {stats.totalStudents.toLocaleString()} / {stats.capacity.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {getCapacityPercentage()}% Capacity
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <School />
                </Avatar>
              </Box>
              <LinearProgress
                variant="determinate"
                value={getCapacityPercentage()}
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="textSecondary" variant="caption">
                    Revenue
                  </Typography>
                  <Typography variant="h5">{formatCurrency(stats.totalRevenue)}</Typography>
                  <Typography variant="caption" color="error">
                    {formatCurrency(stats.pendingRevenue)} Pending
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <AttachMoney />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="textSecondary" variant="caption">
                    Staff
                  </Typography>
                  <Typography variant="h5">
                    {stats.staffPresent} / {stats.totalStaff}
                  </Typography>
                  <Typography variant="caption" color="warning.main">
                    {stats.staffOnLeave} On Leave
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                  <People />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="textSecondary" variant="caption">
                    Today's Attendance
                  </Typography>
                  <Typography variant="h5">{stats.studentAttendance}%</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Staff: {stats.staffAttendance}%
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'info.main' }}>
                  <TrendingUp />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Department-Wise Breakdown */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Department-Wise Performance
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Department</TableCell>
                    <TableCell>HOD Name</TableCell>
                    <TableCell align="center">Students</TableCell>
                    <TableCell align="center">Attendance</TableCell>
                    <TableCell align="center">Budget Usage</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {departments.map((dept) => (
                    <TableRow key={dept.departmentId} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight="bold">
                          {dept.departmentName}
                        </Typography>
                      </TableCell>
                      <TableCell>{dept.hodName}</TableCell>
                      <TableCell align="center">{dept.totalStudents}</TableCell>
                      <TableCell align="center">
                        <Chip
                          label={`${dept.attendance}%`}
                          color={dept.attendance >= 90 ? 'success' : 'warning'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={dept.budgetUtilization}
                            sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                          />
                          <Typography variant="caption">{dept.budgetUtilization}%</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton size="small" color="primary">
                          <Assessment />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Pending Actions Panel */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">
                Pending Actions ({pendingActions.length})
              </Typography>
              <Chip label="Urgent" color="error" size="small" />
            </Box>
            <List>
              {pendingActions.map((action, index) => (
                <React.Fragment key={action.id}>
                  <ListItem
                    sx={{
                      bgcolor: 'background.default',
                      borderRadius: 1,
                      mb: 1,
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: `${getPriorityColor(action.priority)}.light` }}>
                        {getActionIcon(action.type)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="body2" fontWeight="bold">
                          {action.title}
                        </Typography>
                      }
                      secondary={
                        <Box>
                          <Typography variant="caption" display="block">
                            {action.description}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            Requested by: {action.requestedBy}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < pendingActions.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
            <Button fullWidth variant="outlined" sx={{ mt: 2 }}>
              View All Actions
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
