import { Controller, Get, UseGuards } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { ApiBearerAuth, ApiHeader, ApiTags } from "@nestjs/swagger";
import { AuthenticatedUser } from "../../auth/decorators/authenticated-user.decorator";
import { IUser } from "../interfaces/user.interface";
import { AuthenticatedGuard } from "../../auth/guards/authenticated/authenticated.guard";

@ApiTags("Users")
@ApiBearerAuth()
@ApiHeader({
  name: "Secondary_Authorization",
  description: "GitHub Access Token",
  required: true,
})
@Controller("users")
@UseGuards(AuthenticatedGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get("")
  findCurrentAuthenticatedGitHubUser(@AuthenticatedUser() user): Promise<IUser> {
    return this.usersService.findCurrentAuthenticatedGitHubUser(user);
  }
}
