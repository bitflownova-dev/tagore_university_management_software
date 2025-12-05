/**
 * Real-Time Notification Service - Node.js/TypeScript Implementation
 * Tagore University Management System
 * 
 * This module demonstrates:
 * 1. Real-time push notifications via Firebase Cloud Messaging (FCM)
 * 2. WebSocket-based instant updates using Socket.io
 * 3. Database triggers for automated notifications
 * 4. Parent absence alerts automation
 * 
 * Author: Solutions Architect Team
 * Date: December 2025
 */

import { Server as SocketIOServer, Socket } from 'socket.io';
import * as admin from 'firebase-admin';
import { Client as PostgresClient } from 'pg';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

enum NotificationType {
  ATTENDANCE_ALERT = 'ATTENDANCE_ALERT',
  MARKS_UPDATE = 'MARKS_UPDATE',
  FEE_REMINDER = 'FEE_REMINDER',
  PAYROLL = 'PAYROLL',
  ANNOUNCEMENT = 'ANNOUNCEMENT',
}

enum NotificationPriority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

interface NotificationPayload {
  userId: number;
  type: NotificationType;
  title: string;
  message: string;
  priority: NotificationPriority;
  data?: Record<string, any>;
  actionUrl?: string;
  actionRequired?: boolean;
}

interface AttendanceEvent {
  attendanceId: number;
  studentUserId: number;
  studentName: string;
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'ON_LEAVE';
  classId: number;
  className: string;
}

interface MarksEvent {
  markId: number;
  studentUserId: number;
  studentName: string;
  subjectName: string;
  assessmentType: string;
  marksObtained: number;
  maxMarks: number;
}

// ============================================================================
// NOTIFICATION SERVICE CLASS
// ============================================================================

export class NotificationService {
  private io: SocketIOServer;
  private db: PostgresClient;
  private fcmApp: admin.app.App;

