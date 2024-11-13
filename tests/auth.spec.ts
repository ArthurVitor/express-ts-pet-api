import { ObjectId } from 'mongodb';
import { User } from '../src/interfaces/user.i';
import { UserService } from '../src/service/user-service';
import { EmailAlreadyRegisteredException } from '../src/exceptions/EmailAlreadyRegisteredException';
import { InvalidCredentialException } from '../src/exceptions/InvalidCredentialException';
import { UserNotFoundException } from '../src/exceptions/UserNotFoundException';

const userService = new UserService();

describe("User Register", () => {
    test("Successfully registers a user", async () => {
        const userRegister: User = {
            _id: new ObjectId(),
            username: "Arthur",
            email: "arthuremail@gmail.com",
            password: "password",
        };
    
        const result = await userService.register(userRegister);
    
        expect(result).toMatchObject({
            _id: expect.any(ObjectId),
            username: "Arthur",
            email: "arthuremail@gmail.com",
            password: expect.any(String), 
        });
    });
    
    test("Throws EmailAlreadyRegisteredException when email is already registered", async () => {
        const userRegister: User = {
            _id: new ObjectId(),
            username: "Arthur",
            email: "arthuremail@gmail.com",
            password: "password",
        };
    
        await expect(userService.register(userRegister)).rejects.toThrow(EmailAlreadyRegisteredException);
    });
})

describe("User Login", () => {
    test("Succesfully login", async () => {
        const userLogin: User = {
            _id: new ObjectId(),
            username: "Arthur",
            email: "arthuremail@gmail.com",
            password: "password",
        };

        const result = await userService.login(userLogin);

        await expect(result).toEqual(expect.any(String));
    })

    test("Throw InvalidCredentialException when inserting an invalid password", async () => {
        const invalidUserLogin: User = {
            _id: new ObjectId(),
            username: "Arthur",
            email: "arthuremail@gmail.com",
            password: "invalidPassword",
        };
    
        await expect(userService.login(invalidUserLogin)).rejects.toThrow(InvalidCredentialException);
    })

    test("Throw UserNotFound Exception when inserting an invalid email", async () => {
        const invalidUserLogin: User = {
            _id: new ObjectId(),
            username: "Arthur",
            email: "invalidarthuremail@gmail.com",
            password: "password",
        };
    
        await expect(userService.login(invalidUserLogin)).rejects.toThrow(UserNotFoundException);
    })
})