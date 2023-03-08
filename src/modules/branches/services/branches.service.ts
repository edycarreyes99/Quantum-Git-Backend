import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { OctokitService } from "../../../core/services/github/octokit.service";
import { IBranch } from "../interfaces/branch.interface";
import { IAuthenticatedUser } from "../../auth/interfaces/authenticated-user.interface";
import { IPaginatedResponse } from "../../../core/interfaces/paginated-response.interface";
import { BRANCHES_URL } from "../../../core/constants/branch.constants";

@Injectable()
export class BranchesService extends OctokitService<IBranch> {
  constructor() {
    super();
  }

  // Method to fetch all branches for a repo
  findAllByRepoName(authenticatedUser: IAuthenticatedUser, repoName: string): Promise<IPaginatedResponse<IBranch>> {
    return new Promise<IPaginatedResponse<IBranch>>(async (resolve, rejects) => {
      await this.request(authenticatedUser.github_access_token, BRANCHES_URL, {
        owner: authenticatedUser.github_user.login,
        repo: repoName,
        per_page: 100,
      }).then((branches) => {
        resolve(branches);
      }).catch((error) => {
        rejects(new InternalServerErrorException(error.message));
      });
    });
  }
}
