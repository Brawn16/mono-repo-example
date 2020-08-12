import { MigrationInterface, QueryRunner } from "typeorm";
import { SubcontractorEntity } from "../../entity/subcontractor.entity";

export class CreateSubcontractorRecords1597135089904
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .createQueryBuilder()
      .insert()
      .into(SubcontractorEntity)
      .values([
        { name: "Barlastones" },
        { name: "AUS" },
        { name: "DW" },
        { name: "Pioneer" },
        { name: "NE Construction" },
        { name: "BPH" },
      ])
      .execute();
  }

  public async down(): Promise<void> {
    //
  }
}
