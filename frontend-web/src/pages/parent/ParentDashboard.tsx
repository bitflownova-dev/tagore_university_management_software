import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Button,
  Divider,
  LinearProgress,
} from '@mui/material';
import {
  Person,
  CheckCircle,
  Warning,
  Assessment,
  AttachMoney,
  Notifications,
  TrendingUp,
  CalendarToday,
} from '@mui/icons-material';
import { useAuthStore } from '../../stores/authStore';

interface Child {
  studentId: string;
  name: string;
  class: string;
  rollNumber: string;
}

interface Notification {
  id: number;
  type: 'ABSENCE' | 'MARKS' | 'FEE' | 'ANNOUNCEMENT';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

interface AttendanceRecord {
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE';
  subject: string;
}

export default function ParentDashboard() {
  const { user } = useAuthStore();
  const [selectedChild, setSelectedChild] = useState<string>('21CS042');

  const [children] = useState<Child[]>([
    { studentId: '21CS042', name: 'Aarav Kumar', class: 'BCA Year 2 - Section A', rollNumber: '042' },
    { studentId: '21CS043', name: 'Ananya Kumar', class: 'B.Com Year 1 - Section B', rollNumber: '043' },
  ]);

  const [notifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'ABSENCE',
      title: 'Absence Alert',
      message: 'Aarav Kumar was marked absent in Data Structures on Dec 3, 2025',
      date: '2025-12-03T09:30:00',
      read: false,
    },
    {
      id: 2,
      type: 'MARKS',
      title: 'Marks Published',
      message: 'Mid-term exam results have been published. CGPA: 8.6',
      date: '2025-12-02T14:00:00',
      read: false,
    },
    {
      id: 3,
      type: 'FEE',
      title: 'Fee Reminder',
      message: 'Semester 2 fee payment due on Jan 15, 2026. Amount: ₹45,000',
      date: '2025-12-01T10:00:00',
      read: true,
    },
  ]);

  const [recentAttendance] = useState<AttendanceRecord[]>([
    { date: '2025-12-04', status: 'PRESENT', subject: 'Data Structures' },
    { date: '2025-12-03', status: 'ABSENT', subject: 'Data Structures' },
    { date: '2025-12-02', status: 'PRESENT', subject: 'Database Management' },
    { date: '2025-12-01', status: 'PRESENT', subject: 'Web Technologies' },
    { date: '2025-11-30', status: 'LATE', subject: 'Operating Systems' },
  ]);

  const childData = children.find((c) => c.studentId === selectedChild);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'ABSENCE':
        return <Warning color="error" />;
      case 'MARKS':
        return <Assessment color="primary" />;
      case 'FEE':
        return <AttachMoney color="warning" />;
      case 'ANNOUNCEMENT':
        return <Notifications color="info" />;
      default:
        return <Notifications />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PRESENT':
        return 'success';
      case 'ABSENT':
        return 'error';
      case 'LATE':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      {/* Header */}
      <Paper sx={{ p: 3, mb: 3, bgcolor: 'secondary.main', color: 'white' }}>
        <Typography variant="h4" gutterBottom>
          Parent Portal
        </Typography>
        <Typography variant="body1">Welcome, {user?.firstName} {user?.lastName}</Typography>
        <Typography variant="caption">Monitor your child's academic progress</Typography>
      </Paper>

      {/* Child Selector */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Select Child</InputLabel>
          <Select
            value={selectedChild}
            label="Select Child"
            onChange={(e) => setSelectedChild(e.target.value)}
          >
            {children.map((child) => (
              <MenuItem key={child.studentId} value={child.studentId}>
                {child.name} - {child.class} (Roll No: {child.rollNumber})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="textSecondary" variant="caption">
                    Overall Attendance
                  </Typography>
                  <Typography variant="h4">87%</Typography>
                  <Typography variant="caption" color="success.main">
                    Good Standing
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <CheckCircle />
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
                    Current CGPA
                  </Typography>
                  <Typography variant="h4">8.60</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Out of 10.0
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <Assessment />
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
                    Fee Pending
                  </Typography>
                  <Typography variant="h5">₹45,000</Typography>
                  <Typography variant="caption" color="warning.main">
                    Due: Jan 15, 2026
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.main' }}>
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
                    Notifications
                  </Typography>
                  <Typography variant="h4">{unreadCount}</Typography>
                  <Typography variant="caption" color="error.main">
                    Unread Alerts
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'error.main' }}>
                  <Notifications />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Notifications Panel */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Recent Notifications</Typography>
              <Chip label={`${unreadCount} New`} color="error" size="small" />
            </Box>
            <List>
              {notifications.map((notification, index) => (
                <React.Fragment key={notification.id}>
                  <ListItem
                    sx={{
                      bgcolor: notification.read ? 'transparent' : 'action.hover',
                      borderRadius: 1,
                      mb: 1,
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar>{getNotificationIcon(notification.type)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="body2" fontWeight={notification.read ? 'normal' : 'bold'}>
                          {notification.title}
                        </Typography>
                      }
                      secondary={
                        <Box>
                          <Typography variant="caption" display="block">
                            {notification.message}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {new Date(notification.date).toLocaleString()}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < notifications.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
            <Button fullWidth variant="outlined" sx={{ mt: 2 }}>
              View All Notifications
            </Button>
          </Paper>
        </Grid>

        {/* Recent Attendance */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Attendance
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentAttendance.map((record, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <Typography variant="caption">
                          {new Date(record.date).toLocaleDateString()}
                        </Typography>
                      </TableCell>
                      <TableCell>{record.subject}</TableCell>
                      <TableCell align="center">
                        <Chip label={record.status} size="small" color={getStatusColor(record.status)} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button fullWidth variant="outlined" sx={{ mt: 2 }} startIcon={<CalendarToday />}>
              View Full Calendar
            </Button>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Alert severity="info" icon={<Notifications />}>
            You will receive instant push notifications when {childData?.name} is marked absent or when marks are published.
          </Alert>
        </Grid>
      </Grid>
    </Box>
  );
}
