import { DecodedIdToken } from "firebase-admin/lib/auth";

export interface IAuthenticatedUser extends DecodedIdToken {
  github_access_token: string;
}