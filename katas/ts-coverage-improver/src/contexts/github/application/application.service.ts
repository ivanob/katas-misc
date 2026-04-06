import { Injectable } from '@nestjs/common';
import { SupportedLanguages } from '../domain/supported-language.value-obj';
import { SourceFile } from '../domain/source-file.entity';

@Injectable()
export class GithubApplicationService {

  getStatus(): string {
    return 'GitHub integration ready';
  }

  getRepoSourceFiles(language: SupportedLanguages): SourceFile[] {
    return [];
  }

  calculateSourceFileTestCoverage(file: SourceFile): number {
    return Math.floor(Math.random() * 101); // Simulate coverage percentage
  }

}
