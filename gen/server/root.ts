import { Bespoke, Function, Import, Module, Type } from "typescriptase";

export const module: Module = Module.new({
  content: [
    Import.new({
      name: "express",
      withAllAs: "express",
    }),
    Import.new({
      name: "./google",
      with: ["genAccessToken", "getLoginURL", "genUserForAccessToken"],
    }),
    Import.new({
      name: "./util",
      with: ["genNullOnThrow"],
    }),
    Function.Async.newExported({
      content: [
        Bespoke.new({
          name: "genRoot",
        }),
      ],
      inTypes: [
        Type.Argument.new({ name: "req", type: "express.Request" }),
        Type.Argument.new({ name: "res", type: "express.Response" }),
      ],
      name: "genRoot",
      outType: Type.Anonymous.new({ type: "Promise<object>" }),
    }),
  ],
  destination: "src/server/root.ts",
});
