import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { College } from './college.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn({ name: 'course_id' })
  courseId: number;

  @Column({ name: 'college_id' })
  collegeId: number;

  @ManyToOne(() => College)
  @JoinColumn({ name: 'college_id' })
  college: College;

  @Column({ name: 'course_code', length: 20, unique: true })
  courseCode: string;

  @Column({ name: 'course_name', length: 200 })
  courseName: string;

  @Column({ name: 'course_type', type: 'enum', enum: ['UG', 'PG', 'DIPLOMA', 'CERTIFICATE'] })
  courseType: string;

  @Column({ name: 'duration_years', type: 'int' })
  durationYears: number;

  @Column({ name: 'total_semesters', type: 'int' })
  totalSemesters: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
