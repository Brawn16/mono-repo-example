import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class WorkPackDto {
  @Field({ nullable: true })
  public jobReference?: string;

  @Field({ nullable: true })
  public projectReference?: string;

  @Field({ nullable: true })
  public workTypeName?: string;

  @Field({ nullable: true })
  public popAreaName?: string;

  @Field({ nullable: true })
  public cityName?: string;

  @Field({ nullable: true })
  public jobStatusName?: string;

  @Field({ nullable: true })
  public projectStatusName?: string;

  @Field({ nullable: true })
  public contractorName?: string;

  @Field({ nullable: true })
  public projectManagerName?: string;

  @Field({ nullable: true })
  public baselineStartDate?: string;

  @Field({ nullable: true })
  public requiredByDate?: string;
}
