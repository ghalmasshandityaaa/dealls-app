import { faker } from '@faker-js/faker';
import { UserError } from '../../errors';
import { RandomUserQuery } from '../impl';
import { RandomUserResult } from '../results';
import { RandomUserHandler } from './random-user.handler';

const loggerMock = {
  trace: jest.fn(),
  info: jest.fn(),
};

const repositoryMock = {
  findRandom: jest.fn(),
};

const redisMock = {
  insert: jest.fn(),
};

describe('RandomUserHandler', () => {
  let addHistoryHandler: RandomUserHandler;

  beforeEach(() => {
    addHistoryHandler = new RandomUserHandler(
      loggerMock as any,
      repositoryMock as any,
      redisMock as any,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error given user not found', async () => {
    // Arrange
    const command: RandomUserQuery = new RandomUserQuery({
      id: faker.string.uuid(),
    });

    // Act
    const findRandomSpy = jest.spyOn(repositoryMock, 'findRandom').mockResolvedValueOnce(undefined);
    const cacheSpy = jest.spyOn(redisMock, 'insert');
    const execute = addHistoryHandler.execute(command);

    // Assert
    await expect(execute).rejects.toBeInstanceOf(UserError.NotFound);
    expect(findRandomSpy).toHaveBeenCalledTimes(1);
    expect(cacheSpy).not.toHaveBeenCalled();
  });

  it('should work', async () => {
    // Arrange
    const command: RandomUserQuery = new RandomUserQuery({
      id: faker.string.uuid(),
    });

    // Act
    const findRandomSpy = jest.spyOn(repositoryMock, 'findRandom').mockResolvedValueOnce({});
    const cacheSpy = jest.spyOn(redisMock, 'insert');
    const execute = addHistoryHandler.execute(command);

    // Assert
    await expect(execute).resolves.toBeInstanceOf(RandomUserResult);
    expect(findRandomSpy).toHaveBeenCalledTimes(1);
    expect(cacheSpy).toHaveBeenCalledTimes(1);
  });
});
