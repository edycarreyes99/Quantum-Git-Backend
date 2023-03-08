import { Octokit } from "octokit";
import { IPaginatedResponse } from "../../interfaces/paginated-response.interface";
import { Logger } from "@nestjs/common";
import { parsePaginationString } from "../../utils/pagination";
import { OctokitResponse } from "@octokit/types/dist-types/OctokitResponse";

export abstract class OctokitService<T> {
  private readonly logger = new Logger(OctokitService.name);
  private octokit: Octokit;

  // Method to initialize the octokit object
  private initialize(githubAccessToken: string): Promise<void> {
    return new Promise<void>(async (resolve, rejects) => {
      this.octokit = new Octokit({
        auth: githubAccessToken,
      });
      resolve();
    });
  }

  // Method to make a request=
  public request(githubAccessToken: string, requestUrl: string, params: Record<string, any>): Promise<IPaginatedResponse<T>> {
    return new Promise<IPaginatedResponse<T>>(async (resolve, rejects) => {
      await this.initialize(githubAccessToken).then(async () => {
        await this.octokit.request(requestUrl, params).then((response: OctokitResponse<T[]>) => {
          const paginatedResponse: IPaginatedResponse<T> = {
            ...parsePaginationString(response.headers.link),
            data: response.data,
          };

          resolve(paginatedResponse);
        }).catch((error) => {
          this.logger.error(`Error executing github request: ${error}`);
          rejects(error);
        });
      });
    });
  }
}
