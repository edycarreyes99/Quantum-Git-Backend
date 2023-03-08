import { Injectable, UnauthorizedException } from "@nestjs/common";
import { IAuthenticatedUser } from "../../auth/interfaces/authenticated-user.interface";
import { IUser } from "../interfaces/user.interface";

@Injectable()
export class UsersService {

  // Method to return the current authenticated GitHub user
  findCurrentAuthenticatedGitHubUser(authenticatedUser: IAuthenticatedUser): Promise<IUser> {
    return new Promise<IUser>(async (resolve, rejects) => {
      if (authenticatedUser?.github_user) {
        resolve(authenticatedUser.github_user);
      }
      rejects(new UnauthorizedException("No GitHub user authenticated found."));
    });
  }
}
