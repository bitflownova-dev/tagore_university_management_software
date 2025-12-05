import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Card,
  Text,
  DataTable,
  Chip,
  Button,
  Dialog,
  Portal,
  RadioButton,
} from 'react-native-paper';

export default function StudentFeesScreen() {
  const [paymentDialogVisible, setPaymentDialogVisible] = useState(false);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('UPI');

  const feeDetails = [
    {
      id: 1,
      type: 'Tuition Fee',
      amount: 75000,
      paid: 75000,
      dueDate: '2024-01-15',
      status: 'Paid',
    },
    {
      id: 2,
      type: 'Lab Fee',
      amount: 15000,
      paid: 15000,
      dueDate: '2024-01-15',
      status: 'Paid',
    },
    {
      id: 3,
      type: 'Library Fee',
      amount: 5000,
      paid: 0,
      dueDate: '2024-02-15',
      status: 'Pending',
    },
  ];

  const totalFee = feeDetails.reduce((sum, fee) => sum + fee.amount, 0);
  const totalPaid = feeDetails.reduce((sum, fee) => sum + fee.paid, 0);
  const totalPending = totalFee - totalPaid;

  const handlePayNow = () => {
    setPaymentDialogVisible(true);
  };

  const handlePaymentSubmit = () => {
    // TODO: Integrate payment gateway
    console.log('Processing payment via:', selectedPaymentMode);
    setPaymentDialogVisible(false);
  };

  const getStatusColor = (status: string) => {
    return status === 'Paid' ? '#388E3C' : '#F57C00';
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Fee Summary */}
        <Card style={styles.card}>
          <Card.Title title="Fee Summary" />
          <Card.Content>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text variant="headlineSmall" style={styles.totalAmount}>
                  ₹{totalFee.toLocaleString()}
                </Text>
                <Text variant="bodySmall">Total Fee</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text variant="headlineSmall" style={styles.paidAmount}>
                  ₹{totalPaid.toLocaleString()}
                </Text>
                <Text variant="bodySmall">Paid</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text variant="headlineSmall" style={styles.pendingAmount}>
                  ₹{totalPending.toLocaleString()}
                </Text>
                <Text variant="bodySmall">Pending</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Fee Details */}
        <Card style={styles.card}>
          <Card.Title title="Fee Breakdown" />
          <Card.Content>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Type</DataTable.Title>
                <DataTable.Title numeric>Amount</DataTable.Title>
                <DataTable.Title>Status</DataTable.Title>
              </DataTable.Header>

              {feeDetails.map((fee) => (
                <DataTable.Row key={fee.id}>
                  <DataTable.Cell>
                    <View>
                      <Text variant="bodyMedium">{fee.type}</Text>
                      <Text variant="bodySmall" style={styles.dueDate}>
                        Due: {fee.dueDate}
                      </Text>
                    </View>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>₹{fee.amount.toLocaleString()}</DataTable.Cell>
                  <DataTable.Cell>
                    <Chip
                      mode="flat"
                      textStyle={{ color: getStatusColor(fee.status) }}
                      style={{ backgroundColor: `${getStatusColor(fee.status)}20` }}
                    >
                      {fee.status}
                    </Chip>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Card.Content>
        </Card>

        {/* Payment History */}
        <Card style={styles.card}>
          <Card.Title title="Recent Payments" />
          <Card.Content>
            <View style={styles.paymentItem}>
              <View style={styles.paymentInfo}>
                <Text variant="titleMedium">Tuition Fee - Semester 4</Text>
                <Text variant="bodySmall" style={styles.paymentDate}>
                  Paid on: 2024-01-10
                </Text>
              </View>
              <View style={styles.paymentAmount}>
                <Text variant="titleMedium" style={styles.paidText}>
                  ₹75,000
                </Text>
                <Text variant="bodySmall" style={styles.paymentMode}>
                  UPI
                </Text>
              </View>
            </View>

            <View style={styles.paymentItem}>
              <View style={styles.paymentInfo}>
                <Text variant="titleMedium">Lab Fee - Semester 4</Text>
                <Text variant="bodySmall" style={styles.paymentDate}>
                  Paid on: 2024-01-10
                </Text>
              </View>
              <View style={styles.paymentAmount}>
                <Text variant="titleMedium" style={styles.paidText}>
                  ₹15,000
                </Text>
                <Text variant="bodySmall" style={styles.paymentMode}>
                  Net Banking
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Pay Now Button */}
        {totalPending > 0 && (
          <Button
            mode="contained"
            onPress={handlePayNow}
            style={styles.payButton}
            icon="cash"
          >
            Pay Pending Fees (₹{totalPending.toLocaleString()})
          </Button>
        )}
      </ScrollView>

      {/* Payment Dialog */}
      <Portal>
        <Dialog
          visible={paymentDialogVisible}
          onDismiss={() => setPaymentDialogVisible(false)}
        >
          <Dialog.Title>Select Payment Method</Dialog.Title>
          <Dialog.Content>
            <RadioButton.Group
              onValueChange={(value) => setSelectedPaymentMode(value)}
              value={selectedPaymentMode}
            >
              <RadioButton.Item label="UPI (Google Pay, PhonePe, etc.)" value="UPI" />
              <RadioButton.Item label="Net Banking" value="NET_BANKING" />
              <RadioButton.Item label="Debit/Credit Card" value="CARD" />
              <RadioButton.Item label="Cash (Pay at Counter)" value="CASH" />
            </RadioButton.Group>

            <View style={styles.paymentSummary}>
              <Text variant="titleMedium">Amount to Pay:</Text>
              <Text variant="headlineSmall" style={styles.paymentTotal}>
                ₹{totalPending.toLocaleString()}
              </Text>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setPaymentDialogVisible(false)}>Cancel</Button>
            <Button mode="contained" onPress={handlePaymentSubmit}>
              Proceed to Pay
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
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  totalAmount: {
    fontWeight: 'bold',
    color: '#1565C0',
  },
  paidAmount: {
    fontWeight: 'bold',
    color: '#388E3C',
  },
  pendingAmount: {
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  dueDate: {
    color: '#666',
    marginTop: 2,
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  paymentInfo: {
    flex: 1,
  },
  paymentDate: {
    color: '#666',
    marginTop: 4,
  },
  paymentAmount: {
    alignItems: 'flex-end',
  },
  paidText: {
    color: '#388E3C',
    fontWeight: 'bold',
  },
  paymentMode: {
    color: '#666',
    marginTop: 4,
  },
  payButton: {
    margin: 12,
    marginTop: 8,
    paddingVertical: 6,
  },
  paymentSummary: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentTotal: {
    color: '#1565C0',
    fontWeight: 'bold',
  },
});
