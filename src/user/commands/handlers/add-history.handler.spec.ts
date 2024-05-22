import { faker } from '@faker-js/faker';
import { Package } from '../../../common/interfaces';
import { DatingHistoryError } from '../../errors';
import { DatingHistoryType } from '../../user.constant';
import { AddHistoryCommand } from '../impl';
import { AddHistoryHandler } from './add-history.handler';

const loggerMock = {
  trace: jest.fn(),
  info: jest.fn(),
};

const repositoryMock = {
  todayExist: jest.fn(),
  countTodaySwipe: jest.fn(),
  create: jest.fn(),
};

describe('AddHistoryHandler', () => {
  let addHistoryHandler: AddHistoryHandler;

  beforeEach(() => {
    addHistoryHandler = new AddHistoryHandler(loggerMock as any, repositoryMock as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error given partnerId is same as userId', async () => {
    // Arrange
    const id = faker.string.uuid();
    const command: AddHistoryCommand = new AddHistoryCommand({
      identity: {
        id,
        package: Package.NO_QUOTA,
      },
      partnerId: id,
      type: faker.helpers.arrayElement([DatingHistoryType.LIKE, DatingHistoryType.PASS]),
    });

    // Act
    const todayExistSpy = jest.spyOn(repositoryMock, 'todayExist');
    const countTodaySpy = jest.spyOn(repositoryMock, 'countTodaySwipe');
    const createSpy = jest.spyOn(repositoryMock, 'create');
    const execute = addHistoryHandler.execute(command);

    // Assert
    await expect(execute).rejects.toBeInstanceOf(DatingHistoryError.MatchOwnUser);
    expect(todayExistSpy).not.toHaveBeenCalled();
    expect(countTodaySpy).not.toHaveBeenCalled();
    expect(createSpy).not.toHaveBeenCalled();
  });

  it('should throw an error given like or pass is same as today', async () => {
    // Arrange
    const command: AddHistoryCommand = new AddHistoryCommand({
      identity: {
        id: faker.string.uuid(),
        package: Package.NO_QUOTA,
      },
      partnerId: faker.string.uuid(),
      type: faker.helpers.arrayElement([DatingHistoryType.LIKE, DatingHistoryType.PASS]),
    });

    // Act
    const todayExistSpy = jest.spyOn(repositoryMock, 'todayExist').mockResolvedValueOnce(true);
    const countTodaySpy = jest.spyOn(repositoryMock, 'countTodaySwipe').mockResolvedValueOnce(100);
    const createSpy = jest.spyOn(repositoryMock, 'create');
    const execute = addHistoryHandler.execute(command);

    // Assert
    await expect(execute).rejects.toBeInstanceOf(DatingHistoryError.CannotTwice);
    expect(todayExistSpy).toHaveBeenCalledTimes(1);
    expect(countTodaySpy).toHaveBeenCalledTimes(1);
    expect(createSpy).not.toHaveBeenCalled();
  });

  it('should throw an error given too many swipe', async () => {
    // Arrange
    const command: AddHistoryCommand = new AddHistoryCommand({
      identity: {
        id: faker.string.uuid(),
        package: Package.STANDARD,
      },
      partnerId: faker.string.uuid(),
      type: faker.helpers.arrayElement([DatingHistoryType.LIKE, DatingHistoryType.PASS]),
    });

    // Act
    const todayExistSpy = jest.spyOn(repositoryMock, 'todayExist').mockResolvedValueOnce(false);
    const countTodaySpy = jest.spyOn(repositoryMock, 'countTodaySwipe').mockResolvedValueOnce(100);
    const createSpy = jest.spyOn(repositoryMock, 'create');
    const execute = addHistoryHandler.execute(command);

    // Assert
    await expect(execute).rejects.toBeInstanceOf(DatingHistoryError.TooManySwipes);
    expect(todayExistSpy).toHaveBeenCalledTimes(1);
    expect(countTodaySpy).toHaveBeenCalledTimes(1);
    expect(createSpy).not.toHaveBeenCalled();
  });

  it('should work', async () => {
    // Arrange
    const command: AddHistoryCommand = new AddHistoryCommand({
      identity: {
        id: faker.string.uuid(),
        package: Package.NO_QUOTA,
      },
      partnerId: faker.string.uuid(),
      type: faker.helpers.arrayElement([DatingHistoryType.LIKE, DatingHistoryType.PASS]),
    });

    // Act
    const todayExistSpy = jest.spyOn(repositoryMock, 'todayExist').mockResolvedValueOnce(false);
    const countTodaySpy = jest.spyOn(repositoryMock, 'countTodaySwipe').mockResolvedValueOnce(100);
    const createSpy = jest.spyOn(repositoryMock, 'create');
    const execute = addHistoryHandler.execute(command);

    // Assert
    await expect(execute).resolves.not.toThrow();
    expect(todayExistSpy).toHaveBeenCalledTimes(1);
    expect(countTodaySpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledTimes(1);
  });
});
