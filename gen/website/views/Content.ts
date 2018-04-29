import { Bespoke, EVariableKind, Function, Import, Interface, Module, Renderable, Variable } from "typescriptase";

export const module: Renderable = Module.new({
  content: [
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
      kind: EVariableKind.IMMUTABLE,
      name: "fullWidth",
      type: "number",
    }),
    Variable.new({
      assignment: "3",
      kind: EVariableKind.IMMUTABLE,
      name: "toolWidth",
      type: "number",
    }),
    Variable.new({
      assignment: "4",
      kind: EVariableKind.IMMUTABLE,
      name: "releaseWidth",
      type: "number",
    }),
    Bespoke.new({ name: "DEPRECATE" }),
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
