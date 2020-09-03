import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { IdentificationEntity } from "./identification.entity";
import { OperativeEntity } from "./operative.entity";

@Entity("operativeIdentification")
@ObjectType()
export class OperativeIdentificationEntity extends BaseEntity {
  @ManyToOne(() => OperativeEntity, (operative) => operative.identifications)
  public operative?: OperativeEntity;

  @ManyToOne(
    () => IdentificationEntity,
    (identification) => identification.operativeIdentifications
  )
  public identification?: IdentificationEntity;

  @Column("varchar", { array: true })
  @Field(() => [String])
  public uploads?: string[];
}
