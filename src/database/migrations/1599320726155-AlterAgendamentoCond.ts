import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterAgendamentoCond1599320726155
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'agendamento',
      new TableColumn({
        name: 'condomino_id',
        type: 'uuid',
      }),
    );
    await queryRunner.createForeignKey(
      'agendamento',
      new TableForeignKey({
        name: 'AgendamentoCondomino_FK',
        columnNames: ['condomino_id'],
        referencedColumnNames: ['condomino_id'],
        referencedTableName: 'condomino',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('voto', 'VotoCondomino_FK');

    await queryRunner.dropColumn('voto', 'condomino_id');

    await queryRunner.addColumn(
      'voto',
      new TableColumn({
        name: 'condomino',
        type: 'varchar',
      }),
    );
  }
}
