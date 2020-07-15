import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterFieldPriceFromFood1594774957012 implements MigrationInterface {
    name = 'AlterFieldPriceFromFood1594774957012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "foods" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "foods" ADD "price" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "foods" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "foods" ADD "price" integer NOT NULL`);
    }

}
