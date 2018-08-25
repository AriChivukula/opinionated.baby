import { Bespoke, ERelayType, Module, React, Type } from "typescriptase";

export const index: Module = Module.new({
  content: [
    Bespoke.new({
      name: "custom",
    }),
  ],
  destination: "src/website/index.tsx",
});

export const utility: Module = Module.new({
  content: [
    Bespoke.new({
      name: "custom",
    }),
  ],
  destination: "src/website/utility.tsx",
});

export const Content: Module = React({
  destination: "src/website/views/Content.tsx",
  name: "Content",
  props: [],
  relayType: ERelayType.FRAGMENT,
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
      types: ["TopBarQuery", "ContentQuery", "null"],
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
  props: [],
  relayMutation: true,
  relayType: ERelayType.FRAGMENT,
});

export const website: Module = Module.new({
  content: [
    Bespoke.new({
      name: "custom",
    }),
  ],
  destination: "src/website/website.tsx",
});
