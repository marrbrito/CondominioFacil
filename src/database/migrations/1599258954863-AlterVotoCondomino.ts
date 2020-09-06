import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterVotoCondomino1599258954863
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('voto', 'condomino');
    await queryRunner.addColumn(
      'voto',
      new TableColumn({
        name: 'condomino_id',
        type: 'uuid',
      }),
    );
    await queryRunner.createForeignKey(
      'voto',
      new TableForeignKey({
        name: 'VotoCondomino_FK',
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
