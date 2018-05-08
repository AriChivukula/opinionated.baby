import { Bespoke, Function, Import, Module, Type } from "typescriptase";

export const module: Module = Module.new({
  content: [
    Import.new({
      name: "express",
      withDefaultAs: "express",
    }),
    Import.new({
      name: "./db",
      with: ["genUserForAccessToken"],
    }),
    Import.new({
      name: "./google",
      with: ["genAccessToken", "getLoginURL"],
    }),
    Import.new({
      name: "./util",
      with: ["genNullOnThrow"],
    }),
    Function.newAsyncExported({
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
