// src/implementations/FirestoreDatabase.ts

import { IDatabase } from "../interfaces/IDatabase";
import { db } from "../configs/firebase"; 
import config from "../configs/config";
import { FieldValue } from "firebase-admin/firestore";

export class FirestoreDatabase implements IDatabase {
  async getDocument(collection: string, documentId: string): Promise<any> {
    const doc = await db.collection(collection).doc(documentId).get();
    return doc.exists ? { ...doc.data(), id: doc.id } : null;
  }

  async getCollection(collection: string): Promise<any[]> {
    const snapshot = await db.collection(collection).get();
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  }

  async addDocument(collection: string, data: any, id?: string): Promise<void> {
    if (id) {
      await db.collection(collection).doc(id).set(data);
    } else {
      await db.collection(collection).add(data);
    }
  }

  async updateDocument(
    collection: string,
    documentId: string,
    data: any,
  ): Promise<void> {
    await db.collection(collection).doc(documentId).update(data);
  }

  async deleteDocument(collection: string, documentId: string): Promise<void> {
    await db.collection(collection).doc(documentId).delete();
  }
}
