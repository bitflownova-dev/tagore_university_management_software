import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Notification, NotificationType, DeliveryStatus } from './entities/notification.entity';
import { User } from '../users/entities/user.entity';
import * as admin from 'firebase-admin';

@Injectable()
export class NotificationsService {
  private firebaseApp: admin.app.App;

  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectQueue('notifications')
    private notificationQueue: Queue,
  ) {
    // Initialize Firebase Admin SDK
    try {
      if (!admin.apps.length) {
        this.firebaseApp = admin.initializeApp({
          credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          }),
        });
      } else {
        this.firebaseApp = admin.app();
      }
    } catch (error) {
      console.error('Firebase initialization error:', error);
    }
  }

  async createNotification(data: {
    userId: number;
    notificationType: NotificationType;
    title: string;
    message: string;
    data?: any;
    relatedEntityType?: string;
    relatedEntityId?: number;
  }) {
    const notification = this.notificationRepository.create(data);
    const saved = await this.notificationRepository.save(notification);

    // Queue for immediate push notification
    await this.notificationQueue.add('send-push', {
      notificationId: saved.notificationId,
    });

    return saved;
  }

  async sendPushNotification(notificationId: number) {
    const notification = await this.notificationRepository.findOne({
      where: { notificationId },
    });

    if (!notification) {
      throw new Error('Notification not found');
    }

    const user = await this.userRepository.findOne({
      where: { userId: notification.userId },
    });

    if (!user || !user.fcmToken) {
      console.warn(`No FCM token for user ${notification.userId}`);
      return;
    }

    try {
      const message: admin.messaging.Message = {
        notification: {
          title: notification.title,
          body: notification.message,
        },
        data: notification.data || {},
        token: user.fcmToken,
      };

      const response = await admin.messaging().send(message);
      
      await this.notificationRepository.update(notificationId, {
        deliveryStatus: DeliveryStatus.SENT,
        sentViaPush: true,
      });

      return response;
    } catch (error) {
      console.error('FCM send error:', error);
      await this.notificationRepository.update(notificationId, {
        deliveryStatus: DeliveryStatus.FAILED,
      });
      throw error;
    }
  }

  async sendBulkPushNotifications(userIds: number[], title: string, message: string, data?: any) {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .where('user.user_id IN (:...userIds)', { userIds })
      .andWhere('user.fcm_token IS NOT NULL')
      .getMany();

    const tokens = users.map(u => u.fcmToken).filter(Boolean);

    if (tokens.length === 0) {
      console.warn('No FCM tokens found for bulk send');
      return;
    }

    try {
      const multicastMessage: admin.messaging.MulticastMessage = {
        notification: {
          title,
          body: message,
        },
        data: data || {},
        tokens,
      };

      const response = await admin.messaging().sendMulticast(multicastMessage);
      
      console.log(`Bulk notification sent: ${response.successCount} success, ${response.failureCount} failed`);
      
      return response;
    } catch (error) {
      console.error('Bulk FCM send error:', error);
      throw error;
    }
  }

  async getUserNotifications(userId: number, limit = 50, offset = 0) {
    return this.notificationRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });
  }

  async markAsRead(notificationId: number) {
    await this.notificationRepository.update(notificationId, {
      isRead: true,
      readAt: new Date(),
    });
    return { success: true };
  }

  async markAllAsRead(userId: number) {
    await this.notificationRepository.update(
      { userId, isRead: false },
      { isRead: true, readAt: new Date() },
    );
    return { success: true };
  }

  async getUnreadCount(userId: number) {
    const count = await this.notificationRepository.count({
      where: { userId, isRead: false },
    });
    return { count };
  }

  async deleteNotification(notificationId: number) {
    await this.notificationRepository.delete(notificationId);
    return { success: true };
  }

  // Automation helpers
  async notifyParentAbsent(studentUserId: number, attendanceDate: Date) {
    // Find parent
    const parent = await this.userRepository
      .createQueryBuilder('user')
      .where("user.metadata->>'child_user_id' = :studentUserId", { 
        studentUserId: studentUserId.toString() 
      })
      .getOne();

    if (!parent) {
      console.warn(`No parent found for student ${studentUserId}`);
      return;
    }

    const student = await this.userRepository.findOne({
      where: { userId: studentUserId },
    });

    await this.createNotification({
      userId: parent.userId,
      notificationType: NotificationType.ATTENDANCE_ALERT,
      title: 'Absence Alert',
      message: `${student.firstName} ${student.lastName} was marked absent on ${attendanceDate.toDateString()}`,
      data: {
        studentUserId,
        attendanceDate: attendanceDate.toISOString(),
      },
      relatedEntityType: 'ATTENDANCE',
      relatedEntityId: studentUserId,
    });
  }

  async notifyMarksPublished(studentUserId: number, subjectName: string, marks: number) {
    const student = await this.userRepository.findOne({
      where: { userId: studentUserId },
    });

    // Notify student
    await this.createNotification({
      userId: studentUserId,
      notificationType: NotificationType.MARKS_UPDATE,
      title: 'Marks Published',
      message: `Your marks for ${subjectName} have been published. Score: ${marks}`,
      data: { subjectName, marks },
      relatedEntityType: 'MARKS',
    });

    // Notify parent
    const parent = await this.userRepository
      .createQueryBuilder('user')
      .where("user.metadata->>'child_user_id' = :studentUserId", { 
        studentUserId: studentUserId.toString() 
      })
      .getOne();

    if (parent) {
      await this.createNotification({
        userId: parent.userId,
        notificationType: NotificationType.MARKS_UPDATE,
        title: 'Marks Published',
        message: `${student.firstName}'s marks for ${subjectName} have been published. Score: ${marks}`,
        data: { studentUserId, subjectName, marks },
        relatedEntityType: 'MARKS',
      });
    }
  }

  async notifyPayrollReady(employeeUserId: number, month: number, year: number, netSalary: number) {
    await this.createNotification({
      userId: employeeUserId,
      notificationType: NotificationType.PAYROLL,
      title: 'Payslip Ready',
      message: `Your payslip for ${month}/${year} is ready. Net Salary: ₹${netSalary}`,
      data: { month, year, netSalary },
      relatedEntityType: 'PAYROLL',
    });
  }
}
