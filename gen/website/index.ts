import { Bespoke, Import, Module, Variable } from "typescriptase";

export const module: Module = Module.new({
  content: [
    Import.new({
      name: "@babel/polyfill",
    }),
    Import.new({
      name: "./website",
      with: ["render"],
    }),
    Variable.new({
      exported: false,
      mutable: true,
      name: "apiURL",
      type: "string",
    }),
    Bespoke.new({
      name: "DEPRECATE",
    }),
  ],
  destination: "src/website/index.tsx",
});
