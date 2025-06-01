import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "../interfaces/user_repository";


@Injectable()
export class GetUserByIdUseCase {
    constructor(
        @Inject('UserRepository')
        private userRepository: IUserRepository
    ) { }

    async execute(id: string) {
        if (!id) {
            throw new Error('User ID is required');
        }

        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error(`User with ID ${id} not found`);
        }

        return user;
    }
}