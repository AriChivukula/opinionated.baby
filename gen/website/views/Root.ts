import { Bespoke, Class, EMethodKind, Import, Interface, Method, Module } from "typescriptase";

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
    Class.new({
      abstract: false,
      content: [
        Method.new({
          async: false,
          content: [
            Bespoke.new({
              name: "Root::render",
            }),
          ],
          inputs: {},
          kind: EMethodKind.PUBLIC,
          name: "render",
          output: "JSX.Element",
          static: false,
        }),
      ],
      exported: true,
      extends: "React.Component<IProps>",
      name: "Root",
    }),
  ],
  destination: "src/website/views/Root.tsx",
});
