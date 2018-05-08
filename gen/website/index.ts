import { Bespoke, Import, Module, Variable, Type } from "typescriptase";

export const module: Module = Module.new({
  content: [
    Import.new({
      name: "@babel/polyfill",
    }),
    Import.new({
      name: "./website",
      with: ["render"],
    }),
    Variable.newMutable({
      type: Type.Named.newRequired({ name: "apiURL", type: "string" }),
    }),
    Bespoke.new({
      name: "DEPRECATE",
    }),
  ],
  destination: "src/website/index.tsx",
});
