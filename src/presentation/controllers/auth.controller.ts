import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { LoginRequest } from 'src/application/dtos/login_request';
import { LoginUseCase } from 'src/application/use_cases/login.use_case';
import { LogoutUseCase } from 'src/application/use_cases/logout.use_case';
import { RefreshTokenUseCase } from 'src/application/use_cases/refresh_token.use_case';
import { JwtAuthGuard } from 'src/infrastructure/guards/jwt_auth.guard';
import { CreateUserUseCase } from '../../application/use_cases/create_user';
import { CreateUserRequest } from '../../application/dtos/create_user_request';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly logoutUseCase: LogoutUseCase,
  ) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginRequest,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.loginUseCase.execute({
      email: loginDto.email,
      password: loginDto.password,
    });

    // Set refresh token as httpOnly cookie (only if provided)
    if (result.refreshToken) {
      response.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        path: '/auth/refresh', // Only send to refresh endpoint
      });
    }

    if (result.accessToken) {
      response.cookie('accessToken', result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: '/',
      });
    }

    return {
      success: true,
      data: {
        accessToken: result.accessToken,
        userId: result.userId,
        expiresAt: result.expiresAt,
      },
    };
  }

  @Post('sign-up')
  async signUp(
    @Body() signUpDto: CreateUserRequest,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.createUserUseCase.execute(signUpDto);
    const loginResponse = await this.loginUseCase.execute({
      email: user.email,
      password: signUpDto.password,
    });

    // Set refresh token as httpOnly cookie (only if provided)
    if (loginResponse.refreshToken) {
      response.cookie('refreshToken', loginResponse.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000, // 15 minutes
        path: '/api/auth/refresh', // Only send to refresh endpoint
      });
    }

    if (loginResponse.accessToken) {
      response.cookie('accessToken', loginResponse.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: '/',
      });
    }

    return {
      success: true,
      data: {
        accessToken: loginResponse.accessToken,
        userId: loginResponse.userId,
        expiresAt: loginResponse.expiresAt,
      },
    };
  }

  @Post('refresh')
  async refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken: string = request.cookies['refreshToken'] as string;

    if (!refreshToken) {
      throw new BadRequestException('Refresh token not provided');
    }

    const result = await this.refreshTokenUseCase.execute({ refreshToken });

    // Set new refresh token as cookie
    response.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/api/auth/refresh',
    });

    return {
      success: true,
      data: {
        accessToken: result.accessToken,
        expiresAt: result.expiresAt,
      },
    };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies['refreshToken'] as string;

    await this.logoutUseCase.execute({
      refreshToken,
    });

    response.clearCookie('refreshToken', { path: '/api/auth/refresh' });

    return {
      success: true,
      data: { message: 'Successfully logged out' },
    };
  }
}
