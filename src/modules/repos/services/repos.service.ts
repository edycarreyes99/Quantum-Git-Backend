import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { IAuthenticatedUser } from "../../auth/interfaces/authenticated-user.interface";
import { OctokitService } from "../../../core/services/github/octokit.service";
import { IRepo } from "../interfaces/repo.interface";
import { REPOS_URL } from "../../../core/constants/repo.constants";
import { IPaginatedResponse } from "../../../core/interfaces/paginated-response.interface";
import { RepoPaginationOptions } from "../entities/repo-pagination-options";

@Injectable()
export class ReposService extends OctokitService<IRepo> {

  constructor() {
    super();
  }

  findAll(authenticatedUser: IAuthenticatedUser, page: number): Promise<IPaginatedResponse<IRepo>> {
    return new Promise<IPaginatedResponse<IRepo>>(async (resolve, rejects) => {
      const repoPaginationOptions = new RepoPaginationOptions();
      repoPaginationOptions.page = page;

      await this.request(
        authenticatedUser.github_access_token,
        REPOS_URL,
        repoPaginationOptions,
      ).then((repos) => {
        resolve(repos);
      }).catch((error) => {
        rejects(new InternalServerErrorException(error.toString()));
      });
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} repo`;
  }
}
