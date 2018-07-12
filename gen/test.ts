import {
  Bespoke,
  Module,
} from "typescriptase";

export const google: Module = Module.new({
  content: [
    Bespoke.new({
      name: "test",
    }),
  ],
  destination: "src/test/google.ts",
});

export const neptune: Module = Module.new({
  content: [
    Bespoke.new({
      name: "test",
    }),
  ],
  destination: "src/test/neptune.ts",
});
