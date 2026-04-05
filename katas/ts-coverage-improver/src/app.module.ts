import { Module } from '@nestjs/common';
import { CoverageAnalysisModule } from './contexts/coverage-analysis/module';
import { ImprovementJobsModule } from './contexts/improvement-jobs/module';
import { GithubModule } from './contexts/github/module';

@Module({
  imports: [CoverageAnalysisModule, ImprovementJobsModule, GithubModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
