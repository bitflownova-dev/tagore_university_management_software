import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('medical_clinical_rotations')
export class ClinicalRotation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  studentId: string;

  @Column()
  department: string; // Internal Medicine, Surgery, Pediatrics, OBG, etc.

  @Column()
  phase: string; // phase2, phase3p1, phase3p2

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ default: 0 })
  totalWeeks: number;

  @Column({ default: 0 })
  currentWeek: number;

  @Column()
  supervisorId: string;

  @Column()
  supervisorName: string;

  @Column({
    type: 'enum',
    enum: ['upcoming', 'ongoing', 'completed'],
    default: 'upcoming',
  })
  status: string;

  @Column({ nullable: true })
  attendancePercentage: number;

  @Column('simple-array', { nullable: true })
  competenciesAchieved: string[]; // Array of competency codes

  @Column('text', { nullable: true })
  supervisorRemarks: string;

  @Column({ nullable: true })
  grade: string; // A+, A, B+, B, C, F

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
