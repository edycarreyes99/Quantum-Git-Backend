import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { BranchesService } from "../services/branches.service";
import { AuthenticatedGuard } from "../../auth/guards/authenticated/authenticated.guard";
import { IPaginatedResponse } from "../../../core/interfaces/paginated-response.interface";
import { IBranch } from "../interfaces/branch.interface";
import { AuthenticatedUser } from "../../auth/decorators/authenticated-user.decorator";
import { ApiBearerAuth, ApiHeader, ApiTags } from "@nestjs/swagger";

@ApiTags("Branches")
@ApiBearerAuth()
@ApiHeader({
  name: "Secondary_Authorization",
  description: "GitHub Access Token",
  required: true,
})
@Controller("branches")
@UseGuards(AuthenticatedGuard)
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {
  }

  // Method to fetch all branches for a repo
  @Get("")
  findAllByRepoName(@AuthenticatedUser() user, @Query("repo") repoName: string): Promise<IPaginatedResponse<IBranch>> {
    return this.branchesService.findAllByRepoName(user, repoName);
  }
}
