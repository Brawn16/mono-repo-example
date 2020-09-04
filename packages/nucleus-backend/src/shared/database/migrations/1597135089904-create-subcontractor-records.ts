import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSubcontractorRecords1597135089904
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "subcontractor" ("name") VALUES('Barlastones')`
    );
    await queryRunner.query(
      `INSERT INTO "subcontractor" ("name") VALUES('AUS')`
    );
    await queryRunner.query(
      `INSERT INTO "subcontractor" ("name") VALUES('DW')`
    );
    await queryRunner.query(
      `INSERT INTO "subcontractor" ("name") VALUES('Pioneer')`
    );
    await queryRunner.query(
      `INSERT INTO "subcontractor" ("name") VALUES('NE Construction')`
    );
    await queryRunner.query(
      `INSERT INTO "subcontractor" ("name") VALUES('BPH')`
    );
  }

  public async down(): Promise<void> {
    //
  }
}
