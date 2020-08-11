import { createSandbox } from "sinon";
import { SubcontractorEntity } from "../../shared/entity/subcontractor.entity";
import { stubEntity } from "../../shared/tests/helpers/entity";
import { SubcontractorResolver } from "./subcontractor.resolver";

const { restore, stub } = createSandbox();
afterEach(async () => restore());

it("returns all subcontractors", async () => {
  const subcontractors = [new SubcontractorEntity()];
  stubEntity(stub, SubcontractorEntity, subcontractors);

  const result = await new SubcontractorResolver().subcontractors();
  expect(result).toBe(subcontractors);
});
