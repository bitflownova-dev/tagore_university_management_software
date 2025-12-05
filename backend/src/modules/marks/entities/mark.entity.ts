import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('marks')
@Index(['studentUserId', 'classId', 'subjectId'])
export class Mark {
  @PrimaryGeneratedColumn({ name: 'mark_id' })
  markId: number;

  @Column({ name: 'student_user_id' })
  studentUserId: number;

  @Column({ name: 'class_id' })
  classId: number;

  @Column({ name: 'subject_id' })
  subjectId: number;

  @Column({ name: 'assessment_type_id' })
  assessmentTypeId: number;

  @Column({ name: 'marks_obtained', type: 'decimal', precision: 5, scale: 2 })
  marksObtained: number;

  @Column({ name: 'marks_total', type: 'decimal', precision: 5, scale: 2 })
  marksTotal: number;

  @Column({ nullable: true, length: 10 })
  grade: string;

  @Column({ name: 'is_published', default: false })
  isPublished: boolean;

  @Column({ name: 'parent_notified', default: false })
  parentNotified: boolean;

  @Column({ name: 'entered_by_user_id' })
  enteredByUserId: number;

  @Column({ nullable: true, type: 'text' })
  remarks: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'published_at', type: 'timestamp', nullable: true })
  publishedAt: Date;
}
