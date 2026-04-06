import { Injectable } from "@nestjs/common";
import { DomainService } from "../domain/domain-service";
import { AnalysisJob } from "../domain/analysis-job.entity";
import { GithubApplicationService } from "../../github/application/application.service";
import { SupportedLanguages } from "../../github/domain/supported-language.value-obj";
import { AnalyzeRequestDto } from "../domain/analyze-request.dto";

@Injectable()
export class ApplicationService {
  constructor(
    private readonly domainService: DomainService,
    private readonly githubService: GithubApplicationService,
  ) {}

  runAnalysis(dto: AnalyzeRequestDto): AnalysisJob {
    const job = AnalysisJob.create();
    this.performAnalysis(job, dto); // Async job, I dont await
    return job;
  }

  private async performAnalysis(job: AnalysisJob, dto: AnalyzeRequestDto) {
    const sourceFiles = this.githubService.getRepoSourceFiles(
      SupportedLanguages.TYPESCRIPT,
    );
    const filesWithCoverage = sourceFiles.map((file) => {
      const coverage = this.githubService.calculateSourceFileTestCoverage(file);
      // do something with coverage
      return { file, coverage };
    });
    console.log('Analysis completed for job:', job.id);
  }
}
