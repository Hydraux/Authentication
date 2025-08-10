import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserUseCase } from 'src/application/use_cases/create_user';
import { UpdateUserUseCase } from 'src/application/use_cases/update_user';
import { GetUsersUseCase } from 'src/application/use_cases/get_users';
import { GetUserByIdUseCase } from 'src/application/use_cases/get_user_by_id';
import { UserEntity } from 'src/infrastructure/database/entities/user.entity';
import { DeleteUserByEmailUseCase } from 'src/application/use_cases/delete_user_by_email';
import { GetUserByIdRequest } from '../../application/dtos/get_user_by_id_request';
import { CreateUserRequest } from '../../application/dtos/create_user_request';
import { UpdateUserRequest } from '../../application/dtos/update_user_request';
import { DeleteUserByEmailRequest } from '../../application/dtos/delete_user_by_email_request';

@Controller('users')
export class UserController {
  constructor(
    private readonly CreateUserUseCase: CreateUserUseCase,
    private readonly UpdateUserUseCase: UpdateUserUseCase,
    private readonly GetUsersUseCase: GetUsersUseCase,
    private readonly GetUserByIdUseCase: GetUserByIdUseCase,
    private readonly DeleteUserByEmailUseCase: DeleteUserByEmailUseCase,
  ) {}

  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.GetUsersUseCase.execute();
  }

  @Get(':id')
  findById(@Param() params: GetUserByIdRequest): Promise<UserEntity | null> {
    return this.GetUserByIdUseCase.execute(params);
  }

  @Post()
  create(@Body() createUserDto: CreateUserRequest): Promise<UserEntity> {
    return this.CreateUserUseCase.execute(createUserDto);
  }

  @Post(':id')
  update(
    @Param() params: { id: string },
    @Body() updateUserDto: Omit<UpdateUserRequest, 'id'>,
  ): Promise<UserEntity | null> {
    return this.UpdateUserUseCase.execute({ ...updateUserDto, ...params });
  }

  @Delete()
  delete(@Body() deleteUserDto: DeleteUserByEmailRequest): Promise<void> {
    return this.DeleteUserByEmailUseCase.execute(deleteUserDto);
  }
}
