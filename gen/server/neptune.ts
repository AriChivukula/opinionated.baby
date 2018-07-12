import { Bespoke, Module } from "typescriptase";

export const module: Module = Module.new({
  content: [
    Bespoke.new({
      name: "neptune",
    }),
  ],
  destination: "src/server/neptune.ts",
});
