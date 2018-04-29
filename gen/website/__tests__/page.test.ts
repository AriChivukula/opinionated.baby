import { Bespoke, Import, Module, Renderable } from "typescriptase";

export const module: Renderable = Module.new({
  content: [
    Bespoke.new({name: "DEPRECATE"}),
  ],
  destination: "src/website/__tests__/page.test.tsx",
  imports: [
    Import.new({
      module: "jest-enzyme",
    }),
    Import.new({
      module: "mutationobserver-shim",
    }),
    Import.new({
      module: "enzyme",
      nameDefault: "Enzyme",
    }),
    Import.new({
      module: "enzyme-adapter-react-16",
      nameDefault: "Adapter",
    }),
    Import.new({
      module: "react",
      nameAll: "React",
    }),
    Import.new({
      module: "react-relay-network-modern",
      names: ["RelayNetworkLayer", "urlMiddleware"],
    }),
    Import.new({
      module: "react-test-context-provider",
      nameDefault: "context",
    }),
    Import.new({
      module: "relay-runtime",
      names: ["Environment", "RecordSource", "Store"],
    }),
    Import.new({
      module: "../views/Page",
      names: ["Page"],
    }),
  ],
});
