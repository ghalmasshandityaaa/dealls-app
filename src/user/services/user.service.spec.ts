import { faker } from '@faker-js/faker';
import { Package } from '../../common/interfaces';
import { UserDomain } from '../domains';
import { UserQueryModel } from '../interfaces';
import { UserService } from './user.service';

const readRepoMock = {
  findById: jest.fn(),
  findByUsername: jest.fn(),
};
const writeRepoMock = {
  findById: jest.fn(),
  create: jest.fn(),
};
const redisMock = {
  get: jest.fn(),
  insert: jest.fn(),
};

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(readRepoMock as any, writeRepoMock as any, redisMock as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findById', () => {
    it('should return cached user if available', async () => {
      // Arrange
      const id = faker.string.uuid();
      const cachedUser = stub();
      redisMock.get.mockResolvedValueOnce(cachedUser);

      // Act
      const user = await userService.findById(id);

      // Assert
      expect(user).toBe(cachedUser);
      expect(redisMock.get).toHaveBeenCalledWith(`user:query:${id}`);
      expect(readRepoMock.findById).not.toHaveBeenCalled();
    });

    it('should return user from repository and cache it if not cached', async () => {
      // Arrange
      const id = faker.string.uuid();
      const user = stub();
      redisMock.get.mockResolvedValueOnce(undefined);
      readRepoMock.findById.mockResolvedValueOnce(user);

      // Act
      const result = await userService.findById(id);

      // Assert
      expect(result).toBe(user);
      expect(redisMock.get).toHaveBeenCalledWith(`user:query:${id}`);
      expect(readRepoMock.findById).toHaveBeenCalledWith(id);
      expect(redisMock.insert).toHaveBeenCalledWith(`user:query:${id}`, JSON.stringify(user));
    });
  });

  describe('findByIdDomain', () => {
    it('should return cached user domain if available', async () => {
      // Arrange
      const id = faker.string.uuid();
      const cachedUser = toDomain(stub());
      redisMock.get.mockResolvedValueOnce(cachedUser);

      // Act
      const user = await userService.findByIdDomain(id);

      // Assert
      expect(user).toBe(cachedUser);
      expect(redisMock.get).toHaveBeenCalledWith(`user:domain:${id}`);
      expect(writeRepoMock.findById).not.toHaveBeenCalled();
    });

    it('should return user domain from repository and cache it if not cached', async () => {
      // Arrange
      const id = faker.string.uuid();
      const user = toDomain(stub());
      redisMock.get.mockResolvedValueOnce(undefined);
      writeRepoMock.findById.mockResolvedValueOnce(user);

      // Act
      const result = await userService.findByIdDomain(id);

      // Assert
      expect(result).toBe(user);
      expect(redisMock.get).toHaveBeenCalledWith(`user:domain:${id}`);
      expect(writeRepoMock.findById).toHaveBeenCalledWith(id);
      expect(redisMock.insert).toHaveBeenCalledWith(`user:domain:${id}`, JSON.stringify(user));
    });
  });

  describe('findByUsername', () => {
    it('should return cached user if available', async () => {
      // Arrange
      const username = faker.internet.userName();
      const cachedUser = stub();
      redisMock.get.mockResolvedValueOnce(cachedUser);

      // Act
      const user = await userService.findByUsername(username);

      // Assert
      expect(user).toBe(cachedUser);
      expect(redisMock.get).toHaveBeenCalledWith(`user:query:${username}`);
      expect(readRepoMock.findByUsername).not.toHaveBeenCalled();
    });

    it('should return user from repository and cache it if not cached', async () => {
      // Arrange
      const username = faker.internet.userName();
      const user = stub();
      redisMock.get.mockResolvedValueOnce(undefined);
      readRepoMock.findByUsername.mockResolvedValueOnce(user);

      // Act
      const result = await userService.findByUsername(username);

      // Assert
      expect(result).toBe(user);
      expect(redisMock.get).toHaveBeenCalledWith(`user:query:${username}`);
      expect(readRepoMock.findByUsername).toHaveBeenCalledWith(username);
      expect(redisMock.insert).toHaveBeenCalledWith(`user:query:${username}`, JSON.stringify(user));
    });
  });

  describe('create', () => {
    it('should create user in the repository', async () => {
      // Arrange
      const user = toDomain(stub());

      // Act
      await userService.create(user);

      // Assert
      expect(writeRepoMock.create).toHaveBeenCalledWith(user);
    });
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

const toDomain = (user: UserQueryModel) => {
  return UserDomain.rebuild({ ...user }, user.id);
};
