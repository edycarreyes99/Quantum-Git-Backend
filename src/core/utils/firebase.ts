import * as admin from "firebase-admin";
import * as dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  type: process.env.QUANTUM_GIT_FIREBASE_TYPE,
  projectId: process.env.QUANTUM_GIT_FIREBASE_PROJECT_ID,
  privateKeyId: process.env.QUANTUM_GIT_FIREBASE_PRIVATE_KEY_ID,
  privateKey: process.env.QUANTUM_GIT_FIREBASE_PRIVATE_KEY,
  clientEmail: process.env.QUANTUM_GIT_FIREBASE_CLIENT_EMAIL,
  clientId: process.env.QUANTUM_GIT_FIREBASE_CLIENT_ID,
  authUri: process.env.QUANTUM_GIT_FIREBASE_AUTH_URI,
  tokenUri: process.env.QUANTUM_GIT_FIREBASE_TOKEN_URI,
  authProviderX509CertUrl:
  process.env.QUANTUM_GIT_FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  clientC509CertUrl: process.env.QUANTUM_GIT_FIREBASE_CLIENT_X509_CERT_URL,
};

export const firebase: admin.app.App = admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});