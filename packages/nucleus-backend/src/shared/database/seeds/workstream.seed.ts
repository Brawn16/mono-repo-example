import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { WorkstreamEntity } from "../../entity/workstream.entity";

export class WorkstreamSeed implements Seeder {
  public async run(_factory: Factory, connection: Connection): Promise<void> {
    await connection
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
}
