export class ImprovementJobsInMemoryRepository {
  private readonly jobIds: string[] = [];

  add(jobId: string): void {
    this.jobIds.push(jobId);
  }

  all(): string[] {
    return [...this.jobIds];
  }
}
