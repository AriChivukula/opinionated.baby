/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website/index.ts::module>>
 * BESPOKE<<main>>
 * SIGNED<<baly0HNt5Vcby1yNztL0ZF2baT+6f3zBSkNYyarovz4LGwdM1QXeRCloIsWeq/4Lmtuv49VyU2mmx9Uo9kgvNQ==>>
 */

import "@babel/polyfill";

import {
  render,
} from "./website";

let apiURL: string;

/* BESPOKE START <<main>> */
if (window.location.hostname === "opinionated.baby") {
  apiURL = "https://api.opinionated.baby/graphql/opinionatedbaby/";
} else {
  apiURL = "http://127.0.0.1:8080/graphql/";
}

window.onload = (): void => {
  render(apiURL);
};
/* BESPOKE END <<main>> */
