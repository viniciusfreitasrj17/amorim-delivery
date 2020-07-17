import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RelationDemandClient1594945483877
  implements MigrationInterface {
  name = 'RelationDemandClient1594945483877';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "clients" ADD "demands" text array NOT NULL DEFAULT '{}'`
    );
    await queryRunner.query(`ALTER TABLE "demands" ADD "clientId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "demands" ADD CONSTRAINT "FK_33694375a503b931c7966e5bf7a" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "demands" DROP CONSTRAINT "FK_33694375a503b931c7966e5bf7a"`
    );
    await queryRunner.query(`ALTER TABLE "demands" DROP COLUMN "clientId"`);
    await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "demands"`);
  }
}
