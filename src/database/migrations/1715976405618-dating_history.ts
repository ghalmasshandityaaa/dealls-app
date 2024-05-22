import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class DatingHistory1715976405618 implements MigrationInterface {
  private table: Table = new Table({
    name: 'dating_history',
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
      },
      {
        name: 'partner_id',
        type: 'uuid',
        isNullable: false,
      },
      {
        name: 'type',
        type: 'enum',
        enumName: 'type_enum',
        enum: ['like', 'pass'],
        default: `'like'`,
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

  private userFK = new TableForeignKey({
    name: 'user_id_fk',
    columnNames: ['user_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  private partnerFK = new TableForeignKey({
    name: 'partner_id_fk',
    columnNames: ['partner_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKey(this.table, this.userFK);
    await queryRunner.createForeignKey(this.table, this.partnerFK);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
