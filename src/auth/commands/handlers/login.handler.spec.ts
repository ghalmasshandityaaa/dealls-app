import { faker } from '@faker-js/faker';
import { AuthError } from '../../../auth/errors';
import { StringUtils } from '../../../common/utils';
import { LoginCommand } from '../impl';
import { LoginResult } from '../results';
import { LoginHandler } from './login.handler';

const loggerMock = {
  trace: jest.fn(),
  info: jest.fn(),
};

const readRepositoryMock = {
  findByUsername: jest.fn(),
};

const serviceMock = {
  generateAccessToken: jest.fn(),
  generateRefreshToken: jest.fn(),
};

describe('LoginHandler', () => {
  let loginHandler: LoginHandler;

  beforeEach(() => {
    loginHandler = new LoginHandler(
      loggerMock as any,
      readRepositoryMock as any,
      serviceMock as any,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return LoginResult with access token and refresh token', async () => {
    // Arrange
    const password = faker.internet.password();
    const hashedPassword = await StringUtils.hash(password);
    const command: LoginCommand = new LoginCommand({
      username: faker.internet.userName(),
      password,
    });

    // Act
    const findByUsernameSpy = jest
      .spyOn(readRepositoryMock, 'findByUsername')
      .mockResolvedValueOnce({ id: faker.string.uuid(), password: hashedPassword });
    const compareSpy = jest.spyOn(StringUtils, 'compare').mockResolvedValueOnce(true);
    const generateAccessTokenSpy = jest
      .spyOn(serviceMock, 'generateAccessToken')
      .mockResolvedValueOnce('accessToken');
    const generateRefreshTokenSpy = jest
      .spyOn(serviceMock, 'generateRefreshToken')
      .mockResolvedValueOnce('refreshToken');
    const execute = loginHandler.execute(command);

    // Assert
    await expect(execute).resolves.toBeInstanceOf(LoginResult);
    expect(findByUsernameSpy).toHaveBeenCalledTimes(1);
    expect(compareSpy).toHaveBeenCalledTimes(1);
    expect(generateAccessTokenSpy).toHaveBeenCalledTimes(1);
    expect(generateRefreshTokenSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if user is not found', async () => {
    // Arrange
    const command: LoginCommand = new LoginCommand({
      username: faker.internet.userName(),
      password: faker.internet.password(),
    });

    // Act
    const findByUsernameSpy = jest
      .spyOn(readRepositoryMock, 'findByUsername')
      .mockResolvedValueOnce(null);
    const compareSpy = jest.spyOn(StringUtils, 'compare').mockResolvedValueOnce(false);
    const generateAccessTokenSpy = jest.spyOn(serviceMock, 'generateAccessToken');
    const generateRefreshTokenSpy = jest.spyOn(serviceMock, 'generateRefreshToken');
    const execute = loginHandler.execute(command);

    // Assert
    await expect(execute).rejects.toBeInstanceOf(AuthError.UserNotFound);
    expect(findByUsernameSpy).toHaveBeenCalledTimes(1);
    expect(compareSpy).not.toHaveBeenCalled();
    expect(generateAccessTokenSpy).not.toHaveBeenCalled();
    expect(generateRefreshTokenSpy).not.toHaveBeenCalled();
  });

  it('should throw an error if password is invalid', async () => {
    // Arrange
    const password = faker.internet.password();
    const command: LoginCommand = new LoginCommand({
      username: faker.internet.userName(),
      password,
    });

    // Act
    const findByUsernameSpy = jest
      .spyOn(readRepositoryMock, 'findByUsername')
      .mockResolvedValueOnce({
        id: faker.string.uuid(),
        password: await StringUtils.hash('differentPassword'),
      });
    const compareSpy = jest.spyOn(StringUtils, 'compare').mockResolvedValueOnce(false);
    const generateAccessTokenSpy = jest.spyOn(serviceMock, 'generateAccessToken');
    const generateRefreshTokenSpy = jest.spyOn(serviceMock, 'generateRefreshToken');
    const execute = loginHandler.execute(command);

    // Assert
    await expect(execute).rejects.toBeInstanceOf(AuthError.InvalidCredentials);
    expect(findByUsernameSpy).toHaveBeenCalledTimes(1);
    expect(compareSpy).toHaveBeenCalledTimes(1);
    expect(generateAccessTokenSpy).not.toHaveBeenCalled();
    expect(generateRefreshTokenSpy).not.toHaveBeenCalled();
  });
});
