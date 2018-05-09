import {
  Jest,
  Module,
} from "typescriptase";

export const fourohfourTest: Module = Jest(
  "src/website/__tests__/fourohfour.test.tsx",
  [
    "FourOhFour",
  ],
);

export const pageTest: Module = Jest(
  "src/website/__tests__/page.test.tsx",
  [
    "PageUnloaded",
    "PageLoggedOut",
    "PageLoggedIn",
  ],
);
