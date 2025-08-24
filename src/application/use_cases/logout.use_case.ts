import { Inject, Injectable } from '@nestjs/common';
import { LogoutRequest } from '../dtos/logout_request';
import { IUseCase } from '../interfaces/use_case';
import { IRefreshTokenRepository } from '../interfaces/refresh_token_repository';
import { ITokenGateway } from '../interfaces/token_gateway';

@Injectable()
export class LogoutUseCase implements IUseCase<LogoutRequest, void> {
  constructor(
    @Inject('RefreshTokenRepository')
    private readonly refreshTokenRepository: IRefreshTokenRepository,
    @Inject('TokenGateway')
    private readonly tokenGateway: ITokenGateway,
  ) {}

  async execute(request: LogoutRequest): Promise<void> {
    if (request.logoutAll) {
      // Logout from all devices - revoke all refresh tokens
      // Note: We need user ID for this, so it should be passed in the request
      throw new Error('Logout all requires user ID');
    }

    if (request.refreshToken) {
      try {
        // Verify and extract token hash
        const refreshTokenData = await this.tokenGateway.verifyRefreshToken(
          request.refreshToken,
        );

        // Find the refresh token by user ID and token hash
        const storedRefreshToken =
          await this.refreshTokenRepository.findByTokenAndUserId(
            request.refreshToken,
            refreshTokenData.userId,
          );

        if (!storedRefreshToken || !storedRefreshToken.isValid()) {
          return;
        }

        // Revoke the specific refresh token
        await this.refreshTokenRepository.revokeByTokenHash(
          storedRefreshToken.tokenHash,
        );
      } catch (error) {
        console.error(error);
        throw error; // Rethrow to be caught by the route handler response
      }
    }
  }
}
