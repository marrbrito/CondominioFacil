import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class DropCondominoUser1599416870809
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('usuario', 'UsuarioCondomino_FK');

    await queryRunner.dropColumn('usuario', 'condomino_id');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'usuario',
      new TableColumn({
        name: 'condomino_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'usuario',
      new TableForeignKey({
        name: 'UsuarioCondomino_FK',
        columnNames: ['condomino_id'],
        referencedColumnNames: ['condomino_id'],
        referencedTableName: 'condomino',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }
}
