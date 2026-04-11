import { Module } from '@nestjs/common';
import { ApplicationService } from './application/application.service';
import { CoverageAnalysisController } from './interface/controller';
import { GithubModule } from '../github/module';
import { DomainService } from './domain/domain-service';
import { CoverageAnalysisInMemoryRepository } from './infrastructure/in-memory.repository';

@Module({
  controllers: [CoverageAnalysisController],
  providers: [ApplicationService, DomainService, CoverageAnalysisInMemoryRepository],
  exports: [ApplicationService],
  imports: [GithubModule]
})
export class CoverageAnalysisModule {}
