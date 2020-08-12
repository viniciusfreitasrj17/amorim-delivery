import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddFieldTotalInEntityPromo1597186651495
  implements MigrationInterface {
  name = 'AddFieldTotalInEntityPromo1597186651495';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "promos" ADD "total" integer NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "promos" DROP COLUMN "total"`);
  }
}
