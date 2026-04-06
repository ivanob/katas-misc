export class FileCoverage {
  constructor(
    readonly filePath: string, 
    readonly coverage: number,
    readonly threshold: number,
  ) {}
}
