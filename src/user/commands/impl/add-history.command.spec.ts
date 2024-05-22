import { faker } from '@faker-js/faker';
import { Package } from '../../../common/interfaces';
import { DatingHistoryType } from '../../../user/user.constant';
import { AddHistoryCommand } from './add-history.command';

describe('AddHistoryCommand', () => {
  it('should create a new AddHistoryCommand instance', () => {
    // Arrange
    const props = {
      identity: {
        id: faker.string.uuid(),
        package: faker.helpers.arrayElement([Package.STANDARD, Package.NO_QUOTA]),
      },
      partnerId: faker.string.uuid(),
      type: faker.helpers.arrayElement([DatingHistoryType.LIKE, DatingHistoryType.PASS]),
    };

    // Act
    const command = new AddHistoryCommand(props);

    // Assert
    expect(command).toBeInstanceOf(AddHistoryCommand);
    expect(command.identity).toBe(props.identity);
    expect(command.partnerId).toBe(props.partnerId);
    expect(command.type).toBe(props.type);
  });
});
