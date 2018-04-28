import { Bespoke, Import, Module, Renderable } from "typescriptase";

export const module: Renderable = Module.new({
  content: [
    Bespoke.new({name: "DEPRECATE"}),
  ],
  destination: "src/application/index.ts",
  imports: [
    Import.new({
      module: "@babel/polyfill",
    }),
    Import.new({
      module: "electron",
      names: ["app", "BrowserWindow"],
    }),
  ],
});
