import { Injectable } from '@nestjs/common';
import { SupportedLanguage } from '../domain/supported-language.value-obj';
import { SourceFile } from '../domain/source-file.entity';

@Injectable()
export class ApplicationService {

  getStatus(): string {
    return 'GitHub integration ready';
  }

  getRepoSourceFiles(language: SupportedLanguage): SourceFile[] {
    return [];
  }

  calculateSourceFileTestCoverage(file: SourceFile): number {
    return 0;
  }

}
