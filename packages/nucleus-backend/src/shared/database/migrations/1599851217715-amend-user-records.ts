import { MigrationInterface, QueryRunner } from "typeorm";
import { generateScryptHash } from "../../crypto/scrypt";

export class AmendUserRecords1599851217715 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const { hash, salt } = await generateScryptHash("password");
    await queryRunner.query(`
      UPDATE "user"
      SET "password" = '${hash}', "passwordSalt" = '${salt}'
      WHERE "email" = 'admin@localhost.local'
    `);
  }

  public async down(): Promise<void> {
    //
  }
}
