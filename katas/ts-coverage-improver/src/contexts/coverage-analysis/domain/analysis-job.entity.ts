
export class AnalysisJob {
  constructor(public readonly id: string) {}

  static create(): AnalysisJob {
    const jobId = `job_${Math.random().toString(36).substr(2, 9)}`;
    return new AnalysisJob(jobId);
  }
}