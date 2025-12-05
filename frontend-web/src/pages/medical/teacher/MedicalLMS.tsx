import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  alpha,
} from '@mui/material';
import { useState } from 'react';
import {
  VideoLibrary,
  Quiz,
  Assignment,
  Add,
  Edit,
  Delete,
  PlayCircle,
  Upload,
  Visibility,
  CheckCircle,
  Schedule,
} from '@mui/icons-material';

interface VideoLecture {
  id: number;
  title: string;
  subject: string;
  phase: string;
  duration: string;
  uploadDate: string;
  views: number;
  status: 'published' | 'draft';
}

interface Assessment {
  id: number;
  title: string;
  type: 'MCQ' | 'SAQ' | 'LAQ';
  subject: string;
  phase: string;
  questions: number;
  duration: number;
  totalMarks: number;
  status: 'active' | 'draft' | 'completed';
  scheduledDate: string;
  submissions: number;
  totalStudents: number;
}

export default function MedicalLMS() {
  const [tabValue, setTabValue] = useState(0);
  const [videoDialog, setVideoDialog] = useState(false);
  const [assessmentDialog, setAssessmentDialog] = useState(false);
  const [assessmentType, setAssessmentType] = useState<'MCQ' | 'SAQ' | 'LAQ'>('MCQ');

  const [videos] = useState<VideoLecture[]>([
    { id: 1, title: 'Anatomy of the Heart', subject: 'Anatomy', phase: 'Phase 1', duration: '45:30', uploadDate: 'Dec 1, 2025', views: 156, status: 'published' },
    { id: 2, title: 'Respiratory Physiology', subject: 'Physiology', phase: 'Phase 1', duration: '38:20', uploadDate: 'Nov 28, 2025', views: 142, status: 'published' },
    { id: 3, title: 'Clinical Case Studies - Surgery', subject: 'Surgery', phase: 'Phase 3.1', duration: '52:10', uploadDate: 'Nov 25, 2025', views: 98, status: 'draft' },
  ]);

  const [assessments] = useState<Assessment[]>([
    { id: 1, title: 'Cardiovascular System MCQ', type: 'MCQ', subject: 'Anatomy', phase: 'Phase 1', questions: 50, duration: 60, totalMarks: 50, status: 'active', scheduledDate: 'Dec 10, 2025', submissions: 142, totalStudents: 180 },
    { id: 2, title: 'Respiratory Physiology SAQ', type: 'SAQ', subject: 'Physiology', phase: 'Phase 1', questions: 10, duration: 90, totalMarks: 100, status: 'active', scheduledDate: 'Dec 12, 2025', submissions: 138, totalStudents: 180 },
    { id: 3, title: 'Clinical Medicine LAQ', type: 'LAQ', subject: 'Medicine', phase: 'Phase 3.1', questions: 5, duration: 120, totalMarks: 100, status: 'draft', scheduledDate: 'Dec 15, 2025', submissions: 0, totalStudents: 158 },
  ]);

  return (
    <Box sx={{ bgcolor: '#F8FBFD', minHeight: '100vh', pb: 4 }}>
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #991B1B 0%, #DC2626 100%)',
          pt: 4,
          pb: 8,
          px: 3,
          mb: -4,
          borderRadius: '0 0 32px 32px',
          boxShadow: '0 20px 60px rgba(220, 38, 38, 0.25)',
        }}
      >
        <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
          <Typography 
            variant="h3" 
            gutterBottom 
            sx={{ 
              fontWeight: 800, 
              color: 'white',
              letterSpacing: '-0.02em',
              mb: 1,
            }}
          >
            Learning Management System
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.95)', fontWeight: 400 }}>
            Manage video lectures, assessments, and track student progress
          </Typography>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1400, mx: 'auto', px: 3, pt: 6 }}>
        {/* Quick Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                border: '1px solid',
                borderColor: 'rgba(220, 38, 38, 0.08)',
                borderRadius: 3,
                elevation: 0,
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      background: alpha('#DC2626', 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                    }}
                  >
                    <VideoLibrary sx={{ color: '#DC2626', fontSize: 32 }} />
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#1A202C' }}>
                      24
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748B' }}>
                      Video Lectures
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                border: '1px solid',
                borderColor: 'rgba(220, 38, 38, 0.08)',
                borderRadius: 3,
                elevation: 0,
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      background: alpha('#2563EB', 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                    }}
                  >
                    <Quiz sx={{ color: '#2563EB', fontSize: 32 }} />
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#1A202C' }}>
                      18
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748B' }}>
                      Active Assessments
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                border: '1px solid',
                borderColor: 'rgba(220, 38, 38, 0.08)',
                borderRadius: 3,
                elevation: 0,
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      background: alpha('#059669', 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                    }}
                  >
                    <CheckCircle sx={{ color: '#059669', fontSize: 32 }} />
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#1A202C' }}>
                      845
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748B' }}>
                      Submissions Graded
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                border: '1px solid',
                borderColor: 'rgba(220, 38, 38, 0.08)',
                borderRadius: 3,
                elevation: 0,
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      background: alpha('#F59E0B', 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                    }}
                  >
                    <Schedule sx={{ color: '#F59E0B', fontSize: 32 }} />
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#1A202C' }}>
                      12
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748B' }}>
                      Pending Reviews
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Main Content */}
        <Box
          sx={{
            background: 'white',
            border: '1px solid',
            borderColor: 'rgba(220, 38, 38, 0.08)',
            borderRadius: 3,
            p: 3,
          }}
        >
          <Tabs value={tabValue} onChange={(_e, v) => setTabValue(v)} sx={{ mb: 3 }}>
            <Tab label="Video Lectures" icon={<VideoLibrary />} iconPosition="start" />
            <Tab label="MCQ Assessments" icon={<Quiz />} iconPosition="start" />
            <Tab label="SAQ Assessments" icon={<Assignment />} iconPosition="start" />
            <Tab label="LAQ Assessments" icon={<Assignment />} iconPosition="start" />
          </Tabs>

          {/* Video Lectures Tab */}
          {tabValue === 0 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A202C' }}>
                  Video Library
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => setVideoDialog(true)}
                  sx={{
                    bgcolor: '#DC2626',
                    '&:hover': { bgcolor: '#B91C1C' },
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  Upload Video
                </Button>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, color: '#64748B', fontSize: '0.875rem', borderBottom: '2px solid #E2E8F0' }}>Title</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#64748B', fontSize: '0.875rem', borderBottom: '2px solid #E2E8F0' }}>Subject</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#64748B', fontSize: '0.875rem', borderBottom: '2px solid #E2E8F0' }}>Phase</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#64748B', fontSize: '0.875rem', borderBottom: '2px solid #E2E8F0' }}>Duration</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#64748B', fontSize: '0.875rem', borderBottom: '2px solid #E2E8F0' }}>Views</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#64748B', fontSize: '0.875rem', borderBottom: '2px solid #E2E8F0' }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#64748B', fontSize: '0.875rem', borderBottom: '2px solid #E2E8F0' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {videos.map((video) => (
                      <TableRow
                        key={video.id}
                        sx={{
                          '&:hover': {
                            bgcolor: alpha('#DC2626', 0.04),
                          },
                        }}
                      >
                        <TableCell sx={{ fontWeight: 600, color: '#1A202C' }}>{video.title}</TableCell>
                        <TableCell sx={{ color: '#64748B' }}>{video.subject}</TableCell>
                        <TableCell>
                          <Chip
                            label={video.phase}
                            size="small"
                            sx={{
                              bgcolor: alpha('#DC2626', 0.1),
                              color: '#DC2626',
                              fontWeight: 600,
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ color: '#64748B' }}>{video.duration}</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#1A202C' }}>{video.views}</TableCell>
                        <TableCell>
                          <Chip
                            label={video.status}
                            size="small"
                            sx={{
                              bgcolor: video.status === 'published' ? alpha('#059669', 0.1) : alpha('#F59E0B', 0.1),
                              color: video.status === 'published' ? '#059669' : '#F59E0B',
                              fontWeight: 600,
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton size="small" sx={{ color: '#2563EB' }}>
                            <PlayCircle />
                          </IconButton>
                          <IconButton size="small" sx={{ color: '#F59E0B' }}>
                            <Edit />
                          </IconButton>
                          <IconButton size="small" sx={{ color: '#DC2626' }}>
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {/* MCQ/SAQ/LAQ Tabs */}
          {(tabValue === 1 || tabValue === 2 || tabValue === 3) && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A202C' }}>
                  {tabValue === 1 ? 'MCQ' : tabValue === 2 ? 'SAQ' : 'LAQ'} Assessments
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => {
                    setAssessmentType(tabValue === 1 ? 'MCQ' : tabValue === 2 ? 'SAQ' : 'LAQ');
                    setAssessmentDialog(true);
                  }}
                  sx={{
                    bgcolor: '#DC2626',
                    '&:hover': { bgcolor: '#B91C1C' },
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  Create Assessment
                </Button>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, color: '#64748B', fontSize: '0.875rem', borderBottom: '2px solid #E2E8F0' }}>Title</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#64748B', fontSize: '0.875rem', borderBottom: '2px solid #E2E8F0' }}>Subject</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#64748B', fontSize: '0.875rem', borderBottom: '2px solid #E2E8F0' }}>Phase</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#64748B', fontSize: '0.875rem', borderBottom: '2px solid #E2E8F0' }}>Questions</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#64748B', fontSize: '0.875rem', borderBottom: '2px solid #E2E8F0' }}>Marks</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#64748B', fontSize: '0.875rem', borderBottom: '2px solid #E2E8F0' }}>Submissions</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#64748B', fontSize: '0.875rem', borderBottom: '2px solid #E2E8F0' }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#64748B', fontSize: '0.875rem', borderBottom: '2px solid #E2E8F0' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {assessments
                      .filter(a => 
                        (tabValue === 1 && a.type === 'MCQ') ||
                        (tabValue === 2 && a.type === 'SAQ') ||
                        (tabValue === 3 && a.type === 'LAQ')
                      )
                      .map((assessment) => (
                        <TableRow
                          key={assessment.id}
                          sx={{
                            '&:hover': {
                              bgcolor: alpha('#DC2626', 0.04),
                            },
                          }}
                        >
                          <TableCell sx={{ fontWeight: 600, color: '#1A202C' }}>{assessment.title}</TableCell>
                          <TableCell sx={{ color: '#64748B' }}>{assessment.subject}</TableCell>
                          <TableCell>
                            <Chip
                              label={assessment.phase}
                              size="small"
                              sx={{
                                bgcolor: alpha('#DC2626', 0.1),
                                color: '#DC2626',
                                fontWeight: 600,
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ color: '#64748B' }}>{assessment.questions}</TableCell>
                          <TableCell sx={{ fontWeight: 600, color: '#1A202C' }}>{assessment.totalMarks}</TableCell>
                          <TableCell sx={{ color: '#64748B' }}>
                            {assessment.submissions}/{assessment.totalStudents}
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={assessment.status}
                              size="small"
                              sx={{
                                bgcolor: assessment.status === 'active' ? alpha('#059669', 0.1) : alpha('#F59E0B', 0.1),
                                color: assessment.status === 'active' ? '#059669' : '#F59E0B',
                                fontWeight: 600,
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton size="small" sx={{ color: '#2563EB' }}>
                              <Visibility />
                            </IconButton>
                            <IconButton size="small" sx={{ color: '#F59E0B' }}>
                              <Edit />
                            </IconButton>
                            <IconButton size="small" sx={{ color: '#DC2626' }}>
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Box>
      </Box>

      {/* Upload Video Dialog */}
      <Dialog open={videoDialog} onClose={() => setVideoDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, color: '#1A202C' }}>Upload Video Lecture</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField fullWidth label="Video Title" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Subject" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Phase" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Description" multiline rows={3} variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Upload />}
                sx={{
                  py: 3,
                  borderStyle: 'dashed',
                  borderWidth: 2,
                  borderColor: '#DC2626',
                  color: '#DC2626',
                  '&:hover': {
                    borderColor: '#B91C1C',
                    bgcolor: alpha('#DC2626', 0.04),
                  },
                }}
              >
                Click to Upload Video (Max 500MB)
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVideoDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#DC2626',
              '&:hover': { bgcolor: '#B91C1C' },
            }}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Assessment Dialog */}
      <Dialog open={assessmentDialog} onClose={() => setAssessmentDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, color: '#1A202C' }}>
          Create {assessmentType} Assessment
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField fullWidth label="Assessment Title" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Subject" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Phase" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Number of Questions" type="number" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Duration (minutes)" type="number" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Total Marks" type="number" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Scheduled Date" type="date" InputLabelProps={{ shrink: true }} variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Instructions" multiline rows={3} variant="outlined" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAssessmentDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#DC2626',
              '&:hover': { bgcolor: '#B91C1C' },
            }}
          >
            Create & Add Questions
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
