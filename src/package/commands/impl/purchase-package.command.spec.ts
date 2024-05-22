import { faker } from '@faker-js/faker';
import { Package } from '../../../common/interfaces';
import { PurchasePackageCommand } from './purchase-package.command';

describe('PurchasePackageCommand', () => {
  it('should create a new PurchasePackageCommand instance', () => {
    // Arrange
    const props = {
      identity: {
        id: faker.string.uuid(),
        package: Package.STANDARD,
      },
      package: Package.STANDARD,
    };

    // Act
    const command = new PurchasePackageCommand(props);

    // Assert
    expect(command).toBeInstanceOf(PurchasePackageCommand);
    expect(command.identity).toBe(props.identity);
    expect(command.package).toBe(props.package);
  });
});
