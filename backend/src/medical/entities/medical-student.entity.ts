import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('medical_students')
export class MedicalStudent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  rollNumber: string;

  @Column()
  registrationNumber: string; // NMC Registration Number

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  gender: string;

  @Column()
  bloodGroup: string;

  @Column()
  currentPhase: string; // phase1, phase2, phase3p1, phase3p2

  @Column({ default: 1 })
  currentYear: number; // 1, 2, 3, 4, or 5 (for internship)

  @Column()
  batchYear: number;

  @Column()
  admissionDate: Date;

  @Column({ nullable: true })
  currentRotationId: string;

  @Column('decimal', { precision: 4, scale: 2, default: 0 })
  cgpa: number;

  @Column({ default: 0 })
  totalCompetencies: number;

  @Column({ default: 0 })
  completedCompetencies: number;

  @Column({ default: 0 })
  logbookEntries: number;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  overallAttendance: number;

  @Column({
    type: 'enum',
    enum: ['active', 'on-leave', 'suspended', 'graduated', 'discontinued'],
    default: 'active',
  })
  status: string;

  @Column('text', { nullable: true })
  address: string;

  @Column({ nullable: true })
  guardianName: string;

  @Column({ nullable: true })
  guardianPhone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
