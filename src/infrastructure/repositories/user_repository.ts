import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/application/interfaces/user_repository';
import { User } from 'src/domain/entities/user.entity';
import { UserEntity } from 'src/infrastructure/database/entities/user.entity';
import { Repository } from 'typeorm';
import { UserMapper } from '../mappers/user.mapper';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _repository: Repository<UserEntity>,
  ) {}

  existsById(id: string): Promise<boolean> {
    return this._repository.exists({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    const userEntities = await this._repository.find();
    return UserMapper.toDomainList(userEntities);
  }

  async update(entity: User): Promise<void> {
    const userEntity = UserMapper.toPersistence(entity);
    await this._repository.save(userEntity);
    return;
  }

  async delete(id: string): Promise<void> {
    await this._repository.delete(id);
    return;
  }

  count(): Promise<number> {
    return this._repository.count();
  }

  async save(user: User): Promise<string> {
    const userEntity = UserMapper.toPersistence(user);
    const { id } = await this._repository.save(userEntity);
    return id;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this._repository.findOne({ where: { email } });
    console.log(userEntity);
    return userEntity ? UserMapper.toDomain(userEntity) : null;
  }

  async findByName(name: string): Promise<User | null> {
    const userEntity = await this._repository.findOne({ where: { name } });
    return userEntity ? UserMapper.toDomain(userEntity) : null;
  }

  async findById(id: string): Promise<User | null> {
    const userEntity = await this._repository.findOne({ where: { id } });
    return userEntity ? UserMapper.toDomain(userEntity) : null;
  }
}
