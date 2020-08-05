import { hash } from "argon2";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { UserEntity } from "../../entity/user.entity";

export class UserSeed implements Seeder {
  public async run(_factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values([
        {
          email: "admin@localhost.local",
          password: await hash("password"),
          isActive: true,
          isVerified: true
        }
      ])
      .execute();
  }
}
