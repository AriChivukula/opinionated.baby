import { Bespoke, Function, Import, Interface, Module, Variable } from "typescriptase";

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
    Interface.new({
      exported: false,
      name: "ITools",
      types: {
        graphic: "string",
        link: "string",
        subtitle: "string",
        title: "string",
      }
    }),
    Interface.new({
      exported: false,
      name: "IReleases",
      types: {
        titleA: "string",
        titleB: "string",
        version: "string",
      }
    }),
    Variable.new({
      assignment: "12",
      exported: false,
      mutable: false,
      name: "fullWidth",
      type: "number",
    }),
    Variable.new({
      assignment: "3",
      exported: false,
      mutable: false,
      name: "toolWidth",
      type: "number",
    }),
    Variable.new({
      assignment: "4",
      exported: false,
      mutable: false,
      name: "releaseWidth",
      type: "number",
    }),
    Bespoke.new({
      name: "DEPRECATE"
    }),
    Function.new({
      async: false,
      content: [
        Bespoke.new({
          name: "Content",
        }),
      ],
      exported: true,
      inputs: {},
      name: "Content",
      output: "JSX.Element",
    }),
  ],
  destination: "src/website/views/Content.tsx",
});
