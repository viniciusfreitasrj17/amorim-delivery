import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RelationFoodDemandAndRemoveFieldDateFromDemand1594829691832
  implements MigrationInterface {
  name = 'RelationFoodDemandAndRemoveFieldDateFromDemand1594829691832';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "demands" RENAME COLUMN "date" TO "foods"`
    );
    await queryRunner.query(`ALTER TABLE "demands" DROP COLUMN "foods"`);
    await queryRunner.query(
      `ALTER TABLE "demands" ADD "foods" text array NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "demands" DROP COLUMN "foods"`);
    await queryRunner.query(
      `ALTER TABLE "demands" ADD "foods" TIMESTAMP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "demands" RENAME COLUMN "foods" TO "date"`
    );
  }
}
