import { Bespoke, Function, Module } from "typescriptase";

export const module: Module = Module.new({
  content: [
    Function.new({
      async: false,
      content: [
        Bespoke.new({
          name: "isElectron",
        }),
      ],
      exported: true,
      inputs: {},
      name: "isElectron",
      output: "boolean",
    }),
    Function.new({
      async: false,
      content: [
        Bespoke.new({
          name: "goto",
        }),
      ],
      exported: true,
      inputs: {
        url: "string",
        samePage: "boolean = false",
      },
      name: "goto",
      output: "void",
    }),
  ],
  destination: "src/website/util.tsx",
});
