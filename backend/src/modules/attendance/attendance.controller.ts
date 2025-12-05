import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Query, 
  UseGuards,
  Request,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserType } from './entities/attendance.entity';

@Controller('attendance')
@UseGuards(JwtAuthGuard)
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @Post('mark')
  async markAttendance(@Body() attendanceData: any, @Request() req) {
    return this.attendanceService.markAttendance({
      ...attendanceData,
      markedByUserId: req.user.userId,
    });
  }

  @Post('mark-bulk')
  async markBulkAttendance(@Body() data: { attendanceList: any[] }, @Request() req) {
    const attendanceList = data.attendanceList.map(item => ({
      ...item,
      markedByUserId: req.user.userId,
    }));
    return this.attendanceService.markBulkAttendance(attendanceList);
  }

  @Get('user/:userId')
  async getUserAttendance(
    @Param('userId') userId: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.attendanceService.getAttendanceByUser(
      userId,
      new Date(startDate),
      new Date(endDate),
    );
  }

  @Get('summary/:userId')
  async getAttendanceSummary(
    @Param('userId') userId: number,
    @Query('month') month: number,
    @Query('year') year: number,
  ) {
    return this.attendanceService.getAttendanceSummary(userId, month, year);
  }

  @Get('class/:classId')
  async getClassAttendance(
    @Param('classId') classId: number,
    @Query('date') date: string,
  ) {
    return this.attendanceService.getClassAttendance(classId, new Date(date));
  }

  @Get('college/:collegeId/today')
  async getCollegeAttendanceToday(@Param('collegeId') collegeId: number) {
    return this.attendanceService.getCollegeAttendanceToday(collegeId);
  }

  @Get('report')
  async getAttendanceReport(@Query() filters: any) {
    return this.attendanceService.getAttendanceReport({
      ...filters,
      startDate: new Date(filters.startDate),
      endDate: new Date(filters.endDate),
    });
  }
}
