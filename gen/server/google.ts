import { Bespoke, Function, Import, Interface, Module } from "typescriptase";

export const module: Module = Module.new({
  content: [
    Import.new({
      name: "google-auth-library",
      with: ["OAuth2Client"],
    }),
    Import.new({
      name: "googleapis",
      with: ["google"],
    }),
    Interface.new({
      exported: false,
      name: "IAccessToken",
      types: {
        tokens: "{ access_token?: string | null }",
      },
    }),
    Interface.new({
      exported: false,
      name: "IAccessTokenInfo",
      types: {
        data: "{ email: string; user_id: string; verified_email: boolean }",
      },
    }),
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
});
