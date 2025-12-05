import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('medical_student_competencies')
export class StudentCompetency {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  studentId: string;

  @Column()
  competencyId: string;

  @Column({
    type: 'enum',
    enum: ['not-started', 'in-progress', 'completed'],
    default: 'not-started',
  })
  status: string;

  @Column({ nullable: true })
  achievedDate: Date;

  @Column('text', { nullable: true })
  notes: string;

  @Column({ nullable: true })
  assessedBy: string; // Faculty ID

  @Column({ nullable: true })
  assessmentScore: number;

  @Column('simple-array', { nullable: true })
  attemptedMethods: string[]; // Which assessment methods have been attempted

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
