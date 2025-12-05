import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, List, Button, Avatar, Divider } from 'react-native-paper';
import { useAuthStore } from '../../store/authStore';

export default function ParentProfileScreen() {
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <Card style={styles.card}>
        <Card.Content style={styles.profileHeader}>
          <Avatar.Text size={80} label={user?.firstName[0] + user?.lastName[0] || 'JD'} />
          <Text variant="headlineSmall" style={styles.name}>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text variant="bodyMedium" style={styles.role}>
            {user?.roleName}
          </Text>
          <Text variant="bodySmall" style={styles.email}>
            {user?.email}
          </Text>
        </Card.Content>
      </Card>

      {/* Children Information */}
      <Card style={styles.card}>
        <Card.Title title="My Children" />
        <Card.Content>
          <List.Item
            title="Aarav Kumar"
            description="BCA Year 2 • Roll No: BCA21001"
            left={(props: any) => <List.Icon {...props} icon="account" />}
          />
          <Divider />
          <List.Item
            title="Ananya Kumar"
            description="B.Com Year 1 • Roll No: BCM22015"
            left={(props: any) => <List.Icon {...props} icon="account" />}
          />
        </Card.Content>
      </Card>

      {/* Contact Information */}
      <Card style={styles.card}>
        <Card.Title title="Contact Information" />
        <Card.Content>
          <List.Item
            title="Phone"
            description={user?.phoneNumber}
            left={(props: any) => <List.Icon {...props} icon="phone" />}
          />
          <Divider />
          <List.Item
            title="Email"
            description={user?.email}
            left={(props: any) => <List.Icon {...props} icon="email" />}
          />
          <Divider />
          <List.Item
            title="Address"
            description="123, MG Road, Bangalore - 560001"
            left={(props: any) => <List.Icon {...props} icon="home" />}
          />
        </Card.Content>
      </Card>

      {/* Notification Preferences */}
      <Card style={styles.card}>
        <Card.Title title="Notification Preferences" />
        <Card.Content>
          <List.Item
            title="Absence Alerts"
            description="Instant notification when child is absent"
            left={(props: any) => <List.Icon {...props} icon="alert-circle" />}
            right={() => (
              <Text variant="bodySmall" style={styles.enabledText}>
                Enabled
              </Text>
            )}
          />
          <Divider />
          <List.Item
            title="Marks Updates"
            description="Notification when marks are published"
            left={(props: any) => <List.Icon {...props} icon="clipboard-text" />}
            right={() => (
              <Text variant="bodySmall" style={styles.enabledText}>
                Enabled
              </Text>
            )}
          />
          <Divider />
          <List.Item
            title="Fee Reminders"
            description="Reminders for pending fee payments"
            left={(props: any) => <List.Icon {...props} icon="cash" />}
            right={() => (
              <Text variant="bodySmall" style={styles.enabledText}>
                Enabled
              </Text>
            )}
          />
          <Divider />
          <List.Item
            title="College Announcements"
            description="General announcements and events"
            left={(props: any) => <List.Icon {...props} icon="bullhorn" />}
            right={() => (
              <Text variant="bodySmall" style={styles.enabledText}>
                Enabled
              </Text>
            )}
          />
        </Card.Content>
      </Card>

      {/* Settings */}
      <Card style={styles.card}>
        <Card.Title title="Settings" />
        <Card.Content>
          <List.Item
            title="Change Password"
            left={(props: any) => <List.Icon {...props} icon="lock" />}
            right={(props: any) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />
          <Divider />
          <List.Item
            title="Privacy Policy"
            left={(props: any) => <List.Icon {...props} icon="shield-account" />}
            right={(props: any) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />
          <Divider />
          <List.Item
            title="Help & Support"
            left={(props: any) => <List.Icon {...props} icon="help-circle" />}
            right={(props: any) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />
        </Card.Content>
      </Card>

      {/* Logout Button */}
      <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.logoutButton}
        buttonColor="#D32F2F"
        icon="logout"
      >
        Logout
      </Button>

      <View style={{ height: 20 }} />
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
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  name: {
    marginTop: 12,
    fontWeight: 'bold',
  },
  role: {
    marginTop: 4,
    color: '#666',
  },
  email: {
    marginTop: 2,
    color: '#999',
  },
  enabledText: {
    color: '#388E3C',
    fontWeight: 'bold',
  },
  logoutButton: {
    margin: 12,
    marginTop: 8,
  },
});
