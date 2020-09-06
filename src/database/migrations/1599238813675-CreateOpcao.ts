import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateOpcao1599238813675 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'opcao',
        columns: [
          {
            name: 'opcao_id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'votacao_id',
            type: 'uuid',
          },
          {
            name: 'pauta_id',
            type: 'uuid',
          },
          {
            name: 'descricao',
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
      'opcao',
      new TableForeignKey({
        name: 'OpcaoVotacao_FK',
        columnNames: ['votacao_id', 'pauta_id'],
        referencedColumnNames: ['votacao_id', 'pauta_id'],
        referencedTableName: 'votacao',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('opcao');
  }
}
