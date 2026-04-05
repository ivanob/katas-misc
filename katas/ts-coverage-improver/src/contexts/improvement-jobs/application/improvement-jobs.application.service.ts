import { Get, Injectable, Post } from '@nestjs/common';
import { ImprovementJobsDomainService } from '../domain/improvement-jobs.domain-service';

@Injectable()
export class ImprovementJobsApplicationService {
  private readonly domainService = new ImprovementJobsDomainService();

  @Post('improve')
  runImprovement() { }
  
  @Get(':repoId/improve/:jobId')
  getImprovementStatus() { }
}
