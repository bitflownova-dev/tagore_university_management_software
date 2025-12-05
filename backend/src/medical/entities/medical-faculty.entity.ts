import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('medical_faculty')
export class MedicalFaculty {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  employeeId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  department: string; // Anatomy, Physiology, Medicine, Surgery, etc.

  @Column()
  designation: string; // Professor, Associate Professor, Assistant Professor, Senior Resident, etc.

  @Column()
  qualification: string; // MBBS, MD, MS, DM, MCh, etc.

  @Column('simple-array', { nullable: true })
  specializations: string[];

  @Column()
  dateOfJoining: Date;

  @Column({ default: 0 })
  yearsOfExperience: number;

  @Column('simple-array', { nullable: true })
  competenciesCanAssess: string[]; // Array of competency codes they can assess

  @Column({ default: false })
  isLogbookApprover: boolean;

  @Column({ default: false })
  isExaminer: boolean;

  @Column({ default: false })
  isRotationSupervisor: boolean;

  @Column({
    type: 'enum',
    enum: ['active', 'on-leave', 'retired', 'resigned'],
    default: 'active',
  })
  status: string;

  @Column('text', { nullable: true })
  bio: string;

  @Column('simple-array', { nullable: true })
  publications: string[];

  @Column({ nullable: true })
  googleScholarLink: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
