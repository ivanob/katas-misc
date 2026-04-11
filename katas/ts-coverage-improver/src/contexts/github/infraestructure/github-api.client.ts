import { Injectable } from "@nestjs/common";
import { GithubConfigService } from "./github-config";
import {
  GitHubContentFileResponse,
  SourceFile,
  TestFile,
} from "../domain/source-file.entity";
import { SupportedLanguages, TypeSupportedLanguage } from "../domain/supported-language.value-obj";

@Injectable()
export class GithubApiClient {
  constructor(private configService: GithubConfigService) {}

  async getRepositoryFiles(
    owner: string,
    repo: string,
    language: TypeSupportedLanguage,
  ): Promise<SourceFile[]> {
    const config = this.configService.getConfig();
    const response = await fetch(
      `${config.baseUrl}/repos/${owner}/${repo}/contents`,
    );
    let files: SourceFile[] = [];
    if (response.ok) {
      const data: GitHubContentFileResponse[] = await response.json();
      const filteredFiles = data.filter((item: any) =>
        item.name.endsWith(SupportedLanguages[language].extension),
      );
      files = await Promise.all(filteredFiles.map(
        async (item: any) => {
          const testFile = await this.getTestFileAssociated(repo, owner, new SourceFile(item.path, item.download_url, null));
          return new SourceFile(item.path, item.download_url, [testFile]);
        }
      ));
    }
    return files;
  }

  async getFileContent(file: SourceFile): Promise<string> {
    const fileResponse = await fetch(file.downloadUrl);
    if (fileResponse.ok) {
      const content = await fileResponse.text();
      return content;
    }
    return "";
  }

  async getTestFileAssociated(repoName: string, repoOwner: string, file: SourceFile): Promise<SourceFile> {
    const config = this.configService.getConfig();
    const response = await fetch(
      `${config.baseUrl}/repos/${repoOwner}/${repoName}/contents`,
    );
    if(response.ok) {
      const data: GitHubContentFileResponse[] = await response.json();
      const testFileName = file.path.replace('.ts', '.spec.ts'); //TODO change this passing the language as param
      const testFile = data.find((item: any) => item.name === testFileName);
      if (testFile) {
        return new TestFile(testFile.path, testFile.download_url);
      }
    }
    return null;
  }

  async calculateCoverage(
    owner: string,
    repo: string,
    filePath: string,
  ): Promise<number> {
    // Call coverage service (e.g., Codecov API)
    return new Promise((resolve) => resolve(0));
  }
}
