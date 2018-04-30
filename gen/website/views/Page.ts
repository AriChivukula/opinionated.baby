import { Bespoke, Class, EMethodKind, Import, Interface, Method, Module } from "typescriptase";

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
    Interface.new({
      exported: false,
      name: "IProps",
      types: {
        data: "TopBarQuery | null",
      }
    }),
    Class.new({
      abstract: false,
      content: [
        Method.new({
          async: false,
          content: [
            Bespoke.new({
              name: "Page::render",
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
      name: "Page",
    }),
  ],
  destination: "src/website/views/Page.tsx",
});
