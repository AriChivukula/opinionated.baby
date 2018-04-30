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
      with: ["parse", "UrlWithParsedQuery"],
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
    Bespoke.new({
      name: "DEPRECATE",
    }),
  ],
  destination: "src/website/views/TopBar.tsx",
});
