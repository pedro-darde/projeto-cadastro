import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class alterDataCadastro1612487212625 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "produtos",
      "dataCadastro",
      new TableColumn({
        name: "dataCadastro",
        type: "timestamp",
        default: "CURRENT_TIMESTAMP",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "produtos",
      "dataCadastro",
      new TableColumn({
        name: "dataCadastro",
        type: "timestamp",
        default: "CURRENT_TIMESTAMP",
      })
    );
  }
}
