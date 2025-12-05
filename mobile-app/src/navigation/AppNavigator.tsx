import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';

// Teacher Screens
import TeacherDashboardScreen from '../screens/teacher/DashboardScreen';
import TeacherAttendanceScreen from '../screens/teacher/AttendanceScreen';
import TeacherMarksScreen from '../screens/teacher/MarksScreen';
import TeacherProfileScreen from '../screens/teacher/ProfileScreen';

// Student Screens
import StudentDashboardScreen from '../screens/student/DashboardScreen';
import StudentAttendanceScreen from '../screens/student/AttendanceScreen';
import StudentMarksScreen from '../screens/student/MarksScreen';
import StudentFeesScreen from '../screens/student/FeesScreen';
import StudentProfileScreen from '../screens/student/ProfileScreen';

// Parent Screens
import ParentDashboardScreen from '../screens/parent/DashboardScreen';
import ParentChildrenScreen from '../screens/parent/ChildrenScreen';
import ParentNotificationsScreen from '../screens/parent/NotificationsScreen';
import ParentProfileScreen from '../screens/parent/ProfileScreen';

import { useAuthStore } from '../store/authStore';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Teacher Bottom Tabs
function TeacherTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
          } else if (route.name === 'Attendance') {
            iconName = focused ? 'check-circle' : 'check-circle-outline';
          } else if (route.name === 'Marks') {
            iconName = focused ? 'clipboard-text' : 'clipboard-text-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          } else {
            iconName = 'circle';
          }

          return <MaterialCommunityIcons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1565C0',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Dashboard" component={TeacherDashboardScreen} />
      <Tab.Screen name="Attendance" component={TeacherAttendanceScreen} />
      <Tab.Screen name="Marks" component={TeacherMarksScreen} />
      <Tab.Screen name="Profile" component={TeacherProfileScreen} />
    </Tab.Navigator>
  );
}

// Student Bottom Tabs
function StudentTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
          } else if (route.name === 'Attendance') {
            iconName = focused ? 'calendar-check' : 'calendar-check-outline';
          } else if (route.name === 'Marks') {
            iconName = focused ? 'school' : 'school-outline';
          } else if (route.name === 'Fees') {
            iconName = focused ? 'cash' : 'cash-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          } else {
            iconName = 'circle';
          }

          return <MaterialCommunityIcons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1565C0',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Dashboard" component={StudentDashboardScreen} />
      <Tab.Screen name="Attendance" component={StudentAttendanceScreen} />
      <Tab.Screen name="Marks" component={StudentMarksScreen} />
      <Tab.Screen name="Fees" component={StudentFeesScreen} />
      <Tab.Screen name="Profile" component={StudentProfileScreen} />
    </Tab.Navigator>
  );
}

// Parent Bottom Tabs
function ParentTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
          } else if (route.name === 'Children') {
            iconName = focused ? 'account-multiple' : 'account-multiple-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'bell' : 'bell-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          } else {
            iconName = 'circle';
          }

          return <MaterialCommunityIcons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1565C0',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Dashboard" component={ParentDashboardScreen} />
      <Tab.Screen name="Children" component={ParentChildrenScreen} />
      <Tab.Screen name="Notifications" component={ParentNotificationsScreen} />
      <Tab.Screen name="Profile" component={ParentProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          {user?.primaryRoleId === 4 && (
            <Stack.Screen name="TeacherHome" component={TeacherTabs} />
          )}
          {user?.primaryRoleId === 5 && (
            <Stack.Screen name="StudentHome" component={StudentTabs} />
          )}
          {user?.primaryRoleId === 6 && (
            <Stack.Screen name="ParentHome" component={ParentTabs} />
          )}
        </>
      )}
    </Stack.Navigator>
  );
}
