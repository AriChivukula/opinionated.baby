import { Bespoke, Import, Interface, Module } from "typescriptase";

export const module: Module = Module.new({
  content: [
    Import.new({
      name: "js-cookie",
      withAllAs: "cookie",
    }),
    Import.new({
      name: "react",
      withAllAs: "React",
    }),
    Import.new({
      name: "react-relay",
      with: ["graphql", "QueryRenderer"],
    }),
    Import.new({
      name: "relay-runtime",
      with: ["Environment"],
    }),
    Import.new({
      name: "./Page",
      with: ["Page"],
    }),
    Import.new({
      name: "./__generated__/TopBarQuery.graphql",
      with: ["TopBarQuery"],
    }),
    Interface.new({
      exported: false,
      name: "IProps",
      types: {
        environment: "Environment",
      }
    }),
    Bespoke.new({
      name: "DEPRECATE",
    }),
  ],
  destination: "src/website/views/Root.tsx",
});
