import {
  Jest,
  Module,
} from "typescriptase";

export const fourohfourTest: Module = Jest({
  destination: "src/website/__tests__/fourohfour.test.tsx",
  tests: [
    "FourOhFour",
  ],
});

export const pageTest: Module = Jest({
  destination: "src/website/__tests__/page.test.tsx",
  tests: [
    "PageUnloaded",
    "PageLoggedOut",
    "PageLoggedIn",
  ],
});
