import { env } from "process";
import { get, Response } from "request";
import { Query, Resolver, Arg } from "type-graphql";
import { AddressLookupDto } from "./address-lookup.dto";

@Resolver()
export class AddressLookupResolver {
  @Query(() => [AddressLookupDto])
  public async addressLookup(
    @Arg("postcode") requestedPostcode: string
  ): Promise<AddressLookupDto[]> {
    const response = await this.sendRequest(requestedPostcode);

    if (response.statusCode === 404) {
      throw new Error("Unknown postcode.");
    }

    if (response.statusCode !== 200) {
      throw new Error("Unable to lookup address.");
    }

    const { postcode, longitude, latitude } = response.body;
    return response.body.addresses.map((address: any) => {
      const record = new AddressLookupDto();
      const [line1, line2, line3] = [
        address.line_1,
        address.line_2,
        address.line_3,
        address.line_4,
        address.locality,
      ].filter((line) => line !== "");

      record.line1 = line1;
      record.line2 = line2;
      record.line3 = line3;
      record.city = address.town_or_city || null;
      record.county = address.county || null;
      record.postcode = postcode;
      record.longitude = longitude || null;
      record.latitude = latitude || null;

      return record;
    });
  }

  private sendRequest(postcode: string): Promise<Response> {
    const key = env.SERVICE_GETADDRESS_API_KEY;
    if (key === undefined) {
      throw new Error("Address lookup is unavailable.");
    }

    return new Promise((resolve) =>
      get(
        `https://api.getAddress.io/find/${postcode}?api-key=${key}&expand=true`,
        {
          json: true,
        },
        (error: Error | null, message: Response) => {
          if (error) {
            throw error;
          }

          resolve(message);
        }
      )
    );
  }
}
