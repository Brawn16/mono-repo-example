import { Query, Resolver } from "type-graphql";
import { WorkstreamEntity } from "../../../shared/entity/workstream.entity";
import { Public } from "../../decorators/public";

@Resolver()
export class WorkstreamResolver {
  @Public()
  @Query(() => [WorkstreamEntity])
  public workstreams(): Promise<WorkstreamEntity[]> {
    return WorkstreamEntity.find();
  }
}
