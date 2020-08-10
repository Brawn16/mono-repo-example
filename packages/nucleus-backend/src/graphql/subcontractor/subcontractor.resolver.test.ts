import { createSandbox } from "sinon";
import { WorkstreamEntity } from "../../shared/entity/workstream.entity";
import { stubEntity } from "../../shared/tests/helpers/entity";
import { SubcontractorResolver } from "./subcontractor.resolver";

const { restore, stub } = createSandbox();
afterEach(async () => restore());

it("returns all subcontractors", async () => {
  const workstreams = [new WorkstreamEntity()];
  stubEntity(stub, WorkstreamEntity, workstreams);

  const result = await new SubcontractorResolver().subcontractors();
  expect(result).toBe(workstreams);
});
