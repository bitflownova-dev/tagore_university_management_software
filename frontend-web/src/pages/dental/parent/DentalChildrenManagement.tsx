import { Box, Paper, Typography, Grid, Card, CardContent, Button, Chip, LinearProgress } from '@mui/material';
import { Person, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const children = [
  {
    id: 1,
    name: 'Rahul Kumar',
    rollNo: 'DEN001',
    year: '3rd Year BDS',
    percentage: 78.5,
    attendance: 92,
    procedures: 45,
    totalProcedures: 60,
  },
  {
    id: 2,
    name: 'Priya Kumar',
    rollNo: 'DEN025',
    year: '1st Year BDS',
    percentage: 82.3,
    attendance: 95,
    procedures: 0,
    totalProcedures: 0,
  },
];

export default function DentalChildrenManagement() {
  const navigate = useNavigate();

  const handleViewDashboard = (childId: number) => {
    navigate('/dental/parent');
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #00796B 0%, #004D40 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          My Children
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Manage multiple children's academic progress
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {children.map((child) => (
          <Grid item xs={12} md={6} key={child.id}>
            <Card sx={{ border: '2px solid #00796B' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Person sx={{ mr: 2, color: '#00796B', fontSize: 40 }} />
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      {child.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                      Roll No: {child.rollNo}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Current Year
                  </Typography>
                  <Chip label={child.year} color="primary" size="small" />
                </Box>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={4}>
                    <Paper sx={{ p: 2, bgcolor: '#E3F2FD' }}>
                      <Typography variant="body2" color="text.secondary">
                        Percentage
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#1976D2' }}>
                        {child.percentage}%
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={child.percentage}
                        sx={{ mt: 1, height: 6, borderRadius: 1 }}
                        color={child.percentage >= 75 ? 'success' : 'primary'}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper sx={{ p: 2, bgcolor: '#E8F5E9' }}>
                      <Typography variant="body2" color="text.secondary">
                        Attendance
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#388E3C' }}>
                        {child.attendance}%
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={child.attendance}
                        sx={{ mt: 1, height: 6, borderRadius: 1 }}
                        color={child.attendance >= 75 ? 'success' : 'error'}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper sx={{ p: 2, bgcolor: '#F3E5F5' }}>
                      <Typography variant="body2" color="text.secondary">
                        Procedures
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#7B1FA2' }}>
                        {child.procedures}
                        {child.totalProcedures > 0 ? `/${child.totalProcedures}` : ''}
                      </Typography>
                      {child.totalProcedures > 0 && (
                        <LinearProgress
                          variant="determinate"
                          value={(child.procedures / child.totalProcedures) * 100}
                          sx={{ mt: 1, height: 6, borderRadius: 1 }}
                          color="success"
                        />
                      )}
                    </Paper>
                  </Grid>
                </Grid>

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<Visibility />}
                  sx={{ bgcolor: '#00796B', '&:hover': { bgcolor: '#004D40' } }}
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
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#00796B' }}>
          Parent Portal Information
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          • View detailed academic progress for each child
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Monitor attendance, percentage, and clinical procedure completion
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Access exam results and upcoming assessment schedules
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Track fee payment status and download receipts
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Contact faculty mentors through the portal
        </Typography>
      </Paper>
    </Box>
  );
}
