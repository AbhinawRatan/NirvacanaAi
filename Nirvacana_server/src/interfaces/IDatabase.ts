export interface IDatabase {
  getDocument(collection: string, documentId: string): Promise<any>;
  getCollection(collection: string): Promise<any[]>;
  addDocument(collection: string, data: any): Promise<void>;
  updateDocument(
    collection: string,
    documentId: string,
    data: any,
  ): Promise<void>;
  deleteDocument(collection: string, documentId: string): Promise<void>;
}
