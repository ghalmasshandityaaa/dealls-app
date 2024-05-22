import { faker } from '@faker-js/faker';
import { RandomUserQuery } from './random-user.query';

describe('RandomUserQuery', () => {
  it('should create a new RandomUserQuery instance', () => {
    // Arrange
    const props = {
      id: faker.string.uuid(),
    };

    // Act
    const command = new RandomUserQuery(props);

    // Assert
    expect(command).toBeInstanceOf(RandomUserQuery);
    expect(command.id).toBe(props.id);
  });
});
