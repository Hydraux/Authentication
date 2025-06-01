import { User } from "src/domain/entities/user.entity";
import { IUserRepository } from "../interfaces/user_repository";
import { UserFactory } from "src/domain/entities/user.factory";
import { IUseCase } from "../interfaces/use_case";
import { CreateUserData } from "../types/create_user_data";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ICryptoGateway } from "../interfaces/crypto_gateway";
import { UserAlreadyExistsError } from "src/domain/exceptions/user.exceptions";

@Injectable()
export class CreateUserUseCase implements IUseCase<CreateUserData, User> {
    constructor(
        @Inject('UserRepository')
        private userRepository: IUserRepository,

        @Inject('CryptoGateway')
        private cryptoGateway: ICryptoGateway,
    ) { }

    async execute(input: CreateUserData): Promise<User> {
        const { name, email, password } = input;

        // Validate input
        if (!name || !email || !password) {
            throw new Error('All fields are required to create a user');
        }

        // Check if user already exists
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            Logger.error(`User with email ${email} already exists.`);
            throw new UserAlreadyExistsError(email);
        }

        // Hash the password
        const hashedPassword = await this.cryptoGateway.hashPassword(password);

        // Create user entity
        const user = UserFactory.create({name, email, password: hashedPassword });

        // Save user to repository
        await this.userRepository.save(user);

        return user;
    }
}