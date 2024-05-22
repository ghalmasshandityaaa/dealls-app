import { faker } from '@faker-js/faker';
import { RegisterCommand } from './register.command';

describe('RegisterCommand', () => {
  it('should create a new RegisterCommand instance', () => {
    // Arrange
    const props = {
      profile: faker.internet.url(),
      fullName: faker.person.fullName(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };

    // Act
    const command = new RegisterCommand(props);

    // Assert
    expect(command).toBeInstanceOf(RegisterCommand);
    expect(command.profile).toBe(props.profile);
    expect(command.fullName).toBe(props.fullName);
    expect(command.username).toBe(props.username);
    expect(command.password).toBe(props.password);
  });
});
