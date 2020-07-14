import {MigrationInterface, QueryRunner} from "typeorm";

export class ApplyValidateInClientEntity1594762856741 implements MigrationInterface {
    name = 'ApplyValidateInClientEntity1594762856741'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "UQ_b48860677afe62cd96e12659482" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "UQ_b48860677afe62cd96e12659482"`);
    }

}
