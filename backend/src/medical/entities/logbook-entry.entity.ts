import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('medical_logbook_entries')
export class LogbookEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  studentId: string;

  @Column()
  competencyCode: string;

  @Column()
  date: Date;

  @Column()
  procedure: string;

  @Column()
  department: string;

  @Column()
  supervisorId: string;

  @Column()
  supervisorName: string;

  @Column()
  patientId: string;

  @Column({ nullable: true })
  patientAge: number;

  @Column({ nullable: true })
  patientGender: string;

  @Column('text')
  observations: string;

  @Column('text', { nullable: true })
  diagnosis: string;

  @Column('text', { nullable: true })
  learningPoints: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  })
  status: string;

  @Column('text', { nullable: true })
  feedback: string;

  @Column({ nullable: true })
  approvedAt: Date;

  @Column({ nullable: true })
  rejectionReason: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
