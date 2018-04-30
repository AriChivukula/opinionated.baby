import { Bespoke, Function, Import, Module } from "typescriptase";

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
    Function.new({
      async: true,
      content: [
        Bespoke.new({
          name: "genRoot",
        }),
      ],
      exported: true,
      inputs: {
        req: "express.Request",
        res: "express.Response",
      },
      name: "genRoot",
      output: "Promise<object>",
    }),
  ],
  destination: "src/server/root.ts",
});
