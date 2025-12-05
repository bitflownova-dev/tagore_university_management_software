import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Avatar, Menu, Button, List, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';

export default function ParentDashboardScreen() {
  const { user } = useAuthStore();
  const [selectedChild, setSelectedChild] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);

  const children = [
    { id: 1, name: 'Aarav Kumar', course: 'BCA Year 2', rollNo: 'BCA21001' },
    { id: 2, name: 'Ananya Kumar', course: 'B.Com Year 1', rollNo: 'BCM22015' },
  ];

  const currentChild = children[selectedChild];

  const stats = [
    { label: 'Attendance', value: '87%', icon: 'calendar-check', color: '#388E3C' },
    { label: 'CGPA', value: '8.60', icon: 'school', color: '#1565C0' },
    { label: 'Fee Pending', value: '₹5K', icon: 'cash', color: '#F57C00' },
    { label: 'Notifications', value: '3', icon: 'bell', color: '#7B1FA2' },
  ];

  const notifications = [
    {
      id: 1,
      type: 'absence',
      title: 'Absence Alert',
      message: `${currentChild.name} was marked absent in Data Structures class`,
      time: '2 hours ago',
      icon: 'alert-circle',
      iconColor: '#D32F2F',
    },
    {
      id: 2,
      type: 'marks',
      title: 'Marks Published',
      message: 'Mid-semester exam marks have been published',
      time: '1 day ago',
      icon: 'clipboard-text',
      iconColor: '#1565C0',
    },
    {
      id: 3,
      type: 'fee',
      title: 'Fee Reminder',
      message: 'Library fee of ₹5,000 is due on 15th Feb',
      time: '2 days ago',
      icon: 'cash-multiple',
      iconColor: '#F57C00',
    },
  ];

  const recentAttendance = [
    { date: '2024-01-15', subject: 'Data Structures', status: 'Present' },
    { date: '2024-01-15', subject: 'Database', status: 'Present' },
    { date: '2024-01-14', subject: 'Web Tech', status: 'Absent' },
    { date: '2024-01-14', subject: 'Software Eng', status: 'Present' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present':
        return '#388E3C';
      case 'Absent':
        return '#D32F2F';
      case 'Late':
        return '#F57C00';
      default:
        return '#666';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Banner with Child Selector */}
      <View style={styles.banner}>
        <Text variant="headlineSmall" style={styles.welcomeText}>
          Welcome, {user?.firstName}!
        </Text>
        <Text variant="bodyMedium" style={styles.roleText}>
          Parent Portal
        </Text>

        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button
              mode="contained-tonal"
              onPress={() => setMenuVisible(true)}
              style={styles.childSelector}
              icon="account"
              contentStyle={styles.childSelectorContent}
            >
              {currentChild.name} - {currentChild.course}
            </Button>
          }
        >
          {children.map((child, index) => (
            <Menu.Item
              key={child.id}
              onPress={() => {
                setSelectedChild(index);
                setMenuVisible(false);
              }}
              title={`${child.name} - ${child.course}`}
            />
          ))}
        </Menu>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <Card key={index} style={styles.statCard}>
            <Card.Content style={styles.statContent}>
              <Avatar.Icon
                size={40}
                icon={stat.icon as any}
                style={{ backgroundColor: stat.color }}
              />
              <Text variant="headlineMedium" style={styles.statValue}>
                {stat.value}
              </Text>
              <Text variant="bodySmall" style={styles.statLabel}>
                {stat.label}
              </Text>
            </Card.Content>
          </Card>
        ))}
      </View>

      {/* Notifications */}
      <Card style={styles.card}>
        <Card.Title
          title="Recent Notifications"
          left={(props: any) => <Avatar.Icon {...props} icon="bell" />}
        />
        <Card.Content>
          {notifications.map((notification) => (
            <List.Item
              key={notification.id}
              title={notification.title}
              description={notification.message}
              left={(props: any) => (
                <Avatar.Icon
                  {...props}
                  icon={notification.icon}
                  size={40}
                  style={{ backgroundColor: `${notification.iconColor}20` }}
                  color={notification.iconColor}
                />
              )}
              right={() => (
                <Text variant="bodySmall" style={styles.notificationTime}>
                  {notification.time}
                </Text>
              )}
              style={styles.notificationItem}
            />
          ))}
        </Card.Content>
      </Card>

      {/* Recent Attendance */}
      <Card style={styles.card}>
        <Card.Title
          title="Recent Attendance"
          left={(props: any) => <Avatar.Icon {...props} icon="calendar-check" />}
        />
        <Card.Content>
          {recentAttendance.map((record, index) => (
            <View key={index} style={styles.attendanceItem}>
              <View style={styles.attendanceInfo}>
                <Text variant="titleSmall">{record.subject}</Text>
                <Text variant="bodySmall" style={styles.attendanceDate}>
                  {record.date}
                </Text>
              </View>
              <Chip
                mode="flat"
                textStyle={{ color: getStatusColor(record.status) }}
                style={{ backgroundColor: `${getStatusColor(record.status)}20` }}
              >
                {record.status}
              </Chip>
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Alert Info */}
      <Card style={styles.card} mode="elevated">
        <Card.Content>
          <View style={styles.alertInfo}>
            <MaterialCommunityIcons name="information" size={24} color="#1565C0" />
            <Text variant="bodyMedium" style={styles.alertText}>
              You will receive instant push notifications when {currentChild.name} is marked
              absent or when marks are published.
            </Text>
          </View>
        </Card.Content>
      </Card>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  banner: {
    backgroundColor: '#1565C0',
    padding: 20,
    paddingTop: 40,
  },
  welcomeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  roleText: {
    color: '#E3F2FD',
    marginTop: 4,
  },
  childSelector: {
    marginTop: 12,
    backgroundColor: '#FFFFFF',
  },
  childSelectorContent: {
    flexDirection: 'row-reverse',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  statCard: {
    width: '48%',
    margin: '1%',
  },
  statContent: {
    alignItems: 'center',
  },
  statValue: {
    marginTop: 8,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#666',
    textAlign: 'center',
  },
  card: {
    margin: 12,
    marginTop: 8,
  },
  notificationItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  notificationTime: {
    color: '#666',
    marginTop: 8,
  },
  attendanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  attendanceInfo: {
    flex: 1,
  },
  attendanceDate: {
    color: '#666',
    marginTop: 2,
  },
  alertInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertText: {
    flex: 1,
    marginLeft: 12,
    color: '#666',
  },
});
