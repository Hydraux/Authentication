import { IsBoolean, IsString } from 'class-validator';

export class LogoutRequest {
  @IsString()
  refreshToken?: string;

  @IsBoolean()
  logoutAll?: boolean;
}
