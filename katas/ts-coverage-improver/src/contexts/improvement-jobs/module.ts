import { Module } from '@nestjs/common';
import { ApplicationService } from './application/application.service';
import { ImprovementJobsController } from './interface/controller';

@Module({
  controllers: [ImprovementJobsController],
  providers: [ApplicationService],
  exports: [ApplicationService],
})
export class ImprovementJobsModule {}
