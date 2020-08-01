import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreatePromoAndRelationPromoFood1596192968927
  implements MigrationInterface {
  name = 'CreatePromoAndRelationPromoFood1596192968927';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "promos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "image" character varying NOT NULL, "foods" text array NOT NULL, CONSTRAINT "PK_ac05363b0734f3842a720d20bcc" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "promos"`);
  }
}
