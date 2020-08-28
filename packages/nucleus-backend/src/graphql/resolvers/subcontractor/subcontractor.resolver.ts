import { Query, Resolver } from "type-graphql";
import { SubcontractorEntity } from "../../../shared/entity/subcontractor.entity";
import { Public } from "../../decorators/public";

@Resolver()
export class SubcontractorResolver {
  @Public()
  @Query(() => [SubcontractorEntity])
  public subcontractors(): Promise<SubcontractorEntity[]> {
    return SubcontractorEntity.find();
  }
}
