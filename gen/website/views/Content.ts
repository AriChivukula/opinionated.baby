import { Bespoke, Import, Module, Renderable } from "typescriptase";

export const module: Renderable = Module.new({
  content: [
    Bespoke.new({name: "DEPRECATE"}),
  ],
  destination: "src/website/views/Content.tsx",
  imports: [
    Import.new({
      module: "react",
      nameAll: "React",
    }),
    Import.new({
      module: "rmwc",
      names: ["Card", "CardMedia", "CardPrimaryAction", "Grid", "GridCell", "List", "SimpleListItem", "Typography"],
    }),
    Import.new({
      module: "../util",
      names: ["goto"],
    }),
  ],
});
