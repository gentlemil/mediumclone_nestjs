import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1709801019770 implements MigrationInterface {
  name = 'SeedDb1709801019770';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      // password is '123'
      `INSERT INTO users (username, email, password) VALUES ('foo', 'foo@gmail.com', '$2b$10$BnMYPDGNrccFfVQbUBNtQOZrPKYfihzrdQQEEHlaPF7MOSftE9RAe')`,
    );
    await queryRunner.query(
      `INSERT INTO tags (name) VALUES ('dragons'), ('coffee'), ('nestjs')`,
    );
    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('first-article', 'First article', 'First artcile description', 'First article body', 'coffe,dragons', 1), ('second-article', 'Second article', 'Second artcile description', 'Second article body', 'coffe,dragons', 1)`,
    );
  }

  public async down(): Promise<void> {}
}
