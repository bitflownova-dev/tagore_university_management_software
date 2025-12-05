import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, DataTable, Chip, ProgressBar } from 'react-native-paper';

export default function StudentMarksScreen() {
  const subjects = [
    {
      id: 1,
      name: 'Data Structures',
      internal1: 18,
      internal2: 19,
      midSem: 42,
      total: 79,
      maxTotal: 100,
      grade: 'A',
    },
    {
      id: 2,
      name: 'Database Management',
      internal1: 20,
      internal2: 19,
      midSem: 46,
      total: 85,
      maxTotal: 100,
      grade: 'A+',
    },
    {
      id: 3,
      name: 'Web Technology',
      internal1: 16,
      internal2: 17,
      midSem: 38,
      total: 71,
      maxTotal: 100,
      grade: 'B+',
    },
    {
      id: 4,
      name: 'Software Engineering',
      internal1: 19,
      internal2: 18,
      midSem: 44,
      total: 81,
      maxTotal: 100,
      grade: 'A',
    },
  ];

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return '#388E3C';
    if (grade.startsWith('B')) return '#1565C0';
    if (grade.startsWith('C')) return '#F57C00';
    return '#D32F2F';
  };

  const calculatePercentage = (total: number, max: number) => {
    return ((total / max) * 100).toFixed(1);
  };

  const totalMarks = subjects.reduce((sum, subject) => sum + subject.total, 0);
  const totalMax = subjects.reduce((sum, subject) => sum + subject.maxTotal, 0);
  const percentage = calculatePercentage(totalMarks, totalMax);
  const cgpa = ((parseFloat(percentage) / 100) * 10).toFixed(2);

  return (
    <ScrollView style={styles.container}>
      {/* Overall Performance */}
      <Card style={styles.card}>
        <Card.Title title="Overall Performance" />
        <Card.Content>
          <View style={styles.overallStats}>
            <View style={styles.statBox}>
              <Text variant="headlineMedium" style={styles.statValue}>
                {percentage}%
              </Text>
              <Text variant="bodySmall">Percentage</Text>
            </View>
            <View style={styles.statBox}>
              <Text variant="headlineMedium" style={styles.statValue}>
                {cgpa}
              </Text>
              <Text variant="bodySmall">CGPA</Text>
            </View>
            <View style={styles.statBox}>
              <Text variant="headlineMedium" style={styles.gradeValue}>
                A
              </Text>
              <Text variant="bodySmall">Grade</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Subject-wise Marks */}
      <Card style={styles.card}>
        <Card.Title title="Subject-wise Marks" />
        <Card.Content>
          {subjects.map((subject) => (
            <View key={subject.id} style={styles.subjectItem}>
              <View style={styles.subjectHeader}>
                <Text variant="titleMedium">{subject.name}</Text>
                <Chip
                  mode="flat"
                  textStyle={{ color: getGradeColor(subject.grade), fontWeight: 'bold' }}
                  style={{ backgroundColor: `${getGradeColor(subject.grade)}20` }}
                >
                  {subject.grade}
                </Chip>
              </View>

              <View style={styles.marksBreakdown}>
                <View style={styles.marksItem}>
                  <Text variant="bodySmall" style={styles.marksLabel}>
                    Internal 1
                  </Text>
                  <Text variant="bodyMedium">{subject.internal1}/20</Text>
                </View>
                <View style={styles.marksItem}>
                  <Text variant="bodySmall" style={styles.marksLabel}>
                    Internal 2
                  </Text>
                  <Text variant="bodyMedium">{subject.internal2}/20</Text>
                </View>
                <View style={styles.marksItem}>
                  <Text variant="bodySmall" style={styles.marksLabel}>
                    Mid-Sem
                  </Text>
                  <Text variant="bodyMedium">{subject.midSem}/50</Text>
                </View>
              </View>

              <View style={styles.totalMarks}>
                <Text variant="titleSmall">Total: {subject.total}/{subject.maxTotal}</Text>
                <Text variant="bodySmall" style={styles.percentage}>
                  {calculatePercentage(subject.total, subject.maxTotal)}%
                </Text>
              </View>

              <ProgressBar
                progress={subject.total / subject.maxTotal}
                color={getGradeColor(subject.grade)}
                style={styles.progressBar}
              />
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Semester Info */}
      <Card style={styles.card}>
        <Card.Title title="Semester Information" />
        <Card.Content>
          <DataTable>
            <DataTable.Row>
              <DataTable.Cell>Current Semester</DataTable.Cell>
              <DataTable.Cell numeric>4th Semester</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Total Credits</DataTable.Cell>
              <DataTable.Cell numeric>24</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Credits Earned</DataTable.Cell>
              <DataTable.Cell numeric>72</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Cumulative CGPA</DataTable.Cell>
              <DataTable.Cell numeric>{cgpa}</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
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
  card: {
    margin: 12,
  },
  overallStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontWeight: 'bold',
    color: '#1565C0',
  },
  gradeValue: {
    fontWeight: 'bold',
    color: '#388E3C',
  },
  subjectItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  marksBreakdown: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 8,
  },
  marksItem: {
    alignItems: 'center',
  },
  marksLabel: {
    color: '#666',
    marginBottom: 4,
  },
  totalMarks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  percentage: {
    color: '#666',
  },
  progressBar: {
    marginTop: 8,
    height: 8,
    borderRadius: 4,
  },
});
