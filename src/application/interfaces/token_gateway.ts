import { JwtPayload } from "src/domain/value_objects/jwt_payload";

export interface ITokenGateway {
  generateAccessToken(payload: JwtPayload): Promise<string>;
  generateRefreshToken(userId: string): Promise<{ token: string; tokenHash: string; expiresAt: Date }>;
  verifyAccessToken(token: string): Promise<JwtPayload>;
  verifyRefreshToken(token: string): Promise<{ userId: string; token: string }>;
  extractTokenFromHeader(authHeader: string): string | null;
}