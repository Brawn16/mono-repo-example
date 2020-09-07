import { MigrationInterface, QueryRunner } from "typeorm";

export class AmendIdentificationRecords1599228686127
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      UPDATE "identification"
      SET "type" = 'id', "uploadTypes" = '{"photo page"}'
      WHERE "name" = 'UK/EEA Passport'
    `);
    await queryRunner.query(`
      INSERT INTO "identification" ("name", "type", "uploadTypes")
      VALUES('UK/EEA National Identity Card', 'id', '{"front of card", "back of card"}')
    `);
    await queryRunner.query(`
      INSERT INTO "identification" ("name", "type", "uploadTypes")
      VALUES('Non-UK Passport (with work permit)', 'id', '{"passport photo page", "front of work permit", "back of work permit"}')
    `);
    await queryRunner.query(`
      INSERT INTO "identification" ("name", "type", "uploadTypes")
      VALUES('Biometric Residency Permit (with work permit)', 'id', '{"front of permit", "back of permit"}')
    `);
    await queryRunner.query(`
      INSERT INTO "identification" ("name", "type", "uploadTypes")
      VALUES('UK Birth Certificate (with photo ID)', 'id', '{"birth certificate", "photo", "back of photo"}')
    `);
    await queryRunner.query(`
      INSERT INTO "identification" ("name", "type", "uploadTypes")
      VALUES('UK Driving Licence', 'address', '{"front of licence", "back of licence"}')
    `);
    await queryRunner.query(`
      INSERT INTO "identification" ("name", "type", "uploadTypes")
      VALUES('Bank statement (no more than 3 months old)', 'address', '{"bank statement"}')
    `);
    await queryRunner.query(`
      INSERT INTO "identification" ("name", "type", "uploadTypes")
      VALUES('HMRC letter (no more than 12 months old)', 'address', '{"HMRC letter"}')
    `);
    await queryRunner.query(`
      INSERT INTO "identification" ("name", "type", "uploadTypes")
      VALUES('Utility bill (no more than 3 months old)', 'address', '{"utility bill"}')
    `);
  }

  public async down(): Promise<void> {
    //
  }
}
