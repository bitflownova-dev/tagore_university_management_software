import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  alpha,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  School,
  People,
  Business,
  TrendingUp,
  LocalHospital,
  Engineering,
  Biotech,
  MenuBook,
  HealthAndSafety,
  Science,
  ArrowForward,
  FilterList,
} from '@mui/icons-material';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface College {
  id: string;
  name: string;
  icon: JSX.Element;
  color: string;
  students: number;
  faculty: number;
  departments: number;
}

const colleges: College[] = [
  {
    id: 'medical',
    name: 'Medical College',
    icon: <LocalHospital />,
    color: '#DC2626',
    students: 800,
    faculty: 142,
    departments: 18,
  },
  {
    id: 'engineering',
    name: 'Engineering College',
    icon: <Engineering />,
    color: '#2563EB',
    students: 2400,
    faculty: 180,
    departments: 8,
  },
  {
    id: 'dental',
    name: 'Dental College',
    icon: <Biotech />,
    color: '#0891B2',
    students: 400,
    faculty: 65,
    departments: 9,
  },
  {
    id: 'arts-science',
    name: 'Arts & Science',
    icon: <MenuBook />,
    color: '#059669',
    students: 1800,
    faculty: 95,
    departments: 12,
  },
  {
    id: 'nursing',
    name: 'College of Nursing',
    icon: <HealthAndSafety />,
    color: '#9333EA',
    students: 320,
    faculty: 42,
    departments: 5,
  },
  {
    id: 'allied-health',
    name: 'Allied Health Sciences',
    icon: <Science />,
    color: '#F59E0B',
    students: 480,
    faculty: 58,
    departments: 7,
  },
];

const monthlyData = [
  { month: 'Jul', medical: 800, engineering: 2400, dental: 400, arts: 1800, nursing: 320, allied: 480 },
  { month: 'Aug', medical: 800, engineering: 2400, dental: 400, arts: 1800, nursing: 320, allied: 480 },
  { month: 'Sep', medical: 800, engineering: 2400, dental: 400, arts: 1800, nursing: 320, allied: 480 },
  { month: 'Oct', medical: 800, engineering: 2400, dental: 400, arts: 1800, nursing: 320, allied: 480 },
  { month: 'Nov', medical: 800, engineering: 2400, dental: 400, arts: 1800, nursing: 320, allied: 480 },
  { month: 'Dec', medical: 800, engineering: 2400, dental: 400, arts: 1800, nursing: 320, allied: 480 },
];

const COLORS = ['#DC2626', '#2563EB', '#0891B2', '#059669', '#9333EA', '#F59E0B'];

