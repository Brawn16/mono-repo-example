import { getMockRequest } from "../tests/helpers/request";
import { context } from "./context";

it("adds request to context", () => {
  const request = getMockRequest();

  const result = context({ request });
  expect(result).toMatchObject({ request });
});
