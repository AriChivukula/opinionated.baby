/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type ContentQuery$ref = any;
export type ContentQuery = {
    readonly releases: ReadonlyArray<({
        readonly id: string;
        readonly title: string;
        readonly subtitle: string;
    }) | null> | null;
    readonly tools: ReadonlyArray<({
        readonly id: string;
        readonly icon: string;
        readonly link: string;
        readonly title: string;
    }) | null> | null;
    readonly " $refType": ContentQuery$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "title",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "ContentQuery",
  "type": "Query",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "releases",
      "storageKey": null,
      "args": null,
      "concreteType": "Release",
      "plural": true,
      "selections": [
        v0,
        v1,
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "subtitle",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "tools",
      "storageKey": null,
      "args": null,
      "concreteType": "Tool",
      "plural": true,
      "selections": [
        v0,
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "icon",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "link",
          "args": null,
          "storageKey": null
        },
        v1
      ]
    }
  ]
};
})();
(node as any).hash = 'fa8f29ace282b62cf9434631811dcef4';
export default node;
