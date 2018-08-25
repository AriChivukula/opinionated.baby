/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type TopBarQuery$ref = any;
export type TopBarQuery = {
    readonly loginURL: string;
    readonly me: ({
        readonly id: string;
        readonly email: string;
    }) | null;
    readonly " $refType": TopBarQuery$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "TopBarQuery",
  "type": "Query",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "loginURL",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "me",
      "storageKey": null,
      "args": null,
      "concreteType": "User",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "id",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "email",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = 'd59614096cce9b011824e5cf640fe227';
export default node;
