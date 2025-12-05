import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('medical_assessments')
export class MedicalAssessment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  studentId: string;

  @Column()
  assessmentType: string; // OSPE, OSCE, Viva, Written, MCQ, Practical

  @Column()
  subject: string;

  @Column()
  topic: string;

  @Column()
  date: Date;

  @Column({ nullable: true })
  competencyCode: string;

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  marksObtained: number;

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  totalMarks: number;

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  percentage: number;

  @Column({ nullable: true })
  grade: string;

  @Column({
    type: 'enum',
    enum: ['scheduled', 'completed', 'absent'],
    default: 'scheduled',
  })
  status: string;

  @Column()
  examinerId: string;

  @Column()
  examinerName: string;

  @Column('text', { nullable: true })
  remarks: string;

  @Column('text', { nullable: true })
  strengths: string;

  @Column('text', { nullable: true })
  areasOfImprovement: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
