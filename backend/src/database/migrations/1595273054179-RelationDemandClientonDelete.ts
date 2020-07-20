import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RelationDemandClientonDelete1595273054179
  implements MigrationInterface {
  name = 'RelationDemandClientonDelete1595273054179';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "demands" DROP CONSTRAINT "FK_33694375a503b931c7966e5bf7a"`
    );
    await queryRunner.query(
      `ALTER TABLE "demands" ADD CONSTRAINT "FK_33694375a503b931c7966e5bf7a" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "demands" DROP CONSTRAINT "FK_33694375a503b931c7966e5bf7a"`
    );
    await queryRunner.query(
      `ALTER TABLE "demands" ADD CONSTRAINT "FK_33694375a503b931c7966e5bf7a" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
