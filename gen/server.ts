import { Bespoke, Function, Import, Interface, Module, Type, Variable } from "typescriptase";

export const server: Module = Module.new({
  content: [
    Bespoke.new({
      name: "server",
    }),
  ],
  destination: "src/server/server.ts",
});

export const google: Module = Module.new({
  content: [
    Bespoke.new({
      name: "google",
    }),
  ],
  destination: "src/server/google.ts",
});

export const index: Module = Module.new({
  content: [
    Bespoke.new({
      name: "index",
    }),
  ],
  destination: "src/server/index.ts",
});

export const root: Module = Module.new({
  content: [
    Bespoke.new({
      name: "root",
    }),
  ],
  destination: "src/server/root.ts",
});

export const utility: Module = Module.new({
  content: [
    Bespoke.new({
      name: "utility",
    }),
  ],
  destination: "src/server/utility.ts",
});
