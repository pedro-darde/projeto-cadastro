import {MigrationInterface, QueryRunner} from "typeorm";

export class UserDetails1612181987773 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE register ADD COLUMN usuario VARCHAR(255) NULL, ADD COLUMN senha VARCHAR(255)`);
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE register ADD COLUMN usuario VARCHAR(255) NULL, ADD COLUMN senha VARCHAR(255)`);
    }

}
