import { Bespoke, Function, Module, Type } from "typescriptase";

export const module: Module = Module.new({
  content: [
    Function.newSyncExported({
      content: [
        Bespoke.new({
          name: "isElectron",
        }),
      ],
      inTypes: [],
      name: "isElectron",
      outType: Type.Anonymous.new({ type: "boolean"}),
    }),
    Function.newSyncExported({
      content: [
        Bespoke.new({
          name: "goto",
        }),
      ],
      inTypes: [
        Type.Argument.new({ name: "url", type: "string" }),
        Type.Argument.new({ default: "false", name: "samePage", type: "boolean" }),
      ],
      name: "goto",
      outType: Type.Anonymous.new({ type: "void" }),
    }),
  ],
  destination: "src/website/util.tsx",
});
