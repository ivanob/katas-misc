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

  async getRepoSourceFiles(language: SupportedLanguages): Promise<SourceFile[]> {
    return await this.githubApiClient.getRepositoryFiles('safishamsi', 'graphify'); // Placeholder for actual implementation
  }

  calculateSourceFileTestCoverage(file: SourceFile): number {
    return Math.floor(Math.random() * 101); // Simulate coverage percentage
  }

}
