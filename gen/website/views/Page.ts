import { Bespoke, Class, Import, Interface, Method, Module, Type } from "typescriptase";

export const module: Module = Module.new({
  content: [
    Import.new({
      name: "react",
      withAllAs: "React",
    }),
    Import.new({
      name: "rmwc",
      with: ["LinearProgress"],
    }),
    Import.new({
      name: "url",
      with: ["Url"],
    }),
    Import.new({
      name: "./Content",
      with: ["Content"],
    }),
    Import.new({
      name: "./TopBar",
      with: ["TopBar"],
    }),
    Import.new({
      name: "./__generated__/TopBarQuery.graphql",
      with: ["TopBarQuery"],
    }),
    Interface.newInternal({
      name: "IProps",
      types: [
        Type.Required.new({ name: "data", type: "TopBarQuery | null" }),
      ],
    }),
    Class.newConcreteExported({
      content: [
        Method.Instance.Public.newSync({
          content: [
            Bespoke.new({
              name: "Page::render",
            }),
          ],
          inTypes: [],
          name: "render",
          outType: Type.Anonymous.new({ type: "JSX.Element" }),
        }),
      ],
      extends: "React.Component<IProps>",
      name: "Page",
    }),
  ],
  destination: "src/website/views/Page.tsx",
});
