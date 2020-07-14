import { context } from "./context";

it("adds request to context", () => {
  const headers = {};

  const result = context({ event: { headers } });
  expect(result).toMatchObject({ headers });
});