export default function UniversityDirectorDashboard() {
  const navigate = useNavigate();
  const [selectedCollege, setSelectedCollege] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('month');

  const totalStudents = colleges.reduce((sum, c) => sum + c.students, 0);
  const totalFaculty = colleges.reduce((sum, c) => sum + c.faculty, 0);

  const filteredColleges = selectedCollege === 'all' 
    ? colleges 
    : colleges.filter(c => c.id === selectedCollege);

  const stats = {
    students: filteredColleges.reduce((sum, c) => sum + c.students, 0),
    faculty: filteredColleges.reduce((sum, c) => sum + c.faculty, 0),
    colleges: filteredColleges.length,
    ratio: (filteredColleges.reduce((sum, c) => sum + c.students, 0) / 
            filteredColleges.reduce((sum, c) => sum + c.faculty, 0)).toFixed(1),
  };

  const pieChartData = colleges.map(college => ({
    name: college.name,
    value: college.students,
    color: college.color,
  }));

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #B45309 0%, #EA580C 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          University Director Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Tagore University - Strategic Management & Oversight
        </Typography>
      </Paper>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FilterList sx={{ color: '#64748B' }} />
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#64748B' }}>
              Filters:
            </Typography>
          </Box>
          
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>College</InputLabel>
            <Select
              value={selectedCollege}
              label="College"
              onChange={(e) => setSelectedCollege(e.target.value)}
            >
              <MenuItem value="all">All Colleges</MenuItem>
              {colleges.map((college) => (
                <MenuItem key={college.id} value={college.id}>
                  {college.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              label="Time Range"
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <MenuItem value="week">This Week</MenuItem>
              <MenuItem value="month">This Month</MenuItem>
              <MenuItem value="semester">This Semester</MenuItem>
              <MenuItem value="year">This Year</MenuItem>
            </Select>
          </FormControl>

          {selectedCollege !== 'all' && (
            <Chip 
              label={`Showing: ${colleges.find(c => c.id === selectedCollege)?.name}`}
              onDelete={() => setSelectedCollege('all')}
              color="primary"
              variant="outlined"
            />
          )}
        </Box>
      </Paper>

      {/* University Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: '1px solid rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 12px 24px ${alpha('#2563EB', 0.15)}`,
              },
            }}
          >
            <CardActionArea onClick={() => navigate('/director/students')} sx={{ p: 3 }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: alpha('#2563EB', 0.1),
                  mb: 2,
                }}
              >
                <School sx={{ fontSize: 32, color: '#2563EB' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#1A202C', mb: 0.5 }}>
                {stats.students.toLocaleString()}
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 600, mb: 1 }}>
                Total Students
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#2563EB' }}>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>View Details</Typography>
                <ArrowForward sx={{ fontSize: 14 }} />
              </Box>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: '1px solid rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 12px 24px ${alpha('#059669', 0.15)}`,
              },
            }}
          >
            <CardActionArea onClick={() => navigate('/director/staff')} sx={{ p: 3 }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: alpha('#059669', 0.1),
                  mb: 2,
                }}
              >
                <People sx={{ fontSize: 32, color: '#059669' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#1A202C', mb: 0.5 }}>
                {stats.faculty}
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 600, mb: 1 }}>
                Faculty Members
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#059669' }}>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>View Details</Typography>
                <ArrowForward sx={{ fontSize: 14 }} />
              </Box>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: '1px solid rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 12px 24px ${alpha('#F59E0B', 0.15)}`,
              },
            }}
          >
            <CardActionArea onClick={() => navigate('/director/colleges')} sx={{ p: 3 }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: alpha('#F59E0B', 0.1),
                  mb: 2,
                }}
              >
                <Business sx={{ fontSize: 32, color: '#F59E0B' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#1A202C', mb: 0.5 }}>
                {stats.colleges}
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 600, mb: 1 }}>
                {selectedCollege === 'all' ? 'Colleges' : 'College Selected'}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#F59E0B' }}>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>View Details</Typography>
                <ArrowForward sx={{ fontSize: 14 }} />
              </Box>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: '1px solid rgba(0,0,0,0.08)',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: alpha('#9333EA', 0.1),
                  mb: 2,
                }}
              >
                <TrendingUp sx={{ fontSize: 32, color: '#9333EA' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#1A202C', mb: 0.5 }}>
                1:{stats.ratio}
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 600 }}>
                Student-Faculty Ratio
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Enrollment Trend */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid rgba(0,0,0,0.08)',
              height: '100%',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A202C', mb: 3 }}>
              Enrollment Trend ({timeRange === 'week' ? 'Weekly' : timeRange === 'month' ? 'Monthly' : timeRange === 'semester' ? 'Semester' : 'Yearly'})
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="month" stroke="#64748B" style={{ fontSize: 12 }} />
                <YAxis stroke="#64748B" style={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: 8,
                  }}
                />
                <Legend />
                {selectedCollege === 'all' ? (
                  <>
                    <Bar dataKey="medical" fill="#2563EB" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="engineering" fill="#059669" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="arts" fill="#F59E0B" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="dental" fill="#9333EA" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="nursing" fill="#DC2626" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="allied" fill="#0891B2" radius={[8, 8, 0, 0]} />
                  </>
                ) : (
                  <Bar
                    dataKey={selectedCollege}
                    fill={
                      selectedCollege === 'medical' ? '#2563EB' :
                      selectedCollege === 'engineering' ? '#059669' :
                      selectedCollege === 'arts' ? '#F59E0B' :
                      selectedCollege === 'dental' ? '#9333EA' :
                      selectedCollege === 'nursing' ? '#DC2626' : '#0891B2'
                    }
                    radius={[8, 8, 0, 0]}
                  />
                )}
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Student Distribution Pie Chart */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid rgba(0,0,0,0.08)',
              height: '100%',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A202C', mb: 3 }}>
              Student Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Colleges Grid */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#1A202C', mb: 2 }}>
          {selectedCollege === 'all' ? 'All University Colleges' : 'Selected College'}
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748B', mb: 3 }}>
          {selectedCollege === 'all' 
            ? 'Click on any college to access its portal and manage college-specific operations'
            : 'Showing details for the selected college. Clear filter to view all colleges.'}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {filteredColleges.map((college) => (
          <Grid item xs={12} sm={6} md={4} key={college.id}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: '1px solid rgba(0,0,0,0.08)',
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: `0 20px 40px ${alpha(college.color, 0.2)}`,
                  borderColor: college.color,
                },
              }}
            >
              <CardActionArea 
                onClick={() => navigate(`/${college.id}`)}
                sx={{ p: 3, height: '100%' }}
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: alpha(college.color, 0.1),
                    mb: 2,
                  }}
                >
                  {college.icon && 
                    typeof college.icon === 'object' && 
                    'type' in college.icon 
                      ? { ...college.icon, props: { ...college.icon.props, sx: { fontSize: 36, color: college.color } } }
                      : college.icon
                  }
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A202C', mb: 2 }}>
                  {college.name}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#64748B' }}>
                      Students
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#1A202C' }}>
                      {college.students.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#64748B' }}>
                      Faculty
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#1A202C' }}>
                      {college.faculty}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#64748B' }}>
                      Departments
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#1A202C' }}>
                      {college.departments}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: college.color }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    View Portal
                  </Typography>
                  <ArrowForward sx={{ fontSize: 18 }} />
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
