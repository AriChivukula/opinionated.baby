import { Bespoke, Function, Import, Interface, Module, Type } from "typescriptase";

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
    Interface.newExported({
      name: "IAccessToken",
      types: [
        Type.Required.new({ name: "tokens", type: "{ access_token?: string | null }" }),
      ],
    }),
    Interface.newExported({
      name: "IAccessTokenInfo",
      types: [
        Type.Required.new({ name: "data", type: "{ email?: string | undefined; user_id?: string | undefined; verified_email?: boolean | undefined }" }),
      ],
    }),
    Function.Sync.newInternal({
      content: [
        Bespoke.new({
          name: "getOAuthClient",
        }),
      ],
      inTypes: [],
      name: "getOAuthClient",
      outType: Type.Anonymous.new({ type: "OAuth2Client" }),
    }),
    Function.Sync.newExported({
      content: [
        Bespoke.new({
          name: "getLoginURL",
        }),
      ],
      inTypes: [],
      name: "getLoginURL",
      outType: Type.Anonymous.new({ type: "string" }),
    }),
    Function.Async.newExported({
      content: [
        Bespoke.new({
          name: "genAccessToken",
        }),
      ],
      inTypes: [
        Type.Argument.new({ name: "code", type: "string" }),
      ],
      name: "genAccessToken",
      outType: Type.Anonymous.new({ type: "Promise<string>" }),
    }),
    Function.Async.newExported({
      content: [
        Bespoke.new({
          name: "genAccessTokenInfo",
        }),
      ],
      inTypes: [
        Type.Argument.new({ name: "accessToken", type: "string" }),
      ],
      name: "genAccessTokenInfo",
      outType: Type.Anonymous.new({ type: "Promise<IAccessTokenInfo>" }),
    }),
  ],
  destination: "src/server/google.ts",
});
