import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
} from "typeorm";
import { BaseEntity } from "./base.entity";
import { OperativeIdentificationEntity } from "./operative-identification.entity";
import { SubcontractorEntity } from "./subcontractor.entity";
import { UploadEntity } from "./upload.entity";
import { WorkstreamEntity } from "./workstream.entity";

@Entity("operative")
@ObjectType()
export class OperativeEntity extends BaseEntity {
  @ManyToOne(() => WorkstreamEntity, (workstream) => workstream.operatives)
  public workstream?: WorkstreamEntity;

  @ManyToOne(
    () => SubcontractorEntity,
    (subcontractor) => subcontractor.operatives
  )
  public subcontractor?: WorkstreamEntity;

  @OneToMany(
    () => OperativeIdentificationEntity,
    (operativeIdentification) => operativeIdentification.operative
  )
  public identifications?: OperativeIdentificationEntity[];

  @Column()
  @Field()
  public firstName?: string;

  @Column()
  @Field()
  public lastName?: string;

  @Column()
  @Field()
  public email?: string;

  @Column()
  @Field()
  public phoneNumber?: string;

  @Column()
  @Field()
  public emergencyContactName?: string;

  @Column()
  @Field()
  public emergencyContactPhoneNumber?: string;

  @Column()
  @Field()
  public addressLine1?: string;

  @Column({ nullable: true })
  @Field()
  public addressLine2?: string;

  @Column({ nullable: true })
  @Field()
  public addressLine3?: string;

  @Column({ nullable: true })
  @Field()
  public addressTownCity?: string;

  @Column({ nullable: true })
  @Field()
  public addressCounty?: string;

  @Column()
  @Field()
  public addressPostcode?: string;

  @Column()
  @Field()
  public medicalIssues?: boolean;

  @Column({ nullable: true })
  @Field()
  public medicalIssuesNotes?: string;

  @Column()
  @Field()
  public medicationRequired?: boolean;

  @Column({ nullable: true })
  @Field()
  public medicationRequiredNotes?: string;

  @JoinColumn()
  @OneToOne(() => UploadEntity)
  public photoUpload?: UploadEntity;

  @Column("varchar", { array: true, nullable: true })
  @Field(() => [String])
  public qualificationUploadIds?: string[];
}
