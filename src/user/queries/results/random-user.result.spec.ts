import { faker } from '@faker-js/faker';
import { Package } from '../../../common/interfaces';
import { UserQueryModel } from '../../../user/interfaces';
import { RandomUserResult } from './random-user.result';

describe('RandomUserResult', () => {
  it('should create a new RandomUserResult instance with correct properties', () => {
    // Arrange
    const user = stub();

    // Act
    const loginResult = new RandomUserResult(user);

    // Assert
    expect(loginResult.user).toBe(user);
  });
});

const stub = (): UserQueryModel => {
  return {
    id: faker.string.uuid(),
    profile: faker.internet.url(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    fullName: faker.person.fullName(),
    package: faker.helpers.arrayElement([Package.STANDARD, Package.VERIFIED, Package.NO_QUOTA]),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
};
