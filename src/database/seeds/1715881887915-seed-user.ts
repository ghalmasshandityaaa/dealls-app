import { faker } from '@faker-js/faker';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { StringUtils } from '../../common/utils';

export class SeedUser1715881887915 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const users = Array.from({ length: 50 }, () => ({
      id: faker.string.uuid(),
      profile: faker.internet.url(),
      full_name: faker.person.fullName(),
      username: `${faker.person.firstName()}_${StringUtils.randomNumber(4)}`,
      password: StringUtils.hash(faker.internet.password()),
      package: faker.helpers.arrayElement(['standard', 'verified', 'no_quota']),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    }));

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('user')
      .values(users)
      .orIgnore('username')
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.createQueryBuilder().delete().from('user').execute();
  }
}
