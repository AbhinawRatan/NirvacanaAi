import { User } from "types";
import { FirestoreDatabase } from "../implementations/FirestoreDatabaseService"; 

export class userservice {
  private db: FirestoreDatabase;

  constructor() {
    this.db = new FirestoreDatabase(); // Initialize your DatabaseService
  }

  async getArtist(userId: string) {
    const user: User = await this.db.getDocument("users", userId);

    return user;
  }

  async getusers() {
    const users: User[] = await this.db.getCollection("users");

    return users;
  }

  async updateArtist(userId: string, data: any) {
    await this.db.updateDocument("users", userId, data);
  }

  async createArtist(id: string, data: any) {
    await this.db.addDocument("users", data, id);
  }
}
