import { Field, ID, ObjectType } from "type-graphql";
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity as TypeORMBaseEntity,
  UpdateDateColumn,
} from "typeorm";

@ObjectType({ isAbstract: true })
export abstract class BaseEntity extends TypeORMBaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  public id?: string;

  @CreateDateColumn()
  @Field()
  public createdAt?: Date;

  @Field()
  @UpdateDateColumn()
  public updatedAt?: Date;
}
