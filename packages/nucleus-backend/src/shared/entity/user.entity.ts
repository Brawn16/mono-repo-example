import { hash } from "argon2";
import { MinLength } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity("user")
@ObjectType()
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  @Field()
  public email?: string;

  @Column()
  @MinLength(8)
  public password?: string;

  @Column()
  @Field()
  public isActive?: boolean;

  @Column()
  @Field()
  public isVerified?: boolean;

  /**
   * Store current password when entity loads. This can then be used to check
   * whether the password has changed on save, and therefore needs encrypting.
   */
  private currentPassword?: string;

  @AfterLoad()
  public loadCurrentPassword(): void {
    this.currentPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  public async encryptPassword(): Promise<void> {
    if (this.password !== undefined && this.currentPassword !== this.password) {
      this.password = await hash(this.password);
      this.loadCurrentPassword();
    }
  }
}
