import { ObjectId } from 'mongodb';
import { User } from '../src/interfaces/user.i';
import { UserService } from '../src/service/user-service';
import { EmailAlreadyRegisteredException } from '../src/exceptions/EmailAlreadyRegisteredException';
import { UserRepository } from '../src/repository/user-repository';
import { comparePassword } from '../src/utils/passwordUtils';
import { InvalidCredentialException } from '../src/exceptions/InvalidCredentialException';
import { UserNotFoundException } from '../src/exceptions/UserNotFoundException';
import { generateToken } from '../src/utils/generateJwt';

jest.mock('../src/repository/user-repository')
jest.mock('../src/utils/passwordUtils');
jest.mock('../src/utils/generateJwt');

describe("Auth.ts", () => {
    let userService: UserService;
    let userRepositoryMock: jest.Mocked<UserRepository>;

    beforeEach(() => {
        userRepositoryMock = new UserRepository() as jest.Mocked<UserRepository>;
        userService = new UserService(userRepositoryMock);
    })

    describe("User Register", () => {
        it("Successfully registers a user", async () => {
            const mockUser: User = {
                _id: new ObjectId(),
                username: "Arthur",
                email: "arthuremail@gmail.com",
                password: "encryptedPass",
            };
            userRepositoryMock.insertOne.mockResolvedValue(mockUser);
    
    
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
        
        it('Throws EmailAlreadyRegisteredException when email is already registered', async () => {
            const userRegister: User = {
                _id: new ObjectId(),
                username: 'Arthur',
                email: 'arthuremail@gmail.com',
                password: 'password',
            };
        
            userRepositoryMock.findByEmail.mockResolvedValue(userRegister);
        
            await expect(userService.register(userRegister)).rejects.toThrow(EmailAlreadyRegisteredException);
        });
        
    })

    describe("User Login", () => {
        it("Successfully login", async () => {
            const userLogin: User = {
                _id: new ObjectId(),
                username: "Arthur",
                email: "arthuremail@gmail.com",
                password: "password",
            };
    
            const mockUser: User = {
                _id: new ObjectId(),
                username: "Arthur",
                email: "arthuremail@gmail.com",
                password: "encryptedPassword",
            };
    
            userRepositoryMock.findByEmail.mockResolvedValue(mockUser);
    
            (comparePassword as jest.Mock).mockResolvedValue(true);
    
            (generateToken as jest.Mock).mockReturnValue("mockToken");
    
            const result = await userService.login(userLogin);
    
            expect(result).toEqual("mockToken");
        });
    
        it("Throw InvalidCredentialException when inserting an invalid password", async () => {
            const invalidUserLogin: User = {
                _id: new ObjectId(),
                username: "Arthur",
                email: "arthuremail@gmail.com",
                password: "invalidPassword",
            };
    
            const mockUser: User = {
                _id: new ObjectId(),
                username: "Arthur",
                email: "arthuremail@gmail.com",
                password: "encryptedPassword",
            };
    
            userRepositoryMock.findByEmail.mockResolvedValue(mockUser);
    
            (comparePassword as jest.Mock).mockResolvedValue(false);
    
            await expect(userService.login(invalidUserLogin)).rejects.toThrow(InvalidCredentialException);
        });
    
        it("Throw UserNotFoundException when inserting an invalid email", async () => {
            const invalidUserLogin: User = {
                _id: new ObjectId(),
                username: "Arthur",
                email: "invalidarthuremail@gmail.com",
                password: "password",
            };
    
            userRepositoryMock.findByEmail.mockResolvedValue(null);
    
            await expect(userService.login(invalidUserLogin)).rejects.toThrow(UserNotFoundException);
        });
    });
})
