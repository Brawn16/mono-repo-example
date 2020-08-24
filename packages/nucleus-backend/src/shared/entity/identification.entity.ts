import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { OperativeIdentificationEntity } from "./operative-identification.entity";

@Entity("identification")
@ObjectType()
export class IdentificationEntity extends BaseEntity {
  @OneToMany(
    () => OperativeIdentificationEntity,
    (OperativeIdentification) => OperativeIdentification.identification
  )
  public operativeIdentifications?: OperativeIdentificationEntity[];

  @Column()
  @Field()
  public name?: string;
}
