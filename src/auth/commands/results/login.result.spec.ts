import { faker } from '@faker-js/faker';
import { LoginResult } from './login.result';

describe('LoginResult', () => {
  it('should create a new LoginResult instance with correct properties', () => {
    // Arrange
    const accessToken = faker.word.words();
    const refreshToken = faker.word.words();

    // Act
    const loginResult = new LoginResult(accessToken, refreshToken);

    // Assert
    expect(loginResult.accessToken).toBe(accessToken);
    expect(loginResult.refreshToken).toBe(refreshToken);
  });
});
