import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum PayrollStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}

@Entity('payroll')
@Index(['employeeUserId', 'month', 'year'])
export class Payroll {
  @PrimaryGeneratedColumn({ name: 'payroll_id' })
  payrollId: number;

  @Column({ name: 'employee_user_id' })
  employeeUserId: number;

  @Column({ type: 'int' })
  month: number;

  @Column({ type: 'int' })
  year: number;

  @Column({ name: 'total_working_days', type: 'int' })
  totalWorkingDays: number;

  @Column({ name: 'days_present', type: 'int' })
  daysPresent: number;

  @Column({ name: 'days_absent', type: 'int' })
  daysAbsent: number;

  @Column({ name: 'days_on_leave', type: 'int' })
  daysOnLeave: number;

  @Column({ name: 'base_salary', type: 'decimal', precision: 10, scale: 2 })
  baseSalary: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  hra: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  da: number;

  @Column({ name: 'special_allowance', type: 'decimal', precision: 10, scale: 2, default: 0 })
  specialAllowance: number;

  @Column({ name: 'other_allowances', type: 'decimal', precision: 10, scale: 2, default: 0 })
  otherAllowances: number;

  @Column({ name: 'gross_salary', type: 'decimal', precision: 10, scale: 2 })
  grossSalary: number;

  @Column({ name: 'pf_deduction', type: 'decimal', precision: 10, scale: 2, default: 0 })
  pfDeduction: number;

  @Column({ name: 'esi_deduction', type: 'decimal', precision: 10, scale: 2, default: 0 })
  esiDeduction: number;

  @Column({ name: 'professional_tax', type: 'decimal', precision: 10, scale: 2, default: 0 })
  professionalTax: number;

  @Column({ name: 'tds', type: 'decimal', precision: 10, scale: 2, default: 0 })
  tds: number;

  @Column({ name: 'absence_deduction', type: 'decimal', precision: 10, scale: 2, default: 0 })
  absenceDeduction: number;

  @Column({ name: 'other_deductions', type: 'decimal', precision: 10, scale: 2, default: 0 })
  otherDeductions: number;

  @Column({ name: 'total_deductions', type: 'decimal', precision: 10, scale: 2 })
  totalDeductions: number;

  @Column({ name: 'net_salary', type: 'decimal', precision: 10, scale: 2 })
  netSalary: number;

  @Column({
    type: 'enum',
    enum: PayrollStatus,
    default: PayrollStatus.PENDING,
  })
  status: PayrollStatus;

  @Column({ name: 'approved_by_user_id', nullable: true })
  approvedByUserId: number;

  @Column({ name: 'approved_at', type: 'timestamp', nullable: true })
  approvedAt: Date;

  @Column({ name: 'payment_date', type: 'date', nullable: true })
  paymentDate: Date;

  @Column({ name: 'transaction_reference', nullable: true, length: 100 })
  transactionReference: string;

  @Column({ name: 'payslip_url', nullable: true, length: 500 })
  payslipUrl: string;

  @Column({ nullable: true, type: 'text' })
  remarks: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
