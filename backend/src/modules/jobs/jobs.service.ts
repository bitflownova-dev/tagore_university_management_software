import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PayrollService } from '../payroll/payroll.service';
import { NotificationsService } from '../notifications/notifications.service';
import { AttendanceService } from '../attendance/attendance.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { FeeBalance } from '../finance/entities/fee-balance.entity';
import { User } from '../users/entities/user.entity';
import { NotificationType } from '../notifications/entities/notification.entity';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(
    private readonly payrollService: PayrollService,
    private readonly notificationsService: NotificationsService,
    private readonly attendanceService: AttendanceService,
    @InjectRepository(FeeBalance)
    private readonly feeBalanceRepository: Repository<FeeBalance>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * CRON JOB 1: Monthly Payroll Generation
   * Runs on last day of every month at 11:59 PM
   * Automatically calculates salary based on attendance
   */
  @Cron('59 23 L * *', {
    name: 'monthlyPayrollGeneration',
    timeZone: 'Asia/Kolkata',
  })
  async generateMonthlyPayroll() {
    this.logger.log('🕐 Starting monthly payroll generation...');

    try {
      const currentDate = new Date();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();

      // Get all active staff members
      const staff = await this.userRepository.find({
        where: {
          primaryRoleId: 4, // TEACHER role
        },
        relations: ['employeeDetails'],
      });

      this.logger.log(`Found ${staff.length} staff members for payroll`);

      let successCount = 0;
      let errorCount = 0;

      for (const employee of staff) {
        try {
          // Calculate payroll for this employee
          const payroll = await this.payrollService.calculatePayroll(
            employee.userId,
            month,
            year,
          );

          // Send notification to employee
          await this.notificationsService.notifyPayrollReady(
            employee.userId,
            payroll.payrollId,
            month,
            year,
          );

          successCount++;
        } catch (error) {
          this.logger.error(
            `Failed to generate payroll for employee ${employee.userId}:`,
            error.message,
          );
          errorCount++;
        }
      }

      this.logger.log(
        `✅ Monthly payroll generation completed. Success: ${successCount}, Errors: ${errorCount}`,
      );
    } catch (error) {
      this.logger.error(
        '❌ Monthly payroll generation failed:',
        error.message,
      );
      throw error;
    }
  }

  /**
   * CRON JOB 2: Daily Parent Absence Alerts
   * Runs every day at 6:00 PM (after classes end)
   * Notifies parents of students who were absent today
   */
  @Cron('0 18 * * *', {
    name: 'dailyParentAbsenceAlerts',
    timeZone: 'Asia/Kolkata',
  })
  async sendDailyAbsenceAlerts() {
    this.logger.log('🕐 Starting daily parent absence alerts...');

    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Get all absence records for today that haven't notified parents
      const absences = await this.attendanceService.getUnnotifiedAbsences(
        today,
      );

      this.logger.log(
        `Found ${absences.length} unnotified absences for ${today.toDateString()}`,
      );

      let successCount = 0;
      let errorCount = 0;

      for (const absence of absences) {
        try {
          // Get student and parent information
          const student = await this.userRepository.findOne({
            where: { userId: absence.userId },
          });

          if (!student) {
            this.logger.warn(`Student not found for userId: ${absence.userId}`);
            continue;
          }

          // Get parent from student metadata
          const parentId = student.metadata?.parentUserId;
          if (!parentId) {
            this.logger.warn(
              `No parent found for student: ${student.studentId}`,
            );
            continue;
          }

          // Send notification to parent
          await this.notificationsService.notifyParentAbsent(
            student.userId,
            absence.attendanceDate,
          );

          successCount++;
        } catch (error) {
          this.logger.error(
            `Failed to notify parent for absence ${absence.attendanceId}:`,
            error.message,
          );
          errorCount++;
        }
      }

      this.logger.log(
        `✅ Daily absence alerts completed. Success: ${successCount}, Errors: ${errorCount}`,
      );
    } catch (error) {
      this.logger.error('❌ Daily absence alerts failed:', error.message);
      throw error;
    }
  }

  /**
   * CRON JOB 3: Fee Reminder System
   * Runs every day at 10:00 AM
   * Sends reminders for overdue fees (7, 15, 30 days after due)
   */
  @Cron('0 10 * * *', {
    name: 'dailyFeeReminders',
    timeZone: 'Asia/Kolkata',
  })
  async sendFeeReminders() {
    this.logger.log('🕐 Starting daily fee reminders...');

    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Find overdue fees that need reminders
      const overdueFees = await this.feeBalanceRepository
        .createQueryBuilder('fee')
        .leftJoinAndSelect('fee.student', 'student')
        .where('fee.amountPending > 0')
        .andWhere('fee.dueDate < :today', { today })
        .andWhere('fee.reminderSent = :false', { false: false })
        .getMany();

      this.logger.log(`Found ${overdueFees.length} overdue fees for reminders`);

      let successCount = 0;
      let errorCount = 0;

      for (const fee of overdueFees) {
        try {
          const daysPastDue = Math.floor(
            (today.getTime() - fee.dueDate.getTime()) / (1000 * 60 * 60 * 24),
          );

          // Send reminder at 7, 15, and 30 days intervals
          if (
            daysPastDue === 7 ||
            daysPastDue === 15 ||
            daysPastDue === 30 ||
            daysPastDue % 30 === 0
          ) {
            // Create notification for student and parent
            await this.notificationsService.createNotification({
              userId: fee.studentUserId,
              notificationType: NotificationType.FEE_REMINDER,
              title: 'Fee Payment Reminder',
              message: `Your fee payment of ₹${fee.amountPending.toLocaleString()} is overdue by ${daysPastDue} days. Please pay immediately to avoid penalties.`,
              relatedEntityType: 'FEE_BALANCE',
              relatedEntityId: fee.feeBalanceId,
            });

            // Get parent and send notification
            const student = fee.student;
            if (student?.metadata?.parentUserId) {
              const parentId = student.metadata?.parentUserId;

              await this.notificationsService.createNotification({
                userId: parentId,
                notificationType: NotificationType.FEE_REMINDER,
                title: `Fee Reminder - ${student.firstName} ${student.lastName}`,
                message: `Your ward's fee payment of ₹${fee.amountPending.toLocaleString()} is overdue by ${daysPastDue} days. Due date was ${fee.dueDate.toLocaleDateString()}.`,
                relatedEntityType: 'FEE_BALANCE',
                relatedEntityId: fee.feeBalanceId,
              });
            }

            // Mark reminder as sent
            fee.reminderSent = true;
            await this.feeBalanceRepository.save(fee);

            successCount++;
          }
        } catch (error) {
          this.logger.error(
            `Failed to send fee reminder for fee ${fee.feeBalanceId}:`,
            error.message,
          );
          errorCount++;
        }
      }

      this.logger.log(
        `✅ Fee reminders completed. Success: ${successCount}, Errors: ${errorCount}`,
      );
    } catch (error) {
      this.logger.error('❌ Fee reminders failed:', error.message);
      throw error;
    }
  }

  /**
   * CRON JOB 4: Dashboard Materialized View Refresh
   * Runs every 5 minutes
   * Refreshes director dashboard statistics
   */
  @Cron(CronExpression.EVERY_5_MINUTES, {
    name: 'refreshDashboardStats',
  })
  async refreshDashboardStats() {
    this.logger.debug('🔄 Refreshing dashboard materialized views...');

    try {
      await this.userRepository.query(
        'REFRESH MATERIALIZED VIEW CONCURRENTLY director_dashboard_stats',
      );

      this.logger.debug('✅ Dashboard stats refreshed successfully');
    } catch (error) {
      this.logger.error('❌ Dashboard refresh failed:', error.message);
      // Don't throw - this is a background job
    }
  }

  /**
   * CRON JOB 5: Database Cleanup
   * Runs every Sunday at 2:00 AM
   * Archives old notifications and attendance records
   */
  @Cron('0 2 * * 0', {
    name: 'weeklyDatabaseCleanup',
    timeZone: 'Asia/Kolkata',
  })
  async weeklyDatabaseCleanup() {
    this.logger.log('🕐 Starting weekly database cleanup...');

    try {
      // Delete read notifications older than 90 days
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

      const deletedNotifications = await this.userRepository.query(
        `DELETE FROM notifications 
         WHERE is_read = true 
         AND created_at < $1`,
        [ninetyDaysAgo],
      );

      this.logger.log(
        `✅ Deleted ${deletedNotifications[1]} old read notifications`,
      );

      // Archive attendance records older than 2 years
      const twoYearsAgo = new Date();
      twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

      // In production, move to archive table instead of deleting
      // For now, just log
      this.logger.log(
        `Attendance records older than ${twoYearsAgo.toDateString()} should be archived`,
      );

      this.logger.log('✅ Weekly database cleanup completed');
    } catch (error) {
      this.logger.error('❌ Database cleanup failed:', error.message);
      throw error;
    }
  }

  /**
   * Manual trigger for testing payroll generation
   */
  async triggerPayrollManually(month: number, year: number) {
    this.logger.log(
      `Manual payroll trigger for ${month}/${year}`,
    );
    // Implementation similar to generateMonthlyPayroll but with custom month/year
  }

  /**
   * Manual trigger for testing absence alerts
   */
  async triggerAbsenceAlertsManually(date: Date) {
    this.logger.log(`Manual absence alerts trigger for ${date.toDateString()}`);
    // Implementation similar to sendDailyAbsenceAlerts but for custom date
  }
}
