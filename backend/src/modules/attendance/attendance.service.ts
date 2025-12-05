import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { AttendanceRecord, AttendanceStatus, UserType } from './entities/attendance.entity';
import { User } from '../users/entities/user.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { startOfMonth, endOfMonth, format } from 'date-fns';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceRecord)
    private attendanceRepository: Repository<AttendanceRecord>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectQueue('attendance-processing')
    private attendanceQueue: Queue,
    private notificationsService: NotificationsService,
  ) {}

  async markAttendance(attendanceData: {
    userId: number;
    userType: UserType;
    collegeId: number;
    classId?: number;
    subjectId?: number;
    attendanceDate: Date;
    status: AttendanceStatus;
    markedByUserId: number;
    markingMethod: string;
    location?: any;
    remarks?: string;
  }) {
    // Check if already marked for this date
    const existing = await this.attendanceRepository.findOne({
      where: {
        userId: attendanceData.userId,
        attendanceDate: attendanceData.attendanceDate,
      },
    });

    let attendance;
    if (existing) {
      // Update existing record
      await this.attendanceRepository.update(existing.attendanceId, {
        ...attendanceData,
        markingMethod: attendanceData.markingMethod as any,
      });
      attendance = await this.attendanceRepository.findOne({
        where: { attendanceId: existing.attendanceId },
      });
    } else {
      // Create new record
      attendance = this.attendanceRepository.create({
        ...attendanceData,
        markingMethod: attendanceData.markingMethod as any,
      });
      attendance = await this.attendanceRepository.save(attendance);
    }

    // If student is absent, trigger parent notification
    if (attendanceData.userType === UserType.STUDENT && attendanceData.status === AttendanceStatus.ABSENT) {
      await this.attendanceQueue.add('notify-parent-absent', {
        attendanceId: attendance.attendanceId,
        userId: attendance.userId,
      });
    }

    return attendance;
  }

  async markBulkAttendance(attendanceList: any[]) {
    const results = [];
    
    for (const attendanceData of attendanceList) {
      try {
        const attendance = await this.markAttendance(attendanceData);
        results.push({ success: true, attendance });
      } catch (error) {
        results.push({ 
          success: false, 
          error: error.message,
          userId: attendanceData.userId,
        });
      }
    }

    return results;
  }

  async getUnnotifiedAbsences(date: Date) {
    return this.attendanceRepository.find({
      where: {
        attendanceDate: date,
        status: AttendanceStatus.ABSENT,
        userType: UserType.STUDENT,
      },
    });
  }

  async getAttendanceByUser(userId: number, startDate: Date, endDate: Date) {
    return this.attendanceRepository.find({
      where: {
        userId,
        attendanceDate: Between(startDate, endDate),
      },
      order: {
        attendanceDate: 'DESC',
      },
    });
  }

  async getAttendanceSummary(userId: number, month: number, year: number) {
    const startDate = startOfMonth(new Date(year, month - 1));
    const endDate = endOfMonth(new Date(year, month - 1));

    const records = await this.attendanceRepository.find({
      where: {
        userId,
        attendanceDate: Between(startDate, endDate),
      },
    });

    const summary = {
      totalDays: records.length,
      present: records.filter(r => r.status === AttendanceStatus.PRESENT).length,
      absent: records.filter(r => r.status === AttendanceStatus.ABSENT).length,
      onLeave: records.filter(r => r.status === AttendanceStatus.ON_LEAVE).length,
      halfDay: records.filter(r => r.status === AttendanceStatus.HALF_DAY).length,
      late: records.filter(r => r.status === AttendanceStatus.LATE).length,
      percentage: 0,
    };

    if (summary.totalDays > 0) {
      summary.percentage = parseFloat(
        ((summary.present + summary.halfDay * 0.5) / summary.totalDays * 100).toFixed(2)
      );
    }

    return summary;
  }

  async getClassAttendance(classId: number, attendanceDate: Date) {
    return this.attendanceRepository.find({
      where: {
        classId,
        attendanceDate,
      },
    });
  }

  async getCollegeAttendanceToday(collegeId: number) {
    const today = format(new Date(), 'yyyy-MM-dd');
    
    const studentAttendance = await this.attendanceRepository
      .createQueryBuilder('attendance')
      .where('attendance.college_id = :collegeId', { collegeId })
      .andWhere('attendance.attendance_date = :today', { today })
      .andWhere('attendance.user_type = :userType', { userType: UserType.STUDENT })
      .select('COUNT(*)', 'total')
      .addSelect('SUM(CASE WHEN status = :present THEN 1 ELSE 0 END)', 'present')
      .setParameter('present', AttendanceStatus.PRESENT)
      .getRawOne();

    const staffAttendance = await this.attendanceRepository
      .createQueryBuilder('attendance')
      .where('attendance.college_id = :collegeId', { collegeId })
      .andWhere('attendance.attendance_date = :today', { today })
      .andWhere('attendance.user_type = :userType', { userType: UserType.STAFF })
      .select('COUNT(*)', 'total')
      .addSelect('SUM(CASE WHEN status = :present THEN 1 ELSE 0 END)', 'present')
      .setParameter('present', AttendanceStatus.PRESENT)
      .getRawOne();

    return {
      date: today,
      student: {
        total: parseInt(studentAttendance.total) || 0,
        present: parseInt(studentAttendance.present) || 0,
        percentage: studentAttendance.total > 0 
          ? parseFloat((studentAttendance.present / studentAttendance.total * 100).toFixed(2))
          : 0,
      },
      staff: {
        total: parseInt(staffAttendance.total) || 0,
        present: parseInt(staffAttendance.present) || 0,
        percentage: staffAttendance.total > 0
          ? parseFloat((staffAttendance.present / staffAttendance.total * 100).toFixed(2))
          : 0,
      },
    };
  }

  async getAttendanceReport(filters: {
    collegeId?: number;
    departmentId?: number;
    classId?: number;
    userType?: UserType;
    startDate: Date;
    endDate: Date;
  }) {
    const query = this.attendanceRepository
      .createQueryBuilder('attendance')
      .leftJoinAndSelect('attendance.userId', 'user')
      .where('attendance.attendance_date BETWEEN :startDate AND :endDate', {
        startDate: filters.startDate,
        endDate: filters.endDate,
      });

    if (filters.collegeId) {
      query.andWhere('attendance.college_id = :collegeId', { collegeId: filters.collegeId });
    }

    if (filters.classId) {
      query.andWhere('attendance.class_id = :classId', { classId: filters.classId });
    }

    if (filters.userType) {
      query.andWhere('attendance.user_type = :userType', { userType: filters.userType });
    }

    return query.getMany();
  }
}
