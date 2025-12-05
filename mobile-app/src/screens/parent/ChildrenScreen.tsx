import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Avatar, List, ProgressBar, Chip } from 'react-native-paper';

export default function ParentChildrenScreen() {
  const children = [
    {
      id: 1,
      name: 'Aarav Kumar',
      rollNo: 'BCA21001',
      course: 'BCA Year 2',
      attendance: 87,
      cgpa: 8.6,
      feePending: 5000,
      photo: 'AK',
    },
    {
      id: 2,
      name: 'Ananya Kumar',
      rollNo: 'BCM22015',
      course: 'B.Com Year 1',
      attendance: 92,
      cgpa: 9.1,
      feePending: 0,
      photo: 'AN',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {children.map((child) => (
        <Card key={child.id} style={styles.card}>
          <Card.Content>
            {/* Child Header */}
            <View style={styles.header}>
              <Avatar.Text size={60} label={child.photo} />
              <View style={styles.headerInfo}>
                <Text variant="titleLarge">{child.name}</Text>
                <Text variant="bodyMedium" style={styles.rollNo}>
                  {child.rollNo}
                </Text>
                <Text variant="bodySmall" style={styles.course}>
                  {child.course}
                </Text>
              </View>
            </View>

            {/* Performance Metrics */}
            <View style={styles.metrics}>
              <View style={styles.metricItem}>
                <Text variant="labelSmall" style={styles.metricLabel}>
                  Attendance
                </Text>
                <View style={styles.metricValue}>
                  <Text variant="headlineSmall" style={styles.attendanceValue}>
                    {child.attendance}%
                  </Text>
                  <ProgressBar
                    progress={child.attendance / 100}
                    color={child.attendance >= 75 ? '#388E3C' : '#D32F2F'}
                    style={styles.progressBar}
                  />
                </View>
              </View>

              <View style={styles.metricItem}>
                <Text variant="labelSmall" style={styles.metricLabel}>
                  CGPA
                </Text>
                <Text variant="headlineSmall" style={styles.cgpaValue}>
                  {child.cgpa}
                </Text>
              </View>

              <View style={styles.metricItem}>
                <Text variant="labelSmall" style={styles.metricLabel}>
                  Fee Status
                </Text>
                {child.feePending > 0 ? (
                  <View>
                    <Text variant="titleMedium" style={styles.feePending}>
                      ₹{child.feePending.toLocaleString()}
                    </Text>
                    <Text variant="bodySmall" style={styles.feeLabel}>
                      Pending
                    </Text>
                  </View>
                ) : (
                  <Chip mode="flat" style={styles.feePaidChip}>
                    All Paid
                  </Chip>
                )}
              </View>
            </View>

            {/* Quick Actions */}
            <View style={styles.actions}>
              <List.Item
                title="View Attendance"
                left={(props: any) => <List.Icon {...props} icon="calendar-check" />}
                right={(props: any) => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => {}}
                style={styles.actionItem}
              />
              <List.Item
                title="View Marks"
                left={(props: any) => <List.Icon {...props} icon="clipboard-text" />}
                right={(props: any) => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => {}}
                style={styles.actionItem}
              />
              <List.Item
                title="Fee Details"
                left={(props: any) => <List.Icon {...props} icon="cash" />}
                right={(props: any) => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => {}}
                style={styles.actionItem}
              />
            </View>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  card: {
    margin: 12,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  headerInfo: {
    marginLeft: 16,
    justifyContent: 'center',
  },
  rollNo: {
    color: '#666',
    marginTop: 4,
  },
  course: {
    color: '#999',
    marginTop: 2,
  },
  metrics: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 16,
  },
  metricItem: {
    marginBottom: 16,
  },
  metricLabel: {
    color: '#666',
    marginBottom: 8,
  },
  metricValue: {
    width: '100%',
  },
  attendanceValue: {
    color: '#388E3C',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  cgpaValue: {
    color: '#1565C0',
    fontWeight: 'bold',
  },
  feePending: {
    color: '#D32F2F',
    fontWeight: 'bold',
  },
  feeLabel: {
    color: '#666',
    marginTop: 2,
  },
  feePaidChip: {
    backgroundColor: '#E8F5E9',
    alignSelf: 'flex-start',
  },
  actions: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 8,
  },
  actionItem: {
    paddingHorizontal: 0,
  },
});
