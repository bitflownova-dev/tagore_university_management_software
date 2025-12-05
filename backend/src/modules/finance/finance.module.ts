import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeeBalance } from './entities/fee-balance.entity';
import { StudentEnrollment } from './entities/student-enrollment.entity';
import { Course } from './entities/course.entity';
import { AcademicYear } from './entities/academic-year.entity';
import { Semester } from './entities/semester.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FeeBalance,
      StudentEnrollment,
      Course,
      AcademicYear,
      Semester,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class FinanceModule {}
