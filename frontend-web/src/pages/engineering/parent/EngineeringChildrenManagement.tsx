import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  LinearProgress,
  Chip,
} from '@mui/material';
import { Person, School, TrendingUp, Visibility } from '@mui/icons-material';

const children = [
  {
    id: 1,
    name: 'Rahul Sharma',
    rollNo: 'ENG001',
    semester: 'Sem 5',
    department: 'Computer Science',
    cgpa: 8.5,
    attendance: 90,
  },
  {
    id: 2,
    name: 'Priya Sharma',
    rollNo: 'ENG142',
    semester: 'Sem 3',
    department: 'Electronics',
    cgpa: 8.8,
    attendance: 92,
  },
];

export default function EngineeringChildrenManagement() {
  const getCGPAColor = (cgpa: number) => {
    if (cgpa >= 8.5) return 'success';
    if (cgpa >= 7.0) return 'primary';
    if (cgpa >= 6.0) return 'warning';
    return 'error';
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #1976D2 0%, #1565C0 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          Children Management - Engineering
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          View and manage multiple children's academic profiles
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <School sx={{ mr: 2, color: '#1976D2' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Your Children ({children.length})
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {children.map((child) => (
            <Grid item xs={12} md={6} key={child.id}>
              <Card sx={{ border: '2px solid #E3F2FD', borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        bgcolor: '#1976D2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                      }}
                    >
                      <Person sx={{ color: 'white', fontSize: 32 }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {child.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontFamily: 'monospace' }}
                      >
                        {child.rollNo}
                      </Typography>
                    </Box>
                  </Box>

                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Semester
                      </Typography>
                      <Chip label={child.semester} size="small" color="primary" />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Department
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {child.department}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Box sx={{ mb: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Card sx={{ bgcolor: '#E8F5E9', p: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <TrendingUp sx={{ fontSize: 20, color: '#388E3C', mr: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                              CGPA
                            </Typography>
                          </Box>
                          <Typography variant="h5" sx={{ fontWeight: 700, color: '#388E3C' }}>
                            {child.cgpa}
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={(child.cgpa / 10) * 100}
                            sx={{ mt: 1, height: 6, borderRadius: 3 }}
                            color={getCGPAColor(child.cgpa)}
                          />
                        </Card>
                      </Grid>
                      <Grid item xs={6}>
                        <Card sx={{ bgcolor: '#E3F2FD', p: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <School sx={{ fontSize: 20, color: '#1976D2', mr: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                              Attendance
                            </Typography>
                          </Box>
                          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976D2' }}>
                            {child.attendance}%
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={child.attendance}
                            sx={{ mt: 1, height: 6, borderRadius: 3 }}
                            color={child.attendance >= 75 ? 'success' : 'error'}
                          />
                        </Card>
                      </Grid>
                    </Grid>
                  </Box>

                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<Visibility />}
                    sx={{ mt: 2 }}
                  >
                    View Detailed Dashboard
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#1976D2' }}>
          Parent Portal Information
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          • Access detailed academic performance for each child
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Track CGPA progress, attendance, exam results, and project status
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • View fee payment status and upcoming due dates
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Monitor attendance compliance with AICTE 75% requirement
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Contact mentor faculty for academic guidance and support
        </Typography>
      </Paper>
    </Box>
  );
}
