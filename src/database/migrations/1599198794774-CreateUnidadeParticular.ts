import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateUnidadeParticular1599198794774
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'unidade_particular',
        columns: [
          {
            name: 'unidade_id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'condominio_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'bloco_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'identificador',
            type: 'varchar',
          },
          {
            name: 'condomino',
            type: 'varchar',
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
      'unidade_particular',
      new TableForeignKey({
        name: 'UnidadeBloco_FK',
        columnNames: ['condominio_id', 'bloco_id'],
        referencedColumnNames: ['condominio_id', 'bloco_id'],
        referencedTableName: 'bloco',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('unidade_particular');
  }
}
