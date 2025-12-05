import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Card,
  Text,
  List,
  Button,
  TextInput,
  Dialog,
  Portal,
  DataTable,
} from 'react-native-paper';

interface Student {
  id: number;
  rollNo: string;
  name: string;
  marks: number | null;
}

export default function TeacherMarksScreen() {
  const [selectedExam, setSelectedExam] = useState<number | null>(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [students, setStudents] = useState<Student[]>([
    { id: 1, rollNo: 'BCA21001', name: 'Aarav Kumar', marks: null },
    { id: 2, rollNo: 'BCA21002', name: 'Ananya Sharma', marks: null },
    { id: 3, rollNo: 'BCA21003', name: 'Rohan Patel', marks: null },
  ]);

  const exams = [
    { id: 1, name: 'Mid-Semester Exam', subject: 'Data Structures', maxMarks: 50 },
    { id: 2, name: 'Internal Assessment 1', subject: 'Database', maxMarks: 20 },
    { id: 3, name: 'Final Exam', subject: 'Programming in C', maxMarks: 100 },
  ];

  const handleExamSelect = (examId: number) => {
    setSelectedExam(examId);
    setDialogVisible(true);
  };

  const handleMarksChange = (studentId: number, marks: string) => {
    const marksNum = parseInt(marks, 10);
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId
          ? { ...student, marks: isNaN(marksNum) ? null : marksNum }
          : student
      )
    );
  };

  const handleSubmit = () => {
    // TODO: Submit to API
    console.log('Submitting marks:', students);
    setDialogVisible(false);
  };

  const getPercentage = (marks: number | null, maxMarks: number) => {
    if (marks === null) return '-';
    return ((marks / maxMarks) * 100).toFixed(2) + '%';
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Title title="Select Exam for Marks Entry" />
          <Card.Content>
            {exams.map((exam) => (
              <List.Item
                key={exam.id}
                title={exam.name}
                description={`${exam.subject} • Max Marks: ${exam.maxMarks}`}
                left={(props) => <List.Icon {...props} icon="clipboard-text" />}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => handleExamSelect(exam.id)}
                style={styles.listItem}
              />
            ))}
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title title="Recent Marks Entries" />
          <Card.Content>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Exam</DataTable.Title>
                <DataTable.Title numeric>Students</DataTable.Title>
                <DataTable.Title>Status</DataTable.Title>
              </DataTable.Header>

              <DataTable.Row>
                <DataTable.Cell>Mid-Sem Exam</DataTable.Cell>
                <DataTable.Cell numeric>42</DataTable.Cell>
                <DataTable.Cell>
                  <Text style={styles.completedText}>Completed</Text>
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Internal 1</DataTable.Cell>
                <DataTable.Cell numeric>38</DataTable.Cell>
                <DataTable.Cell>
                  <Text style={styles.pendingText}>Pending</Text>
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Marks Entry Dialog */}
      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => setDialogVisible(false)}
          style={styles.dialog}
        >
          <Dialog.Title>Enter Marks</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView style={styles.dialogScroll}>
              {selectedExam && (
                <View style={styles.examInfo}>
                  <Text variant="titleMedium">
                    {exams.find((e) => e.id === selectedExam)?.name}
                  </Text>
                  <Text variant="bodySmall" style={styles.maxMarks}>
                    Max Marks: {exams.find((e) => e.id === selectedExam)?.maxMarks}
                  </Text>
                </View>
              )}

              {students.map((student) => (
                <View key={student.id} style={styles.studentRow}>
                  <View style={styles.studentInfo}>
                    <Text variant="titleSmall">{student.name}</Text>
                    <Text variant="bodySmall" style={styles.rollNo}>
                      {student.rollNo}
                    </Text>
                  </View>
                  <View style={styles.marksInput}>
                    <TextInput
                      mode="outlined"
                      keyboardType="numeric"
                      value={student.marks?.toString() || ''}
                      onChangeText={(text) => handleMarksChange(student.id, text)}
                      style={styles.input}
                      dense
                    />
                    <Text variant="bodySmall" style={styles.percentage}>
                      {getPercentage(
                        student.marks,
                        exams.find((e) => e.id === selectedExam)?.maxMarks || 100
                      )}
                    </Text>
                  </View>
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
  completedText: {
    color: '#388E3C',
  },
  pendingText: {
    color: '#F57C00',
  },
  dialog: {
    maxHeight: '80%',
  },
  dialogScroll: {
    paddingHorizontal: 0,
  },
  examInfo: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  maxMarks: {
    color: '#666',
    marginTop: 4,
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
  marksInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: 80,
  },
  percentage: {
    marginLeft: 8,
    width: 60,
    color: '#666',
  },
});
