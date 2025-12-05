import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { Payroll } from './entities/payroll.entity';
import { PayrollService } from './payroll.service';
import { PayrollController } from './payroll.controller';
import { AttendanceRecord } from '../attendance/entities/attendance.entity';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payroll, AttendanceRecord]),
    BullModule.registerQueue({
      name: 'payroll-processing',
    }),
    NotificationsModule,
  ],
  controllers: [PayrollController],
  providers: [PayrollService],
  exports: [PayrollService],
})
export class PayrollModule {}
