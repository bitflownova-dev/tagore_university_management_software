import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { ScheduleModule } from '@nestjs/schedule';

// Modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { MarksModule } from './modules/marks/marks.module';
import { PayrollModule } from './modules/payroll/payroll.module';
import { FinanceModule } from './modules/finance/finance.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { RealtimeModule } from './modules/realtime/realtime.module';
import { JobsModule } from './modules/jobs/jobs.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: parseInt(configService.get('DATABASE_PORT')),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, // Use migrations in production
        logging: configService.get('NODE_ENV') === 'development',
        ssl: configService.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
      }),
      inject: [ConfigService],
    }),

    // Redis & Job Queue
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: parseInt(configService.get('REDIS_PORT')),
          password: configService.get('REDIS_PASSWORD') || undefined,
        },
      }),
      inject: [ConfigService],
    }),

    // Scheduled Jobs
    ScheduleModule.forRoot(),

    // Feature Modules
    AuthModule,
    UsersModule,
    AttendanceModule,
    MarksModule,
    PayrollModule,
    FinanceModule,
    NotificationsModule,
    AnalyticsModule,
    RealtimeModule,
    JobsModule,
  ],
})
export class AppModule {}
