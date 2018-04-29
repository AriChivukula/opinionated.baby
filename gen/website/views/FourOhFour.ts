import { Bespoke, Function, Import, Module, Renderable } from "typescriptase";

export const module: Renderable = Module.new({
  content: [
    Function.new({
      async: false,
      content: [
        Bespoke.new({
          name: "FourOhFour",
        }),
      ],
      exported: true,
      inputs: {},
      name: "FourOhFour",
      output: "JSX.Element",
    }),
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
