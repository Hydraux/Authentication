import { DomainException } from './domain_exception';

export class InvalidCredentialsError extends DomainException {
  constructor() {
    super('Invalid email or password');
    this.name = 'InvalidCredentialsError';
    Object.setPrototypeOf(this, InvalidCredentialsError.prototype);
  }
}

export class InvalidTokenError extends DomainException {
  constructor(message = 'Invalid or malformed token') {
    super(message);
    this.name = 'InvalidTokenError';
    Object.setPrototypeOf(this, InvalidTokenError.prototype);
  }
}

export class TokenExpiredError extends DomainException {
  constructor() {
    super('Token has expired');
    this.name = 'TokenExpiredError';
    Object.setPrototypeOf(this, TokenExpiredError.prototype);
  }
}

export class RefreshTokenRevokedError extends DomainException {
  constructor() {
    super('Refresh token has been revoked');
    this.name = 'RefreshTokenRevokedError';
    Object.setPrototypeOf(this, RefreshTokenRevokedError.prototype);
  }
}
