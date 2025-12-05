import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'principal', 'teacher', 'student', 'parent', 'hr', 'accountant'],
  })
  role: string;

  @Column({ nullable: true })
  college: string;

  @Column({ nullable: true })
  department: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  primaryRoleId: number;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date;

  @Column({ nullable: true })
  fcmToken: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: any;

  @Column({ nullable: true })
  studentId: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
