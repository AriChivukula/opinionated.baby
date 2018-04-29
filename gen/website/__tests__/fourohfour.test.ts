import { Bespoke, Import, Module, Renderable } from "typescriptase";

export const module: Renderable = Module.new({
  content: [
    Bespoke.new({name: "DEPRECATE"}),
  ],
  destination: "src/website/__tests__/fourohfour.test.tsx",
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
      module: "react-router-dom",
      names: ["BrowserRouter"],
    }),
    Import.new({
      module: "../views/FourOhFour",
      names: ["FourOhFour"],
    }),
  ],
});
