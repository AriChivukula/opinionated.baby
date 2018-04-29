import { Bespoke, Import, Module, Renderable } from "typescriptase";

export const module: Renderable = Module.new({
  content: [
    Bespoke.new({name: "DEPRECATE"}),
  ],
  destination: "src/website/views/Page.tsx",
  imports: [
    Import.new({
      module: "react",
      nameAll: "React",
    }),
    Import.new({
      module: "rmwc",
      names: ["LinearProgress"],
    }),
    Import.new({
      module: "url",
      names: ["parse", "UrlWithParsedQuery"],
    }),
    Import.new({
      module: "./Content",
      names: ["Content"],
    }),
    Import.new({
      module: "./TopBar",
      names: ["TopBar"],
    }),
    Import.new({
      module: "./__generated__/TopBarQuery.graphql",
      names: ["TopBarQuery"],
    }),
  ],
});
