import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  LinearProgress,
} from '@mui/material';
import { School, Person } from '@mui/icons-material';

const children = [
  { name: 'Priya Sharma', rollNo: 'NS001', year: 'Third Year', program: 'B.Sc Nursing', percentage: 85, attendance: 92 },
  { name: 'Anjali Sharma', rollNo: 'GNM001', year: 'Second Year', program: 'GNM', percentage: 75, attendance: 87 },
];

export default function NursingChildrenManagement() {
  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Nursing Children Management
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Manage multiple children in nursing programs
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {children.map((child, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ border: '2px solid #2E7D32' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      bgcolor: '#2E7D32',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                    }}
                  >
                    <Person sx={{ color: 'white', fontSize: 32 }} />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {child.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Roll No: {child.rollNo}
                    </Typography>
                  </Box>
                </Box>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Current Year
                    </Typography>
                    <Chip label={child.year} size="small" color="primary" sx={{ mt: 0.5 }} />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Program
                    </Typography>
                    <Chip label={child.program} size="small" sx={{ mt: 0.5, bgcolor: '#2E7D32', color: 'white' }} />
                  </Grid>
                </Grid>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Academic Performance
                  </Typography>
                  <Card sx={{ bgcolor: '#E8F5E9', p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Percentage</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#2E7D32' }}>
                        {child.percentage}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={child.percentage}
                      sx={{
                        height: 8,
                        borderRadius: 1,
                        bgcolor: '#C8E6C9',
                        '& .MuiLinearProgress-bar': { bgcolor: '#2E7D32' },
                      }}
                    />
                  </Card>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Attendance
                  </Typography>
                  <Card sx={{ bgcolor: child.attendance >= 75 ? '#E8F5E9' : '#FFEBEE', p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Overall Attendance</Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: child.attendance >= 75 ? '#2E7D32' : '#C62828' }}
                      >
                        {child.attendance}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={child.attendance}
                      sx={{
                        height: 8,
                        borderRadius: 1,
                        bgcolor: child.attendance >= 75 ? '#C8E6C9' : '#FFCDD2',
                        '& .MuiLinearProgress-bar': { bgcolor: child.attendance >= 75 ? '#2E7D32' : '#C62828' },
                      }}
                    />
                  </Card>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<School />}
                  sx={{ bgcolor: '#2E7D32', '&:hover': { bgcolor: '#1B5E20' } }}
                >
                  View Detailed Dashboard
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#2E7D32' }}>
          Parent Portal Information
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          • View individual academic performance for each child
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Track clinical training hours and practical session attendance
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Monitor assessment results and percentage progress
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Check fee status and payment history
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Access INC compliance reports for each child
        </Typography>
      </Paper>
    </Box>
  );
}
