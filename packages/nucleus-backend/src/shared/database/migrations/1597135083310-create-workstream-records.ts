import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWorkstreamRecords1597135083310
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "workstream" ("name") VALUES('BT Openreach')`
    );
    await queryRunner.query(
      `INSERT INTO "workstream" ("name") VALUES('City Fibre')`
    );
    await queryRunner.query(
      `INSERT INTO "workstream" ("name") VALUES('Morrison Utility Services')`
    );
  }

  public async down(): Promise<void> {
    //
  }
}
