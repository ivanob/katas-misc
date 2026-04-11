import { SourceFile } from './source-file.entity';

export class Repo {
  private readonly sourceFiles: SourceFile[] = [];

  constructor(
    readonly id: string,
    readonly repositoryUrl: string,
  ) {}

  addFile(file: SourceFile): void {
    this.sourceFiles.push(file);
  }

  addTestFile(file: SourceFile): void {
    this.testFiles.push(file);
  }

  getSourceFiles(): SourceFile[] {
    return [...this.sourceFiles]; // Return copy to prevent external mutation
  }

  getTestFiles(): SourceFile[] {
    return [...this.testFiles]; // Return copy to prevent external mutation
  }

  getAverageTestCoverage(): number {
    if (this.sourceFiles.length === 0) return 0;
    // const total = this.files.reduce((sum, file) => sum + file.coverage, 0);
    const total = 0;
    return total / this.sourceFiles.length;
  }
}