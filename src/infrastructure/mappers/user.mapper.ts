import { User } from "src/domain/entities/user.entity";
import { UserEntity } from "../database/entities/user.entity";
import { UserFactory } from "src/domain/entities/user.factory";

export class UserMapper {
    static toDomain(userEntity: UserEntity): User {
        return UserFactory.reconstitue({
            id: userEntity.id,
            name: userEntity.name,
            email: userEntity.email,
            password: userEntity.password
        });
    }

    static toPersistence(user: User): UserEntity {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password
        };
    }

    static toDomainList(userEntities: any[]): any[] {
        return userEntities.map(this.toDomain);
    }
}