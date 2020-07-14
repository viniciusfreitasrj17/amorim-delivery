import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateFood1594768663569 implements MigrationInterface {
    name = 'CreateFood1594768663569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "foods" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "stock" boolean NOT NULL DEFAULT true, "price" integer NOT NULL, "category" integer NOT NULL, CONSTRAINT "PK_0cc83421325632f61fa27a52b59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "number" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "number" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "foods"`);
    }

}
