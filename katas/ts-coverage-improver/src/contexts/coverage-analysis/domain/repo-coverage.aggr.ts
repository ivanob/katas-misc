import { Repo } from "../../../contexts/github/domain/repo.aggregate";
import { FileCoverage } from "./file-coverage.entity";

export class RepoCoverage {
  constructor(
    readonly jobId: string,
    readonly repoName: string,
    readonly repoOwner: string,
    readonly averageCoverage: number,
    readonly fileCoverages: FileCoverage[],
  ) {}
}
