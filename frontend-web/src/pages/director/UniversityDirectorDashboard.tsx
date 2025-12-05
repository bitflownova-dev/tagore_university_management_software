import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  Avatar,
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
} from '@mui/icons-material';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface College {
  id: string;
  name: string;
  icon: JSX.Element;
  color: string;
  students: number;
  faculty: number;
  departments: number;
  revenue: number;
}

const colleges: College[] = [
  {
    id: 'medical',
    name: 'Medical College & Hospital',
    icon: <LocalHospital />,
    color: '#D32F2F',
    students: 800,
    faculty: 142,
    departments: 18,
    revenue: 17100000,
  },
  {
    id: 'engineering',
    name: 'Engineering College',
    icon: <Engineering />,
    color: '#1976D2',
    students: 2400,
    faculty: 180,
    departments: 8,
    revenue: 8500000,
  },
  {
    id: 'dental',
    name: 'Dental College & Hospital',
    icon: <Biotech />,
    color: '#0288D1',
    students: 400,
    faculty: 65,
    departments: 9,
    revenue: 6200000,
  },
  {
    id: 'arts-science',
    name: 'Arts & Science College',
    icon: <MenuBook />,
    color: '#388E3C',
    students: 1800,
    faculty: 95,
    departments: 12,
    revenue: 4800000,
  },
  {
    id: 'nursing',
    name: 'College of Nursing',
    icon: <HealthAndSafety />,
    color: '#7B1FA2',
    students: 320,
    faculty: 42,
    departments: 5,
    revenue: 3500000,
  },
  {
    id: 'allied-health',
    name: 'Institute of Allied Health Sciences',
    icon: <Science />,
    color: '#F57C00',
    students: 480,
    faculty: 58,
    departments: 7,
    revenue: 4200000,
  },
];

const monthlyTrends = [
  { month: 'Jul', medical: 4500, engineering: 2200, dental: 380, arts: 1750, nursing: 310, allied: 450 },
  { month: 'Aug', medical: 4800, engineering: 2350, dental: 390, arts: 1780, nursing: 318, allied: 465 },
  { month: 'Sep', medical: 5200, engineering: 2400, dental: 395, arts: 1800, nursing: 320, allied: 475 },
  { month: 'Oct', medical: 5500, engineering: 2400, dental: 400, arts: 1800, nursing: 320, allied: 480 },
  { month: 'Nov', medical: 5800, engineering: 2400, dental: 400, arts: 1800, nursing: 320, allied: 480 },
  { month: 'Dec', medical: 6200, engineering: 2400, dental: 400, arts: 1800, nursing: 320, allied: 480 },
];

