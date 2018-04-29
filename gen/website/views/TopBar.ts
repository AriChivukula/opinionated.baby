import { Bespoke, Import, Module, Renderable } from "typescriptase";

export const module: Renderable = Module.new({
  content: [
    Bespoke.new({name: "DEPRECATE"}),
  ],
  destination: "src/website/views/TopBar.tsx",
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
      names: ["commitMutation", "createFragmentContainer", "graphql"],
    }),
    Import.new({
      module: "relay-runtime",
      nameDefault: "Relay",
    }),
    Import.new({
      module: "rmwc",
      names: ["Toolbar", "ToolbarFixedAdjust", "ToolbarIcon", "ToolbarRow", "ToolbarSection", "ToolbarTitle"],
    }),
    Import.new({
      module: "url",
      names: ["parse", "UrlWithParsedQuery"],
    }),
    Import.new({
      module: "../util",
      names: ["goto"],
    }),
    Import.new({
      module: "./__generated__/TopBarLoginMutation.graphql",
      names: ["TopBarLoginMutationResponse"],
    }),
    Import.new({
      module: "./__generated__/TopBarLogoutMutation.graphql",
      names: ["TopBarLogoutMutationResponse"],
    }),
    Import.new({
      module: "./__generated__/TopBarQuery.graphql",
      names: ["TopBarQuery"],
    }),
  ],
});
