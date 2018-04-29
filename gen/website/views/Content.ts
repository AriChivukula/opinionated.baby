import { Bespoke, EVariableKind, Function, Import, Module, Renderable, Variable } from "typescriptase";

export const module: Renderable = Module.new({
  content: [
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
