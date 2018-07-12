import { Bespoke, ERelayType, Function, Import, Module, React, Type, Variable } from "typescriptase";

export const Index: Module = Module.new({
  content: [
    Import.new({
      name: "@babel/polyfill",
    }),
    Import.new({
      name: "./website",
      with: ["render"],
    }),
    Variable.newMutable({
      type: Type.Required.new({ name: "apiURL", type: "string" }),
    }),
    Bespoke.new({
      name: "main",
    }),
  ],
  destination: "src/website/index.tsx",
});

export const Util: Module = Module.new({
  content: [
    Function.Sync.newExported({
      content: [
        Bespoke.new({
          name: "goto",
        }),
      ],
      inTypes: [
        Type.Argument.new({ name: "url", type: "string" }),
        Type.Argument.new({ default: "false", name: "samePage", type: "boolean" }),
      ],
      name: "goto",
      outType: Type.Anonymous.new({ type: "void" }),
    }),
  ],
  destination: "src/website/util.tsx",
});

export const Content: Module = React({
  destination: "src/website/views/Content.tsx",
  name: "Content",
});

export const FourOhFour: Module = React({
  destination: "src/website/views/FourOhFour.tsx",
  name: "FourOhFour",
});

export const Page: Module = React({
  destination: "src/website/views/Page.tsx",
  name: "Page",
  props: [
    Type.Required.new({
      name: "data",
      types: ["TopBarQuery", "null"],
    }),
  ],
});

export const Root: Module = React({
  destination: "src/website/views/Root.tsx",
  name: "Root",
  props: [
    Type.Required.new({
      name: "environment",
      type: "Environment",
    }),
  ],
});

export const TopBar: Module = React({
  destination: "src/website/views/TopBar.tsx",
  name: "TopBar",
  props: [
    Type.Required.new({
      name: "data",
      type: "TopBarQuery",
    }),
  ],
  relayMutation: true,
  relayType: ERelayType.FRAGMENT,
});
