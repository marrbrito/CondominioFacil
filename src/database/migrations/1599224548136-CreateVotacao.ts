import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateVotacao1599224548136 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'votacao',
        columns: [
          {
            name: 'votacao_id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'pauta_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'dt_inicio',
            type: 'timestamp with time zone',
          },
          {
            name: 'dt_fim',
            type: 'timestamp with time zone',
          },
          {
            name: 'votos',
            type: 'integer',
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
      'votacao',
      new TableForeignKey({
        name: 'VotacaoPauta_FK',
        columnNames: ['pauta_id'],
        referencedColumnNames: ['pauta_id'],
        referencedTableName: 'pauta',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('votacao');
  }
}
