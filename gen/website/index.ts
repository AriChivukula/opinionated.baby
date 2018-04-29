import { Bespoke, EVariableKind, Import, Module, Renderable, Variable } from "typescriptase";

export const module: Renderable = Module.new({
  content: [
    Variable.new({
      kind: EVariableKind.MUTABLE,
      name: "apiURL",
      type: "string",
    }),
    Bespoke.new({name: "DEPRECATE"}),
  ],
  destination: "src/website/index.tsx",
  imports: [
    Import.new({
      module: "@babel/polyfill",
    }),
    Import.new({
      module: "./website",
      names: ["render"],
    }),
  ],
});
