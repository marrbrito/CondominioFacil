import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateAgendamento1599243045916
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'agendamento',
        columns: [
          {
            name: 'agendamento_id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'area_id',
            type: 'uuid',
          },
          {
            name: 'condominio_id',
            type: 'uuid',
          },
          {
            name: 'dt_reserva',
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
      'agendamento',
      new TableForeignKey({
        name: 'AgendamentoArea_FK',
        columnNames: ['area_id', 'condominio_id'],
        referencedColumnNames: ['area_id', 'condominio_id'],
        referencedTableName: 'area_comum',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('agendamento');
  }
}
