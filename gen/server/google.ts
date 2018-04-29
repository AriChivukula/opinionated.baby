import { Bespoke, Import, Module, Renderable } from "typescriptase";

export const module: Renderable = Module.new({
  content: [
    Bespoke.new({name: "DEPRECATE"}),
  ],
  destination: "src/server/google.ts",
  imports: [
    Import.new({
      module: "google-auth-library",
      names: ["OAuth2Client"],
    }),
    Import.new({
      module: "googleapis",
      names: ["google"],
    }),
  ],
});
