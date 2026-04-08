import { Injectable } from "@nestjs/common";
import { DomainService } from "../domain/domain-service";
import { AnalysisJob } from "../domain/analysis-job.entity";
import { GithubApplicationService } from "../../github/application/application.service";
import { SupportedLanguages } from "../../github/domain/supported-language.value-obj";
import { AnalyzeRequestDto } from "../domain/analyze-request.dto";
import { FileCoverage } from "../domain/file-coverage.entity";
import { RepoCoverage } from "../domain/repo-coverage.aggr";

@Injectable()
export class ApplicationService {
  constructor(
    private readonly domainService: DomainService,
    private readonly githubService: GithubApplicationService,
  ) {}

  runAnalysis(dto: AnalyzeRequestDto): AnalysisJob {
    console.log('Starting analysis job:');
    const job = AnalysisJob.create();
    this.performAnalysis(job, dto); // Async job, I dont await
    return job;
  }

  private async performAnalysis(job: AnalysisJob, dto: AnalyzeRequestDto) {
    const sourceFiles = await this.githubService.getRepoSourceFiles(
      SupportedLanguages.TYPESCRIPT,
    );
    const filesWithCoverage: FileCoverage[] = sourceFiles.map((file) => {
      const coverage = this.githubService.calculateSourceFileTestCoverage(file);
      return { filePath: file.path, coverage };
    });
    this.domainService.identifyLowCoverageFiles(filesWithCoverage, dto.coverageThreshold);
    console.log('Analysis completed for job:', job.id);
  }

  public getAnalysisStatus(repoId: string, jobId: string): RepoCoverage[] {
    // For simplicity, we return a static status. In a real implementation, this would check the job's progress.
    return [];
  }
}
