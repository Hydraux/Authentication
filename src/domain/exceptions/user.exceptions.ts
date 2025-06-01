export class UserAlreadyExistsError extends Error {
  constructor(email: string) {
    super(`User with email '${email}' already exists`);
    this.name = 'UserAlreadyExistsError';
  }
}

export class UserNotFoundError extends Error {
  constructor(identifier: string) {
    super(`User with identifier '${identifier}' not found`);
    this.name = 'UserNotFoundError';
  }
}

export class UserWithEmailNotFoundError extends Error {
    constructor(email: string) {
        super(`User with email '${email}' not found`);
        this.name = 'UserWithEmailNotFoundError';
    }
    }

export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid email or password');
    this.name = 'InvalidCredentialsError';
  }
}