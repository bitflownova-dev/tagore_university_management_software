import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';

export default function TeacherDashboardScreen() {
  const { user } = useAuthStore();

  const stats = [
    { label: 'Classes Today', value: '3', icon: 'book-open-variant', color: '#1565C0' },
    { label: 'Total Students', value: '156', icon: 'account-group', color: '#388E3C' },
    { label: 'Pending Marks', value: '12', icon: 'clipboard-text', color: '#F57C00' },
    { label: 'Avg Attendance', value: '87%', icon: 'percent', color: '#7B1FA2' },
  ];

  const todayClasses = [
    {
      id: 1,
      course: 'BCA Year 2',
      subject: 'Data Structures',
      time: '9:00 AM - 10:30 AM',
      room: 'Lab 101',
      status: 'Upcoming',
    },
    {
      id: 2,
      course: 'BCA Year 3',
      subject: 'Database Management',
      time: '11:00 AM - 12:30 PM',
      room: 'Room 205',
      status: 'Upcoming',
    },
    {
      id: 3,
      course: 'BCA Year 1',
      subject: 'Programming in C',
      time: '2:00 PM - 3:30 PM',
      room: 'Lab 102',
      status: 'Scheduled',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Banner */}
      <View style={styles.banner}>
        <Text variant="headlineSmall" style={styles.welcomeText}>
          Welcome, {user?.firstName}!
        </Text>
        <Text variant="bodyMedium" style={styles.roleText}>
          Faculty Portal
        </Text>
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

      {/* Today's Classes */}
      <Card style={styles.card}>
        <Card.Title
          title="Today's Classes"
          left={(props) => <Avatar.Icon {...props} icon="calendar-today" />}
        />
        <Card.Content>
          {todayClasses.map((classItem) => (
            <View key={classItem.id} style={styles.classItem}>
              <View style={styles.classHeader}>
                <Text variant="titleMedium">{classItem.subject}</Text>
                <Text
                  variant="labelSmall"
                  style={[
                    styles.statusBadge,
                    classItem.status === 'Upcoming' && styles.upcomingBadge,
                  ]}
                >
                  {classItem.status}
                </Text>
              </View>
              <Text variant="bodyMedium" style={styles.course}>
                {classItem.course}
              </Text>
              <View style={styles.classDetails}>
                <MaterialCommunityIcons name="clock-outline" size={16} color="#666" />
                <Text variant="bodySmall" style={styles.detailText}>
                  {classItem.time}
                </Text>
                <MaterialCommunityIcons
                  name="map-marker-outline"
                  size={16}
                  color="#666"
                  style={{ marginLeft: 12 }}
                />
                <Text variant="bodySmall" style={styles.detailText}>
                  {classItem.room}
                </Text>
              </View>
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Quick Actions */}
      <Card style={styles.card}>
        <Card.Title
          title="Quick Actions"
          left={(props) => <Avatar.Icon {...props} icon="lightning-bolt" />}
        />
        <Card.Content>
          <View style={styles.actionsGrid}>
            <View style={styles.actionButton}>
              <Avatar.Icon size={50} icon="check-circle" style={styles.actionIcon} />
              <Text variant="labelSmall">Mark Attendance</Text>
            </View>
            <View style={styles.actionButton}>
              <Avatar.Icon size={50} icon="clipboard-text" style={styles.actionIcon} />
              <Text variant="labelSmall">Enter Marks</Text>
            </View>
            <View style={styles.actionButton}>
              <Avatar.Icon size={50} icon="file-document" style={styles.actionIcon} />
              <Text variant="labelSmall">View Payslip</Text>
            </View>
            <View style={styles.actionButton}>
              <Avatar.Icon size={50} icon="calendar" style={styles.actionIcon} />
              <Text variant="labelSmall">Apply Leave</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
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
  classItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    overflow: 'hidden',
  },
  upcomingBadge: {
    backgroundColor: '#4CAF50',
    color: '#FFFFFF',
  },
  course: {
    color: '#666',
    marginBottom: 4,
  },
  classDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  detailText: {
    marginLeft: 4,
    color: '#666',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  actionButton: {
    alignItems: 'center',
    width: '23%',
    marginVertical: 8,
  },
  actionIcon: {
    backgroundColor: '#E3F2FD',
  },
});
