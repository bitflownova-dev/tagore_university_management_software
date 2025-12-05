import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, List, Button, Avatar, Divider } from 'react-native-paper';
import { useAuthStore } from '../../store/authStore';

export default function TeacherProfileScreen() {
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

      {/* Personal Information */}
      <Card style={styles.card}>
        <Card.Title title="Personal Information" />
        <Card.Content>
          <List.Item
            title="Employee ID"
            description="EMP-2024-001"
            left={(props) => <List.Icon {...props} icon="badge-account" />}
          />
          <Divider />
          <List.Item
            title="Department"
            description="Computer Science"
            left={(props) => <List.Icon {...props} icon="office-building" />}
          />
          <Divider />
          <List.Item
            title="Phone"
            description={user?.phoneNumber}
            left={(props) => <List.Icon {...props} icon="phone" />}
          />
          <Divider />
          <List.Item
            title="Email"
            description={user?.email}
            left={(props) => <List.Icon {...props} icon="email" />}
          />
        </Card.Content>
      </Card>

      {/* Academic Details */}
      <Card style={styles.card}>
        <Card.Title title="Academic Details" />
        <Card.Content>
          <List.Item
            title="Designation"
            description="Assistant Professor"
            left={(props) => <List.Icon {...props} icon="school" />}
          />
          <Divider />
          <List.Item
            title="Experience"
            description="5 years"
            left={(props) => <List.Icon {...props} icon="briefcase" />}
          />
          <Divider />
          <List.Item
            title="Qualification"
            description="M.Tech Computer Science"
            left={(props) => <List.Icon {...props} icon="certificate" />}
          />
        </Card.Content>
      </Card>

      {/* Settings */}
      <Card style={styles.card}>
        <Card.Title title="Settings" />
        <Card.Content>
          <List.Item
            title="Change Password"
            left={(props) => <List.Icon {...props} icon="lock" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />
          <Divider />
          <List.Item
            title="Notifications"
            left={(props) => <List.Icon {...props} icon="bell" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />
          <Divider />
          <List.Item
            title="Privacy Policy"
            left={(props) => <List.Icon {...props} icon="shield-account" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
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
  logoutButton: {
    margin: 12,
    marginTop: 8,
  },
});
