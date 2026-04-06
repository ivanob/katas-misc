import { Module } from '@nestjs/common';
import { ApplicationService } from './application/application.service';
import { CoverageAnalysisController } from './interface/controller';
import { GithubModule } from '../github/module';
import { DomainService } from './domain/domain-service';

@Module({
  controllers: [CoverageAnalysisController],
  providers: [ApplicationService, DomainService],
  exports: [ApplicationService],
  imports: [GithubModule]
})
export class CoverageAnalysisModule {}
