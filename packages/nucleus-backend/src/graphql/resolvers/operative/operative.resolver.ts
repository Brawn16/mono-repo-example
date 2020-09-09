import { plainToClass } from "class-transformer";
import { Arg, Mutation, Resolver } from "type-graphql";
import { sendSQSMessage } from "../../../shared/aws/sqs";
import { OperativeIdentificationEntity } from "../../../shared/entity/operative-identification.entity";
import { OperativeEntity } from "../../../shared/entity/operative.entity";
import { Public } from "../../decorators/public";
import { CreateOperativeIdentificationInput } from "./create-operative.identification.input";
import { CreateOperativeInput } from "./create-operative.input";

@Resolver()
export class OperativeResolver {
  @Mutation(() => OperativeEntity)
  @Public()
  public async createOperative(
    @Arg("data") data: CreateOperativeInput
  ): Promise<OperativeEntity> {
    const operative = plainToClass(OperativeEntity, data);
    const { identifications = [] } = data;

    // Save identification records
    operative.identifications = await Promise.all(
      identifications.map((input: CreateOperativeIdentificationInput) =>
        plainToClass(OperativeIdentificationEntity, input).save()
      )
    );

    // Save entity and trigger events
    const { id } = await operative.save();
    await Promise.all([
      sendSQSMessage("createOperativeSpreadsheetRow", id),
      sendSQSMessage("createOperativeTriggerSlackWebhook", id),
      sendSQSMessage("createOperativeSyncPhotos", id),
    ]);

    return operative;
  }
}
