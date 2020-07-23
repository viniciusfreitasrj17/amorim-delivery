import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateAdmin1595459936446 implements MigrationInterface {
  name = 'CreateAdmin1595459936446';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "admins" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "master" boolean NOT NULL DEFAULT false, "email" character varying NOT NULL, "password" character varying NOT NULL, "passwordResetToken" character varying, "passwordResetExpires" TIMESTAMP, CONSTRAINT "UQ_051db7d37d478a69a7432df1479" UNIQUE ("email"), CONSTRAINT "PK_e3b38270c97a854c48d2e80874e" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "admins"`);
  }
}
