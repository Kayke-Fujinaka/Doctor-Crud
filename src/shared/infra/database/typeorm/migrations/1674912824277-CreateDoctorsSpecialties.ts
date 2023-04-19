import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateDoctorsSpecialties1674912824277
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'doctors_specialties',
        columns: [
          {
            name: 'crm',
            type: 'varchar',
          },
          {
            name: 'specialty',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'doctors_specialties',
      new TableForeignKey({
        name: 'FKSpecialtiesDoctors',
        referencedTableName: 'specialties',
        referencedColumnNames: ['id'],
        columnNames: ['specialty'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'doctors_specialties',
      new TableForeignKey({
        name: 'FKDoctorsSpecialties',
        referencedTableName: 'doctors',
        referencedColumnNames: ['crm'],
        columnNames: ['crm'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'doctors_specialties',
      'FKDoctorsSpecialties',
    );

    await queryRunner.dropForeignKey(
      'doctors_specialties',
      'FKSpecialtiesDoctors',
    );

    await queryRunner.dropTable('doctors_specialties');
  }
}
