import { resolve } from "path";
import { cwd } from "process";
import { config } from "dotenv";

config({
  path: resolve(cwd(), ".env.local")
});
config();
