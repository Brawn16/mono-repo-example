import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIdentificationRecords1597423719889
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "identification" ("name") VALUES('UK/EEA Passport')`
    );
  }

  public async down(): Promise<void> {
    //
  }
}
