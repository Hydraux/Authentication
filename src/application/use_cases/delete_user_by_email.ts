import { Inject } from "@nestjs/common";
import { IUseCase } from "../interfaces/use_case";
import { IUserRepository } from "../interfaces/user_repository";
import { DeleteUserByEmailData } from "../types/delete_user_by_email_data";
import { UserNotFoundError, UserWithEmailNotFoundError } from "src/domain/exceptions/user.exceptions";

export class DeleteUserByEmailUseCase implements IUseCase<DeleteUserByEmailData, void> {
    constructor(
        @Inject('UserRepository')
        private userRepository: IUserRepository
    ) {}

    async execute({email}: DeleteUserByEmailData): Promise<void> {
            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                throw new UserWithEmailNotFoundError(email);
            }

            await this.userRepository.delete(user.id);
    }
}