export default function UniversityDirectorDashboard() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);

  const selectedCollege = selectedTab === 0 ? null : colleges[selectedTab - 1];

  const totalStats = {
    students: colleges.reduce((sum, c) => sum + c.students, 0),
    faculty: colleges.reduce((sum, c) => sum + c.faculty, 0),
    departments: colleges.reduce((sum, c) => sum + c.departments, 0),
    revenue: colleges.reduce((sum, c) => sum + c.revenue, 0),
  };

  const formatCurrency = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
    return `₹${(value / 1000).toFixed(0)} K`;
  };

  const getStatsForView = () => {
    if (selectedCollege) {
      return {
        students: selectedCollege.students,
        faculty: selectedCollege.faculty,
        departments: selectedCollege.departments,
        revenue: selectedCollege.revenue,
      };
    }
    return totalStats;
  };

  const stats = getStatsForView();

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #1976D2 0%, #1565C0 100%)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
          University Director Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Tagore University - Multi-College Management System
        </Typography>
      </Paper>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={selectedTab}
          onChange={(_, value) => setSelectedTab(value)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="All Colleges" />
          {colleges.map((college) => (
            <Tab
              key={college.id}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar sx={{ bgcolor: college.color, width: 24, height: 24 }}>
                    {React.cloneElement(college.icon, { sx: { fontSize: 14 } })}
                  </Avatar>
                  {college.name}
                </Box>
              }
            />
          ))}
        </Tabs>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: '100%',
              transition: 'all 0.3s ease',
              '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
            }}
          >
            <CardActionArea onClick={() => navigate('/director/students')} sx={{ p: 3, height: '100%' }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: '#1976D220',
                  color: '#1976D2',
                  margin: '0 auto 16px',
                }}
              >
                <School sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="h3" align="center" sx={{ fontWeight: 700, color: '#1976D2', mb: 1 }}>
                {stats.students.toLocaleString()}
              </Typography>
              <Typography variant="subtitle1" align="center" sx={{ fontWeight: 600 }}>
                Total Students
              </Typography>
              <Typography variant="body2" align="center" color="text.secondary">
                {selectedCollege ? selectedCollege.name : 'Across All Colleges'}
              </Typography>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: '100%',
              transition: 'all 0.3s ease',
              '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
            }}
          >
            <CardActionArea onClick={() => navigate('/director/staff')} sx={{ p: 3, height: '100%' }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: '#2E7D3220',
                  color: '#2E7D32',
                  margin: '0 auto 16px',
                }}
              >
                <People sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="h3" align="center" sx={{ fontWeight: 700, color: '#2E7D32', mb: 1 }}>
                {stats.faculty.toLocaleString()}
              </Typography>
              <Typography variant="subtitle1" align="center" sx={{ fontWeight: 600 }}>
                Faculty Members
              </Typography>
              <Typography variant="body2" align="center" color="text.secondary">
                {selectedCollege ? selectedCollege.name : 'Across All Colleges'}
              </Typography>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: '100%',
              transition: 'all 0.3s ease',
              '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
            }}
          >
            <CardActionArea onClick={() => navigate('/director/colleges')} sx={{ p: 3, height: '100%' }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: '#ED6C0220',
                  color: '#ED6C02',
                  margin: '0 auto 16px',
                }}
              >
                <Business sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="h3" align="center" sx={{ fontWeight: 700, color: '#ED6C02', mb: 1 }}>
                {selectedCollege ? stats.departments : colleges.length}
              </Typography>
              <Typography variant="subtitle1" align="center" sx={{ fontWeight: 600 }}>
                {selectedCollege ? 'Departments' : 'Colleges'}
              </Typography>
              <Typography variant="body2" align="center" color="text.secondary">
                {selectedCollege ? selectedCollege.name : 'Total Institutions'}
              </Typography>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3, height: '100%' }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: '#9C27B020',
                  color: '#9C27B0',
                  margin: '0 auto 16px',
                }}
              >
                <TrendingUp sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="h3" align="center" sx={{ fontWeight: 700, color: '#9C27B0', mb: 1 }}>
                {formatCurrency(stats.revenue)}
              </Typography>
              <Typography variant="subtitle1" align="center" sx={{ fontWeight: 600 }}>
                Monthly Revenue
              </Typography>
              <Typography variant="body2" align="center" color="text.secondary">
                {selectedCollege ? selectedCollege.name : 'Combined Revenue'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {selectedTab === 0 && (
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                All Colleges Overview
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>College</TableCell>
                      <TableCell align="center">Students</TableCell>
                      <TableCell align="center">Faculty</TableCell>
                      <TableCell align="center">Departments</TableCell>
                      <TableCell align="center">Faculty:Student Ratio</TableCell>
                      <TableCell align="right">Monthly Revenue</TableCell>
                      <TableCell align="center">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {colleges.map((college) => {
                      const ratio = (college.students / college.faculty).toFixed(1);
                      return (
                        <TableRow key={college.id} hover sx={{ cursor: 'pointer' }}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Avatar sx={{ bgcolor: college.color }}>
                                {React.cloneElement(college.icon, { sx: { fontSize: 20 } })}
                              </Avatar>
                              <Typography variant="subtitle2" fontWeight={600}>
                                {college.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="center">
                            <Chip label={college.students.toLocaleString()} color="primary" size="small" />
                          </TableCell>
                          <TableCell align="center">
                            <Chip label={college.faculty} color="success" size="small" />
                          </TableCell>
                          <TableCell align="center">{college.departments}</TableCell>
                          <TableCell align="center">
                            <Typography variant="body2" fontWeight={600}>
                              1:{ratio}
                            </Typography>
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>
                            {formatCurrency(college.revenue)}
                          </TableCell>
                          <TableCell align="center">
                            <Chip label="Active" size="small" color="success" />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, bgcolor: '#f5f5f5' }}>Total</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700, bgcolor: '#f5f5f5' }}>
                        {totalStats.students.toLocaleString()}
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700, bgcolor: '#f5f5f5' }}>
                        {totalStats.faculty}
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700, bgcolor: '#f5f5f5' }}>
                        {totalStats.departments}
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700, bgcolor: '#f5f5f5' }}>
                        1:{(totalStats.students / totalStats.faculty).toFixed(1)}
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, bgcolor: '#f5f5f5' }}>
                        {formatCurrency(totalStats.revenue)}
                      </TableCell>
                      <TableCell sx={{ bgcolor: '#f5f5f5' }} />
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      )}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          {selectedCollege ? `${selectedCollege.name} - Student Enrollment Trend` : 'University-Wide Student Enrollment Trend'}
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            {selectedCollege ? (
              <Line
                type="monotone"
                dataKey={selectedCollege.id.replace('-', '')}
                stroke={selectedCollege.color}
                name={selectedCollege.name}
                strokeWidth={3}
              />
            ) : (
              <>
                <Line type="monotone" dataKey="medical" stroke="#D32F2F" name="Medical" strokeWidth={2} />
                <Line type="monotone" dataKey="engineering" stroke="#1976D2" name="Engineering" strokeWidth={2} />
                <Line type="monotone" dataKey="dental" stroke="#0288D1" name="Dental" strokeWidth={2} />
                <Line type="monotone" dataKey="arts" stroke="#388E3C" name="Arts & Science" strokeWidth={2} />
                <Line type="monotone" dataKey="nursing" stroke="#7B1FA2" name="Nursing" strokeWidth={2} />
                <Line type="monotone" dataKey="allied" stroke="#F57C00" name="Allied Health" strokeWidth={2} />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      {selectedCollege && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Key Performance Indicators
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Student Satisfaction</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {selectedCollege.id === 'medical' ? '88%' : '85%'}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={selectedCollege.id === 'medical' ? 88 : 85}
                    sx={{ height: 8, borderRadius: 1 }}
                    color="success"
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Faculty Utilization</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {selectedCollege.id === 'medical' ? '92%' : '88%'}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={selectedCollege.id === 'medical' ? 92 : 88}
                    sx={{ height: 8, borderRadius: 1 }}
                    color="primary"
                  />
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Accreditation Compliance</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {selectedCollege.id === 'medical' ? '95%' : '90%'}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={selectedCollege.id === 'medical' ? 95 : 90}
                    sx={{ height: 8, borderRadius: 1 }}
                    color="success"
                  />
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Quick Actions
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={6}>
                  <Card
                    sx={{ bgcolor: `${selectedCollege.color}10`, cursor: 'pointer', '&:hover': { bgcolor: `${selectedCollege.color}20` } }}
                    onClick={() => navigate('/director/staff')}
                  >
                    <CardContent sx={{ textAlign: 'center', py: 3 }}>
                      <People sx={{ fontSize: 40, color: selectedCollege.color, mb: 1 }} />
                      <Typography variant="subtitle2">Manage Faculty</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card
                    sx={{ bgcolor: `${selectedCollege.color}10`, cursor: 'pointer', '&:hover': { bgcolor: `${selectedCollege.color}20` } }}
                    onClick={() => navigate('/director/students')}
                  >
                    <CardContent sx={{ textAlign: 'center', py: 3 }}>
                      <School sx={{ fontSize: 40, color: selectedCollege.color, mb: 1 }} />
                      <Typography variant="subtitle2">View Students</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card
                    sx={{ bgcolor: `${selectedCollege.color}10`, cursor: 'pointer', '&:hover': { bgcolor: `${selectedCollege.color}20` } }}
                    onClick={() => navigate('/director/colleges')}
                  >
                    <CardContent sx={{ textAlign: 'center', py: 3 }}>
                      <Business sx={{ fontSize: 40, color: selectedCollege.color, mb: 1 }} />
                      <Typography variant="subtitle2">Departments</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card
                    sx={{ bgcolor: `${selectedCollege.color}10`, cursor: 'pointer', '&:hover': { bgcolor: `${selectedCollege.color}20` } }}
                    onClick={() => navigate('/director/analytics')}
                  >
                    <CardContent sx={{ textAlign: 'center', py: 3 }}>
                      <TrendingUp sx={{ fontSize: 40, color: selectedCollege.color, mb: 1 }} />
                      <Typography variant="subtitle2">Analytics</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
