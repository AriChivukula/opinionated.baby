import { Bespoke, Import, Module } from "typescriptase";

export const module: Module = Module.new({
  content: [
    Import.new({
      name: "jest-enzyme",
    }),
    Import.new({
      name: "mutationobserver-shim",
    }),
    Import.new({
      name: "enzyme",
      withDefaultAs: "Enzyme",
    }),
    Import.new({
      name: "enzyme-adapter-react-16",
      withDefaultAs: "Adapter",
    }),
    Import.new({
      name: "react",
      withAllAs: "React",
    }),
    Import.new({
      name: "react-relay-network-modern",
      with: ["RelayNetworkLayer", "urlMiddleware"],
    }),
    Import.new({
      name: "react-test-context-provider",
      withDefaultAs: "context",
    }),
    Import.new({
      name: "relay-runtime",
      with: ["Environment", "RecordSource", "Store"],
    }),
    Import.new({
      name: "../views/Page",
      with: ["Page"],
    }),
    Bespoke.new({
      name: "DEPRECATE",
    }),
  ],
  destination: "src/website/__tests__/page.test.tsx",
});
