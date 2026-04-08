import { Injectable } from "@nestjs/common";
import { GithubConfigService } from "./github-config";
import { SourceFile } from "../domain/source-file.entity";
import { SupportedLanguages } from "../domain/supported-language.value-obj";

@Injectable()
export class GithubApiClient {
  constructor(private configService: GithubConfigService) {}

  async getRepositoryFiles(owner: string, repo: string): Promise<SourceFile[]> {
    const config = this.configService.getConfig();
    // Call GitHub API
    const response = await fetch(`${config.baseUrl}/repos/${owner}/${repo}/contents`);
    let files: SourceFile[] = [];
    if(response.ok){
        const data = await response.json();
        files = data.map((item: any) => new SourceFile(item.path,SupportedLanguages.TYPESCRIPT));
    }
    // Parse and return SourceFile[]
    return new Promise((resolve) => resolve(files)); // Placeholder for actual implementation
  }

  async calculateCoverage(owner: string, repo: string, filePath: string): Promise<number> {
    // Call coverage service (e.g., Codecov API)
    return new Promise((resolve) => resolve(0));
  }
}