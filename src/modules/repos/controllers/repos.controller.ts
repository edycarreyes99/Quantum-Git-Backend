import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ReposService } from "../services/repos.service";
import { AuthenticatedUser } from "../../auth/decorators/authenticated-user.decorator";
import { AuthenticatedGuard } from "../../auth/guards/authenticated/authenticated.guard";
import { IAuthenticatedUser } from "../../auth/interfaces/authenticated-user.interface";
import { IPaginatedResponse } from "../../../core/interfaces/paginated-response.interface";
import { IRepo } from "../interfaces/repo.interface";
import { ApiBearerAuth, ApiHeader, ApiTags } from "@nestjs/swagger";

@ApiTags('Repos')
@ApiBearerAuth()

@ApiHeader({
  name: "Secondary_Authorization",
  description: "GitHub Access Token",
  required: true,
})
@Controller("repos")
@UseGuards(AuthenticatedGuard)
export class ReposController {
  constructor(private readonly reposService: ReposService) {
  }

  @Get()
  findAll(@AuthenticatedUser() user: IAuthenticatedUser, @Query("page") page: string): Promise<IPaginatedResponse<IRepo>> {
    return this.reposService.findAll(user, !!page ? +page : 1);
  }
}
