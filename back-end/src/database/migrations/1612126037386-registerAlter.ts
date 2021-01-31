import {MigrationInterface, QueryRunner} from "typeorm";

export class registerAlter1612126037386 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE register ADD COLUMN email VARCHAR(255) NULL, ADD COLUMN dataNascimento DATE NULL`);
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE register ADD COLUMN email VARCHAR(255) NULL, ADD COLUMN dataNascimento DATE NULL`); // reverts things made in "up" method
    }

}
