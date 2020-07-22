import { env } from "process";
import { get, Response } from "request";
import { Query, Resolver, Arg } from "type-graphql";
import { AddressRecord } from "./address-record";

@Resolver()
export class AddressLookupResolver {
  @Query(() => [AddressRecord])
  public async addressLookup(
    @Arg("postcode") requestedPostcode: string
  ): Promise<AddressRecord[]> {
    const response = await this.sendRequest(requestedPostcode);

    if (response.statusCode === 404) {
      throw new Error("invalid postcode");
    }

    if (response.statusCode !== 200) {
      throw new Error("something went wrong");
    }

    const { postcode, longitude, latitude } = response.body;

    return response.body.addresses.map((address: any) => {
      const record = new AddressRecord();
      record.line1 = address.line_1;
      record.line2 = address.line_2;
      record.line3 = address.line_3;
      record.city = address.town_or_city;
      record.postcode = postcode;
      record.longitude = longitude;
      record.latitude = latitude;

      return record;
    });
  }

  private sendRequest(postcode: string): Promise<Response> {
    return new Promise((resolve) =>
      get(
        `https://api.getAddress.io/find/${postcode}?api-key=${env.GET_ADDRESS_API_KEY}&expand=true`,
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
