import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class RegisterMigration1611763388575 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "register",
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
            name: "sobrenome",
            type: "varchar",
          },
          {
            name: "cpf",
            type: "varchar",
          },
          {
            name: "promocao",
            type: "boolean",
            default: true,
          },
          {
            name: "novidades",
            type: "boolean",
            default: true,
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
