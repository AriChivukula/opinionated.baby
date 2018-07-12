import { Bespoke, Import, Module } from "typescriptase";

export const Server: Module = Module.new({
  content: [
    Import.new({
      name: "express",
      withDefaultAs: "express",
    }),
    Import.new({
      name: "express-graphql",
      withDefaultAs: "graphqlHTTP",
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
