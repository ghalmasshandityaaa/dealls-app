import { faker } from '@faker-js/faker';
import { Package } from '../../common/interfaces';
import { SyncUserPackageEvent } from '../../package/domains/events/sync-package.event';
import { SyncUserPackageListener } from './sync-package.listener';

const loggerMock = {
  trace: jest.fn(),
  info: jest.fn(),
};

const writeRepositoryMock = {
  updatePackage: jest.fn(),
};

describe('SyncUserPackageListener', () => {
  let syncListener: SyncUserPackageListener;

  beforeEach(() => {
    syncListener = new SyncUserPackageListener(loggerMock as any, writeRepositoryMock as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should work', async () => {
    // Arrange
    const command: SyncUserPackageEvent = new SyncUserPackageEvent({
      userId: faker.string.uuid(),
      package: Package.VERIFIED,
    });

    // Act
    const updatePackageSpy = jest.spyOn(writeRepositoryMock, 'updatePackage');
    const execute = syncListener.handle(command);

    // Assert
    await expect(execute).resolves.not.toThrow();
    expect(updatePackageSpy).toHaveBeenCalledTimes(1);
  });
});
