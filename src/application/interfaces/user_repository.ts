import { User } from 'src/domain/entities/user.entity';
import { IRepository } from './repository';

export interface IUserRepository extends IRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  findByName(name: string): Promise<User | null>;
}
