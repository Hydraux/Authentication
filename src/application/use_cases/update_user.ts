import { User } from 'src/domain/entities/user.entity';
import { IUserRepository } from '../interfaces/user_repository';
import { Inject, Injectable } from '@nestjs/common';
import { UserNotFoundError } from 'src/domain/exceptions/user.exceptions';
import { IUseCase } from '../interfaces/use_case';
import { UpdateUserRequest } from '../dtos/update_user_request';

@Injectable()
export class UpdateUserUseCase implements IUseCase<UpdateUserRequest, User> {
  constructor(
    @Inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ id, email, name, password }: UpdateUserRequest) {
    try {
      if (!id) {
        throw new Error('User ID is required');
      }

      const user: User | null = await this.userRepository.findById(id);
      if (!user) {
        throw new UserNotFoundError(id);
      }

      user.email = email ?? user.email;
      user.name = name ?? user.name;
      user.password = password ?? user.password;

      await this.userRepository.update(user);
      return user;
    } catch (error) {
      throw new Error(`Error updating user: ${error}`);
    }
  }
}
