import { Bespoke, Function, Import, Module } from "typescriptase";

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
    Function.new({
      async: false,
      content: [
        Bespoke.new({
          name: "render",
        }),
      ],
      exported: true,
      inputs: {
        apiURL: "string",
      },
      name: "render",
      output: "void",
    }),
  ],
  destination: "src/website/website.tsx",
});
