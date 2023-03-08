import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { CommitsService } from "../services/commits.service";
import { AuthenticatedUser } from "../../auth/decorators/authenticated-user.decorator";
import { IBranch } from "../../branches/interfaces/branch.interface";
import { IPaginatedResponse } from "../../../core/interfaces/paginated-response.interface";
import { AuthenticatedGuard } from "../../auth/guards/authenticated/authenticated.guard";

@Controller("commits")
@UseGuards(AuthenticatedGuard)
export class CommitsController {
  constructor(private readonly commitsService: CommitsService) {
  }

  // Method to fetch all commits of a repo branch
  @Get("")
  findAllByRepoBranch(
    @AuthenticatedUser() user,
    @Query("repo") repoName: string,
    @Query("branch") branchSHA,
    @Query("page") page: string,
  ): Promise<IPaginatedResponse<IBranch>> {
    return this.commitsService.findAllByRepoBranch(user, repoName, branchSHA, !!page ? +page : 1);
  }
}
