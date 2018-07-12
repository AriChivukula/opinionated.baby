import { Bespoke, Import, Module, Type, Variable } from "typescriptase";

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
