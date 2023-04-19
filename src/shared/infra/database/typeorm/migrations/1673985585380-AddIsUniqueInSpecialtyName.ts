import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddIsUniqueInSpecialtyName1673985585380
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'specialties',
      'name',
      new TableColumn({
        name: 'name',
        type: 'varchar',
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'specialties',
      'name',
      new TableColumn({
        name: 'name',
        type: 'varchar',
        isUnique: false,
      }),
    );
  }
}
