/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website/index.ts::module>>
 * BESPOKE<<DEPRECATE>>
 * SIGNED<<WWJK3iSsk0uEgTRZU8yOrPoaRUnXz4H2wFBP0JiVRQrpyB/IwnQqCUMJHZzERoR81Pc9xSHdmF13hPXsnef27w==>>
 */

import "@babel/polyfill";

import {
  render,
} from "./website";

let apiURL: string;

/* BESPOKE START <<DEPRECATE>> */
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
