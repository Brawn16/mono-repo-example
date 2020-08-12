import { hash } from "argon2";
import { MigrationInterface, QueryRunner } from "typeorm";
import { UserEntity } from "../../entity/user.entity";

export class CreateUserRecords1596099980332 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values([
        {
          email: "admin@localhost.local",
          password: await hash("password"),
          isActive: true,
          isVerified: true,
        },
      ])
      .execute();
  }

  public async down(): Promise<void> {
    //
  }
}
