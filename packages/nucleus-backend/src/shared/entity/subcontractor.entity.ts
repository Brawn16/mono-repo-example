import { Field, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity("subcontractor")
@ObjectType()
export class SubcontractorEntity extends BaseEntity {
  @Column()
  @Field()
  public name?: string;
}
