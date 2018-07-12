import { Bespoke, Function, Import, Interface, Module, Type, Variable } from "typescriptase";

export const Server: Module = Module.new({
  content: [
    Import.new({
      name: "express",
      withDefaultAs: "express",
    }),
    Import.new({
      name: "express-graphql",
      withDefaultAs: "graphqlHTTP",
    }),
    Import.new({
      name: "fs",
      with: ["readFileSync"],
    }),
    Import.new({
      name: "graphql",
      with: ["buildSchema", "GraphQLSchema"],
    }),
    Import.new({
      name: "path",
      with: ["join"],
    }),
    Import.new({
      name: "./root",
      with: ["genRoot"],
    }),
    Bespoke.new({
      name: "servers",
    }),
  ],
  destination: "src/server/server.ts",
});

export const Google: Module = Module.new({
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
    Function.Async.newExported({
      content: [
        Bespoke.new({
          name: "genUserForAccessToken",
        }),
      ],
      inTypes: [
        Type.Argument.new({ name: "accessToken", type: "string" }),
      ],
      name: "genUserForAccessToken",
      outType: Type.Anonymous.new({ type: "Promise<object>" }),
    }),
  ],
  destination: "src/server/google.ts",
});

export const Index: Module = Module.new({
  content: [
    Import.new({
      name: "@babel/polyfill",
    }),
    Import.new({
      name: "aws-serverless-express",
      withAllAs: "lambda",
    }),
    Import.new({
      name: "rollbar",
      withAllAs: "Rollbar",
    }),
    Import.new({
      name: "body-parser",
      with: ["json", "urlencoded"],
    }),
    Import.new({
      name: "cors",
      withDefaultAs: "cors",
    }),
    Import.new({
      name: "express",
      withDefaultAs: "express",
    }),
     Import.new({
      name: "express-bearer-token",
      withDefaultAs: "bearer",
    }),
    Import.new({
      name: "helmet",
      withDefaultAs: "helmet",
    }),
    Import.new({
      name: "./server",
      with: ["graphQL"],
    }),
    Variable.newImmutable({
      assignment: "express()",
      type: Type.Required.new({ name: "app", type: "express.Express" }),
    }),
    Variable.newMutable({
      assignment: "false",
      type: Type.Required.new({ name: "didSetup", type: "boolean" }),
    }),
    Bespoke.new({
      name: "main",
    }),
    Function.Sync.newExported({
      content: [
        Bespoke.new({
          name: "handler",
        }),
      ],
      inTypes: [
        Type.Argument.new({ name: "event", type: "object" }),
        Type.Argument.new({ name: "context", type: "object" }),
      ],
      name: "handler",
      outType: Type.Anonymous.new({ type: "void" }),
    }),
  ],
  destination: "src/server/index.ts",
});

export const Neptune: Module = Module.new({
  content: [
    Bespoke.new({
      name: "neptune",
    }),
  ],
  destination: "src/server/neptune.ts",
});

export const Root: Module = Module.new({
  content: [
    Import.new({
      name: "express",
      withAllAs: "express",
    }),
    Import.new({
      name: "./google",
      with: ["genAccessToken", "getLoginURL", "genUserForAccessToken"],
    }),
    Import.new({
      name: "./util",
      with: ["genNullOnThrow"],
    }),
    Function.Async.newExported({
      content: [
        Bespoke.new({
          name: "genRoot",
        }),
      ],
      inTypes: [
        Type.Argument.new({ name: "req", type: "express.Request" }),
        Type.Argument.new({ name: "res", type: "express.Response" }),
      ],
      name: "genRoot",
      outType: Type.Anonymous.new({ type: "Promise<object>" }),
    }),
  ],
  destination: "src/server/root.ts",
});
