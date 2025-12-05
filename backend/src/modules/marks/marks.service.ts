import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mark } from './entities/mark.entity';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class MarksService {
  constructor(
    @InjectRepository(Mark)
    private marksRepository: Repository<Mark>,
    private notificationsService: NotificationsService,
  ) {}

  async createMark(markData: Partial<Mark>) {
    const mark = this.marksRepository.create(markData);
    return this.marksRepository.save(mark);
  }

  async publishMarks(markId: number) {
    const mark = await this.marksRepository.findOne({ where: { markId } });
    
    await this.marksRepository.update(markId, {
      isPublished: true,
      publishedAt: new Date(),
    });

    // Notify student and parent
    await this.notificationsService.notifyMarksPublished(
      mark.studentUserId,
      'Subject', // TODO: fetch subject name
      mark.marksObtained,
    );

    return this.marksRepository.findOne({ where: { markId } });
  }

  async getStudentMarks(studentUserId: number) {
    return this.marksRepository.find({
      where: { studentUserId, isPublished: true },
      order: { createdAt: 'DESC' },
    });
  }
}
