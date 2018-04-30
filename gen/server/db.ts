import { Bespoke, Function, Import, Module } from "typescriptase";

export const module: Module = Module.new({
  content: [
    Import.new({
      name: "typeorm",
      with: ["createConnection", "getRepository"],
    }),
    Import.new({
      name: "./entity/User",
      with: ["User"],
    }),
    Import.new({
      name: "./google",
      with: ["genAccessTokenInfo", "IAccessTokenInfo"],
    }),
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
});
