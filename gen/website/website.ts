import { Bespoke, Import, Module, Renderable } from "typescriptase";

export const module: Renderable = Module.new({
  content: [
    Bespoke.new({name: "DEPRECATE"}),
  ],
  destination: "src/website/website.tsx",
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
      module: "react-dom",
      nameAll: "ReactDOM",
    }),
    Import.new({
      module: "react-relay-network-modern",
      names: ["authMiddleware", "RelayNetworkLayer", "urlMiddleware"],
    }),
    Import.new({
      module: "react-router-dom",
      names: ["BrowserRouter", "Route", "Switch"],
    }),
    Import.new({
      module: "relay-runtime",
      names: ["Environment", "RecordSource", "Store"],
    }),
    Import.new({
      module: "./views/FourOhFour",
      names: ["FourOhFour"],
    }),
    Import.new({
      module: "./views/Root",
      names: ["Root"],
    }),
  ],
});
