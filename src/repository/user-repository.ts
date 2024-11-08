import { Collection, WithId } from "mongodb";
import { getCollection } from "../db/mongo-connection";
import { User } from "../interfaces/user.i";
import { GenericRepository } from "./generic-repository";
import { UserNotFoundException } from "../exceptions/UserNotFoundException";
import { InvalidCredentialException } from "../exceptions/InvalidCredentialException";
import { generateToken } from "../utils/generateJwt";
import { EmailAlreadyRegisteredException } from "../exceptions/EmailAlreadyRegisteredException";
const bcrypt = require('bcrypt');

const USER_COLLECTION: string = 'users_cl';

class UserRepository extends GenericRepository<User> {
    constructor() {
        super(USER_COLLECTION);    
    }
    
    async findByEmail(email: string): Promise<User> {
        const userCollection: Collection<User> = await getCollection(USER_COLLECTION);
        const user: WithId<User> | null = await userCollection.findOne({ email });
    
        if (!user) {
            throw new UserNotFoundException("Couldn't find user with this email")
        }

        return user;
    }

    async register(userRegister: User): Promise<User> {
        try {
            if(await this.findByEmail(userRegister.email)) {
                throw new EmailAlreadyRegisteredException("This email is already being used")
            }
        } catch (error) {

        }

        userRegister.password = await bcrypt.hash(userRegister.password, 10);

        return await this.insertOne(userRegister);
    }

    async login(userLogin: User): Promise<string> {
        const user: User = await this.findByEmail(userLogin.email);
        
        if (!(await bcrypt.compare(userLogin.password, user.password))) {
            throw new InvalidCredentialException("Invalid Credentials")
        }

        const token: string = generateToken(user._id.toString());
        return token;
    }
}

export { UserRepository }