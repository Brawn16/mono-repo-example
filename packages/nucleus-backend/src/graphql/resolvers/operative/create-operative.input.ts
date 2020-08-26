import { IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";
import { CreateOperativeIdentificationInput } from "./create-operative.identification.input";

@InputType()
export class CreateOperativeInput {
  @Field()
  public firstName?: string;

  @Field()
  public lastName?: string;

  @Field()
  @IsEmail()
  public email?: string;

  @Field()
  public phoneNumber?: string;

  @Field()
  public emergencyContactName?: string;

  @Field()
  public emergencyContactPhoneNumber?: string;

  @Field()
  public addressLine1?: string;

  @Field({ nullable: true })
  public addressLine2?: string;

  @Field({ nullable: true })
  public addressLine3?: string;

  @Field({ nullable: true })
  public addressTownCity?: string;

  @Field({ nullable: true })
  public addressCounty?: string;

  @Field()
  public addressPostcode?: string;

  @Field()
  public medicalIssues?: boolean;

  @Field({ nullable: true })
  public medicalIssuesNotes?: string;

  @Field()
  public medicationRequired?: boolean;

  @Field({ nullable: true })
  public medicationRequiredNotes?: string;

  @Field()
  public photoUpload?: string;

  @Field(() => [String])
  public qualificationUploadIds?: string[];

  @Field()
  public workstream?: string;

  @Field()
  public subcontractor?: string;

  @Field(() => [CreateOperativeIdentificationInput])
  public identifications?: Array<{
    type: string;
    uploads: string[];
  }>;
}
