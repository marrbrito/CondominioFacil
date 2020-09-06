import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateReuniao1599223509101 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'reuniao',
        columns: [
          {
            name: 'reuniao_id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'condominio_id',
            type: 'uuid',
          },
          {
            name: 'descricao',
            type: 'varchar',
          },
          {
            name: 'dt_reuniao',
            type: 'timestamp with time zone',
          },
          {
            name: 'dt_criacao',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'dt_atualizacao',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'reuniao',
      new TableForeignKey({
        name: 'ReuniaoCondominio_FK',
        columnNames: ['condominio_id'],
        referencedColumnNames: ['condominio_id'],
        referencedTableName: 'condominio',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('reuniao');
  }
}
