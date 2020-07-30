import { App } from "@aws-cdk/core";
import { BackendStack } from "./backend-stack";

const app = new App();
new BackendStack(app, "develop", true);
