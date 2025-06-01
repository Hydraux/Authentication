import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "../interfaces/user_repository";
import { UserWithEmailNotFoundError } from "src/domain/exceptions/user.exceptions";

@Injectable()
export class GetUserByEmailUseCase {
    constructor(
        @Inject('UserRepository')
        private userRepository: IUserRepository
    ) { }

    async execute(email: string) {
            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                throw new UserWithEmailNotFoundError(email);
            }
            return user;
    }
}