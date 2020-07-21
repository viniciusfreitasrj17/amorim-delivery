import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateClientPasswordCrypt1595367817132
  implements MigrationInterface {
  name = 'CreateClientPasswordCrypt1595367817132';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "clients" ADD "passwordResetToken" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ADD "passwordResetExpires" TIMESTAMP`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "clients" DROP COLUMN "passwordResetExpires"`
    );
    await queryRunner.query(
      `ALTER TABLE "clients" DROP COLUMN "passwordResetToken"`
    );
  }
}
