import { env } from "process";
import { plainToClass } from "class-transformer";
import { CoreOptions, Response } from "request";
import { post } from "request-promise";
import { Authorized, Query, Resolver } from "type-graphql";
import { WorkPackDto } from "./work-pack.dto";

@Resolver()
export class WorkPackResolver {
  @Authorized()
  @Query(() => [WorkPackDto])
  public async workPacks(): Promise<WorkPackDto[]> {
    // Send login request
    const { headers } = await this.sendRequest("Signin", {
      formData: {
        password: env.SERVICE_DEPOTNET_PASSWORD,
        username: env.SERVICE_DEPOTNET_USERNAME
      },
      timeout: 15000
    });

    // Attempt to retrieve cookies from headers
    let cookie: string;
    try {
      [cookie] = headers["set-cookie"] || [];
    } catch (error) {
      throw new Error("Unable to parse DepotNet auth token");
    }

    // Retrieve work packs
    const response = await this.sendRequest(
      "CityFibre/SecondaryNodeAreas/Data",
      {
        headers: {
          "content-type": "application/json",
          cookie
        },
        json: {
          skip: 0,
          take: 50
        },
        timeout: 15000
      }
    );

    return response.body.data.map((pack: any) =>
      plainToClass(WorkPackDto, pack)
    );
  }

  private async sendRequest(
    path: string,
    options: CoreOptions
  ): Promise<Response> {
    return post(`https://cityfibre.depotnet.co.uk/${path}`, {
      resolveWithFullResponse: true,
      ...options
    });
  }
}
