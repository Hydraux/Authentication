// infrastructure/filters/domain-exception.filter.ts
import { 
  ExceptionFilter, 
  Catch, 
  ArgumentsHost, 
  HttpStatus,
  Logger 
} from '@nestjs/common';
import { Response } from 'express';
import {
  UserAlreadyExistsError,
  UserNotFoundError,
  InvalidCredentialsError,
  UserWithEmailNotFoundError,
} from 'src/domain/exceptions/user.exceptions';

@Catch()
export class DomainExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(DomainExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    let status: HttpStatus;
    let message: string;
    let code: string;

    // Map domain exceptions to HTTP responses
    if (exception instanceof UserAlreadyExistsError) {
      status = HttpStatus.CONFLICT;
      message = exception.message;
      code = 'USER_ALREADY_EXISTS';
    } else if (exception instanceof UserNotFoundError) {
      status = HttpStatus.NOT_FOUND;
      message = exception.message;
      code = 'USER_NOT_FOUND';
    } else if (exception instanceof UserWithEmailNotFoundError) {
      status = HttpStatus.NOT_FOUND;
      message = exception.message;
      code = 'USER_WITH_EMAIL_NOT_FOUND';
    } else if (exception instanceof InvalidCredentialsError) {
      status = HttpStatus.UNAUTHORIZED;
      message = exception.message;
      code = 'INVALID_CREDENTIALS';
    } else if (exception instanceof Error) {
      // Generic error handling
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
      code = 'INTERNAL_ERROR';
      
      // Log unexpected errors
      this.logger.error(
        `Unexpected error: ${exception.message}`,
        exception.stack,
        { url: request.url, method: request.method }
      );
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Unknown error occurred';
      code = 'UNKNOWN_ERROR';
    }

    const errorResponse = {
      success: false,
      error: {
        code,
        message,
        timestamp: new Date().toISOString(),
        path: request.url,
      },
    };

    response.status(status).json(errorResponse);
  }
}