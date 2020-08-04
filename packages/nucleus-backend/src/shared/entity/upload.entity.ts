import { Field, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity("upload")
@ObjectType()
export class UploadEntity extends BaseEntity {
  @Column()
  @Field()
  public name?: string;

  @Column()
  @Field()
  public contentType?: string;

  @Column()
  @Field()
  public size?: number;

  @Column("varchar", { array: true })
  @Field(() => [String])
  public tags?: string[];
}
