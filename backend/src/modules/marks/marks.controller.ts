import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { MarksService } from './marks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('marks')
@UseGuards(JwtAuthGuard)
export class MarksController {
  constructor(private marksService: MarksService) {}

  @Post()
  async createMark(@Body() markData: any, @Request() req) {
    return this.marksService.createMark({
      ...markData,
      enteredByUserId: req.user.userId,
    });
  }

  @Post(':id/publish')
  async publishMarks(@Param('id') id: number) {
    return this.marksService.publishMarks(id);
  }

  @Get('student/:studentId')
  async getStudentMarks(@Param('studentId') studentId: number) {
    return this.marksService.getStudentMarks(studentId);
  }
}
