import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Payroll, PayrollStatus } from './entities/payroll.entity';
import { AttendanceRecord, AttendanceStatus, UserType } from '../attendance/entities/attendance.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { startOfMonth, endOfMonth } from 'date-fns';

@Injectable()
export class PayrollService {
  constructor(
    @InjectRepository(Payroll)
    private payrollRepository: Repository<Payroll>,
    @InjectRepository(AttendanceRecord)
    private attendanceRepository: Repository<AttendanceRecord>,
    private notificationsService: NotificationsService,
  ) {}

  async calculatePayroll(employeeUserId: number, month: number, year: number) {
    const startDate = startOfMonth(new Date(year, month - 1));
    const endDate = endOfMonth(new Date(year, month - 1));

    // Get attendance records
    const attendance = await this.attendanceRepository.find({
      where: {
        userId: employeeUserId,
        userType: UserType.STAFF,
        attendanceDate: Between(startDate, endDate),
      },
    });

    const daysPresent = attendance.filter(a => a.status === AttendanceStatus.PRESENT).length;
    const daysAbsent = attendance.filter(a => a.status === AttendanceStatus.ABSENT).length;
    const daysOnLeave = attendance.filter(a => a.status === AttendanceStatus.ON_LEAVE).length;

    // TODO: Fetch employee salary structure from employee_details table
    const baseSalary = 45000;
    const hra = 10000;
    const da = 7000;
    const specialAllowance = 3000;

    const grossSalary = baseSalary + hra + da + specialAllowance;
    const totalWorkingDays = 26;
    
    const absenceDeduction = daysAbsent > 0 
      ? (grossSalary / totalWorkingDays) * daysAbsent 
      : 0;

    const pfDeduction = baseSalary * 0.12;
    const esiDeduction = 0;
    const professionalTax = 200;

    const totalDeductions = pfDeduction + esiDeduction + professionalTax + absenceDeduction;
    const netSalary = grossSalary - totalDeductions;

    const payroll = this.payrollRepository.create({
      employeeUserId,
      month,
      year,
      totalWorkingDays,
      daysPresent,
      daysAbsent,
      daysOnLeave,
      baseSalary,
      hra,
      da,
      specialAllowance,
      grossSalary,
      pfDeduction,
      esiDeduction,
      professionalTax,
      absenceDeduction,
      totalDeductions,
      netSalary,
      status: PayrollStatus.PENDING,
    });

    const saved = await this.payrollRepository.save(payroll);

    // Notify employee
    await this.notificationsService.notifyPayrollReady(
      employeeUserId,
      month,
      year,
      netSalary,
    );

    return saved;
  }

  async getEmployeePayroll(employeeUserId: number) {
    return this.payrollRepository.find({
      where: { employeeUserId },
      order: { year: 'DESC', month: 'DESC' },
    });
  }

  async approvePayroll(payrollId: number, approvedByUserId: number) {
    await this.payrollRepository.update(payrollId, {
      status: PayrollStatus.APPROVED,
      approvedByUserId,
      approvedAt: new Date(),
    });
    return this.payrollRepository.findOne({ where: { payrollId } });
  }
}
