import { Bespoke, Function, Import, Module, Variable } from "typescriptase";

export const module: Module = Module.new({
  content: [
    Import.new({
      name: "@babel/polyfill",
    }),
    Import.new({
      name: "aws-serverless-express",
      withDefaultAs: "lambda",
    }),
    Import.new({
      name: "body-parser",
      with: ["json", "urlencoded"],
    }),
    Import.new({
      name: "cors",
      withDefaultAs: "cors",
    }),
    Import.new({
      name: "express",
      withDefaultAs: "express",
    }),
    Import.new({
      name: "express-bearer-token",
      withDefaultAs: "bearer",
    }),
    Import.new({
      name: "helmet",
      withDefaultAs: "helmet",
    }),
    Import.new({
      name: "./db",
      with: ["genSetupDB"],
    }),
    Import.new({
      name: "./server",
      with: ["graphQL"],
    }),
    Import.new({
      name: "./util",
      with: ["makeSync"],
    }),
    Variable.new({
      assignment: "express()",
      exported: false,
      mutable: false,
      name: "app",
      type: "express.Express",
    }),
    Variable.new({
      assignment: "false",
      exported: false,
      mutable: true,
      name: "didSetup",
      type: "boolean",
    }),
    Bespoke.new({
      name: "DEPRECATE",
    }),
    Function.new({
      async: false,
      content: [
        Bespoke.new({
          name: "handler",
        }),
      ],
      exported: true,
      inputs: {
        event: "object",
        context: "object",
      },
      name: "handler",
      output: "void",
    }),
  ],
  destination: "src/server/index.ts",
});
