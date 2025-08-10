import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../interfaces/user_repository';
import { IUseCase } from '../interfaces/use_case';
import { User } from '../../domain/entities/user.entity';
import { GetUsersRequest } from '../dtos/get_users_request';

@Injectable()
export class GetUsersUseCase implements IUseCase<GetUsersRequest, User[]> {
  constructor(
    @Inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute() {
    try {
      return await this.userRepository.findAll();
    } catch (error) {
      throw new Error(`Error fetching users: ${error}`);
    }
  }
}
