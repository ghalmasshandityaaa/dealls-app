import { faker } from '@faker-js/faker';
import { RegisterResult } from './register.result';

describe('RegisterResult', () => {
  it('should create a new RegisterResult instance with correct properties', () => {
    // Arrange
    const accessToken = faker.word.words();
    const refreshToken = faker.word.words();

    // Act
    const loginResult = new RegisterResult(accessToken, refreshToken);

    // Assert
    expect(loginResult.accessToken).toBe(accessToken);
    expect(loginResult.refreshToken).toBe(refreshToken);
  });
});
