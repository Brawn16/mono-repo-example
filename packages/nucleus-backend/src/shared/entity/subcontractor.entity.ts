import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { OperativeEntity } from "./operative.entity";

@Entity("subcontractor")
@ObjectType()
export class SubcontractorEntity extends BaseEntity {
  @OneToMany(
    () => OperativeEntity,
    operative => operative.subcontractor
  )
  public operatives?: OperativeEntity[];

  @Column()
  @Field()
  public name?: string;
}
