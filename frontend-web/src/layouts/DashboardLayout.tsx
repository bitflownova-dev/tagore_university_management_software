import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
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
    // Medical College Student Portal has different menu
    if (currentCollege === 'medical' && currentPortalType === 'student') {
      return [
        { text: 'Dashboard', icon: <Dashboard />, path: `${collegeBasePath}/student` },
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
        { text: 'Logbook Approval', icon: <EventNote />, path: `${collegeBasePath}/teacher/logbook-approval` },
        { text: 'Mark Attendance', icon: <EventNote />, path: `${collegeBasePath}/teacher/attendance` },
        { text: 'Marks Entry', icon: <Assessment />, path: `${collegeBasePath}/teacher/marks` },
        { text: 'My Classes', icon: <Class />, path: `${collegeBasePath}/teacher/classes` },
      ];
    }

    // Medical college has specific menus for all portals
    if (currentCollege === 'medical') {
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
          { text: 'Dashboard', icon: <Dashboard />, path: `${collegeBasePath}/director` },
          { text: 'Staff Management', icon: <Badge />, path: `${collegeBasePath}/director/staff` },
          { text: 'Student Management', icon: <People />, path: `${collegeBasePath}/director/students` },
          { text: 'Colleges & Departments', icon: <Business />, path: `${collegeBasePath}/director/colleges` },
          { text: 'Analytics', icon: <BarChart />, path: `${collegeBasePath}/director/analytics` },
          { text: 'Reports', icon: <Description />, path: `${collegeBasePath}/director/reports` },
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
    <Box>
      <Toolbar
        sx={{
          bgcolor: currentPortal.color,
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 1,
          py: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {currentPortal.icon}
          <Typography variant="h6" noWrap>
            Tagore University
          </Typography>
        </Box>
        <Chip
          label={currentPortal.title}
          size="small"
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            fontWeight: 600,
          }}
        />
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                bgcolor: currentPortal.color,
                color: 'white',
                '& .MuiListItemIcon-root': {
                  color: 'white',
                },
                '&:hover': {
                  bgcolor: currentPortal.color,
                  opacity: 0.9,
                },
              },
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {currentPortal.title}
          </Typography>

          <Button
            variant="outlined"
            startIcon={<Home />}
            onClick={() => navigate(collegeBasePath)}
            sx={{
              color: 'white',
              borderColor: 'white',
              mr: 1,
              '&:hover': {
                borderColor: 'white',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Portals
          </Button>
          <Button
            variant="outlined"
            startIcon={<Home />}
            onClick={() => navigate('/')}
            sx={{
              color: 'white',
              borderColor: 'white',
              '&:hover': {
                borderColor: 'white',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Colleges
          </Button>
        </Toolbar>
      </AppBar>

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
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
          bgcolor: 'background.default',
          minHeight: '100vh',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
