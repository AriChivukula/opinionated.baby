import { Bespoke, Class, Import, Interface, Method, Module, Type } from "typescriptase";

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
    Interface.newInternal({
      name: "IProps",
      types: [
        Type.Required.new({ name: "environment", type: "Environment" }),
      ],
    }),
    Class.newConcreteExported({
      content: [
        Method.Instance.Public.newSync({
          content: [
            Bespoke.new({
              name: "Root::render",
            }),
          ],
          inTypes: [],
          name: "render",
          outType: Type.Anonymous.new({ type: "JSX.Element" }),
        }),
      ],
      extends: "React.Component<IProps>",
      name: "Root",
    }),
  ],
  destination: "src/website/views/Root.tsx",
});
