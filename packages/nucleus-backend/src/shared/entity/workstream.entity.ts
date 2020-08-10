import { Field, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity("workstream")
@ObjectType()
export class WorkstreamEntity extends BaseEntity {
  @Column()
  @Field()
  public name?: string;
}
