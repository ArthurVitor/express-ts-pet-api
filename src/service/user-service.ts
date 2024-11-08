import { EmailAlreadyRegisteredException } from "../exceptions/EmailAlreadyRegisteredException";
import { InvalidCredentialException } from "../exceptions/InvalidCredentialException";
import { UserNotFoundException } from "../exceptions/UserNotFoundException";
import { User } from "../interfaces/user.i";
import { UserRepository } from "../repository/user-repository";
import { generateToken } from "../utils/generateJwt";
import { comparePassword, hashPassword } from "../utils/passwordUtils";

class UserService {
    private readonly userRepository: UserRepository = new UserRepository();
    
    constructor() {
    }

    async register(registerUser: User): Promise<User> {
        if (await this.userRepository.findByEmail(registerUser.email)) {
            throw new EmailAlreadyRegisteredException("This email is already being used");
        }

        registerUser.password = await hashPassword(registerUser.password);

        return await this.userRepository.insertOne(registerUser);
    }

    async login(userLogin: User): Promise<string> {
        const user: User | null = await this.userRepository.findByEmail(userLogin.email);
        
        if (!user) {
            throw new UserNotFoundException("Couldn't find user with email: " + userLogin.email);
        }

        if (!await comparePassword(userLogin.password, user.password)) {
            throw new InvalidCredentialException("Invalid Credentials")
        }

        return generateToken(user._id.toString());
    }
}

export { UserService } 