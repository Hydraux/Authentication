import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "../interfaces/user_repository";

@Injectable()
export class GetUserByEmailUseCase {
    constructor(
        @Inject('UserRepository')
        private userRepository: IUserRepository
    ) { }

    async execute(email: string) {
        try {
            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                throw new Error(`User with email ${email} not found`);
            }
            return user;
        } catch (error) {
            throw new Error(`Error fetching user by email: ${error.message}`);
        }
    }
}