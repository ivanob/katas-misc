import { Module } from '@nestjs/common';
import { CoverageAnalysisModule } from './contexts/coverage-analysis/coverage-analysis.module';
import { ImprovementJobsModule } from './contexts/improvement-jobs/improvement-jobs.module';
import { GithubReposModule } from './contexts/github-repos/github-repos.module';

@Module({
  imports: [CoverageAnalysisModule, ImprovementJobsModule, GithubReposModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
