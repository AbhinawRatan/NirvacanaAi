/* eslint-disable prettier/prettier */
import * as admin from "firebase-admin";
import dotenv from "dotenv";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  }),
  // databaseURL: "https://reavers-56900.firebaseio.com", // TODO
  storageBucket: process.env.STORAGE_BUCKET , // 
});

export const db = admin.firestore();
export const storage = admin.storage();
db.settings({ ignoreUndefinedProperties: true });

export const secretsClient = new SecretManagerServiceClient({
  projectId: process.env.PROJECT_ID,
  credentials: {
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  },
});
