import { Bespoke, Function, Import, Module, Type, Variable } from "typescriptase";

export const index: Module = Module.new({
  content: [
    Import.new({
      name: "@babel/polyfill",
    }),
    Import.new({
      name: "./website",
      with: ["render"],
    }),
    Variable.newMutable({
      type: Type.Required.new({ name: "apiURL", type: "string" }),
    }),
    Bespoke.new({
      name: "main",
    }),
  ],
  destination: "src/website/index.tsx",
});

export const util: Module = Module.new({
  content: [
    Function.Sync.newExported({
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
