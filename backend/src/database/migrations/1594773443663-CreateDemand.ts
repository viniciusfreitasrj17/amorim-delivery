import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateDemand1594773443663 implements MigrationInterface {
  name = 'CreateDemand1594773443663';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "demands" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "date" TIMESTAMP NOT NULL, "total" integer NOT NULL, CONSTRAINT "PK_d63565b0747a0cfc73e319bfc03" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "demands"`);
  }
}
