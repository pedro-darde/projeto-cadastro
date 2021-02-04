import {MigrationInterface, QueryRunner} from "typeorm";

export class ProdutosChange1612391108005 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE produtos DROP COLUMN imagem `)
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE produtos DROP COLUMN imagem `)
    }

}
