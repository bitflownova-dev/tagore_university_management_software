import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { NotificationsService } from './notifications.service';

@Processor('notifications')
export class NotificationProcessor {
  constructor(private notificationsService: NotificationsService) {}

  @Process('send-push')
  async handleSendPush(job: Job) {
    const { notificationId } = job.data;
    await this.notificationsService.sendPushNotification(notificationId);
  }
}
