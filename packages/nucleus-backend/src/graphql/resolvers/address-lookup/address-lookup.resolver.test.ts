import { env } from "process";
import request from "request-promise";
import { createSandbox } from "sinon";
import { AddressLookupResolver } from "./address-lookup.resolver";

const { restore, stub } = createSandbox();
afterEach(async () => restore());
env.SERVICE_GETADDRESS_API_KEY = "key";

it("returns addresses", async () => {
  stub(request, "get").resolves({
    statusCode: 200,
    body: {
      latitude: "latitude",
      longitude: "longitude",
      postcode: "postcode",
      addresses: [
        {
          line_1: "line1",
          line_2: "line2",
          line_3: "line3",
          line_4: "line4",
          locality: "locality",
          town_or_city: "city",
          county: "county",
        },
      ],
    },
  });

  const result = await new AddressLookupResolver().addressLookup("postcode");
  expect(result).toMatchObject([
    {
      line1: "line1",
      line2: "line2",
      line3: "line3",
      townCity: "city",
      county: "county",
      postcode: "postcode",
      latitude: "latitude",
      longitude: "longitude",
    },
  ]);
});

it("throws an error when postcode is unknown", async () => {
  stub(request, "get").resolves({
    statusCode: 404,
  });

  const result = new AddressLookupResolver().addressLookup("postcode");
  expect(result).rejects.toThrow(new Error("Unknown postcode."));
});

it("throws an error when postcode service errors", async () => {
  stub(request, "get").resolves({
    statusCode: 500,
  });

  const result = new AddressLookupResolver().addressLookup("postcode");
  expect(result).rejects.toThrow(new Error("Unable to lookup address."));
});
