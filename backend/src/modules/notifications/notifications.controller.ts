import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Get()
  async getUserNotifications(
    @Request() req,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.notificationsService.getUserNotifications(
      req.user.userId,
      limit,
      offset,
    );
  }

  @Get('unread-count')
  async getUnreadCount(@Request() req) {
    return this.notificationsService.getUnreadCount(req.user.userId);
  }

  @Post(':id/read')
  async markAsRead(@Param('id') id: number) {
    return this.notificationsService.markAsRead(id);
  }

  @Post('read-all')
  async markAllAsRead(@Request() req) {
    return this.notificationsService.markAllAsRead(req.user.userId);
  }

  @Delete(':id')
  async deleteNotification(@Param('id') id: number) {
    return this.notificationsService.deleteNotification(id);
  }
}
