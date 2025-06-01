import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "../interfaces/user_repository";
import { UserNotFoundError } from "src/domain/exceptions/user.exceptions";


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
            throw new UserNotFoundError(id);
        }

        return user;
    }
}