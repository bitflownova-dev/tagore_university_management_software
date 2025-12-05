import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Course } from './course.entity';
import { AcademicYear } from './academic-year.entity';
import { Semester } from './semester.entity';

export enum EnrollmentStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  DROPPED = 'DROPPED',
  SUSPENDED = 'SUSPENDED',
}

@Entity('student_enrollments')
export class StudentEnrollment {
  @PrimaryGeneratedColumn({ name: 'enrollment_id' })
  enrollmentId: number;

  @Column({ name: 'student_user_id' })
  studentUserId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'student_user_id' })
  student: User;

  @Column({ name: 'course_id' })
  courseId: number;

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @Column({ name: 'academic_year_id' })
  academicYearId: number;

  @ManyToOne(() => AcademicYear)
  @JoinColumn({ name: 'academic_year_id' })
  academicYear: AcademicYear;

  @Column({ name: 'semester_id', nullable: true })
  semesterId: number;

  @ManyToOne(() => Semester)
  @JoinColumn({ name: 'semester_id' })
  semester: Semester;

  @Column({ name: 'enrollment_date', type: 'date' })
  enrollmentDate: Date;

  @Column({ name: 'status', type: 'enum', enum: EnrollmentStatus, default: EnrollmentStatus.ACTIVE })
  status: EnrollmentStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
