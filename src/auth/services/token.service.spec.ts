import { faker } from '@faker-js/faker';
import { Package } from '../../common/interfaces';
import { TokenService } from './token.service';

const configServiceMock = {
  get: jest.fn(),
};

const jwtServiceMock = {
  signAsync: jest.fn(),
  verifyAsync: jest.fn(),
};

describe('TokenService', () => {
  let tokenService: TokenService;

  beforeEach(() => {
    tokenService = new TokenService(configServiceMock as any, jwtServiceMock as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should generate access token', async () => {
    // Arrange
    const identity = { id: faker.string.alphanumeric(), package: Package.VERIFIED };
    const expectedAccessToken = 'access_token_value';
    jwtServiceMock.signAsync.mockResolvedValueOnce(expectedAccessToken);
    configServiceMock.get
      .mockReturnValueOnce('expiration_time')
      .mockReturnValueOnce('jwt_secret')
      .mockReturnValueOnce('jwt_algorithm');

    // Act
    const accessToken = await tokenService.generateAccessToken(identity);

    // Assert
    expect(accessToken).toBe(expectedAccessToken);
    expect(jwtServiceMock.signAsync).toHaveBeenCalledWith(
      { sub: identity.id.toString(), package: identity.package },
      {
        expiresIn: 'expiration_time',
        secret: 'jwt_secret',
        algorithm: 'jwt_algorithm',
      },
    );
  });

  it('should generate refresh token', async () => {
    // Arrange
    const identity = { id: faker.string.alphanumeric(), package: Package.VERIFIED };
    const expectedRefreshToken = 'refresh_token_value';
    jwtServiceMock.signAsync.mockResolvedValueOnce(expectedRefreshToken);
    configServiceMock.get
      .mockReturnValueOnce('expiration_time')
      .mockReturnValueOnce('jwt_secret')
      .mockReturnValueOnce('jwt_algorithm');

    // Act
    const refreshToken = await tokenService.generateRefreshToken(identity);

    // Assert
    expect(refreshToken).toBe(expectedRefreshToken);
    expect(jwtServiceMock.signAsync).toHaveBeenCalledWith(
      { sub: identity.id.toString(), package: identity.package },
      {
        expiresIn: 'expiration_time',
        secret: 'jwt_secret',
        algorithm: 'jwt_algorithm',
      },
    );
  });

  it('should validate token', async () => {
    // Arrange
    const token = 'token_value';
    const id = faker.string.alphanumeric() as any;
    const decodedToken = { sub: id, package: Package.VERIFIED };
    jwtServiceMock.verifyAsync.mockResolvedValueOnce(decodedToken);

    // Act
    const result = await tokenService.validate(token);

    // Assert
    expect(result).toEqual({ id: id, package: Package.VERIFIED });
    expect(jwtServiceMock.verifyAsync).toHaveBeenCalled();
  });
});
