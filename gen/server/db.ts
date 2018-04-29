import { Bespoke, Function, Import, Module, Renderable } from "typescriptase";

export const module: Renderable = Module.new({
  content: [
    Function.new({
      async: true,
      content: [
        Bespoke.new({
          name: "genSetupDB",
        }),
      ],
      exported: true,
      inputs: {},
      name: "genSetupDB",
      output: "Promise<void>",
    }),
    Function.new({
      async: true,
      content: [
        Bespoke.new({
          name: "genUserForAccessToken",
        }),
      ],
      exported: true,
      inputs: {
        accessToken: "string",
      },
      name: "genUserForAccessToken",
      output: "Promise<User>",
    }),
  ],
  destination: "src/server/db.ts",
  imports: [
    Import.new({
      module: "typeorm",
      names: ["createConnection", "getRepository"],
    }),
    Import.new({
      module: "./entity/User",
      names: ["User"],
    }),
    Import.new({
      module: "./google",
      names: ["genAccessTokenInfo", "IAccessTokenInfo"],
    }),
  ],
});
