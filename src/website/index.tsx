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
