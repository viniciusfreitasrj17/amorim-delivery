import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationCategoryFood1594773895233 implements MigrationInterface {
    name = 'RelationCategoryFood1594773895233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "foods" RENAME COLUMN "category" TO "categoryId"`);
        await queryRunner.query(`ALTER TABLE "foods" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "foods" ADD "categoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "foods" ADD CONSTRAINT "FK_28ab9408d9ade121a043790557c" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "foods" DROP CONSTRAINT "FK_28ab9408d9ade121a043790557c"`);
        await queryRunner.query(`ALTER TABLE "foods" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "foods" ADD "categoryId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "foods" RENAME COLUMN "categoryId" TO "category"`);
    }

}
