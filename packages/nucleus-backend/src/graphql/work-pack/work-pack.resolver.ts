import { env } from "process";
import { plainToClass } from "class-transformer";
import { post, CoreOptions, Response } from "request";
import { Authorized, Query, Resolver } from "type-graphql";
import { WorkPackEntity } from "../../shared/entity/work-pack.entity";

@Resolver()
export class WorkPackResolver {
  @Authorized()
  @Query(() => [WorkPackEntity])
  public async workPacks(): Promise<WorkPackEntity[]> {
    // Send login request
    const { headers } = await this.sendRequest("Signin", {
      formData: {
        password: env.DN_PASSWORD,
        username: env.DN_USERNAME,
      },
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
          cookie,
        },
        json: {
          skip: 0,
          take: 50,
        },
      }
    );

    return response.body.data.map((pack: any) =>
      plainToClass(WorkPackEntity, pack)
    );
  }

  private sendRequest(path: string, options: CoreOptions): Promise<Response> {
    return new Promise((resolve) =>
      post(
        `https://cityfibre.depotnet.co.uk/${path}`,
        options,
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
