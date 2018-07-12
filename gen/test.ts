import {
  Bespoke,
  Module,
} from "typescriptase";

export const google: Module = Module.new({
  content: [
    Bespoke.new({
      name: "custom",
    }),
  ],
  destination: "src/test/google.ts",
});
