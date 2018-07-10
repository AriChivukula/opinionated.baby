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
  destination: "src/server/test/google.test.ts",
});
