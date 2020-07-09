import { SinonStub, SinonStubStatic } from "sinon";
import {
  BaseEntity,
  FindConditions,
  FindOneOptions,
  SaveOptions,
  RemoveOptions,
  ObjectID,
  DeleteResult,
} from "typeorm";

export interface StubEntityResult {
  deleteEntity: SinonStub<
    [
      (
        | string
        | number
        | string[]
        | number[]
        | Date
        | Date[]
        | ObjectID
        | ObjectID[]
        | FindConditions<BaseEntity>
      ),
      RemoveOptions?
    ],
    Promise<DeleteResult>
  >;
  find: SinonStub<[FindConditions<BaseEntity>?], Promise<BaseEntity[]>>;
  findOne: SinonStub<
    [FindConditions<BaseEntity>?, FindOneOptions<BaseEntity>?],
    Promise<BaseEntity | undefined>
  >;
  findOneOrFail: SinonStub<
    [FindConditions<BaseEntity>?, FindOneOptions<BaseEntity>?],
    Promise<BaseEntity>
  >;
  save: SinonStub<[SaveOptions?], Promise<BaseEntity>>;
}

export function stubEntity(
  stub: SinonStubStatic,
  entity: typeof BaseEntity,
  data: BaseEntity[]
): StubEntityResult {
  const deleteEntity = stub(entity, "delete").resolves();
  const find = stub(entity, "find").resolves(data);
  const findOne = stub(entity, "findOne").resolves(data[0]);
  const findOneOrFail = stub(entity, "findOneOrFail").resolves(data[0]);
  const save = stub(entity.prototype, "save").resolvesThis();

  return {
    deleteEntity,
    find,
    findOne,
    findOneOrFail,
    save,
  };
}
