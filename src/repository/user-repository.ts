import { Collection, WithId } from "mongodb";
import { getCollection } from "../db/mongo-connection";
import { User } from "../interfaces/user.i";
import { GenericRepository } from "./generic-repository";

const USER_COLLECTION: string = 'users_cl';

class UserRepository extends GenericRepository<User> {
    constructor() {
        super(USER_COLLECTION);    
    }
    
    async findByEmail(email: string): Promise<User | null>   {
        const userCollection: Collection<User> = await getCollection(USER_COLLECTION);
        const user: WithId<User> | null = await userCollection.findOne({ email });

        return user;
    }
}

export { UserRepository }