import { Bespoke, Function, Import, Module, Renderable } from "typescriptase";

export const module: Renderable = Module.new({
  content: [
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
  imports: [
    Import.new({
      module: "express",
      nameDefault: "express",
    }),
    Import.new({
      module: "./db",
      names: ["genUserForAccessToken"],
    }),
    Import.new({
      module: "./google",
      names: ["genAccessToken", "getLoginURL"],
    }),
    Import.new({
      module: "./util",
      names: ["genNullOnThrow"],
    }),
  ],
});
