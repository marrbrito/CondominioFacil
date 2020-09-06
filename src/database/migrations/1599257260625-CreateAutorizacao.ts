import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateAutorizacao1599257260625
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'autorizacao',
        columns: [
          {
            name: 'autorizacao_id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'pessoa_aut_id',
            type: 'uuid',
          },
          {
            name: 'tipo_acesso',
            type: 'varchar',
          },
          {
            name: 'dt_fim',
            type: 'timestamp with time zone',
            isNullable: true,
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
      'autorizacao',
      new TableForeignKey({
        name: 'AutorizacaoPessoaAutUnidade_FK',
        columnNames: ['pessoa_aut_id'],
        referencedColumnNames: ['pessoa_aut_id'],
        referencedTableName: 'pessoa_autorizada',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('autorizacao');
  }
}
