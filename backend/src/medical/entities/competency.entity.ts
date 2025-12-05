import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('medical_competencies')
export class Competency {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string; // e.g., AN1.1, PY2.3, IM4.1

  @Column('text')
  description: string;

  @Column()
  subject: string; // Anatomy, Physiology, Biochemistry, etc.

  @Column()
  phase: string; // phase1, phase2, phase3p1, phase3p2

  @Column({
    type: 'enum',
    enum: ['Knows', 'Knows How', 'Shows How', 'Does'],
  })
  level: string;

  @Column('simple-array')
  assessmentMethods: string[]; // Written, MCQ, Viva, OSPE, OSCE, Practical, Clinical

  @Column({ default: 0 })
  duration: number; // Expected duration in hours

  @Column('text', { nullable: true })
  learningObjectives: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
