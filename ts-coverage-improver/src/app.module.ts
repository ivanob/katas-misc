import { Module } from '@nestjs/common';
import { CoverageAnalysisModule } from './contexts/coverage-analysis/coverage-analysis.module';
import { ImprovementJobsModule } from './contexts/improvement-jobs/improvement-jobs.module';
import { DeliveryModule } from './contexts/delivery/delivery.module';

@Module({
  imports: [CoverageAnalysisModule, ImprovementJobsModule, DeliveryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
