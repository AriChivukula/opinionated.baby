import { Bespoke, Function, Import, Module } from "typescriptase";

export const module: Module = Module.new({
  content: [
    Import.new({
      name: "react",
      withAllAs: "React",
    }),
    Import.new({
      name: "react-router-dom",
      with: ["Link"],
    }),
    Import.new({
      name: "rmwc",
      with: ["Typography"],
    }),
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
});
