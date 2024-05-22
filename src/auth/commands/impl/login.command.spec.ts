import { faker } from '@faker-js/faker';
import { LoginCommand } from './login.command';

describe('LoginCommand', () => {
  it('should create a new LoginCommand instance', () => {
    // Arrange
    const props = {
      username: faker.helpers.arrayElement([faker.internet.email(), faker.internet.userName()]),
      password: faker.internet.password(),
    };

    // Act
    const command = new LoginCommand(props);

    // Assert
    expect(command).toBeInstanceOf(LoginCommand);
    expect(command.username).toBe(props.username);
    expect(command.password).toBe(props.password);
  });
});
