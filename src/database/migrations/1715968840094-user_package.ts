import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class UserPackage1715968840094 implements MigrationInterface {
  private table: Table = new Table({
    name: 'user_package',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
      },
      {
        name: 'user_id',
        type: 'uuid',
        isNullable: false,
        isUnique: true,
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
    ],
  });

  private foreignKey = new TableForeignKey({
    name: 'user_id_fk',
    columnNames: ['user_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKey(this.table, this.foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
