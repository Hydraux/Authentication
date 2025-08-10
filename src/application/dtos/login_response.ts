export class LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  userId: string;
  message?: string; // Optional message, e.g., "Login successful"
}
