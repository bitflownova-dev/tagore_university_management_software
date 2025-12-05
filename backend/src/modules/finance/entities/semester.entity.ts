import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { AcademicYear } from './academic-year.entity';

export enum SemesterType {
  ODD = 'ODD',
  EVEN = 'EVEN',
  SUMMER = 'SUMMER',
}

@Entity('semesters')
export class Semester {
  @PrimaryGeneratedColumn({ name: 'semester_id' })
  semesterId: number;

  @Column({ name: 'academic_year_id' })
  academicYearId: number;

  @ManyToOne(() => AcademicYear)
  @JoinColumn({ name: 'academic_year_id' })
  academicYear: AcademicYear;

  @Column({ name: 'semester_number', type: 'int' })
  semesterNumber: number;

  @Column({ name: 'semester_type', type: 'enum', enum: SemesterType })
  semesterType: SemesterType;

  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date' })
  endDate: Date;

  @Column({ name: 'is_current', type: 'boolean', default: false })
  isCurrent: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
