import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ProdutosMigration1612389359741 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "produtos",
        columns: [
          {
            name: "id",
            type: "integer",
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "nome",
            type: "varchar",
          },
          {
            name: "descricao",
            type: "varchar",
          },
          {
            name: "quantidade",
            type: "integer",
          },
          {
            name: "imagem",
            type: "varchar",
          },
          {
            name: "preco",
            type: "double",
          },
          {
            name: "dataCadastro",
            type: "date",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("register");
  }
}
