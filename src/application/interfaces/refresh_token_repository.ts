import { RefreshToken } from "src/domain/entities/refresh_token.entity";

export interface IRefreshTokenRepository {
  save(refreshToken: RefreshToken): Promise<void>;
  findByTokenAndUserId(token: string, userId: string): Promise<RefreshToken | null>;
  revokeAllByUserId(userId: string): Promise<void>;
  revokeByTokenHash(tokenHash: string): Promise<void>;
  deleteExpiredTokens(): Promise<void>;
}