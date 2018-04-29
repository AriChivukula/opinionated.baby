import { Bespoke, Import, Module, Renderable } from "typescriptase";

export const module: Renderable = Module.new({
  content: [
    Bespoke.new({name: "DEPRECATE"}),
  ],
  destination: "src/server/server.ts",
  imports: [
    Import.new({
      module: "express",
      nameDefault: "express",
    }),
    Import.new({
      module: "express-graphql",
      nameDefault: "graphqlHTTP",
    }),
    Import.new({
      module: "fs",
      names: ["readFileSync"],
    }),
    Import.new({
      module: "graphql",
      names: ["buildSchema", "GraphQLSchema"],
    }),
    Import.new({
      module: "path",
      names: ["join"],
    }),
    Import.new({
      module: "./root",
      names: ["genRoot"],
    }),
  ],
});
