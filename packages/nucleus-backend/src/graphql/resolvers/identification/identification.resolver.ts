import { Query, Resolver } from "type-graphql";
import { IdentificationEntity } from "../../../shared/entity/identification.entity";
import { Public } from "../../decorators/public";

@Resolver()
export class IdentificationResolver {
  @Public()
  @Query(() => [IdentificationEntity])
  public identifications(): Promise<IdentificationEntity[]> {
    return IdentificationEntity.find();
  }
}
