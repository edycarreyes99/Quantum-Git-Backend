import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { IAuthenticatedUser } from "../../auth/interfaces/authenticated-user.interface";
import { IPaginatedResponse } from "../../../core/interfaces/paginated-response.interface";
import { IBranch } from "../../branches/interfaces/branch.interface";
import { OctokitService } from "../../../core/services/github/octokit.service";
import { COMMITS_URL } from "../../../core/constants/commit.constants";

@Injectable()
export class CommitsService extends OctokitService<IBranch> {

  constructor() {
    super();
  }

  // Method to fetch all commits of a repo branch
  findAllByRepoBranch(
    authenticatedUser: IAuthenticatedUser,
    repoName: string,
    branchSHA: string,
    page: number,
  ): Promise<IPaginatedResponse<IBranch>> {
    return new Promise<IPaginatedResponse<IBranch>>(async (resolve, rejects) => {
      await this.request(authenticatedUser.github_access_token, COMMITS_URL, {
        owner: authenticatedUser.github_user.login,
        repo: repoName,
        sha: branchSHA,
        page,
        per_page: 35,
      }).then((commits) => {
        resolve(commits);
      }).catch((error) => {
        rejects(new InternalServerErrorException(error.message));
      });
    });
  }
}
