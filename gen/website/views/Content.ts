import { Bespoke, Function, Import, Interface, Module, Variable, Type } from "typescriptase";

export const module: Module = Module.new({
  content: [
    Import.new({
      name: "react",
      withAllAs: "React",
    }),
    Import.new({
      name: "rmwc",
      with: ["Card", "CardMedia", "CardPrimaryAction", "Grid", "GridCell", "List", "SimpleListItem", "Typography"],
    }),
    Import.new({
      name: "../util",
      with: ["goto"],
    }),
    Interface.newInternal({
      name: "ITools",
      types: [
        Type.Required.new({ name: "graphic", type: "string" }),
        Type.Required.new({ name: "link", type: "string" }),
        Type.Required.new({ name: "subtitle", type: "string" }),
        Type.Required.new({ name: "title", type: "string" }),
      ],
    }),
    Interface.newInternal({
      name: "IReleases",
      types: [
        Type.Required.new({ name: "titleA", type: "string" }),
        Type.Required.new({ name: "titleB", type: "string" }),
        Type.Required.new({ name: "version", type: "string" }),
      ],
    }),
    Bespoke.new({
      name: "DEPRECATE"
    }),
    Function.newSyncExported({
      content: [
        Bespoke.new({
          name: "Content",
        }),
      ],
      inTypes: [],
      name: "Content",
      outType: Type.Anonymous.new({ type: "JSX.Element" }),
    }),
  ],
  destination: "src/website/views/Content.tsx",
});
