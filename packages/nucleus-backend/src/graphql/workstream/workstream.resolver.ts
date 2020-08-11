import { Query, Resolver } from "type-graphql";
import { WorkstreamEntity } from "../../shared/entity/workstream.entity";

@Resolver()
export class WorkstreamResolver {
  @Query(() => [WorkstreamEntity])
  public workstreams(): Promise<WorkstreamEntity[]> {
    return WorkstreamEntity.find();
  }
}
