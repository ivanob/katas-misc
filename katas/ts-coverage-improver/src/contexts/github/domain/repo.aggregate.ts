import { SourceFile } from './source-file.entity';

export class Repo {
  private readonly files: SourceFile[] = [];

  constructor(
    readonly id: string,
    readonly repositoryUrl: string,
  ) {}

  addFile(file: SourceFile): void {
    this.files.push(file);
  }

  getFiles(): SourceFile[] {
    return [...this.files]; // Return copy to prevent external mutation
  }

  getAverageTestCoverage(): number {
    if (this.files.length === 0) return 0;
    // const total = this.files.reduce((sum, file) => sum + file.coverage, 0);
    const total = 0;
    return total / this.files.length;
  }
}