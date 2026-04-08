import { Injectable } from '@nestjs/common';
import { DomainService } from '../domain/domain-service';
import { ImprovementJob } from '../domain/improvement-job.entity';
import { ImprovementJobDto } from '../domain/improve-job.entity';

@Injectable()
export class ApplicationService {
  private readonly domainService = new DomainService();

  runImprovement(dto: ImprovementJobDto): void { }
  
  getImprovementStatus(repoId: string, jobId: string) { }
}
