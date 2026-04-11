import { SupportedLanguages } from "./supported-language.value-obj";

// Infrastructure DTO - mirrors GitHub API exactly
export interface GitHubContentFileResponse {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string | null;
  type: "file" | "dir" | "symlink" | "submodule";
  _links: { self: string; git: string; html: string };
}

// Domain Entity - only what matters for your business
export class SourceFile {
  constructor(
    readonly path: string,      // Unique identifier
    readonly downloadUrl: string,
    readonly testFileAssociated: TestFile[] | null,
    content?: string, // Optional, can be loaded on demand
  ) {
    if (content) {
      this.content = content;
    }
  }

  content?: string;
}

export class TestFile extends SourceFile {
  constructor(
    path: string,
    downloadUrl: string,
    content?: string,
  ) {
    super(path, downloadUrl, null, content);
  }
}