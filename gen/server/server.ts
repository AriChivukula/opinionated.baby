import { Bespoke, Import, Module } from "typescriptase";

export const module: Module = Module.new({
  content: [
    Import.new({
      name: "express",
      withAllAs: "express",
    }),
    Import.new({
      name: "express-graphql",
      withAllAs: "graphqlHTTP",
    }),
    Import.new({
      name: "fs",
      with: ["readFileSync"],
    }),
    Import.new({
      name: "graphql",
      with: ["buildSchema", "GraphQLSchema"],
    }),
    Import.new({
      name: "path",
      with: ["join"],
    }),
    Import.new({
      name: "./root",
      with: ["genRoot"],
    }),
    Bespoke.new({
      name: "servers",
    }),
  ],
  destination: "src/server/server.ts",
});
