import { MigrationInterface, QueryRunner } from "typeorm";

export class AmendOperativeTable1600253651019 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "operative" ALTER COLUMN "qualificationUploadIds" DROP NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "operative" ALTER COLUMN "qualificationUploadIds" SET NOT NULL`
    );
  }
}
