import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  LinearProgress,
  Chip,
  alpha,
  CardActionArea,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import { useState } from 'react';
import {
  VideoLibrary,
  Quiz,
  Assignment,
  PlayCircle,
  CheckCircle,
  Timer,
  TrendingUp,
  Description,
} from '@mui/icons-material';

interface VideoLecture {
  id: number;
  title: string;
  subject: string;
  phase: string;
  duration: string;
  thumbnail: string;
  progress: number;
  completed: boolean;
  uploadDate: string;
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
  dueDate: string;
  status: 'pending' | 'completed' | 'graded';
  score?: number;
  attemptDate?: string;
}

export default function MedicalStudentLMS() {
  const [tabValue, setTabValue] = useState(0);

  const [videos] = useState<VideoLecture[]>([
    { id: 1, title: 'Anatomy of the Heart', subject: 'Anatomy', phase: 'Phase 1', duration: '45:30', thumbnail: '', progress: 100, completed: true, uploadDate: 'Dec 1, 2025' },
    { id: 2, title: 'Respiratory Physiology', subject: 'Physiology', phase: 'Phase 1', duration: '38:20', thumbnail: '', progress: 65, completed: false, uploadDate: 'Nov 28, 2025' },
    { id: 3, title: 'Cardiovascular System Overview', subject: 'Anatomy', phase: 'Phase 1', duration: '52:10', thumbnail: '', progress: 0, completed: false, uploadDate: 'Nov 25, 2025' },
    { id: 4, title: 'Clinical Case Studies - Internal Medicine', subject: 'Medicine', phase: 'Phase 3.1', duration: '1:05:30', thumbnail: '', progress: 30, completed: false, uploadDate: 'Nov 20, 2025' },
  ]);

  const [assessments] = useState<Assessment[]>([
    { id: 1, title: 'Cardiovascular System MCQ', type: 'MCQ', subject: 'Anatomy', phase: 'Phase 1', questions: 50, duration: 60, totalMarks: 50, dueDate: 'Dec 10, 2025', status: 'pending' },
    { id: 2, title: 'Respiratory Physiology SAQ', type: 'SAQ', subject: 'Physiology', phase: 'Phase 1', questions: 10, duration: 90, totalMarks: 100, dueDate: 'Dec 12, 2025', status: 'pending' },
    { id: 3, title: 'Anatomy Final MCQ', type: 'MCQ', subject: 'Anatomy', phase: 'Phase 1', questions: 100, duration: 120, totalMarks: 100, dueDate: 'Nov 20, 2025', status: 'graded', score: 82, attemptDate: 'Nov 19, 2025' },
    { id: 4, title: 'Clinical Medicine LAQ', type: 'LAQ', subject: 'Medicine', phase: 'Phase 3.1', questions: 5, duration: 120, totalMarks: 100, dueDate: 'Dec 15, 2025', status: 'completed', attemptDate: 'Dec 14, 2025' },
  ]);

  const completedVideos = videos.filter(v => v.completed).length;
  const avgProgress = Math.round(videos.reduce((acc, v) => acc + v.progress, 0) / videos.length);
  const completedAssessments = assessments.filter(a => a.status === 'graded').length;
  const avgScore = Math.round(
    assessments
      .filter(a => a.status === 'graded' && a.score)
      .reduce((acc, a) => acc + (a.score || 0), 0) / 
    assessments.filter(a => a.status === 'graded').length || 0
  );

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
            My Learning Portal
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.95)', fontWeight: 400 }}>
            Access video lectures, take assessments, and track your progress
          </Typography>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1400, mx: 'auto', px: 3, pt: 6 }}>
        {/* Progress Summary */}
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
                      {completedVideos}/{videos.length}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748B' }}>
                      Videos Completed
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
                    <TrendingUp sx={{ color: '#2563EB', fontSize: 32 }} />
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#1A202C' }}>
                      {avgProgress}%
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748B' }}>
                      Avg Progress
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
                      {completedAssessments}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748B' }}>
                      Assessments Done
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
                    <TrendingUp sx={{ color: '#F59E0B', fontSize: 32 }} />
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#1A202C' }}>
                      {avgScore}%
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748B' }}>
                      Average Score
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
            <Tab label="Assessments" icon={<Quiz />} iconPosition="start" />
            <Tab label="My Grades" icon={<TrendingUp />} iconPosition="start" />
          </Tabs>

          {/* Video Lectures Tab */}
          {tabValue === 0 && (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A202C', mb: 3 }}>
                Available Video Lectures
              </Typography>

              <Grid container spacing={3}>
                {videos.map((video) => (
                  <Grid item xs={12} sm={6} md={4} key={video.id}>
                    <Card
                      sx={{
                        border: '1px solid',
                        borderColor: 'rgba(220, 38, 38, 0.08)',
                        borderRadius: 3,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: `0 12px 24px ${alpha('#DC2626', 0.15)}`,
                        },
                      }}
                    >
                      <CardActionArea>
                        <Box
                          sx={{
                            height: 180,
                            background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                          }}
                        >
                          <PlayCircle sx={{ fontSize: 64, color: 'white', opacity: 0.9 }} />
                          {video.completed && (
                            <CheckCircle
                              sx={{
                                position: 'absolute',
                                top: 12,
                                right: 12,
                                color: '#059669',
                                bgcolor: 'white',
                                borderRadius: '50%',
                                fontSize: 28,
                              }}
                            />
                          )}
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: 12,
                              right: 12,
                              bgcolor: 'rgba(0,0,0,0.7)',
                              color: 'white',
                              px: 1,
                              py: 0.5,
                              borderRadius: 1,
                              fontSize: '0.875rem',
                              fontWeight: 600,
                            }}
                          >
                            {video.duration}
                          </Box>
                        </Box>
                        <CardContent>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A202C', mb: 1 }}>
                            {video.title}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                            <Chip
                              label={video.subject}
                              size="small"
                              sx={{
                                bgcolor: alpha('#DC2626', 0.1),
                                color: '#DC2626',
                                fontWeight: 600,
                              }}
                            />
                            <Chip
                              label={video.phase}
                              size="small"
                              sx={{
                                bgcolor: alpha('#2563EB', 0.1),
                                color: '#2563EB',
                                fontWeight: 600,
                              }}
                            />
                          </Box>
                          <Box sx={{ mb: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                              <Typography variant="caption" sx={{ color: '#64748B' }}>
                                Progress
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#1A202C', fontWeight: 600 }}>
                                {video.progress}%
                              </Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={video.progress}
                              sx={{
                                height: 8,
                                borderRadius: 2,
                                bgcolor: alpha('#DC2626', 0.1),
                                '& .MuiLinearProgress-bar': {
                                  bgcolor: '#DC2626',
                                  borderRadius: 2,
                                },
                              }}
                            />
                          </Box>
                          <Button
                            fullWidth
                            variant="contained"
                            startIcon={<PlayCircle />}
                            sx={{
                              mt: 1,
                              bgcolor: '#DC2626',
                              '&:hover': { bgcolor: '#B91C1C' },
                              borderRadius: 2,
                              textTransform: 'none',
                              fontWeight: 600,
                            }}
                          >
                            {video.progress > 0 ? 'Continue Watching' : 'Start Watching'}
                          </Button>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Assessments Tab */}
          {tabValue === 1 && (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A202C', mb: 3 }}>
                My Assessments
              </Typography>

              <Grid container spacing={3}>
                {assessments.map((assessment) => (
                  <Grid item xs={12} key={assessment.id}>
                    <Card
                      sx={{
                        border: '1px solid',
                        borderColor: 'rgba(220, 38, 38, 0.08)',
                        borderRadius: 3,
                      }}
                    >
                      <CardContent>
                        <Grid container spacing={3} alignItems="center">
                          <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <Box
                                sx={{
                                  width: 56,
                                  height: 56,
                                  borderRadius: 2,
                                  background: alpha(
                                    assessment.type === 'MCQ' ? '#2563EB' : 
                                    assessment.type === 'SAQ' ? '#059669' : '#F59E0B', 
                                    0.1
                                  ),
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  mr: 2,
                                }}
                              >
                                {assessment.type === 'MCQ' ? <Quiz sx={{ fontSize: 32, color: '#2563EB' }} /> : <Assignment sx={{ fontSize: 32, color: assessment.type === 'SAQ' ? '#059669' : '#F59E0B' }} />}
                              </Box>
                              <Box>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A202C' }}>
                                  {assessment.title}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                                  <Chip
                                    label={assessment.type}
                                    size="small"
                                    sx={{
                                      bgcolor: alpha('#DC2626', 0.1),
                                      color: '#DC2626',
                                      fontWeight: 600,
                                    }}
                                  />
                                  <Chip
                                    label={assessment.subject}
                                    size="small"
                                    sx={{
                                      bgcolor: alpha('#2563EB', 0.1),
                                      color: '#2563EB',
                                      fontWeight: 600,
                                    }}
                                  />
                                </Box>
                              </Box>
                            </Box>
                            
                            <Grid container spacing={2} sx={{ mb: 2 }}>
                              <Grid item xs={6}>
                                <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                                  Questions
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600, color: '#1A202C' }}>
                                  {assessment.questions}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                                  Duration
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600, color: '#1A202C' }}>
                                  {assessment.duration} min
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                                  Total Marks
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600, color: '#1A202C' }}>
                                  {assessment.totalMarks}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                                  Due Date
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600, color: '#1A202C' }}>
                                  {assessment.dueDate}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <Box sx={{ textAlign: 'center' }}>
                              {assessment.status === 'pending' && (
                                <>
                                  <Chip
                                    label="Not Started"
                                    sx={{
                                      bgcolor: alpha('#F59E0B', 0.1),
                                      color: '#F59E0B',
                                      fontWeight: 600,
                                      mb: 2,
                                    }}
                                  />
                                  <Button
                                    fullWidth
                                    variant="contained"
                                    startIcon={<Timer />}
                                    sx={{
                                      bgcolor: '#DC2626',
                                      '&:hover': { bgcolor: '#B91C1C' },
                                      borderRadius: 2,
                                      textTransform: 'none',
                                      fontWeight: 600,
                                      py: 1.5,
                                    }}
                                  >
                                    Start Assessment
                                  </Button>
                                </>
                              )}
                              
                              {assessment.status === 'completed' && (
                                <>
                                  <Chip
                                    label="Under Review"
                                    sx={{
                                      bgcolor: alpha('#2563EB', 0.1),
                                      color: '#2563EB',
                                      fontWeight: 600,
                                      mb: 2,
                                    }}
                                  />
                                  <Typography variant="body2" sx={{ color: '#64748B' }}>
                                    Submitted on {assessment.attemptDate}
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mt: 1 }}>
                                    Your answers are being reviewed
                                  </Typography>
                                </>
                              )}
                              
                              {assessment.status === 'graded' && (
                                <>
                                  <Box
                                    sx={{
                                      width: 100,
                                      height: 100,
                                      borderRadius: '50%',
                                      border: '6px solid',
                                      borderColor: assessment.score && assessment.score >= 60 ? '#059669' : '#DC2626',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      mx: 'auto',
                                      mb: 2,
                                    }}
                                  >
                                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#1A202C' }}>
                                      {assessment.score}%
                                    </Typography>
                                  </Box>
                                  <Chip
                                    label={assessment.score && assessment.score >= 60 ? 'Passed' : 'Failed'}
                                    sx={{
                                      bgcolor: assessment.score && assessment.score >= 60 ? alpha('#059669', 0.1) : alpha('#DC2626', 0.1),
                                      color: assessment.score && assessment.score >= 60 ? '#059669' : '#DC2626',
                                      fontWeight: 600,
                                      mb: 1,
                                    }}
                                  />
                                  <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                                    Attempted on {assessment.attemptDate}
                                  </Typography>
                                  <Button
                                    fullWidth
                                    variant="outlined"
                                    startIcon={<Description />}
                                    sx={{
                                      mt: 2,
                                      borderColor: '#DC2626',
                                      color: '#DC2626',
                                      '&:hover': {
                                        borderColor: '#B91C1C',
                                        bgcolor: alpha('#DC2626', 0.04),
                                      },
                                      borderRadius: 2,
                                      textTransform: 'none',
                                      fontWeight: 600,
                                    }}
                                  >
                                    View Detailed Report
                                  </Button>
                                </>
                              )}
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* My Grades Tab */}
          {tabValue === 2 && (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A202C', mb: 3 }}>
                Performance Overview
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Card
                    sx={{
                      border: '1px solid',
                      borderColor: 'rgba(220, 38, 38, 0.08)',
                      borderRadius: 3,
                      p: 3,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A202C', mb: 3 }}>
                      Graded Assessments
                    </Typography>

                    <List>
                      {assessments
                        .filter(a => a.status === 'graded')
                        .map((assessment, index) => (
                          <Box key={assessment.id}>
                            <ListItem sx={{ px: 0 }}>
                              <ListItemIcon>
                                <Box
                                  sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 2,
                                    background: alpha(assessment.score && assessment.score >= 60 ? '#059669' : '#DC2626', 0.1),
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <Typography variant="h6" sx={{ fontWeight: 700, color: assessment.score && assessment.score >= 60 ? '#059669' : '#DC2626' }}>
                                    {assessment.score}
                                  </Typography>
                                </Box>
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  <Typography variant="body1" sx={{ fontWeight: 600, color: '#1A202C' }}>
                                    {assessment.title}
                                  </Typography>
                                }
                                secondary={
                                  <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                                    <Chip
                                      label={assessment.type}
                                      size="small"
                                      sx={{
                                        bgcolor: alpha('#DC2626', 0.1),
                                        color: '#DC2626',
                                        fontWeight: 600,
                                        height: 20,
                                        fontSize: '0.75rem',
                                      }}
                                    />
                                    <Typography variant="caption" sx={{ color: '#64748B', lineHeight: '20px' }}>
                                      {assessment.subject} • {assessment.attemptDate}
                                    </Typography>
                                  </Box>
                                }
                              />
                              <Typography variant="body2" sx={{ color: '#64748B' }}>
                                {assessment.score}/{assessment.totalMarks}
                              </Typography>
                            </ListItem>
                            {index < assessments.filter(a => a.status === 'graded').length - 1 && <Divider />}
                          </Box>
                        ))}
                    </List>
                  </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Card
                    sx={{
                      border: '1px solid',
                      borderColor: 'rgba(220, 38, 38, 0.08)',
                      borderRadius: 3,
                      p: 3,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A202C', mb: 3 }}>
                      Overall Statistics
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                      <Box
                        sx={{
                          width: 120,
                          height: 120,
                          borderRadius: '50%',
                          border: '8px solid',
                          borderColor: '#DC2626',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 2,
                        }}
                      >
                        <Typography variant="h3" sx={{ fontWeight: 700, color: '#1A202C' }}>
                          {avgScore}%
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: '#64748B', textAlign: 'center' }}>
                        Average Score
                      </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ color: '#64748B' }}>
                          Total Assessments
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1A202C' }}>
                          {assessments.length}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ color: '#64748B' }}>
                          Completed
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1A202C' }}>
                          {completedAssessments}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ color: '#64748B' }}>
                          Pending
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1A202C' }}>
                          {assessments.filter(a => a.status === 'pending').length}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
