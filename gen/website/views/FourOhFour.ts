import { Bespoke, Import, Module, Renderable } from "typescriptase";

export const module: Renderable = Module.new({
  content: [
    Bespoke.new({name: "DEPRECATE"}),
  ],
  destination: "src/website/views/FourOhFour.tsx",
  imports: [
    Import.new({
      module: "react",
      nameAll: "React",
    }),
    Import.new({
      module: "react-router-dom",
      names: ["Link"],
    }),
    Import.new({
      module: "rmwc",
      names: ["Typography"],
    }),
  ],
});
