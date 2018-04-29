import { Bespoke, Function, Import, Module, Renderable } from "typescriptase";

export const module: Renderable = Module.new({
  content: [
    Bespoke.new({name: "DEPRECATE"}),
    Function.new({
      async: false,
      content: [
        Bespoke.new({
          name: "getOAuthClient",
        }),
      ],
      exported: false,
      inputs: {},
      name: "getOAuthClient",
      output: "OAuth2Client",
    }),
    Function.new({
      async: false,
      content: [
        Bespoke.new({
          name: "getLoginURL",
        }),
      ],
      exported: true,
      inputs: {},
      name: "getLoginURL",
      output: "string",
    }),
    Function.new({
      async: true,
      content: [
        Bespoke.new({
          name: "genAccessToken",
        }),
      ],
      exported: true,
      inputs: {
        code: "string",
      },
      name: "genAccessToken",
      output: "Promise<string>",
    }),
    Function.new({
      async: true,
      content: [
        Bespoke.new({
          name: "genAccessTokenInfo",
        }),
      ],
      exported: true,
      inputs: {
        accessToken: "string",
      },
      name: "genAccessTokenInfo",
      output: "Promise<IAccessTokenInfo>",
    }),
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
