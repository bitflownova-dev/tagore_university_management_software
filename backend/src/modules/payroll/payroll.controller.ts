import { Controller, Get, Post, Param, Body, UseGuards, Request } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('payroll')
@UseGuards(JwtAuthGuard)
export class PayrollController {
  constructor(private payrollService: PayrollService) {}

  @Post('calculate')
  async calculatePayroll(
    @Body() data: { employeeUserId: number; month: number; year: number },
  ) {
    return this.payrollService.calculatePayroll(
      data.employeeUserId,
      data.month,
      data.year,
    );
  }

  @Get('employee/:employeeId')
  async getEmployeePayroll(@Param('employeeId') employeeId: number) {
    return this.payrollService.getEmployeePayroll(employeeId);
  }

  @Post(':id/approve')
  async approvePayroll(@Param('id') id: number, @Request() req) {
    return this.payrollService.approvePayroll(id, req.user.userId);
  }

  @Get('my-payslips')
  async getMyPayslips(@Request() req) {
    return this.payrollService.getEmployeePayroll(req.user.userId);
  }
}
