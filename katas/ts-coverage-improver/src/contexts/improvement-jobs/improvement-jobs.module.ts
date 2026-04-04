import { Module } from '@nestjs/common';
import { ImprovementJobsApplicationService } from './application/improvement-jobs.application.service';
import { ImprovementJobsController } from './interface/improvement-jobs.controller';

@Module({
  controllers: [ImprovementJobsController],
  providers: [ImprovementJobsApplicationService],
  exports: [ImprovementJobsApplicationService],
})
export class ImprovementJobsModule {}
