/**
 * DO NOT MANUALLY EDIT; this file is fully generated.
 *
 * SOURCE<<gen/website/index.ts::module>>
 * BESPOKE<<DEPRECATE>>
 * SIGNED<<JO2Uxo5FJqRw/ghAVr2Q8TPCn5dyd5QgFw+3mJpFayLxQ/oLehCDhofx/zzgZLYqyB8y0MKaqrTsJxNe/ns80w==>>
 */

/* BESPOKE START <<DEPRECATE>> */
import "@babel/polyfill";

import { render } from "./website";

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
