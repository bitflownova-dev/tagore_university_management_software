import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('academic_years')
export class AcademicYear {
  @PrimaryGeneratedColumn({ name: 'academic_year_id' })
  academicYearId: number;

  @Column({ name: 'year_name', length: 20 })
  yearName: string;

  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date' })
  endDate: Date;

  @Column({ name: 'is_current', type: 'boolean', default: false })
  isCurrent: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
