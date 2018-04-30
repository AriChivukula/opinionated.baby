import { Bespoke, Function, Module } from "typescriptase";

export const module: Module = Module.new({
  content: [
    Function.new({
      async: false,
      content: [
        Bespoke.new({
          name: "makeSync<T>",
        }),
      ],
      exported: true,
      inputs: {
        wasAsync: "Promise<T>",
      },
      name: "makeSync<T>",
      output: "void",
    }),
    Function.new({
      async: true,
      content: [
        Bespoke.new({
          name: "genNullOnThrow<T>",
        }),
      ],
      exported: true,
      inputs: {
        mightThrow: "() => Promise<T>",
      },
      name: "genNullOnThrow<T>",
      output: "Promise<T | null>",
    }),
  ],
  destination: "src/server/util.ts",
});
