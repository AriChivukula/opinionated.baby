import {
  Bespoke,
  Module,
} from "typescriptase";

export const googleTest: Module = Module.new({
  content: [
    Bespoke.new({
      name: "test",
    }),
  ],
  destination: "src/server/__tests__/google.test.ts",
});
