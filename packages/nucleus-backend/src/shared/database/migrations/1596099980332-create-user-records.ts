import { MigrationInterface, QueryRunner } from "typeorm";
import { generateScryptHash } from "../../crypto/scrypt";

export class CreateUserRecords1596099980332 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const { hash } = await generateScryptHash("password");
    await queryRunner.query(`
      INSERT INTO "user" ("email", "password", "isActive", "isVerified")
      VALUES('admin@localhost.local', '${hash}', true, true)    
    `);
  }

  public async down(): Promise<void> {
    //
  }
}
