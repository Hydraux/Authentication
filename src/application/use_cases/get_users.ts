import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "../interfaces/user_repository";

@Injectable()
export class GetUsersUseCase {
    constructor(
            @Inject('UserRepository')
            private userRepository: IUserRepository
        ) {}

    async execute() {
        try {
            const users = await this.userRepository.findAll();
            return users;
        } catch (error) {
            throw new Error(`Error fetching users: ${error.message}`);
        }
    }
}