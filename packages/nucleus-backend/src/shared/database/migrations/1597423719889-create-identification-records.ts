import { MigrationInterface, QueryRunner } from "typeorm";
import { IdentificationEntity } from "../../entity/identification.entity";

export class CreateIdentificationRecords1597423719889
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .createQueryBuilder()
      .insert()
      .into(IdentificationEntity)
      .values([{ name: "UK/EEA Passport" }])
      .execute();
  }

  public async down(): Promise<void> {
    //
  }
}
