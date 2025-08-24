import { DomainExceptionFilter } from './domain_exception.filter';
import { Test, TestingModule } from '@nestjs/testing';
import {
  UserAlreadyExistsError,
  UserNotFoundError,
  UserWithEmailNotFoundError,
} from '../../domain/exceptions/user.exceptions';
import { HttpStatus, Logger } from '@nestjs/common';
import {
  InvalidCredentialsError,
  PasswordsDontMatchException,
} from '../../domain/exceptions/auth.exceptions';

const mockAppLoggerService = {
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
};
const mockJson = jest.fn();
const mockStatus = jest.fn().mockImplementation(() => ({
  json: mockJson,
}));
const mockGetResponse = jest.fn().mockImplementation(() => ({
  status: mockStatus,
}));

const mockGetRequest = jest.fn().mockImplementation(() => ({
  url: 'fake_url/test',
}));
const mockHttpArgumentsHost = jest.fn().mockImplementation(() => ({
  getResponse: mockGetResponse,
  getRequest: mockGetRequest,
}));

const mockArgumentsHost = {
  switchToHttp: mockHttpArgumentsHost,
  getArgByIndex: jest.fn(),
  getArgs: jest.fn(),
  getType: jest.fn(),
  switchToRpc: jest.fn(),
  switchToWs: jest.fn(),
};

const mockDate = Date.now();

describe('Domain Exception Filter', () => {
  let domainExceptionFilter: DomainExceptionFilter;

  beforeEach(async () => {
    jest.clearAllMocks();
    jest.useFakeTimers().setSystemTime(mockDate);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DomainExceptionFilter,
        { provide: Logger, useValue: mockAppLoggerService },
      ],
    }).compile();

    domainExceptionFilter = module.get<DomainExceptionFilter>(
      DomainExceptionFilter,
    );
  });

  it('Handles UserAlreadyExists errors', () => {
    domainExceptionFilter.catch(
      new UserAlreadyExistsError('test@email.com'),
      mockArgumentsHost,
    );

    expect(mockHttpArgumentsHost).toHaveBeenCalledTimes(1);
    expect(mockHttpArgumentsHost).toHaveBeenCalledWith();
    expect(mockGetResponse).toHaveBeenCalledTimes(1);
    expect(mockGetResponse).toHaveBeenCalledWith();
    expect(mockStatus).toHaveBeenCalledTimes(1);
    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.CONFLICT);
    expect(mockJson).toHaveBeenCalledTimes(1);
    expect(mockJson).toHaveBeenCalledWith({
      error: {
        code: 'USER_ALREADY_EXISTS',
        message: `User with email 'test@email.com' already exists`,
        path: 'fake_url/test',
        timestamp: new Date(mockDate).toISOString(),
      },
      success: false,
    });
  });

  it('Handles UserNotFound errors', () => {
    domainExceptionFilter.catch(
      new UserNotFoundError('123'),
      mockArgumentsHost,
    );

    expect(mockHttpArgumentsHost).toHaveBeenCalledTimes(1);
    expect(mockHttpArgumentsHost).toHaveBeenCalledWith();
    expect(mockGetResponse).toHaveBeenCalledTimes(1);
    expect(mockGetResponse).toHaveBeenCalledWith();
    expect(mockStatus).toHaveBeenCalledTimes(1);
    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockJson).toHaveBeenCalledTimes(1);
    expect(mockJson).toHaveBeenCalledWith({
      error: {
        code: 'USER_NOT_FOUND',
        message: `User with identifier '123' not found`,
        path: 'fake_url/test',
        timestamp: new Date(mockDate).toISOString(),
      },
      success: false,
    });
  });

  it('Handles UserWithEmailNotFound errors', () => {
    domainExceptionFilter.catch(
      new UserWithEmailNotFoundError('test@email.com'),
      mockArgumentsHost,
    );

    expect(mockHttpArgumentsHost).toHaveBeenCalledTimes(1);
    expect(mockHttpArgumentsHost).toHaveBeenCalledWith();
    expect(mockGetResponse).toHaveBeenCalledTimes(1);
    expect(mockGetResponse).toHaveBeenCalledWith();
    expect(mockStatus).toHaveBeenCalledTimes(1);
    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockJson).toHaveBeenCalledTimes(1);
    expect(mockJson).toHaveBeenCalledWith({
      error: {
        code: 'USER_WITH_EMAIL_NOT_FOUND',
        message: `User with email 'test@email.com' not found`,
        path: 'fake_url/test',
        timestamp: new Date(mockDate).toISOString(),
      },
      success: false,
    });
  });
  it('Handles InvalidCredentials errors', () => {
    domainExceptionFilter.catch(
      new InvalidCredentialsError(),
      mockArgumentsHost,
    );

    expect(mockHttpArgumentsHost).toHaveBeenCalledTimes(1);
    expect(mockHttpArgumentsHost).toHaveBeenCalledWith();
    expect(mockGetResponse).toHaveBeenCalledTimes(1);
    expect(mockGetResponse).toHaveBeenCalledWith();
    expect(mockStatus).toHaveBeenCalledTimes(1);
    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.UNAUTHORIZED);
    expect(mockJson).toHaveBeenCalledTimes(1);
    expect(mockJson).toHaveBeenCalledWith({
      error: {
        code: 'INVALID_CREDENTIALS',
        message: `Invalid email or password`,
        path: 'fake_url/test',
        timestamp: new Date(mockDate).toISOString(),
      },
      success: false,
    });
  });

  it('Handles PasswordsDontMatch errors', () => {
    domainExceptionFilter.catch(
      new PasswordsDontMatchException(),
      mockArgumentsHost,
    );

    expect(mockHttpArgumentsHost).toHaveBeenCalledTimes(1);
    expect(mockHttpArgumentsHost).toHaveBeenCalledWith();
    expect(mockGetResponse).toHaveBeenCalledTimes(1);
    expect(mockGetResponse).toHaveBeenCalledWith();
    expect(mockStatus).toHaveBeenCalledTimes(1);
    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.UNPROCESSABLE_ENTITY);
    expect(mockJson).toHaveBeenCalledTimes(1);
    expect(mockJson).toHaveBeenCalledWith({
      error: {
        code: 'PASSWORDS_DONT_MATCH',
        message: `Passwords do not match`,
        path: 'fake_url/test',
        timestamp: new Date(mockDate).toISOString(),
      },
      success: false,
    });
  });

  it('Handles generic errors', () => {
    domainExceptionFilter.catch(new Error('generic error'), mockArgumentsHost);

    expect(mockHttpArgumentsHost).toHaveBeenCalledTimes(1);
    expect(mockHttpArgumentsHost).toHaveBeenCalledWith();
    expect(mockGetResponse).toHaveBeenCalledTimes(1);
    expect(mockGetResponse).toHaveBeenCalledWith();
    expect(mockStatus).toHaveBeenCalledTimes(1);
    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(mockJson).toHaveBeenCalledTimes(1);
    expect(mockJson).toHaveBeenCalledWith({
      error: {
        code: 'INTERNAL_ERROR',
        message: `Internal server error`,
        path: 'fake_url/test',
        timestamp: new Date(mockDate).toISOString(),
      },
      success: false,
    });
  });
});
