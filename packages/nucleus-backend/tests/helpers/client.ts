import { ApolloServer } from "apollo-server-lambda";
import {
  createTestClient,
  ApolloServerTestClient
} from "apollo-server-testing";
import { buildSchemaSync, ResolverData } from "type-graphql";
import { createConnection, getConnectionOptions, Connection } from "typeorm";
import { importSeed, runSeeder } from "typeorm-seeding";
import { loadFiles, importFiles } from "typeorm-seeding/dist/utils/file.util";
import { context, AuthenticatedAppContext } from "../../graphql/core/context";
import { resolvers } from "../../graphql/core/schema";
import { UserEntity } from "../../shared/entity/user.entity";

let connection: Connection;

/**
 * Create an auth checker function to use when building schema. This allows us
 * to set a default user rather than rely on request data.
 */
async function authChecker({
  context: authenticatedAppContext
}: ResolverData<AuthenticatedAppContext>) {
  /* eslint-disable-next-line no-param-reassign */
  authenticatedAppContext.user = await UserEntity.findOneOrFail({
    email: "admin@localhost.local"
  });
  return true;
}

/**
 * Create client to be returned. We use a function so we can refresh the
 * database on every test.
 */
const client = createTestClient(
  new ApolloServer({
    context,
    schema: buildSchemaSync({
      authChecker,
      resolvers
    })
  })
);

export async function createClient(): Promise<ApolloServerTestClient> {
  const options = await getConnectionOptions();

  // Create connection if this is the first client call
  if (!connection) {
    connection = await createConnection({
      ...options,
      database: `${options.database}_integration`,
      entities: ["shared/entity/*.entity.ts"],
      logging: false,
      type: "postgres"
    });
  }

  // Build database schema
  await connection.dropDatabase();
  await connection.synchronize();

  // Load factories and seeds
  const factoryFiles = loadFiles(["shared/database/factories/*.ts"]);
  await importFiles(factoryFiles);
  const seedFiles = loadFiles(["shared/database/seeds/*.ts"]);
  const seeds = await Promise.all(seedFiles.map(file => importSeed(file)));
  await Promise.all(seeds.map(seed => runSeeder(seed)));

  // Return client instance
  return client;
}
