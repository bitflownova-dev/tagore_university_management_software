import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { PayrollModule } from '../payroll/payroll.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { AttendanceModule } from '../attendance/attendance.module';
import { FinanceModule } from '../finance/finance.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    PayrollModule,
    NotificationsModule,
    AttendanceModule,
    FinanceModule,
    UsersModule,
  ],
  providers: [JobsService],
  exports: [JobsService],
})
export class JobsModule {}
