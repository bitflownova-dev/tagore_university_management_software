import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum NotificationType {
  ATTENDANCE_ALERT = 'ATTENDANCE_ALERT',
  MARKS_UPDATE = 'MARKS_UPDATE',
  FEE_REMINDER = 'FEE_REMINDER',
  PAYROLL = 'PAYROLL',
  ANNOUNCEMENT = 'ANNOUNCEMENT',
  LEAVE_APPROVAL = 'LEAVE_APPROVAL',
  SYSTEM = 'SYSTEM',
}

export enum DeliveryStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  FAILED = 'FAILED',
  READ = 'READ',
}

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn({ name: 'notification_id' })
  notificationId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({
    name: 'notification_type',
    type: 'enum',
    enum: NotificationType,
  })
  notificationType: NotificationType;

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'jsonb', nullable: true })
  data: Record<string, any>;

  @Column({ name: 'related_entity_type', nullable: true, length: 50 })
  relatedEntityType: string;

  @Column({ name: 'related_entity_id', nullable: true })
  relatedEntityId: number;

  @Column({ name: 'is_read', default: false })
  isRead: boolean;

  @Column({
    name: 'delivery_status',
    type: 'enum',
    enum: DeliveryStatus,
    default: DeliveryStatus.PENDING,
  })
  deliveryStatus: DeliveryStatus;

  @Column({ name: 'sent_via_push', default: false })
  sentViaPush: boolean;

  @Column({ name: 'sent_via_email', default: false })
  sentViaEmail: boolean;

  @Column({ name: 'sent_via_sms', default: false })
  sentViaSms: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'read_at', type: 'timestamp', nullable: true })
  readAt: Date;
}
