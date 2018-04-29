import { Bespoke, EVariableKind, Function, Import, Module, Renderable, Variable } from "typescriptase";

export const module: Renderable = Module.new({
  content: [
    Variable.new({
      assignment: "express()",
      kind: EVariableKind.IMMUTABLE,
      name: "app",
      type: "express.Express",
    }),
    Variable.new({
      assignment: "false",
      kind: EVariableKind.MUTABLE,
      name: "didSetup",
      "type": "boolean",
    }),
    Bespoke.new({name: "DEPRECATE"}),
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
