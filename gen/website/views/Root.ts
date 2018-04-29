import { Bespoke, Import, Interface, Module, Renderable } from "typescriptase";

export const module: Renderable = Module.new({
  content: [
    Interface.new({
      exported: false,
      name: "IProps",
      types: {
        environment: "Environment",
      }
    }),
    Bespoke.new({name: "DEPRECATE"}),
  ],
  destination: "src/website/views/Root.tsx",
  imports: [
    Import.new({
      module: "js-cookie",
      nameAll: "cookie",
    }),
    Import.new({
      module: "react",
      nameAll: "React",
    }),
    Import.new({
      module: "react-relay",
      names: ["graphql", "QueryRenderer"],
    }),
    Import.new({
      module: "relay-runtime",
      names: ["Environment"],
    }),
    Import.new({
      module: "./Page",
      names: ["Page"],
    }),
    Import.new({
      module: "./__generated__/TopBarQuery.graphql",
      names: ["TopBarQuery"],
    }),
  ],
});
