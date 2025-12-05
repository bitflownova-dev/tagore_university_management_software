import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { StudentEnrollment } from './student-enrollment.entity';

export enum FeeStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  OVERDUE = 'OVERDUE',
  WAIVED = 'WAIVED',
}

@Entity('fee_balance')
export class FeeBalance {
  @PrimaryGeneratedColumn({ name: 'fee_balance_id' })
  feeBalanceId: number;

  @Column({ name: 'student_user_id' })
  studentUserId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'student_user_id' })
  student: User;

  @Column({ name: 'enrollment_id', nullable: true })
  enrollmentId: number;

  @ManyToOne(() => StudentEnrollment)
  @JoinColumn({ name: 'enrollment_id' })
  enrollment: StudentEnrollment;

  @Column({ name: 'total_fee', type: 'decimal', precision: 10, scale: 2 })
  totalFee: number;

  @Column({ name: 'amount_paid', type: 'decimal', precision: 10, scale: 2, default: 0 })
  amountPaid: number;

  @Column({ name: 'amount_pending', type: 'decimal', precision: 10, scale: 2 })
  amountPending: number;

  @Column({ name: 'due_date', type: 'date' })
  dueDate: Date;

  @Column({ name: 'status', type: 'enum', enum: FeeStatus, default: FeeStatus.PENDING })
  status: FeeStatus;

  @Column({ name: 'reminder_sent', type: 'boolean', default: false })
  reminderSent: boolean;

  @Column({ name: 'last_reminder_date', type: 'timestamp', nullable: true })
  lastReminderDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
