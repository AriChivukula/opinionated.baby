import { Bespoke, Function, Import, Module, Type } from "typescriptase";

export const module: Module = Module.new({
  content: [
    Import.new({
      name: "react",
      withAllAs: "React",
    }),
    Import.new({
      name: "react-router-dom",
      with: ["Link"],
    }),
    Import.new({
      name: "rmwc",
      with: ["Typography"],
    }),
    Function.newSyncExported({
      content: [
        Bespoke.new({
          name: "FourOhFour",
        }),
      ],
      inTypes: [],
      name: "FourOhFour",
      outType: Type.Anonymous.new({ type: "JSX.Element" }),
    }),
  ],
  destination: "src/website/views/FourOhFour.tsx",
});
