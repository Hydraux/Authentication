import { User } from "src/domain/entities/user.entity";
import { IUserRepository } from "../interfaces/user_repository";
import { UserFactory } from "src/domain/entities/user.factory";
import { IUseCase } from "../interfaces/use_case";
import { CreateUserData } from "../types/create_user_data";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class CreateUserUseCase implements IUseCase<CreateUserData, User> {
    constructor(
        @Inject('UserRepository')
        private userRepository: IUserRepository
    ) { }

    async execute(input: { id: number, name: string, email: string, password: string }): Promise<User> {
        const { id, name, email, password } = input;

        // Validate input
        if (!id || !name || !email || !password) {
            throw new Error('All fields are required to create a user');
        }

        // Create user entity
        const user = UserFactory.create({ id, name, email, password });

        // Save user to repository
        await this.userRepository.save(user);

        return user;
    }
}