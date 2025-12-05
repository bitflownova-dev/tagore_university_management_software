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
  alpha,
} from '@mui/material';
import { Add } from '@mui/icons-material';

const children = [
  {
    id: 1,
    name: 'Amit Kumar',
    rollNo: 'AHS2024001',
    program: 'BSc MLT',
    year: 'Year 2',
    department: 'Medical Laboratory Technology',
    attendance: 91,
    cgpa: 8.5,
    status: 'Active',
  },
];

export default function AlliedHealthChildrenManagement() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F8FBFD', py: 4 }}>
      <Paper 
        elevation={0}
        sx={{ 
          p: 4, 
          mb: 4, 
          background: 'linear-gradient(135deg, #00BFA5 0%, #00897B 100%)',
          borderRadius: 3,
          boxShadow: '0 10px 40px rgba(0, 191, 165, 0.2)',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'white', letterSpacing: '-0.01em' }}>
          My Children
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.95)' }}>
          Manage your children's information and academic records
        </Typography>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
        <Button 
          variant="contained" 
          startIcon={<Add />} 
          sx={{ 
            bgcolor: '#00BFA5',
            '&:hover': {
              bgcolor: '#00897B',
            },
          }}
        >
          Add Child
        </Button>
      </Box>

      <Grid container spacing={3}>
        {children.map((child) => (
          <Grid item xs={12} md={6} key={child.id}>
            <Card 
              elevation={0}
              sx={{
                bgcolor: '#FFFFFF',
                borderRadius: 3,
                border: '1px solid rgba(0, 0, 0, 0.06)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0, 191, 165, 0.15)',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Avatar sx={{ width: 64, height: 64, bgcolor: '#00BFA5' }}>
                    {child.name.split(' ')[0][0]}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A202C' }}>
                      {child.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748B' }}>
                      Roll No: {child.rollNo}
                    </Typography>
                    <Chip 
                      label={child.status} 
                      size="small" 
                      sx={{ 
                        mt: 0.5,
                        bgcolor: alpha('#26A69A', 0.1),
                        color: '#26A69A',
                        fontWeight: 600,
                      }} 
                    />
                  </Box>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: '#64748B' }}>
                      Program
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#1A202C' }}>
                      {child.program}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: '#64748B' }}>
                      Year
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#1A202C' }}>
                      {child.year}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: '#64748B' }}>
                      Department
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#1A202C' }}>
                      {child.department}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: '#64748B' }}>
                      CGPA
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#26A69A' }}>
                      {child.cgpa}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: '#64748B' }}>
                      Attendance
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#00BFA5' }}>
                      {child.attendance}%
                    </Typography>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button 
                    size="small" 
                    variant="outlined" 
                    fullWidth
                    sx={{
                      borderColor: '#00BFA5',
                      color: '#00BFA5',
                      '&:hover': {
                        borderColor: '#00897B',
                        bgcolor: alpha('#00BFA5', 0.08),
                      },
                    }}
                  >
                    View Attendance
                  </Button>
                  <Button 
                    size="small" 
                    variant="outlined" 
                    fullWidth
                    sx={{
                      borderColor: '#00BFA5',
                      color: '#00BFA5',
                      '&:hover': {
                        borderColor: '#00897B',
                        bgcolor: alpha('#00BFA5', 0.08),
                      },
                    }}
                  >
                    View Marks
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
