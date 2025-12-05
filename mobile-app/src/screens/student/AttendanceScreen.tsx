import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, DataTable, Chip, SegmentedButtons } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';

export default function StudentAttendanceScreen() {
  const [viewMode, setViewMode] = useState('calendar');

  const attendanceRecords = [
    { id: 1, date: '2024-01-15', subject: 'Data Structures', status: 'Present' },
    { id: 2, date: '2024-01-15', subject: 'Database', status: 'Present' },
    { id: 3, date: '2024-01-14', subject: 'Web Tech', status: 'Absent' },
    { id: 4, date: '2024-01-14', subject: 'Software Eng', status: 'Present' },
    { id: 5, date: '2024-01-13', subject: 'Data Structures', status: 'Late' },
  ];

  const markedDates = {
    '2024-01-15': { marked: true, dotColor: '#388E3C' },
    '2024-01-14': { marked: true, dotColor: '#D32F2F' },
    '2024-01-13': { marked: true, dotColor: '#F57C00' },
    '2024-01-12': { marked: true, dotColor: '#388E3C' },
    '2024-01-11': { marked: true, dotColor: '#388E3C' },
  };

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
    <View style={styles.container}>
      <ScrollView>
        {/* Stats Card */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text variant="headlineSmall" style={styles.presentStat}>
                  87%
                </Text>
                <Text variant="bodySmall">Overall</Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="headlineSmall" style={styles.presentCount}>
                  156
                </Text>
                <Text variant="bodySmall">Present</Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="headlineSmall" style={styles.absentCount}>
                  18
                </Text>
                <Text variant="bodySmall">Absent</Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="headlineSmall" style={styles.lateCount}>
                  6
                </Text>
                <Text variant="bodySmall">Late</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* View Mode Toggle */}
        <SegmentedButtons
          value={viewMode}
          onValueChange={setViewMode}
          buttons={[
            { value: 'calendar', label: 'Calendar' },
            { value: 'list', label: 'List' },
          ]}
          style={styles.segmentedButtons}
        />

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <Card style={styles.card}>
            <Card.Content>
              <Calendar
                markedDates={markedDates}
                theme={{
                  selectedDayBackgroundColor: '#1565C0',
                  todayTextColor: '#1565C0',
                  arrowColor: '#1565C0',
                }}
              />
              <View style={styles.legend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#388E3C' }]} />
                  <Text variant="bodySmall">Present</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#D32F2F' }]} />
                  <Text variant="bodySmall">Absent</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#F57C00' }]} />
                  <Text variant="bodySmall">Late</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <Card style={styles.card}>
            <Card.Title title="Recent Attendance" />
            <Card.Content>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Date</DataTable.Title>
                  <DataTable.Title>Subject</DataTable.Title>
                  <DataTable.Title>Status</DataTable.Title>
                </DataTable.Header>

                {attendanceRecords.map((record) => (
                  <DataTable.Row key={record.id}>
                    <DataTable.Cell>{record.date}</DataTable.Cell>
                    <DataTable.Cell>{record.subject}</DataTable.Cell>
                    <DataTable.Cell>
                      <Chip
                        mode="flat"
                        textStyle={{ color: getStatusColor(record.status) }}
                        style={{ backgroundColor: `${getStatusColor(record.status)}20` }}
                      >
                        {record.status}
                      </Chip>
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
              </DataTable>
            </Card.Content>
          </Card>
        )}
      </ScrollView>
    </View>
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
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  presentStat: {
    color: '#388E3C',
    fontWeight: 'bold',
  },
  presentCount: {
    color: '#388E3C',
  },
  absentCount: {
    color: '#D32F2F',
  },
  lateCount: {
    color: '#F57C00',
  },
  segmentedButtons: {
    margin: 12,
    marginTop: 8,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
});
