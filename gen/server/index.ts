import { Bespoke, Import, Module, Renderable } from "typescriptase";

export const module: Renderable = Module.new({
  content: [
    Bespoke.new({name: "DEPRECATE"}),
  ],
  destination: "src/server/index.ts",
  imports: [
    Import.new({
      module: "@babel/polyfill",
    }),
    Import.new({
      module: "aws-serverless-express",
      nameDefault: "lambda",
    }),
    Import.new({
      module: "body-parser",
      names: ["json", "urlencoded"],
    }),
    Import.new({
      module: "cors",
      nameDefault: "cors",
    }),
    Import.new({
      module: "express",
      nameDefault: "express",
    }),
    Import.new({
      module: "express-bearer-token",
      nameDefault: "bearer",
    }),
    Import.new({
      module: "helmet",
      nameDefault: "helmet",
    }),
    Import.new({
      module: "./db",
      names: ["genSetupDB"],
    }),
    Import.new({
      module: "./server",
      names: ["graphQL"],
    }),
    Import.new({
      module: "./util",
      names: ["makeSync"],
    }),
  ],
});
