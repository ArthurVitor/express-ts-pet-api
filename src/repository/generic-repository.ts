import { Collection, ObjectId, Document, Filter, WithId, OptionalUnlessRequiredId } from "mongodb";
import { getCollection } from "../db/mongo-connection";
import { NotFoundException } from "../exceptions/NotFoundException";

class GenericRepository<T extends Document> {
    private readonly collectionName: string;

    constructor(collectionName: string) {
        this.collectionName = collectionName;
    }

    async getById(_id: ObjectId): Promise<WithId<T>> {
        const collection: Collection<T> = await getCollection<T>(this.collectionName);
        const item = await collection.findOne({ _id: _id } as unknown as Filter<T>);
        
        if(!item) {
            throw new NotFoundException("Couldn't find object with Id: " + _id.toString())
        }

        return item;
    }

    async insertOne(document: T & OptionalUnlessRequiredId<T>): Promise<WithId<T>> {
        const collection: Collection<T> = await getCollection<T>(this.collectionName);
        const result = await collection.insertOne(document);
        
        return await this.getById(result.insertedId); 
    }

}

export { GenericRepository }