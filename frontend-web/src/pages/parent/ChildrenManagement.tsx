import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  MenuItem,
  TextField,
  Avatar,
  Chip,
} from '@mui/material';
import { School as SchoolIcon, Person as PersonIcon } from '@mui/icons-material';

export default function ChildrenManagement() {
  const [selectedChild, setSelectedChild] = useState('child1');

  const children = [
    {
      id: 'child1',
      name: 'Amit Kumar',
      rollNo: 'CS2021001',
      class: 'B.Tech CS - Semester 6',
      attendance: 88,
      cgpa: 8.5,
      pendingFees: 50000,
    },
    {
      id: 'child2',
      name: 'Priya Kumar',
      rollNo: 'MT2022001',
      class: 'B.Sc Math - Semester 4',
      attendance: 92,
      cgpa: 9.1,
      pendingFees: 0,
    },
  ];

  const currentChild = children.find((child) => child.id === selectedChild)!;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          My Children
        </Typography>
        <TextField
          select
          value={selectedChild}
          onChange={(e) => setSelectedChild(e.target.value)}
          sx={{ minWidth: 250 }}
        >
          {children.map((child) => (
            <MenuItem key={child.id} value={child.id}>
              {child.name} - {child.rollNo}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}>
            <PersonIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {currentChild.name}
            </Typography>
            <Typography color="text.secondary">Roll No: {currentChild.rollNo}</Typography>
            <Typography color="text.secondary">{currentChild.class}</Typography>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <SchoolIcon color="primary" />
                <Typography variant="h6">Attendance</Typography>
              </Box>
              <Typography variant="h3" fontWeight="bold" color="primary">
                {currentChild.attendance}%
              </Typography>
              <Chip
                label={currentChild.attendance >= 75 ? 'Good Standing' : 'Below Required'}
                color={currentChild.attendance >= 75 ? 'success' : 'error'}
                size="small"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <SchoolIcon color="secondary" />
                <Typography variant="h6">CGPA</Typography>
              </Box>
              <Typography variant="h3" fontWeight="bold" color="secondary">
                {currentChild.cgpa}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Out of 10.0
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <SchoolIcon color="error" />
                <Typography variant="h6">Pending Fees</Typography>
              </Box>
              <Typography variant="h3" fontWeight="bold" color="error">
                ₹{currentChild.pendingFees.toLocaleString()}
              </Typography>
              <Chip
                label={currentChild.pendingFees === 0 ? 'All Paid' : 'Payment Due'}
                color={currentChild.pendingFees === 0 ? 'success' : 'warning'}
                size="small"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Card sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}>
              <CardContent>
                <Typography variant="body1" fontWeight="bold">
                  View Attendance
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Check detailed attendance records
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}>
              <CardContent>
                <Typography variant="body1" fontWeight="bold">
                  View Marks
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Check exam results and grades
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}>
              <CardContent>
                <Typography variant="body1" fontWeight="bold">
                  Pay Fees
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Make online fee payments
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}>
              <CardContent>
                <Typography variant="body1" fontWeight="bold">
                  Contact Teacher
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Send message to class teacher
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
