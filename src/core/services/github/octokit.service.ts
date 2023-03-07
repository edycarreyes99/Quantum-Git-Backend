import { Octokit } from "octokit";

export abstract class GitHubService<T> {
  private octokit: Octokit;
  private githubAccessToken: string = "";

  constructor() {

  }

}
