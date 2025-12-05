import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
} from '@mui/material';
import { NavigateNext, Assessment, School } from '@mui/icons-material';

const children = [
  {
    id: 1,
    name: 'Rahul Sharma',
    rollNo: 'MB001',
    phase: 'Phase 2',
    competency: 78,
    attendance: 92,
    avatar: 'RS',
    rotation: 'Medicine Ward',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Riya Sharma',
    rollNo: 'MB156',
    phase: 'Phase 1',
    competency: 85,
    attendance: 95,
    avatar: 'RY',
    rotation: 'Anatomy Lab',
    status: 'Active',
  },
];

export default function MedicalChildrenManagement() {
  const handleViewDashboard = (childId: number) => {
    // Navigate to specific child dashboard
    console.log('View dashboard for child:', childId);
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #D32F2F 0%, #C62828 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          My Children - MBBS Students
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          View academic progress of your children
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {children.map((child) => (
          <Grid item xs={12} md={6} key={child.id}>
            <Card sx={{ border: '2px solid #FFEBEE' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                  <Avatar
                    sx={{
                      width: 64,
                      height: 64,
                      bgcolor: '#D32F2F',
                      fontSize: 24,
                      fontWeight: 600,
                      mr: 2,
                    }}
                  >
                    {child.avatar}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {child.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Roll No: {child.rollNo}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                      <Chip label={child.phase} size="small" color="error" variant="outlined" />
                      <Chip label={child.status} size="small" color="success" />
                    </Box>
                  </Box>
                </Box>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={6}>
                    <Box sx={{ p: 2, bgcolor: '#FFEBEE', borderRadius: 1, textAlign: 'center' }}>
                      <School sx={{ color: '#D32F2F', fontSize: 32, mb: 1 }} />
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#D32F2F' }}>
                        {child.competency}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Competency Achievement
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ p: 2, bgcolor: '#E8F5E9', borderRadius: 1, textAlign: 'center' }}>
                      <Assessment sx={{ color: '#388E3C', fontSize: 32, mb: 1 }} />
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#388E3C' }}>
                        {child.attendance}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Attendance
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={{ p: 2, bgcolor: '#F5F5F5', borderRadius: 1, mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Current Clinical Rotation
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {child.rotation}
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  endIcon={<NavigateNext />}
                  onClick={() => handleViewDashboard(child.id)}
                >
                  View Detailed Dashboard
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#D32F2F' }}>
          Parent Portal Information
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          • Track your child's CBME competency progress and clinical rotation performance
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • View attendance records for theory classes, clinical postings, and practical sessions
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Monitor assessment results including OSCE, OSPE, Viva, and Theory examinations
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Check fee payment status and upcoming clinical rotation schedules
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          • For any concerns, please contact the Faculty Mentor assigned to your child
        </Typography>
      </Paper>
    </Box>
  );
}
