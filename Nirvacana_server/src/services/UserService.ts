import { User } from "types";
import { FirestoreDatabase } from "../implementations/FirestoreDatabaseService"; 

export class ArtistService {
  private db: FirestoreDatabase;

  constructor() {
    this.db = new FirestoreDatabase(); // Initialize your DatabaseService
  }

  async getArtist(userId: string) {
    const user: User = await this.db.getDocument("artists", userId);

    return user;
  }

  async getArtists() {
    const users: User[] = await this.db.getCollection("artists");

    return users;
  }

  async updateArtist(userId: string, data: any) {
    await this.db.updateDocument("artists", userId, data);
  }

  async createArtist(id: string, data: any) {
    await this.db.addDocument("artists", data, id);
  }
}
