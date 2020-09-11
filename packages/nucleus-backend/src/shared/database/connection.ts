import {
  ConnectionOptionsReader,
  createConnection as typeORMCreateConnection,
} from "typeorm";

const entitiesContext = require.context("..", true, /entity\/.*\.entity.ts/);
const migrationsContext = require.context(".", true, /migrations\/.*\.ts/);

function getContextExports(context: __WebpackModuleApi.RequireContext) {
  return context
    .keys()
    .map((module) => context(module))
    .reduce((result, module) => {
      const keys = Object.keys(module);
      const exports = keys.map((key) => module[key]);
      return [...result, ...exports];
    }, []);
}

export async function createConnection() {
  const options = await new ConnectionOptionsReader().get("default");

  return typeORMCreateConnection({
    ...options,
    entities: getContextExports(entitiesContext),
    migrations: getContextExports(migrationsContext),
  });
}
