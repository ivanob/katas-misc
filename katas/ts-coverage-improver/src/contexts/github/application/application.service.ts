import { Injectable } from '@nestjs/common';
import { SupportedLanguages } from '../domain/supported-language.value-obj';
import { SourceFile } from '../domain/source-file.entity';
import { GithubApiClient } from '../infraestructure/github-api.client';

@Injectable()
export class GithubApplicationService {
  constructor(private githubApiClient: GithubApiClient
  ) {}

  getStatus(): string {
    return 'GitHub integration ready';
  }

  async getRepoSourceFiles(language: SupportedLanguages, repoName: string, repoOwner: string): Promise<SourceFile[]> {
    return this.githubApiClient.getRepositoryFiles(repoOwner, repoName, language);
  }

  async getTestFileAssociated(repoName: string, repoOwner: string, file: SourceFile): Promise<number> {
    const hasTest = await this.githubApiClient.getTestFileAssociated(repoName, repoOwner, file);
    return Math.floor(Math.random() * 101); // Simulate coverage percentage
  }

  async calculateSourceFileTestCoverage(file: SourceFile): Promise<number> {
    this.githubApiClient.getTestFileAssociated(file.path, file.downloadUrl, file.path); // Just to simulate some processing
  }
}
