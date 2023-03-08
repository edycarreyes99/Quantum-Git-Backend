import { DecodedIdToken } from "firebase-admin/lib/auth";
import { IUser } from "../../users/interfaces/user.interface";

export interface IAuthenticatedUser extends DecodedIdToken {
  github_access_token: string;
  github_user: IUser;
}