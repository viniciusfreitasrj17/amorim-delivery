import {MigrationInterface, QueryRunner} from "typeorm";

export class AddFieldPromoInEntityDemand1597188017817 implements MigrationInterface {
    name = 'AddFieldPromoInEntityDemand1597188017817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "demands" ADD "promo" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "demands" DROP COLUMN "promo"`);
    }

}
