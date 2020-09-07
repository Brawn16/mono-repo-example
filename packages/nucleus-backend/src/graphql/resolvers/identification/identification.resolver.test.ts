import { createSandbox } from "sinon";
import { IdentificationEntity } from "../../../shared/entity/identification.entity";
import { stubEntity } from "../../../shared/tests/helpers/entity";
import { IdentificationResolver } from "./identification.resolver";

const { restore, stub } = createSandbox();
afterEach(async () => restore());

it("returns all identifications", async () => {
  const identifications = [new IdentificationEntity()];
  stubEntity(stub, IdentificationEntity, identifications);

  const result = await new IdentificationResolver().identifications();
  expect(result).toBe(identifications);
});
