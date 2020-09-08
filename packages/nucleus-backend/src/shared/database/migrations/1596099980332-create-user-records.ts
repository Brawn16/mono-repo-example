import { hash } from "argon2";
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserRecords1596099980332 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await hash("password");
    await queryRunner.query(`
      INSERT INTO "user" ("email", "password", "isActive", "isVerified")
      VALUES('admin@localhost.local', '$${password}', true, true)    
    `);
  }

  public async down(): Promise<void> {
    //
  }
}
