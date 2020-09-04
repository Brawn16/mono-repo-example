import { MigrationInterface, QueryRunner } from "typeorm";

export class AmendIdentificationTable1599228564281
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "identification" ADD "type" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "identification" ADD "uploadTypes" character varying array`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "identification" DROP COLUMN "uploadTypes"`
    );
    await queryRunner.query(`ALTER TABLE "identification" DROP COLUMN "type"`);
  }
}
