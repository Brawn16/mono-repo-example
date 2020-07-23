import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class AddressLookupDto {
  @Field({ nullable: true })
  public line1?: string;

  @Field({ nullable: true })
  public line2?: string;

  @Field({ nullable: true })
  public line3?: string;

  @Field({ nullable: true })
  public city?: string;

  @Field({ nullable: true })
  public county?: string;

  @Field({ nullable: true })
  public postcode?: string;

  @Field({ nullable: true })
  public latitude?: number;

  @Field({ nullable: true })
  public longitude?: number;
}
