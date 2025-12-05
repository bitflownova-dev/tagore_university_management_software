import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, List, Avatar, Chip, SegmentedButtons, Badge } from 'react-native-paper';

interface Notification {
  id: number;
  type: 'absence' | 'marks' | 'fee' | 'announcement' | 'event';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  childName: string;
}

export default function ParentNotificationsScreen() {
  const [filter, setFilter] = useState('all');

  const notifications: Notification[] = [
    {
      id: 1,
      type: 'absence',
      title: 'Absence Alert - Aarav',
      message: 'Aarav Kumar was marked absent in Data Structures class today',
      time: '2 hours ago',
      isRead: false,
      childName: 'Aarav Kumar',
    },
    {
      id: 2,
      type: 'marks',
      title: 'Marks Published - Ananya',
      message: 'Mid-semester exam marks have been published for all subjects',
      time: '1 day ago',
      isRead: false,
      childName: 'Ananya Kumar',
    },
    {
      id: 3,
      type: 'fee',
      title: 'Fee Reminder - Aarav',
      message: 'Library fee of ₹5,000 is due on 15th February 2024',
      time: '2 days ago',
      isRead: true,
      childName: 'Aarav Kumar',
    },
    {
      id: 4,
      type: 'announcement',
      title: 'College Announcement',
      message: 'Annual Day celebration on 25th February. Parents are cordially invited.',
      time: '3 days ago',
      isRead: true,
      childName: 'All',
    },
    {
      id: 5,
      type: 'event',
      title: 'Parent-Teacher Meeting',
      message: 'PTM scheduled for 20th February from 10 AM to 4 PM',
      time: '4 days ago',
      isRead: true,
      childName: 'All',
    },
    {
      id: 6,
      type: 'marks',
      title: 'Internal Assessment - Aarav',
      message: 'Internal Assessment 2 marks are available for viewing',
      time: '5 days ago',
      isRead: true,
      childName: 'Aarav Kumar',
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'absence':
        return 'alert-circle';
      case 'marks':
        return 'clipboard-text';
      case 'fee':
        return 'cash-multiple';
      case 'announcement':
        return 'bullhorn';
      case 'event':
        return 'calendar-star';
      default:
        return 'bell';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'absence':
        return '#D32F2F';
      case 'marks':
        return '#1565C0';
      case 'fee':
        return '#F57C00';
      case 'announcement':
        return '#7B1FA2';
      case 'event':
        return '#388E3C';
      default:
        return '#666';
    }
  };

  const filteredNotifications =
    filter === 'all'
      ? notifications
      : notifications.filter((n) => !n.isRead);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <View style={styles.container}>
      {/* Filter */}
      <View style={styles.header}>
        <SegmentedButtons
          value={filter}
          onValueChange={setFilter}
          buttons={[
            {
              value: 'all',
              label: `All (${notifications.length})`,
            },
            {
              value: 'unread',
              label: `Unread (${unreadCount})`,
              icon: unreadCount > 0 ? 'circle' : undefined,
            },
          ]}
        />
      </View>

      <ScrollView>
        {filteredNotifications.map((notification) => (
          <Card
            key={notification.id}
            style={[
              styles.card,
              !notification.isRead && styles.unreadCard,
            ]}
          >
            <List.Item
              title={notification.title}
              description={notification.message}
              left={(props: any) => (
                <Avatar.Icon
                  {...props}
                  icon={getNotificationIcon(notification.type)}
                  size={48}
                  style={{
                    backgroundColor: `${getNotificationColor(notification.type)}20`,
                  }}
                  color={getNotificationColor(notification.type)}
                />
              )}
              right={() => (
                <View style={styles.rightContent}>
                  {!notification.isRead && (
                    <Badge size={10} style={styles.unreadBadge} />
                  )}
                  <Text variant="bodySmall" style={styles.time}>
                    {notification.time}
                  </Text>
                </View>
              )}
              style={styles.listItem}
              titleStyle={!notification.isRead && styles.unreadTitle}
            />
            <View style={styles.footer}>
              <Chip mode="outlined" compact>
                {notification.childName}
              </Chip>
            </View>
          </Card>
        ))}

        {filteredNotifications.length === 0 && (
          <View style={styles.emptyState}>
            <Avatar.Icon
              size={80}
              icon="bell-off"
              style={styles.emptyIcon}
            />
            <Text variant="titleMedium" style={styles.emptyText}>
              No notifications
            </Text>
            <Text variant="bodySmall" style={styles.emptySubtext}>
              You're all caught up!
            </Text>
          </View>
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
  header: {
    padding: 12,
    backgroundColor: '#FFFFFF',
  },
  card: {
    margin: 12,
    marginTop: 8,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#1565C0',
  },
  listItem: {
    paddingVertical: 8,
  },
  unreadTitle: {
    fontWeight: 'bold',
  },
  rightContent: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  unreadBadge: {
    backgroundColor: '#1565C0',
    marginBottom: 4,
  },
  time: {
    color: '#666',
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyIcon: {
    backgroundColor: '#E0E0E0',
  },
  emptyText: {
    marginTop: 16,
    color: '#666',
  },
  emptySubtext: {
    marginTop: 4,
    color: '#999',
  },
});
