import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  Dashboard,
  People,
  EventNote,
  Assessment,
  Home,
  School,
  BusinessCenter,
  Person,
  FamilyRestroom,
  Engineering,
  AccountBalance,
  Badge,
  SchoolOutlined,
  Business,
  BarChart,
  Description,
  LibraryBooks,
  Class,
  AccountBalanceWallet,
  ChildCare,
  Groups,
  MonetizationOn,
  Receipt,
  VideoLibrary,
  Work,
  AdminPanelSettings,
} from '@mui/icons-material';

const drawerWidth = 260;

const portalConfig: Record<string, { title: string; icon: React.ReactNode; color: string }> = {
  '/director': { title: 'Director Portal', icon: <BusinessCenter />, color: '#0D47A1' },
  '/principal': { title: 'Principal Portal', icon: <School />, color: '#1565C0' },
  '/teacher': { title: 'Teacher Portal', icon: <Person />, color: '#1976D2' },
  '/student': { title: 'Student Portal', icon: <People />, color: '#42A5F5' },
  '/parent': { title: 'Parent Portal', icon: <FamilyRestroom />, color: '#64B5F6' },
  '/hr': { title: 'HR Portal', icon: <Engineering />, color: '#388E3C' },
  '/accountant': { title: 'Accountant Portal', icon: <AccountBalance />, color: '#FFA726' },
};

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Get current college and portal info
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const currentCollege = pathSegments[0] || 'medical'; // medical, engineering, etc.
  const currentPortalType = pathSegments[1] || 'director'; // director, principal, etc.
  const currentPortalPath = `/${currentPortalType}`;
  const currentPortal = portalConfig[currentPortalPath] || portalConfig['/director'];

  // Get college base path
  const collegeBasePath = `/${currentCollege}`;

  // Dynamic menu items based on portal and college
  const getMenuItems = () => {
    // Medical College Student Portal
    if (currentCollege === 'medical' && currentPortalType === 'student') {
      return [
        { text: 'Dashboard', icon: <Dashboard />, path: `${collegeBasePath}/student` },
        { text: 'Learning Portal', icon: <VideoLibrary />, path: `${collegeBasePath}/student/lms` },
        { text: 'Competency Browser', icon: <LibraryBooks />, path: `${collegeBasePath}/student/competencies` },
        { text: 'Clinical Logbook', icon: <EventNote />, path: `${collegeBasePath}/student/logbook` },
        { text: 'Assessments', icon: <Assessment />, path: `${collegeBasePath}/student/assessments` },
        { text: 'Clinical Rotations', icon: <Class />, path: `${collegeBasePath}/student/rotations` },
        { text: 'Fee Payments', icon: <AccountBalanceWallet />, path: `${collegeBasePath}/student/fees` },
      ];
    }

    // Medical College Teacher Portal has different menu
    if (currentCollege === 'medical' && currentPortalType === 'teacher') {
      return [
        { text: 'Dashboard', icon: <Dashboard />, path: `${collegeBasePath}/teacher` },
        { text: 'Learning Portal', icon: <VideoLibrary />, path: `${collegeBasePath}/teacher/lms` },
        { text: 'Logbook Approval', icon: <EventNote />, path: `${collegeBasePath}/teacher/logbook-approval` },
        { text: 'Mark Attendance', icon: <EventNote />, path: `${collegeBasePath}/teacher/attendance` },
        { text: 'Marks Entry', icon: <Assessment />, path: `${collegeBasePath}/teacher/marks` },
        { text: 'My Classes', icon: <Class />, path: `${collegeBasePath}/teacher/classes` },
      ];
    }

    // All colleges have the same menu structure as Medical college
    if (['medical', 'engineering', 'arts-science', 'dental', 'nursing', 'allied-health'].includes(currentCollege)) {
      switch (currentPortalType) {
        case 'director':
          return [
            { text: 'Dashboard', icon: <Dashboard />, path: `${collegeBasePath}/director` },
            { text: 'Faculty Management', icon: <Badge />, path: `${collegeBasePath}/director/staff` },
            { text: 'Student Management', icon: <People />, path: `${collegeBasePath}/director/students` },
            { text: 'Colleges & Departments', icon: <Business />, path: `${collegeBasePath}/director/colleges` },
            { text: 'Analytics', icon: <BarChart />, path: `${collegeBasePath}/director/analytics` },
            { text: 'Reports', icon: <Description />, path: `${collegeBasePath}/director/reports` },
          ];
        case 'principal':
          return [
            { text: 'Dashboard', icon: <Dashboard />, path: `${collegeBasePath}/principal` },
            { text: 'Academic Calendar', icon: <LibraryBooks />, path: `${collegeBasePath}/principal/academic` },
            { text: 'Faculty Management', icon: <SchoolOutlined />, path: `${collegeBasePath}/principal/faculty` },
            { text: 'Student Records', icon: <People />, path: `${collegeBasePath}/principal/students` },
            { text: 'Departments', icon: <Business />, path: `${collegeBasePath}/principal/departments` },
            { text: 'Reports', icon: <Description />, path: `${collegeBasePath}/principal/reports` },
            { text: 'Analytics', icon: <BarChart />, path: `${collegeBasePath}/principal/analytics` },
          ];
        case 'hr':
          return [
            { text: 'Dashboard', icon: <Dashboard />, path: `${collegeBasePath}/hr` },
            { text: 'Employee Directory', icon: <Groups />, path: `${collegeBasePath}/hr/employees` },
            { text: 'Payroll Management', icon: <MonetizationOn />, path: `${collegeBasePath}/hr/payroll` },
          ];
        case 'accountant':
          return [
            { text: 'Dashboard', icon: <Dashboard />, path: `${collegeBasePath}/accountant` },
            { text: 'Fee Collection', icon: <Receipt />, path: `${collegeBasePath}/accountant/collection` },
          ];
      }
    }

    // Other portals have standard menu based on portal type
    switch (currentPortalType) {
      case 'director':
        return [
          { text: 'Dashboard', icon: <Dashboard />, path: '/director/dashboard' },
          { text: 'Faculty Management', icon: <Badge />, path: '/director/staff' },
          { text: 'Student Management', icon: <People />, path: '/director/students' },
          { text: 'Colleges & Departments', icon: <Business />, path: '/director/colleges' },
          { text: 'Analytics', icon: <BarChart />, path: '/director/analytics' },
          { text: 'Reports', icon: <Description />, path: '/director/reports' },
        ];
      case 'principal':
        return [
          { text: 'Dashboard', icon: <Dashboard />, path: `${collegeBasePath}/principal` },
          { text: 'Academic Management', icon: <LibraryBooks />, path: `${collegeBasePath}/principal/academic` },
          { text: 'Faculty Management', icon: <SchoolOutlined />, path: `${collegeBasePath}/principal/faculty` },
          { text: 'Student Records', icon: <People />, path: `${collegeBasePath}/principal/students` },
        ];
      case 'teacher':
        return [
          { text: 'Dashboard', icon: <Dashboard />, path: `${collegeBasePath}/teacher` },
          { text: 'Mark Attendance', icon: <EventNote />, path: `${collegeBasePath}/teacher/attendance` },
          { text: 'Marks Entry', icon: <Assessment />, path: `${collegeBasePath}/teacher/marks` },
          { text: 'My Classes', icon: <Class />, path: `${collegeBasePath}/teacher/classes` },
        ];
      case 'student':
        // Engineering/other students
        return [
          { text: 'Dashboard', icon: <Dashboard />, path: `${collegeBasePath}/student` },
          { text: 'My Attendance', icon: <EventNote />, path: `${collegeBasePath}/student/attendance` },
          { text: 'My Marks', icon: <Assessment />, path: `${collegeBasePath}/student/marks` },
          { text: 'Fee Payments', icon: <AccountBalanceWallet />, path: `${collegeBasePath}/student/fees` },
        ];
      case 'parent':
        return [
          { text: 'Dashboard', icon: <Dashboard />, path: `${collegeBasePath}/parent` },
          { text: 'Children Management', icon: <ChildCare />, path: `${collegeBasePath}/parent/children` },
        ];
      case 'hr':
        return [
          { text: 'Dashboard', icon: <Dashboard />, path: `${collegeBasePath}/hr` },
          { text: 'Employee Directory', icon: <Groups />, path: `${collegeBasePath}/hr/employees` },
          { text: 'Payroll Management', icon: <MonetizationOn />, path: `${collegeBasePath}/hr/payroll` },
        ];
      case 'accountant':
        return [
          { text: 'Dashboard', icon: <Dashboard />, path: `${collegeBasePath}/accountant` },
          { text: 'Fee Collection', icon: <Receipt />, path: `${collegeBasePath}/accountant/collection` },
        ];
      default:
        return [
          { text: 'Dashboard', icon: <Dashboard />, path: collegeBasePath },
        ];
    }
  };

  const menuItems = getMenuItems();

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Modern Sidebar Header */}
      <Box
        sx={{
          p: 3,
          bgcolor: 'white',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: currentPortal.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
            }}
          >
            {currentPortal.icon}
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1A202C', lineHeight: 1.2 }}>
              Tagore University
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B' }}>
              {currentCollege.charAt(0).toUpperCase() + currentCollege.slice(1)}
            </Typography>
          </Box>
        </Box>
        
        <Chip
          label={currentPortal.title}
          sx={{
            width: '100%',
            bgcolor: `${currentPortal.color}15`,
            color: currentPortal.color,
            fontWeight: 700,
            fontSize: '0.875rem',
            height: 36,
            borderRadius: 2,
            border: `1px solid ${currentPortal.color}30`,
          }}
        />

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button
            size="small"
            startIcon={<Home />}
            onClick={() => navigate(collegeBasePath)}
            sx={{
              flex: 1,
              color: '#64748B',
              bgcolor: '#F8FBFD',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.75rem',
              borderRadius: 1.5,
              '&:hover': {
                bgcolor: '#E2E8F0',
              },
            }}
          >
            Portals
          </Button>
          <Button
            size="small"
            startIcon={<AccountBalance />}
            onClick={() => navigate('/')}
            sx={{
              flex: 1,
              color: '#64748B',
              bgcolor: '#F8FBFD',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.75rem',
              borderRadius: 1.5,
              '&:hover': {
                bgcolor: '#E2E8F0',
              },
            }}
          >
            Colleges
          </Button>
        </Box>
      </Box>

      {/* Menu Items */}
      <List sx={{ flex: 1, py: 2 }}>
        {menuItems.map((item, index) => {
          if (item.text === 'divider') {
            return (
              <Box
                key={`divider-${index}`}
                sx={{
                  height: 1,
                  bgcolor: 'rgba(0,0,0,0.08)',
                  mx: 2,
                  my: 1.5,
                }}
              />
            );
          }
          
          return (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                mx: 1.5,
                mb: 0.5,
                borderRadius: 2,
                '&.Mui-selected': {
                  bgcolor: `${currentPortal.color}15`,
                  color: currentPortal.color,
                  '& .MuiListItemIcon-root': {
                    color: currentPortal.color,
                  },
                  '&:hover': {
                    bgcolor: `${currentPortal.color}20`,
                  },
                },
                '&:hover': {
                  bgcolor: '#F8FBFD',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: location.pathname === item.path ? 700 : 500,
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F8FBFD' }}>
      {/* Desktop Sidebar - Always visible */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              bgcolor: 'white',
              border: 'none',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              bgcolor: 'white',
              border: 'none',
              borderRight: '1px solid rgba(0,0,0,0.08)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content Area - No AppBar/Blue Header */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          bgcolor: '#F8FBFD',
          minHeight: '100vh',
          p: 0,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
