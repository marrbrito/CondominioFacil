/* eslint-disable import/prefer-default-export */
import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterUnidadeParticular1600612817924 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('unidade_particular', 'condomino');
    await queryRunner.addColumn(
      'unidade_particular',
      new TableColumn({
        name: 'condomino_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'unidade_particular',
      new TableForeignKey({
        name: 'UnidadeCondomino_FK',
        columnNames: ['condomino_id'],
        referencedColumnNames: ['condomino_id'],
        referencedTableName: 'condomino',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'unidade_particular',
      new TableColumn({
        name: 'condomino',
        type: 'string',
      }),
    );
    await queryRunner.dropForeignKey(
      'unidade_particular',
      'UnidadeCondomino_FK',
    );
    await queryRunner.dropColumn('unidade_particular', 'condomino_id');
  }
}
