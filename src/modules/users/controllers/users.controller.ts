import { Controller } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { ApiBearerAuth, ApiHeader, ApiTags } from "@nestjs/swagger";

@ApiTags('Users')
@ApiBearerAuth()
@ApiHeader({
  name: "Secondary_Authorization",
  description: "GitHub Access Token",
  required: true,
})
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }
}
