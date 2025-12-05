import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mark } from './entities/mark.entity';
import { MarksService } from './marks.service';
import { MarksController } from './marks.controller';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mark]),
    NotificationsModule,
  ],
  controllers: [MarksController],
  providers: [MarksService],
  exports: [MarksService],
})
export class MarksModule {}
