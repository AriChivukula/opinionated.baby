/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website/index.ts::module>>
 * BESPOKE<<DEPRECATE>>
 * SIGNED<<zA4ZnncSA/pBEq5+FqErx8OfbjD9i36SAqXMmnXns6fQPbPz57HziS2LvJ+A6F0PYrf82MieNQsk61myghzyyQ==>>
 */

import "@babel/polyfill";

import { render } from "./website";

/* BESPOKE START <<DEPRECATE>> */
let apiURL: string;

if (window.location.hostname === "opinionated.baby") {
  apiURL = "https://api.opinionated.baby/graphql/opinionatedbaby/";
} else if (window.location.hostname === "beta.opinionated.baby") {
  apiURL = "https://api-beta.opinionated.baby/graphql/betaopinionatedbaby/";
} else {
  apiURL = "http://127.0.0.1:8080/graphql/";
}

window.onload = (): void => {
  render(apiURL);
};
/* BESPOKE END <<DEPRECATE>> */
