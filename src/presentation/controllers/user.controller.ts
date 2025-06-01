import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Req } from "@nestjs/common";
import { CreateUserUseCase } from "src/application/use_cases/create_user";
import { UpdateUserUseCase } from "src/application/use_cases/update_user";
import { GetUsersUseCase } from "src/application/use_cases/get_users";
import { GetUserByIdUseCase } from "src/application/use_cases/get_user_by_id";
import { GetUserByEmailUseCase } from "src/application/use_cases/get_user_by_email";
import { CreateUserData } from "src/application/types/create_user_data";
import { UserEntity } from "src/infrastructure/database/entities/user.entity";
import { DeleteUserByEmailUseCase } from "src/application/use_cases/delete_user_by_email";
import { DeleteUserByEmailData } from "src/application/types/delete_user_by_email_data";

@Controller("users")
export class UserController {
    constructor(
        private readonly CreateUserUseCase: CreateUserUseCase,
        private readonly UpdateUserUseCase: UpdateUserUseCase,
        private readonly GetUsersUseCase: GetUsersUseCase,
        private readonly GetUserByIdUseCase: GetUserByIdUseCase,
        private readonly DeleteUserByEmailUseCase: DeleteUserByEmailUseCase,
    ){}

    @Get()
    findAll(@Req() request: Request): Promise<UserEntity[]> {
        return this.GetUsersUseCase.execute();
    }

    @Get(":id")
    findById(@Param() params: {id: string}): Promise<UserEntity | null> {
        return this.GetUserByIdUseCase.execute(params.id);
    }


    @Post()
    create(@Body() createUserDto: CreateUserData): Promise<UserEntity> {
        return this.CreateUserUseCase.execute(createUserDto);
    }

    @Post(":id")
    update(@Param() params: {id: string}, @Body() updateUserDto: CreateUserData): Promise<UserEntity | null> {
        return this.UpdateUserUseCase.execute(params.id, updateUserDto);
    }

    @Delete()
    delete(@Body() deleteUserDto: DeleteUserByEmailData): Promise<void> {
        return this.DeleteUserByEmailUseCase.execute(deleteUserDto);
    }
}