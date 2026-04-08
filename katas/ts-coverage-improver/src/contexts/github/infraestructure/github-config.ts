export interface GithubConfig {
  token: string;
  baseUrl: string;
}

export class GithubConfigService {
  getConfig(): GithubConfig {
    return {
      token: process.env.GITHUB_TOKEN,
      baseUrl: 'https://api.github.com',
    };
  }
}