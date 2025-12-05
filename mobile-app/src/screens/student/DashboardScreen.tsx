import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Card, Text, Avatar, ProgressBar } from 'react-native-paper';
import { BarChart } from 'react-native-chart-kit';
import { useAuthStore } from '../../store/authStore';

const screenWidth = Dimensions.get('window').width;

export default function StudentDashboardScreen() {
  const { user } = useAuthStore();

  const stats = [
    { label: 'Attendance', value: '87%', icon: 'calendar-check', color: '#388E3C' },
    { label: 'CGPA', value: '8.60', icon: 'school', color: '#1565C0' },
    { label: 'Fee Pending', value: '₹45K', icon: 'cash', color: '#D32F2F' },
    { label: 'Semester', value: '4th', icon: 'book-open-variant', color: '#7B1FA2' },
  ];

  const subjectAttendance = [
    { subject: 'Data Structures', present: 42, total: 48, percentage: 87.5 },
    { subject: 'Database', present: 38, total: 42, percentage: 90.5 },
    { subject: 'Web Tech', present: 36, total: 45, percentage: 80.0 },
    { subject: 'Software Eng', present: 30, total: 38, percentage: 78.9 },
  ];

  const marksData = {
    labels: ['DS', 'DB', 'Web', 'SE'],
    datasets: [
      {
        data: [85, 92, 78, 88],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    color: (opacity = 1) => `rgba(21, 101, 192, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.7,
  };

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Banner */}
      <View style={styles.banner}>
        <Text variant="headlineSmall" style={styles.welcomeText}>
          Welcome, {user?.firstName}!
        </Text>
        <Text variant="bodyMedium" style={styles.roleText}>
          Student Portal
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

      {/* Subject Attendance */}
      <Card style={styles.card}>
        <Card.Title title="Subject-wise Attendance" />
        <Card.Content>
          {subjectAttendance.map((item, index) => (
            <View key={index} style={styles.attendanceItem}>
              <View style={styles.attendanceHeader}>
                <Text variant="titleSmall">{item.subject}</Text>
                <Text variant="bodySmall" style={styles.attendancePercentage}>
                  {item.percentage}%
                </Text>
              </View>
              <Text variant="bodySmall" style={styles.attendanceCount}>
                {item.present}/{item.total} classes
              </Text>
              <ProgressBar
                progress={item.percentage / 100}
                color={item.percentage >= 75 ? '#388E3C' : '#D32F2F'}
                style={styles.progressBar}
              />
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Marks Performance */}
      <Card style={styles.card}>
        <Card.Title title="Internal Marks Performance" />
        <Card.Content>
          <BarChart
            data={marksData}
            width={screenWidth - 64}
            height={220}
            chartConfig={chartConfig}
            verticalLabelRotation={0}
            fromZero
            yAxisSuffix="%"
          />
        </Card.Content>
      </Card>

      {/* Quick Actions */}
      <Card style={styles.card}>
        <Card.Title title="Quick Actions" />
        <Card.Content>
          <View style={styles.actionsGrid}>
            <View style={styles.actionButton}>
              <Avatar.Icon size={50} icon="calendar-month" style={styles.actionIcon} />
              <Text variant="labelSmall">Timetable</Text>
            </View>
            <View style={styles.actionButton}>
              <Avatar.Icon size={50} icon="cash" style={styles.actionIcon} />
              <Text variant="labelSmall">Pay Fees</Text>
            </View>
            <View style={styles.actionButton}>
              <Avatar.Icon size={50} icon="book-open-variant" style={styles.actionIcon} />
              <Text variant="labelSmall">Library</Text>
            </View>
            <View style={styles.actionButton}>
              <Avatar.Icon size={50} icon="forum" style={styles.actionIcon} />
              <Text variant="labelSmall">Support</Text>
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
  attendanceItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  attendanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attendancePercentage: {
    fontWeight: 'bold',
    color: '#1565C0',
  },
  attendanceCount: {
    color: '#666',
    marginTop: 4,
  },
  progressBar: {
    marginTop: 8,
    height: 8,
    borderRadius: 4,
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
