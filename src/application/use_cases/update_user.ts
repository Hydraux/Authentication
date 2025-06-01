import { User } from "src/domain/entities/user.entity";
import { IUserRepository } from "../interfaces/user_repository";
import { CreateUserData } from "../types/create_user_data";
import { Inject, Injectable } from "@nestjs/common";


@Injectable()
export class UpdateUserUseCase {
    constructor(
        @Inject('UserRepository')
        private userRepository: IUserRepository
    ) { }

    async execute(id: string, { name, email, password }: Partial<CreateUserData>) {
        try {
            if (!id) {
                throw new Error('User ID is required');
            }

            const user: User | null = await this.userRepository.findById(id);
            if (!user) {
                throw new Error(`User with id ${id} not found`);
            }

            user.email = email ?? user.email;
            user.name = name ?? user.name;
            user.password = password ?? user.password;

            await this.userRepository.update(user);
            return user;
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }
}