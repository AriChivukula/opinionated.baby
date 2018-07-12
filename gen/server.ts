import { Bespoke, Module } from "typescriptase";

export const server: Module = Module.new({
  content: [
    Bespoke.new({
      name: "custom",
    }),
  ],
  destination: "src/server/server.ts",
});

export const google: Module = Module.new({
  content: [
    Bespoke.new({
      name: "custom",
    }),
  ],
  destination: "src/server/google.ts",
});

export const index: Module = Module.new({
  content: [
    Bespoke.new({
      name: "custom",
    }),
  ],
  destination: "src/server/index.ts",
});

export const root: Module = Module.new({
  content: [
    Bespoke.new({
      name: "custom",
    }),
  ],
  destination: "src/server/root.ts",
});

export const utility: Module = Module.new({
  content: [
    Bespoke.new({
      name: "custom",
    }),
  ],
  destination: "src/server/utility.ts",
});
