import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFollows1710262541312 implements MigrationInterface {
  name = 'CreateFollows1710262541312';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "follow_entity" ("id" SERIAL NOT NULL, "followerId" integer NOT NULL, "followingId" integer NOT NULL, CONSTRAINT "PK_18966373213f8c51750c227943b" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "follow_entity"`);
  }
}
