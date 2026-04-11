export class AnalyzeRequestDto {
  repoName: string;
  repoOwner: string;
  branch: string;
  coverageThreshold: number;
}