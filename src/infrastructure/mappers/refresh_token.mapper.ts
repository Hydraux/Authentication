import { RefreshToken } from 'src/domain/entities/refresh_token.entity';
import { RefreshTokenEntity } from '../database/entities/refresh_token.entity';

export class RefreshTokenMapper {
  static toDomain(refreshTokenEntity: RefreshTokenEntity): RefreshToken {
    return RefreshToken.reconstitute({
      id: refreshTokenEntity.id,
      userId: refreshTokenEntity.userId,
      tokenHash: refreshTokenEntity.tokenHash,
      createdAt: refreshTokenEntity.createdAt,
      expiresAt: refreshTokenEntity.expiresAt,
    });
  }

  static toPersistence(refreshToken: RefreshToken): RefreshTokenEntity {
    return {
      id: refreshToken.id,
      userId: refreshToken.userId,
      tokenHash: refreshToken.tokenHash,
      createdAt: refreshToken.createdAt,
      expiresAt: refreshToken.expiresAt,
    };
  }

  static toDomainList(
    refreshTokenEntities: RefreshTokenEntity[],
  ): RefreshToken[] {
    return refreshTokenEntities.map((refreshTokenEntity: RefreshTokenEntity) =>
      RefreshTokenMapper.toDomain(refreshTokenEntity),
    );
  }
}
