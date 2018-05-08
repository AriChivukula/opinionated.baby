import { Bespoke, Function, Import, Module, Type } from "typescriptase";

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
      name: "react-dom",
      withAllAs: "ReactDOM",
    }),
    Import.new({
      name: "react-relay-network-modern",
      with: ["authMiddleware", "RelayNetworkLayer", "urlMiddleware"],
    }),
    Import.new({
      name: "react-router-dom",
      with: ["BrowserRouter", "Route", "Switch"],
    }),
    Import.new({
      name: "relay-runtime",
      with: ["Environment", "RecordSource", "Store"],
    }),
    Import.new({
      name: "./views/FourOhFour",
      with: ["FourOhFour"],
    }),
    Import.new({
      name: "./views/Root",
      with: ["Root"],
    }),
    Function.newSyncExported({
      content: [
        Bespoke.new({
          name: "render",
        }),
      ],
      inTypes: [
        Type.Argument.new({ name: "apiURL", type: "string" }),
      ],
      name: "render",
      outType: Type.Anonymous.new({ type: "void" }),
    }),
  ],
  destination: "src/website/website.tsx",
});
