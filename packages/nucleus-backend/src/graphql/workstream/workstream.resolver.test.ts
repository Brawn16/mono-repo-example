import { createSandbox } from "sinon";
import { WorkstreamEntity } from "../../shared/entity/workstream.entity";
import { stubEntity } from "../../shared/tests/helpers/entity";
import { WorkstreamResolver } from "./workstream.resolver";

const { restore, stub } = createSandbox();
afterEach(async () => restore());

it("returns all workstreams", async () => {
  const workstreams = [new WorkstreamEntity()];
  stubEntity(stub, WorkstreamEntity, workstreams);

  const result = await new WorkstreamResolver().workstreams();
  expect(result).toBe(workstreams);
});
