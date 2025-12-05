import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  School as SchoolIcon,
  People as PeopleIcon,
} from '@mui/icons-material';

interface Department {
  id: number;
  name: string;
  hod: string;
  faculty: number;
  students: number;
  courses: string[];
}

export default function DepartmentManagement() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);

  const departments: Department[] = [
    {
      id: 1,
      name: 'Computer Science',
      hod: 'Dr. Rajesh Kumar',
      faculty: 15,
      students: 450,
      courses: ['B.Tech CS', 'M.Tech CS', 'MCA'],
    },
    {
      id: 2,
      name: 'Mathematics',
      hod: 'Prof. Anita Sharma',
      faculty: 12,
      students: 320,
      courses: ['B.Sc Math', 'M.Sc Math'],
    },
    {
      id: 3,
      name: 'Physics',
      hod: 'Dr. Suresh Patel',
      faculty: 10,
      students: 280,
      courses: ['B.Sc Physics', 'M.Sc Physics'],
    },
    {
      id: 4,
      name: 'Commerce',
      hod: 'Prof. Meera Gupta',
      faculty: 8,
      students: 350,
      courses: ['B.Com', 'M.Com'],
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Department Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedDept(null);
            setOpenDialog(true);
          }}
        >
          Add Department
        </Button>
      </Box>

      <Grid container spacing={3}>
        {departments.map((dept) => (
          <Grid item xs={12} md={6} key={dept.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <Box>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      {dept.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Head: {dept.hod}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setSelectedDept(dept);
                        setOpenDialog(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PeopleIcon color="primary" />
                      <Box>
                        <Typography variant="h6">{dept.faculty}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Faculty Members
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <SchoolIcon color="secondary" />
                      <Box>
                        <Typography variant="h6">{dept.students}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Students
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" gutterBottom>
                  Courses Offered:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {dept.courses.map((course, index) => (
                    <Box
                      key={index}
                      sx={{
                        px: 2,
                        py: 0.5,
                        bgcolor: 'primary.light',
                        color: 'primary.contrastText',
                        borderRadius: 1,
                        fontSize: '0.875rem',
                      }}
                    >
                      {course}
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Department Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedDept ? 'Edit Department' : 'Add New Department'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Department Name"
              fullWidth
              defaultValue={selectedDept?.name}
              placeholder="e.g., Computer Science"
            />
            <TextField
              label="Head of Department"
              fullWidth
              defaultValue={selectedDept?.hod}
              placeholder="e.g., Dr. John Doe"
            />
            <TextField
              label="Number of Faculty"
              type="number"
              fullWidth
              defaultValue={selectedDept?.faculty || 0}
            />
            <TextField
              label="Courses (comma separated)"
              fullWidth
              multiline
              rows={3}
              defaultValue={selectedDept?.courses.join(', ')}
              placeholder="e.g., B.Tech CS, M.Tech CS, MCA"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            {selectedDept ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
