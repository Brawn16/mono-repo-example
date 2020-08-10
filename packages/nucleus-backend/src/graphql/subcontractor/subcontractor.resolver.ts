import { Query, Resolver } from "type-graphql";
import { SubcontractorEntity } from "../../shared/entity/subcontractor.entity";

@Resolver()
export class SubcontractorResolver {
  @Query(() => [SubcontractorEntity])
  public subcontractors(): Promise<SubcontractorEntity[]> {
    return SubcontractorEntity.find();
  }
}
