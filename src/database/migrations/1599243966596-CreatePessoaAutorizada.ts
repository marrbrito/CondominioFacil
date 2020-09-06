import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreatePessoaAutorizada1599243966596
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pessoa_autorizada',
        columns: [
          {
            name: 'pessoa_aut_id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'unidade_id',
            type: 'uuid',
          },
          {
            name: 'condominio_id',
            type: 'uuid',
          },
          {
            name: 'bloco_id',
            type: 'uuid',
          },
          {
            name: 'nome',
            type: 'varchar',
          },
          {
            name: 'num_doc',
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
      'pessoa_autorizada',
      new TableForeignKey({
        name: 'PessoaAutUnidade_FK',
        columnNames: ['unidade_id', 'condominio_id', 'bloco_id'],
        referencedColumnNames: ['unidade_id', 'condominio_id', 'bloco_id'],
        referencedTableName: 'unidade_particular',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pessoa_autorizada');
  }
}
