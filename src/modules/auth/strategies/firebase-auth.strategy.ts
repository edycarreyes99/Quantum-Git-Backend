import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import * as firebase from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth';
import * as dotenv from 'dotenv';

dotenv.config();

const firebase_params = {
  type: process.env.NOTELINK_FIREBASE_TYPE,
  projectId: process.env.NOTELINK_FIREBASE_PROJECT_ID,
  privateKeyId: process.env.NOTELINK_FIREBASE_PRIVATE_KEY_ID,
  privateKey: process.env.NOTELINK_FIREBASE_PRIVATE_KEY,
  clientEmail: process.env.NOTELINK_FIREBASE_CLIENT_EMAIL,
  clientId: process.env.NOTELINK_FIREBASE_CLIENT_ID,
  authUri: process.env.NOTELINK_FIREBASE_AUTH_URI,
  tokenUri: process.env.NOTELINK_FIREBASE_TOKEN_URI,
  authProviderX509CertUrl:
    process.env.NOTELINK_FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  clientC509CertUrl: process.env.NOTELINK_FIREBASE_CLIENT_X509_CERT_URL,
};

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  'firebase-jwt',
) {
  private defaultApp: firebase.app.App;
  private logger: Logger = new Logger(this.name);

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
    this.defaultApp = firebase.initializeApp({
      credential: firebase.credential.cert(firebase_params),
    });
  }

  async validate(token: string) {
    const firebaseUser: DecodedIdToken = await this.defaultApp
      .auth()
      .verifyIdToken(token, true)
      .catch((err) => {
        console.log(err);
        throw new UnauthorizedException(err.message);
      });
    if (!firebaseUser) {
      throw new UnauthorizedException();
    }
    return firebaseUser;
  }
}
