import { Bespoke, Function, Import, Module, Type } from "typescriptase";

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
    Function.Async.newExported({
      content: [
        Bespoke.new({
          name: "genSetupDB",
        }),
      ],
      inTypes: [],
      name: "genSetupDB",
      outType: Type.Anonymous.new({ type: "Promise<void>" }),
    }),
    Function.Async.newExported({
      content: [
        Bespoke.new({
          name: "genUserForAccessToken",
        }),
      ],
      inTypes: [
        Type.Argument.new({ name: "accessToken", type: "string" }),
      ],
      name: "genUserForAccessToken",
      outType: Type.Anonymous.new({ type: "Promise<User>" }),
    }),
  ],
  destination: "src/server/db.ts",
});
