import { Bespoke, Import, Module, Renderable } from "typescriptase";

export const module: Renderable = Module.new({
  content: [
    Bespoke.new({name: "DEPRECATE"}),
  ],
  destination: "src/server/entity/User.ts",
  imports: [
    Import.new({
      module: "typeorm",
      names: ["Column", "Entity", "PrimaryColumn"],
    }),
  ],
});
