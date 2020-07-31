import { App } from "@aws-cdk/core";
import { NucleusStack } from "./nucleus-stack";

const app = new App();
new NucleusStack(app, "develop", false);
