import { Bespoke, Class, Import, Interface, Method, Module } from "typescriptase";

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
      with: ["commitMutation", "createFragmentContainer", "graphql"],
    }),
    Import.new({
      name: "relay-runtime",
      withDefaultAs: "Relay",
    }),
    Import.new({
      name: "rmwc",
      with: ["Toolbar", "ToolbarFixedAdjust", "ToolbarIcon", "ToolbarRow", "ToolbarSection", "ToolbarTitle"],
    }),
    Import.new({
      name: "url",
      with: ["Url"],
    }),
    Import.new({
      name: "../util",
      with: ["goto"],
    }),
    Import.new({
      name: "./__generated__/TopBarLoginMutation.graphql",
      with: ["TopBarLoginMutationResponse"],
    }),
    Import.new({
      name: "./__generated__/TopBarLogoutMutation.graphql",
      with: ["TopBarLogoutMutationResponse"],
    }),
    Import.new({
      name: "./__generated__/TopBarQuery.graphql",
      with: ["TopBarQuery"],
    }),
    Interface.new({
      exported: false,
      name: "IProps",
      types: {
        data: "TopBarQuery",
        relay: "Relay",
      }
    }),
    Class.new({
      abstract: false,
      content: [
        Method.new({
          async: false,
          content: [
            Bespoke.new({
              name: "TopBar::render",
            }),
          ],
          inputs: {},
          kind: EMethodKind.PUBLIC,
          name: "render",
          output: "JSX.Element",
          static: false,
        }),
        Method.new({
          async: false,
          content: [
            Bespoke.new({
              name: "TopBar::googleAuth",
            }),
          ],
          inputs: {},
          kind: EMethodKind.PRIVATE,
          name: "googleAuth",
          output: "void",
          static: false,
        }),
        Method.new({
          async: false,
          content: [
            Bespoke.new({
              name: "TopBar::login",
            }),
          ],
          inputs: {
            code: "string",
          },
          kind: EMethodKind.PRIVATE,
          name: "login",
          output: "void",
          static: false,
        }),
        Method.new({
          async: false,
          content: [
            Bespoke.new({
              name: "TopBar::logout",
            }),
          ],
          inputs: {},
          kind: EMethodKind.PRIVATE,
          name: "logout",
          output: "void",
          static: false,
        }),
      ],
      exported: false,
      extends: "React.Component<IProps>",
      name: "TopBarRelay",
    }),
    Bespoke.new({
      name: "DEPRECATE",
    }),
  ],
  destination: "src/website/views/TopBar.tsx",
});
