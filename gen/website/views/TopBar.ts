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
    Interface.newInternal({
      name: "IProps",
      types: [
        Type.Required.new({ name: "data", type: "TopBarQuery" }),
        Type.Required.new({ name: "relay", type: "Relay" }),
      ],
    }),
    Class.newConcreteInternal({
      content: [
        Method.Instance.Public.newSync({
          content: [
            Bespoke.new({
              name: "TopBar::render",
            }),
          ],
          inTypes: [],
          name: "render",
          outType: Type.Anonymous.new({ type: "JSX.Element" }),
        }),
        Method.Instance.Private.newSync({
          content: [
            Bespoke.new({
              name: "TopBar::googleAuth",
            }),
          ],
          inTypes: [],
          name: "googleAuth",
          outType: Type.Anonymous.new({ type: "void" }),
        }),
        Method.Instance.Private.newSync({
          content: [
            Bespoke.new({
              name: "TopBar::login",
            }),
          ],
          inTypes: [
            Type.Argument.new({ name: "code", type: "string" }),
          ],
          name: "login",
          outType: Type.Anonymous.new({ type: "void" }),
        }),
        Method.Instance.Private.newSync({
          content: [
            Bespoke.new({
              name: "TopBar::logout",
            }),
          ],
          inTypes: [],
          name: "logout",
          outType: Type.Anonymous.new({ type: "void" }),
        }),
      ],
      extends: "React.Component<IProps>",
      name: "TopBarRelay",
    }),
    Bespoke.new({
      name: "DEPRECATE",
    }),
  ],
  destination: "src/website/views/TopBar.tsx",
});
