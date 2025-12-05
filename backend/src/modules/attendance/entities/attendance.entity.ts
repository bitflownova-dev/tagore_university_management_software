import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  LATE = 'late',
  EXCUSED = 'excused',
  HALF_DAY = 'half_day',
  ON_LEAVE = 'on_leave',
}

export enum UserType {
  STUDENT = 'student',
  FACULTY = 'faculty',
  STAFF = 'staff',
}

@Entity('attendance_records')
export class AttendanceRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryGeneratedColumn()
  attendanceId: number;

  @Column()
  userId: number;

  @Column({
    type: 'enum',
    enum: UserType,
  })
  userType: UserType;

  @Column()
  collegeId: number;

  @Column({ nullable: true })
  classId: number;

  @Column({ nullable: true })
  subjectId: number;

  @Column({ type: 'date' })
  attendanceDate: Date;

  @Column({
    type: 'enum',
    enum: AttendanceStatus,
  })
  status: AttendanceStatus;

  @Column({ nullable: true })
  markingMethod: string;

  @Column({ nullable: true })
  remarks: string;

  @Column({ nullable: true })
  markedBy: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
