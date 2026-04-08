import { Controller, Get, Param, Post } from "@nestjs/common";
import { ApplicationService } from "../application/application.service";
import { ImprovementJobDto } from "../domain/improve-job.entity";

@Controller("repos")
export class ImprovementJobsController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post("analyze")
  runImprovementJob(dto: ImprovementJobDto) {}

  @Get(":repoId/improve/:jobId")
  getImprovementJobStatus(
    @Param("repoId") repoId: string,
    @Param("jobId") jobId: string,
  ) {
    console.log(repoId, jobId);
    return this.applicationService.getImprovementStatus(repoId, jobId);
  }
}
