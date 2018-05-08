import { Bespoke, Function, Module, Type } from "typescriptase";

export const module: Module = Module.new({
  content: [
    Function.newSyncExported({
      content: [
        Bespoke.new({
          name: "makeSync<T>",
        }),
      ],
      inTypes: [
        Type.Argument.new({ name: "wasAsync", type: "Promise<T>" }),
      ],
      name: "makeSync",
      outType: Type.Anonymous.new({ type: "void" }),
      templates: ["T"],
    }),
    Function.newAsyncExported({
      content: [
        Bespoke.new({
          name: "genNullOnThrow<T>",
        }),
      ],
      inTypes: [
        Type.Argument.new({ name: "mightThrow", type: "() => Promise<T>" }),
      ],
      name: "genNullOnThrow",
      outType: Type.Anonymous.new({ type: "Promise<T | null>" }),
      templates: ["T"],
    }),
  ],
  destination: "src/server/util.ts",
});