  constructor(io: SocketIOServer, db: PostgresClient) {
    this.io = io;
    this.db = db;

    // Initialize Firebase Admin SDK
    this.fcmApp = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });

    // Set up database listeners for real-time triggers
    this.setupDatabaseListeners();
  }

  /**
   * Set up PostgreSQL LISTEN/NOTIFY for real-time event processing
   */
  private async setupDatabaseListeners(): Promise<void> {
    // Listen for push notification events from database triggers
    await this.db.query('LISTEN send_push_notification');

    this.db.on('notification', async (msg) => {
      if (msg.channel === 'send_push_notification') {
        const payload = JSON.parse(msg.payload!);
        await this.processPushNotification(payload);
      }
    });

    console.log('📡 Database notification listeners initialized');
  }

  /**
   * Process push notification event from database trigger
   */
  private async processPushNotification(payload: any): Promise<void> {
    try {
      const { fcm_token, type, title, body, data, notification_id } = payload;

      if (!fcm_token) {
        console.warn(`No FCM token for notification ${notification_id}`);
        return;
      }

      // Send via FCM
      await this.sendFCMNotification(fcm_token, {
        notification: {
          title,
          body,
          sound: 'default',
        },
        data: {
          type,
          notificationId: notification_id?.toString() || '',
          ...data,
        },
        android: {
          priority: 'high',
          notification: {
            channelId: 'default',
            priority: 'high',
            sound: 'default',
          },
        },
        apns: {
          payload: {
            aps: {
              sound: 'default',
              badge: 1,
            },
          },
        },
      });

      // Update notification delivery status
      await this.updateNotificationStatus(notification_id, 'SENT');

      console.log(`✅ Push notification sent: ${notification_id}`);
    } catch (error) {
      console.error('Error processing push notification:', error);
    }
  }

  /**
   * Send push notification via Firebase Cloud Messaging
   */
  private async sendFCMNotification(
    fcmToken: string,
    message: admin.messaging.Message
  ): Promise<void> {
    try {
      const response = await admin.messaging().send({
        token: fcmToken,
        ...message,
      });

      console.log('FCM response:', response);
    } catch (error: any) {
      if (error.code === 'messaging/invalid-registration-token') {
        console.warn('Invalid FCM token, removing from database');
        // TODO: Remove invalid token from database
      } else {
        throw error;
      }
    }
  }

  /**
   * Update notification delivery status in database
   */
  private async updateNotificationStatus(
    notificationId: number,
    status: 'PENDING' | 'SENT' | 'DELIVERED' | 'FAILED'
  ): Promise<void> {
    await this.db.query(
      `UPDATE notifications SET delivery_status = $1 WHERE notification_id = $2`,
      [status, notificationId]
    );
  }

  /**
   * Handle real-time attendance marking and parent notification
   */
  public async handleAttendanceMarked(event: AttendanceEvent): Promise<void> {
    console.log('📝 Processing attendance event:', event);

    // Only process absent students
    if (event.status !== 'ABSENT') {
      return;
    }

    try {
      // Find parent user
      const parentResult = await this.db.query(
        `
        SELECT 
          p.user_id,
          p.fcm_token,
          p.email,
          p.first_name,
          p.last_name
        FROM users s
        LEFT JOIN users p ON p.metadata->>'child_user_id' = s.user_id::text
        WHERE s.user_id = $1
          AND p.primary_role_id = (
            SELECT role_id FROM user_roles WHERE role_name = 'PARENT'
          )
        LIMIT 1
        `,
        [event.studentUserId]
      );

      if (parentResult.rows.length === 0) {
        console.warn(`No parent found for student ${event.studentUserId}`);
        return;
      }

      const parent = parentResult.rows[0];

      // Create notification in database
      const notificationResult = await this.db.query(
        `
        INSERT INTO notifications (
          user_id, notification_type, title, message,
          related_entity_type, related_entity_id,
          priority, sent_via, action_required, action_url
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING notification_id
        `,
        [
          parent.user_id,
          NotificationType.ATTENDANCE_ALERT,
          'Attendance Alert',
          `${event.studentName} was marked absent on ${event.date} for ${event.className}`,
          'ATTENDANCE',
          event.attendanceId,
          NotificationPriority.HIGH,
          'APP_PUSH',
          true,
          `/attendance/details/${event.attendanceId}`,
        ]
      );

      const notificationId = notificationResult.rows[0].notification_id;

      // Send real-time WebSocket update to parent if connected
      this.io.to(`parent_${parent.user_id}`).emit('new_notification', {
        id: notificationId,
        type: NotificationType.ATTENDANCE_ALERT,
        title: 'Attendance Alert',
        message: `${event.studentName} was marked absent on ${event.date}`,
        timestamp: new Date().toISOString(),
        read: false,
        priority: NotificationPriority.HIGH,
        actionUrl: `/attendance/details/${event.attendanceId}`,
      });

      // Send push notification via FCM
      if (parent.fcm_token) {
        await this.sendFCMNotification(parent.fcm_token, {
          notification: {
            title: '⚠️ Attendance Alert',
            body: `${event.studentName} was marked absent on ${event.date}`,
            sound: 'default',
          },
          data: {
            type: NotificationType.ATTENDANCE_ALERT,
            studentId: event.studentUserId.toString(),
            attendanceId: event.attendanceId.toString(),
            actionUrl: `/attendance/details/${event.attendanceId}`,
          },
          android: {
            priority: 'high',
            notification: {
              channelId: 'attendance_alerts',
              priority: 'high',
              defaultSound: true,
              defaultVibrateTimings: true,
            },
          },
        });
      }

      // Optionally send SMS for high-priority alerts
      // await this.sendSMS(parent.phone, `Alert: ${event.studentName} absent today.`);

      console.log(`✅ Parent notified for student ${event.studentUserId}`);
    } catch (error) {
      console.error('Error handling attendance event:', error);
    }
  }

  /**
   * Handle marks publication and notify student + parent
   */
  public async handleMarksPublished(event: MarksEvent): Promise<void> {
    console.log('📊 Processing marks publication event:', event);

    try {
      // Find both student and parent
      const usersResult = await this.db.query(
        `
        SELECT 
          s.user_id as student_id,
          s.fcm_token as student_fcm_token,
          s.first_name as student_first_name,
          p.user_id as parent_id,
          p.fcm_token as parent_fcm_token,
          p.first_name as parent_first_name
        FROM users s
        LEFT JOIN users p ON p.metadata->>'child_user_id' = s.user_id::text
        WHERE s.user_id = $1
        `,
        [event.studentUserId]
      );

      if (usersResult.rows.length === 0) {
        console.warn(`Student not found: ${event.studentUserId}`);
        return;
      }

      const { student_id, student_fcm_token, parent_id, parent_fcm_token } =
        usersResult.rows[0];

      const message = `${event.studentName} scored ${event.marksObtained}/${event.maxMarks} in ${event.subjectName} (${event.assessmentType})`;
      const percentage = ((event.marksObtained / event.maxMarks) * 100).toFixed(1);

      // Determine if marks are low (below 40%)
      const isLowMarks = parseFloat(percentage) < 40;
      const priority = isLowMarks
        ? NotificationPriority.HIGH
        : NotificationPriority.NORMAL;

      // Notify student
      await this.createAndSendNotification({
        userId: student_id,
        type: NotificationType.MARKS_UPDATE,
        title: 'New Marks Published',
        message: `Your ${event.assessmentType} marks for ${event.subjectName} are now available: ${event.marksObtained}/${event.maxMarks} (${percentage}%)`,
        priority,
        data: {
          markId: event.markId,
          percentage: parseFloat(percentage),
        },
        actionUrl: `/marks/details/${event.markId}`,
      });

      // Notify parent if exists
      if (parent_id) {
        await this.createAndSendNotification({
          userId: parent_id,
          type: NotificationType.MARKS_UPDATE,
          title: 'New Marks Published',
          message,
          priority,
          data: {
            markId: event.markId,
            studentId: student_id,
            percentage: parseFloat(percentage),
          },
          actionUrl: `/marks/details/${event.markId}`,
        });
      }

      // Send real-time WebSocket updates
      this.io.to(`student_${student_id}`).emit('marks_updated', {
        markId: event.markId,
        subjectName: event.subjectName,
        marksObtained: event.marksObtained,
        maxMarks: event.maxMarks,
        percentage: parseFloat(percentage),
      });

      if (parent_id) {
        this.io.to(`parent_${parent_id}`).emit('marks_updated', {
          markId: event.markId,
          studentName: event.studentName,
          subjectName: event.subjectName,
          marksObtained: event.marksObtained,
          maxMarks: event.maxMarks,
          percentage: parseFloat(percentage),
        });
      }

      console.log(`✅ Marks notification sent for mark ${event.markId}`);
    } catch (error) {
      console.error('Error handling marks event:', error);
    }
  }

  /**
   * Generic function to create notification and send via multiple channels
   */
  private async createAndSendNotification(
    payload: NotificationPayload
  ): Promise<void> {
    // Insert notification into database
    const result = await this.db.query(
      `
      INSERT INTO notifications (
        user_id, notification_type, title, message,
        priority, action_url, action_required
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING notification_id
      `,
      [
        payload.userId,
        payload.type,
        payload.title,
        payload.message,
        payload.priority,
        payload.actionUrl || null,
        payload.actionRequired || false,
      ]
    );

    const notificationId = result.rows[0].notification_id;

    // Get user's FCM token
    const userResult = await this.db.query(
      `SELECT fcm_token FROM users WHERE user_id = $1`,
      [payload.userId]
    );

    const fcmToken = userResult.rows[0]?.fcm_token;

    // Send push notification
    if (fcmToken) {
      await this.sendFCMNotification(fcmToken, {
        notification: {
          title: payload.title,
          body: payload.message,
          sound: 'default',
        },
        data: {
          type: payload.type,
          notificationId: notificationId.toString(),
          ...payload.data,
        },
      });

      await this.updateNotificationStatus(notificationId, 'SENT');
    }

    // Send real-time WebSocket update
    const userRole = await this.getUserRole(payload.userId);
    this.io.to(`${userRole}_${payload.userId}`).emit('new_notification', {
      id: notificationId,
      type: payload.type,
      title: payload.title,
      message: payload.message,
      priority: payload.priority,
      timestamp: new Date().toISOString(),
      read: false,
      actionUrl: payload.actionUrl,
    });
  }

  /**
   * Get user role for WebSocket room naming
   */
  private async getUserRole(userId: number): Promise<string> {
    const result = await this.db.query(
      `
      SELECT ur.role_name
      FROM users u
      JOIN user_roles ur ON u.primary_role_id = ur.role_id
      WHERE u.user_id = $1
      `,
      [userId]
    );

    return result.rows[0]?.role_name.toLowerCase() || 'user';
  }

  /**
   * Handle WebSocket client connection
   */
  public handleSocketConnection(socket: Socket): void {
    console.log('🔌 New WebSocket connection:', socket.id);

    // Authenticate user and join their specific room
    socket.on('authenticate', async (data: { userId: number; token: string }) => {
      try {
        // Verify JWT token (implementation depends on your auth system)
        // const user = await verifyToken(data.token);

        const userRole = await this.getUserRole(data.userId);
        const roomName = `${userRole}_${data.userId}`;

        socket.join(roomName);
        socket.data.userId = data.userId;
        socket.data.userRole = userRole;

        console.log(`✅ User ${data.userId} joined room: ${roomName}`);

        // Send any pending notifications
        const pendingNotifications = await this.getPendingNotifications(data.userId);
        socket.emit('pending_notifications', pendingNotifications);
      } catch (error) {
        console.error('Authentication error:', error);
        socket.disconnect();
      }
    });

    // Handle notification read status update
    socket.on('mark_as_read', async (notificationId: number) => {
      await this.db.query(
        `UPDATE notifications SET is_read = true, read_at = NOW() WHERE notification_id = $1`,
        [notificationId]
      );
    });

    socket.on('disconnect', () => {
      console.log('🔌 WebSocket disconnected:', socket.id);
    });
  }

  /**
   * Get pending (unread) notifications for a user
   */
  private async getPendingNotifications(userId: number): Promise<any[]> {
    const result = await this.db.query(
      `
      SELECT 
        notification_id,
        notification_type,
        title,
        message,
        priority,
        action_url,
        created_at
      FROM notifications
      WHERE user_id = $1 AND is_read = false
      ORDER BY created_at DESC
      LIMIT 50
      `,
      [userId]
    );

    return result.rows;
  }

  /**
   * Broadcast dashboard update to all connected principals/directors
   */
  public async broadcastDashboardUpdate(
    collegeId: number,
    updateType: string,
    data: any
  ): Promise<void> {
    this.io.to(`college_${collegeId}`).emit('dashboard_update', {
      type: updateType,
      data,
      timestamp: new Date().toISOString(),
    });

    console.log(`📊 Dashboard update broadcasted for college ${collegeId}`);
  }
}

// ============================================================================
// EXAMPLE USAGE
// ============================================================================

// Initialize Socket.io server
// const io = new SocketIOServer(httpServer, {
//   cors: { origin: '*' },
// });

// Initialize PostgreSQL client
// const dbClient = new PostgresClient({
//   connectionString: process.env.DATABASE_URL,
// });
// await dbClient.connect();

// Initialize notification service
// const notificationService = new NotificationService(io, dbClient);

// Set up WebSocket connection handler
// io.on('connection', (socket) => {
//   notificationService.handleSocketConnection(socket);
// });

// Example: Manually trigger attendance notification
// await notificationService.handleAttendanceMarked({
//   attendanceId: 12345,
//   studentUserId: 1001,
//   studentName: 'Aarav Kumar',
//   date: '2025-12-04',
//   status: 'ABSENT',
//   classId: 101,
//   className: 'CS101 - Data Structures',
// });

export default NotificationService;
