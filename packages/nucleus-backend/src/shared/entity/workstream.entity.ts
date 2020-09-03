import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { OperativeEntity } from "./operative.entity";

@Entity("workstream")
@ObjectType()
export class WorkstreamEntity extends BaseEntity {
  @OneToMany(() => OperativeEntity, (operative) => operative.workstream)
  public operatives?: OperativeEntity[];

  @Column()
  @Field()
  public name?: string;
}
