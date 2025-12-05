import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Card,
  Text,
  List,
  Button,
  Checkbox,
  Dialog,
  Portal,
  RadioButton,
} from 'react-native-paper';

interface Student {
  id: number;
  rollNo: string;
  name: string;
  status: 'Present' | 'Absent' | 'Late' | null;
}

export default function TeacherAttendanceScreen() {
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [students, setStudents] = useState<Student[]>([
    { id: 1, rollNo: 'BCA21001', name: 'Aarav Kumar', status: null },
    { id: 2, rollNo: 'BCA21002', name: 'Ananya Sharma', status: null },
    { id: 3, rollNo: 'BCA21003', name: 'Rohan Patel', status: null },
    { id: 4, rollNo: 'BCA21004', name: 'Priya Singh', status: null },
  ]);

  const classes = [
    { id: 1, name: 'BCA Year 2 - Data Structures', time: '9:00 AM', students: 42 },
    { id: 2, name: 'BCA Year 3 - Database', time: '11:00 AM', students: 38 },
    { id: 3, name: 'BCA Year 1 - Programming in C', time: '2:00 PM', students: 45 },
  ];

  const handleClassSelect = (classId: number) => {
    setSelectedClass(classId);
    setDialogVisible(true);
  };

  const handleStatusChange = (studentId: number, status: 'Present' | 'Absent' | 'Late') => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, status } : student
      )
    );
  };

  const handleMarkAll = (status: 'Present' | 'Absent') => {
    setStudents((prev) => prev.map((student) => ({ ...student, status })));
  };

  const handleSubmit = () => {
    // TODO: Submit to API
    console.log('Submitting attendance:', students);
    setDialogVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Title title="Select Class for Attendance" />
          <Card.Content>
            {classes.map((classItem) => (
              <List.Item
                key={classItem.id}
                title={classItem.name}
                description={`${classItem.time} • ${classItem.students} students`}
                left={(props) => <List.Icon {...props} icon="school" />}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => handleClassSelect(classItem.id)}
                style={styles.listItem}
              />
            ))}
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title title="Recent Attendance" />
          <Card.Content>
            <View style={styles.historyItem}>
              <Text variant="titleMedium">BCA Year 2 - Data Structures</Text>
              <Text variant="bodySmall" style={styles.historyDate}>
                Today, 9:00 AM
              </Text>
              <View style={styles.historyStats}>
                <Text style={styles.presentText}>Present: 38</Text>
                <Text style={styles.absentText}>Absent: 4</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Attendance Dialog */}
      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => setDialogVisible(false)}
          style={styles.dialog}
        >
          <Dialog.Title>Mark Attendance</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView style={styles.dialogScroll}>
              <View style={styles.quickActions}>
                <Button
                  mode="contained-tonal"
                  onPress={() => handleMarkAll('Present')}
                  style={styles.quickButton}
                >
                  Mark All Present
                </Button>
                <Button
                  mode="contained-tonal"
                  onPress={() => handleMarkAll('Absent')}
                  style={styles.quickButton}
                >
                  Mark All Absent
                </Button>
              </View>

              {students.map((student) => (
                <View key={student.id} style={styles.studentRow}>
                  <View style={styles.studentInfo}>
                    <Text variant="titleSmall">{student.name}</Text>
                    <Text variant="bodySmall" style={styles.rollNo}>
                      {student.rollNo}
                    </Text>
                  </View>
                  <RadioButton.Group
                    onValueChange={(value) =>
                      handleStatusChange(student.id, value as any)
                    }
                    value={student.status || ''}
                  >
                    <View style={styles.radioGroup}>
                      <View style={styles.radioItem}>
                        <RadioButton value="Present" />
                        <Text>P</Text>
                      </View>
                      <View style={styles.radioItem}>
                        <RadioButton value="Absent" />
                        <Text>A</Text>
                      </View>
                      <View style={styles.radioItem}>
                        <RadioButton value="Late" />
                        <Text>L</Text>
                      </View>
                    </View>
                  </RadioButton.Group>
                </View>
              ))}
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>Cancel</Button>
            <Button mode="contained" onPress={handleSubmit}>
              Submit
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  historyItem: {
    paddingVertical: 8,
  },
  historyDate: {
    color: '#666',
    marginTop: 4,
  },
  historyStats: {
    flexDirection: 'row',
    marginTop: 8,
  },
  presentText: {
    color: '#388E3C',
    marginRight: 16,
  },
  absentText: {
    color: '#D32F2F',
  },
  dialog: {
    maxHeight: '80%',
  },
  dialogScroll: {
    paddingHorizontal: 0,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  quickButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  studentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  studentInfo: {
    flex: 1,
  },
  rollNo: {
    color: '#666',
    marginTop: 2,
  },
  radioGroup: {
    flexDirection: 'row',
  },
  radioItem: {
    alignItems: 'center',
    marginLeft: 8,
  },
});
