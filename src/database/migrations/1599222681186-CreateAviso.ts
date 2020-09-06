import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateAviso1599222681186 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'aviso',
        columns: [
          {
            name: 'aviso_id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'condominio_id',
            type: 'uuid',
          },
          {
            name: 'descricao',
            type: 'varchar',
          },
          {
            name: 'dt_expiracao',
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
      'aviso',
      new TableForeignKey({
        name: 'AvisoCondominio_FK',
        columnNames: ['condominio_id'],
        referencedColumnNames: ['condominio_id'],
        referencedTableName: 'condominio',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('aviso');
  }
}
