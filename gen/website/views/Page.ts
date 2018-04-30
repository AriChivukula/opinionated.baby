import { Bespoke, Import, Interface, Module } from "typescriptase";

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
      with: ["parse", "UrlWithParsedQuery"],
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
    Bespoke.new({
      name: "DEPRECATE",
    }),
  ],
  destination: "src/website/views/Page.tsx",
});
