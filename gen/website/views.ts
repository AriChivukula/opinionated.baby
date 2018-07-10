import {
  ERelayType,
  Module,
  React,
  Type,
} from "typescriptase";

export const ContentReact: Module = React({
  destination: "src/website/views/Content.tsx",
  name: "Content",
});

export const FourOhFourReact: Module = React({
  destination: "src/website/views/FourOhFour.tsx",
  name: "FourOhFour",
});

export const PageReact: Module = React({
  destination: "src/website/views/Page.tsx",
  name: "Page",
  props: [
    Type.Required.new({
      name: "data",
      types: ["TopBarQuery", "null"],
    }),
  ],
});

export const RootReact: Module = React({
  destination: "src/website/views/Root.tsx",
  name: "Root",
  props: [
    Type.Required.new({
      name: "environment",
      type: "Environment",
    }),
  ],
});

export const TopBarReact: Module = React({
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
