import { Bespoke, Import, Module, Renderable } from "typescriptase";

export const module: Renderable = Module.new({
  content: [
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
