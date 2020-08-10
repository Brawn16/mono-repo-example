import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { SubcontractorEntity } from "../../entity/subcontractor.entity";

export class SubcontractorSeed implements Seeder {
  public async run(_factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(SubcontractorEntity)
      .values([{ name: "Pioneer" }])
      .execute();
  }
}
