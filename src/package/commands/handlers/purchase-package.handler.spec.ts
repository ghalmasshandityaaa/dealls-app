import { faker } from '@faker-js/faker';
import { Package } from '../../../common/interfaces';
import { UserPackageAggregate } from '../../domains';
import { PackageError } from '../../errors';
import { PurchasePackageCommand } from '../impl';
import { PurchasePackageHandler } from './purchase-package.handler';

const loggerMock = {
  trace: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
};

const writeRepositoryMock = {
  create: jest.fn(),
};

const publisherMock = {
  mergeObjectContext: jest.fn(),
};

const userPackageMock = {
  commit: jest.fn(),
};

const redisMock = {
  delete: jest.fn(),
};

describe('PurchasePackageHandler', () => {
  let purchasePackageHandler: PurchasePackageHandler;

  beforeEach(() => {
    purchasePackageHandler = new PurchasePackageHandler(
      loggerMock as any,
      writeRepositoryMock as any,
      publisherMock as any,
      redisMock as any,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw error given package already bought', async () => {
    // Arrange
    const command: PurchasePackageCommand = new PurchasePackageCommand({
      identity: {
        id: faker.string.uuid(),
        package: Package.VERIFIED,
      },
      package: Package.VERIFIED,
    });

    // Act
    const createSpy = jest.spyOn(writeRepositoryMock, 'create');
    const mergeSpy = jest.spyOn(publisherMock, 'mergeObjectContext');
    const userPackageSpy = jest.spyOn(userPackageMock, 'commit');
    const deleteSpy = jest.spyOn(redisMock, 'delete');
    const execute = purchasePackageHandler.execute(command);

    // Assert
    await expect(execute).rejects.toBeInstanceOf(PackageError.AlreadyBought);
    expect(createSpy).not.toHaveBeenCalled();
    expect(mergeSpy).not.toHaveBeenCalled();
    expect(userPackageSpy).not.toHaveBeenCalled();
    expect(deleteSpy).not.toHaveBeenCalled();
  });

  it('should work', async () => {
    // Arrange
    const command: PurchasePackageCommand = new PurchasePackageCommand({
      identity: {
        id: faker.string.uuid(),
        package: Package.STANDARD,
      },
      package: Package.VERIFIED,
    });

    jest.spyOn(UserPackageAggregate, 'create').mockReturnValue(userPackageMock as any);
    jest.spyOn(publisherMock, 'mergeObjectContext').mockReturnValue(userPackageMock);

    // Act
    const createSpy = jest.spyOn(writeRepositoryMock, 'create');
    const mergeSpy = jest.spyOn(publisherMock, 'mergeObjectContext');
    const userPackageSpy = jest.spyOn(userPackageMock, 'commit');
    const deleteSpy = jest.spyOn(redisMock, 'delete');
    const execute = purchasePackageHandler.execute(command);

    // Assert
    await expect(execute).resolves.not.toThrow();
    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(mergeSpy).toHaveBeenCalledTimes(1);
    expect(userPackageSpy).toHaveBeenCalledTimes(1);
    expect(deleteSpy).toHaveBeenCalledTimes(2);
  });
});
