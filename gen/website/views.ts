import {
  Module,
  React,
  Type,
} from "typescriptase";

export const ContentReact: Module = React(
  "src/website/views/Content.tsx",
  "Content",
);

export const FourOhFourReact: Module = React(
  "src/website/views/FourOhFour.tsx",
  "FourOhFour",
);

export const PageReact: Module = React(
  "src/website/views/Page.tsx",
  "Page",
  [
    Type.Required.new({
      name: "data",
      types: ["TopBarQuery", "null"],
    }),
  ],
);

export const RootReact: Module = React(
  "src/website/views/Root.tsx",
  "Root",
  [
    Type.Required.new({
      name: "environment",
      type: "Environment",
    }),
  ],
);
