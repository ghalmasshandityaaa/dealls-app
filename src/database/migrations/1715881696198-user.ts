import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class User1715881696198 implements MigrationInterface {
  private table: Table = new Table({
    name: 'user',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
      },
      {
        name: 'profile',
        type: 'text',
        isNullable: false,
      },
      {
        name: 'full_name',
        type: 'varchar',
        length: '50',
        isNullable: false,
      },
      {
        name: 'username',
        type: 'varchar',
        length: '16',
        isNullable: false,
        isUnique: true,
      },
      {
        name: 'password',
        type: 'text',
        isNullable: false,
      },
      {
        name: 'package',
        type: 'enum',
        enumName: 'package_enum',
        enum: ['standard', 'verified', 'no_quota'],
        default: `'standard'`,
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'timestamptz',
        default: 'now()',
        isNullable: false,
      },
      {
        name: 'updated_at',
        type: 'timestamptz',
        default: 'now()',
        isNullable: false,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
