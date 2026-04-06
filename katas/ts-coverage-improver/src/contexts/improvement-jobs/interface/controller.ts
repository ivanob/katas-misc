import { Controller, Get, Post } from "@nestjs/common";
import { ApplicationService } from "../application/application.service";

@Controller("repos")
export class ImprovementJobsController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post("analyze")
  runImprovementJob() {}

  @Get(":repoId/improve/:jobId")
  getImprovementJobStatus() {}
}
