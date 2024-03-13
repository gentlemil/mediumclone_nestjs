import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateComments1710342518439 implements MigrationInterface {
  name = 'CreateComments1710342518439';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comments " RENAME COLUMN "articleId" TO "slug"`,
    );
    await queryRunner.query(
      `CREATE TABLE "follows" ("id" SERIAL NOT NULL, "followerId" integer NOT NULL, "followingId" integer NOT NULL, CONSTRAINT "PK_8988f607744e16ff79da3b8a627" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "comments " DROP COLUMN "slug"`);
    await queryRunner.query(
      `ALTER TABLE "comments " ADD "slug" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "comments " DROP COLUMN "slug"`);
    await queryRunner.query(
      `ALTER TABLE "comments " ADD "slug" integer NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "follows"`);
    await queryRunner.query(
      `ALTER TABLE "comments " RENAME COLUMN "slug" TO "articleId"`,
    );
  }
}
