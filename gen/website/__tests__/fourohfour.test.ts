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
      name: "react-router-dom",
      with: ["BrowserRouter"],
    }),
    Import.new({
      name: "../views/FourOhFour",
      with: ["FourOhFour"],
    }),
    Bespoke.new({
      name: "DEPRECATE",
    }),
  ],
  destination: "src/website/__tests__/fourohfour.test.tsx",
});
