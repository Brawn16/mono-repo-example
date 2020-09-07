import { MigrationInterface, QueryRunner } from "typeorm";

export class AmendIdentificationTable1599230731820
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "identification" ALTER COLUMN "type" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "identification" ALTER COLUMN "uploadTypes" SET NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "identification" ALTER COLUMN "uploadTypes" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "identification" ALTER COLUMN "type" DROP NOT NULL`
    );
  }
}
