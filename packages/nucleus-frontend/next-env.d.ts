/// <reference types="next" />
/// <reference types="node" />
/// <reference types="next-images" />

declare namespace NodeJS {
  interface Process {
    readonly browser: boolean;
  }

  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
  }
}

declare module "*.module.css";
declare module "*.gql";
