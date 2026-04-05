import { Module } from '@nestjs/common';
import { CoverageAnalysisModule } from './contexts/coverage-analysis/coverage-analysis.module';
import { ImprovementJobsModule } from './contexts/improvement-jobs/improvement-jobs.module';
import { ReposModule } from './contexts/repos/repos.module';

@Module({
  imports: [CoverageAnalysisModule, ImprovementJobsModule, ReposModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
