import {
  Bespoke,
  Module,
} from "typescriptase";

export const Google: Module = Module.new({
  content: [
    Bespoke.new({
      name: "test",
    }),
  ],
  destination: "src/test/google.ts",
});

export const Neptune: Module = Module.new({
  content: [
    Bespoke.new({
      name: "test",
    }),
  ],
  destination: "src/test/neptune.ts",
});
