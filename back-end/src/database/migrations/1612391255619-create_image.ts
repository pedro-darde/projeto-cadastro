import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createImage1612391255619 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "images",
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
            name: "path",
            type: "varchar",
          },
          {
            name: "produto_id",
            type: "integer",
            unsigned: true
          },
        ],
        foreignKeys: [
          {
            name: "ImagemProduto",
            columnNames: ["produto_id"],
            referencedTableName: "produtos",
            referencedColumnNames: ["id"],
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("images");
  }
}
