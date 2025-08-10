import { Inject } from '@nestjs/common';
import { IUseCase } from '../interfaces/use_case';
import { IUserRepository } from '../interfaces/user_repository';
import { UserWithEmailNotFoundError } from 'src/domain/exceptions/user.exceptions';
import { DeleteUserByEmailRequest } from '../dtos/delete_user_by_email_request';

export class DeleteUserByEmailUseCase
  implements IUseCase<DeleteUserByEmailRequest, void>
{
  constructor(
    @Inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ email }: DeleteUserByEmailRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UserWithEmailNotFoundError(email);
    }

    await this.userRepository.delete(user.id);
  }
}
