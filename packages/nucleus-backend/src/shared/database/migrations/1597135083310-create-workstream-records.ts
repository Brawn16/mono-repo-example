import { MigrationInterface, QueryRunner } from "typeorm";
import { WorkstreamEntity } from "../../entity/workstream.entity";

export class CreateWorkstreamRecords1597135083310
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .createQueryBuilder()
      .insert()
      .into(WorkstreamEntity)
      .values([
        { name: "BT Openreach" },
        { name: "City Fibre" },
        { name: "Morrison Utility Services" }
      ])
      .execute();
  }

  public async down(): Promise<void> {
    //
  }
}
