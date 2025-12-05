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
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          My Children
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Manage your children's information and academic records
        </Typography>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button variant="contained" startIcon={<Add />} sx={{ bgcolor: '#1565C0' }}>
          Add Child
        </Button>
      </Box>

      <Grid container spacing={3}>
        {children.map((child) => (
          <Grid item xs={12} md={6} key={child.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Avatar sx={{ width: 64, height: 64, bgcolor: '#1565C0' }}>
                    {child.name.split(' ')[0][0]}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {child.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Roll No: {child.rollNo}
                    </Typography>
                    <Chip label={child.status} size="small" color="success" sx={{ mt: 0.5 }} />
                  </Box>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">
                      Program
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {child.program}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">
                      Year
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {child.year}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">
                      Department
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {child.department}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">
                      CGPA
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#2E7D32' }}>
                      {child.cgpa}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">
                      Attendance
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#1565C0' }}>
                      {child.attendance}%
                    </Typography>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button size="small" variant="outlined" fullWidth>
                    View Attendance
                  </Button>
                  <Button size="small" variant="outlined" fullWidth>
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
