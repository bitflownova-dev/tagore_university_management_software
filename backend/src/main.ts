import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const configService = app.get(ConfigService);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // CORS configuration
  app.enableCors({
    origin: [
      configService.get('FRONTEND_WEB_URL'),
      configService.get('FRONTEND_MOBILE_URL'),
      'http://localhost:3001',
      'http://localhost:19006',
    ],
    credentials: true,
  });

  // API prefix
  app.setGlobalPrefix('api/v1');

  // Swagger API documentation
  const config = new DocumentBuilder()
    .setTitle('Tagore University Management System API')
    .setDescription('Unified LMS, HRMS, ERP & Finance API')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication & Authorization')
    .addTag('users', 'User Management')
    .addTag('attendance', 'Attendance Tracking')
    .addTag('marks', 'Marks & Assessment')
    .addTag('payroll', 'HR & Payroll')
    .addTag('finance', 'Fee Management')
    .addTag('notifications', 'Push Notifications')
    .addTag('analytics', 'Dashboard Analytics')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = configService.get('PORT') || 3000;
  await app.listen(port);

  console.log(`
    🚀 Tagore University Management System API
    ============================================
    📍 Server running on: http://localhost:${port}
    📚 API Documentation: http://localhost:${port}/api/docs
    🔐 Environment: ${configService.get('NODE_ENV')}
    ============================================
  `);
}

bootstrap();
