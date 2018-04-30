/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website/index.ts::module>>
 * BESPOKE<<DEPRECATE>>
 * SIGNED<<SAQNwb1rKh/UTcRwY91iHK2WmfNj3e5573SA4aW+CBIX5t4ruY5Odvgd/1x3bsFu9nHx6ag1S2PiZu6vqIVBKA==>>
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
