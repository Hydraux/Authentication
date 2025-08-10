import { Inject, Injectable } from '@nestjs/common';
import { IRefreshTokenRepository } from 'src/application/interfaces/refresh_token_repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, MoreThan } from 'typeorm';
import { RefreshTokenEntity } from '../database/entities/refresh_token.entity';
import { RefreshToken } from 'src/domain/entities/refresh_token.entity';
import { RefreshTokenMapper } from '../mappers/refresh_token.mapper';
import { ICryptoGateway } from 'src/application/interfaces/crypto_gateway';

@Injectable()
export class TypeOrmRefreshTokenRepository implements IRefreshTokenRepository {
  constructor(
    @InjectRepository(RefreshTokenEntity)
    private readonly repository: Repository<RefreshTokenEntity>,
    @Inject('CryptoGateway')
    private readonly cryptoGateway: ICryptoGateway, // Inject crypto for verification
  ) {}

  async findByTokenAndUserId(
    token: string,
    userId: string,
  ): Promise<RefreshToken | null> {
    // 1. Get all active tokens for this user
    const entities = await this.repository.find({
      where: {
        userId,
        expiresAt: MoreThan(new Date()),
      },
    });

    // 2. Verify the provided token against each stored hash
    for (const entity of entities) {
      const isMatch = await this.cryptoGateway.validate(
        token,
        entity.tokenHash,
      );
      if (isMatch) {
        return RefreshTokenMapper.toDomain(entity);
      }
    }

    return null;
  }

  async save(refreshToken: RefreshToken): Promise<void> {
    const entity = RefreshTokenMapper.toPersistence(refreshToken);
    await this.repository.save(entity);
  }
  async revokeByTokenHash(tokenHash: string): Promise<void> {
    await this.repository.delete({ tokenHash: tokenHash });
  }

  async revokeAllByUserId(userId: string): Promise<void> {
    await this.repository.delete({ userId });
  }

  async deleteExpiredTokens(): Promise<void> {
    await this.repository.delete({ expiresAt: LessThan(new Date()) });
  }
}
