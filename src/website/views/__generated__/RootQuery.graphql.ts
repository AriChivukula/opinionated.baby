/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type RootQueryVariables = {};
export type RootQueryResponse = {};



/*
query RootQuery {
  ...TopBarQuery
}

fragment TopBarQuery on Query {
  loginURL
  me {
    id
    email
  }
}
*/

const node: ConcreteRequest = {
  "kind": "Request",
  "operationKind": "query",
  "name": "RootQuery",
  "id": null,
  "text": "query RootQuery {\n  ...TopBarQuery\n}\n\nfragment TopBarQuery on Query {\n  loginURL\n  me {\n    id\n    email\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "RootQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "TopBarQuery",
        "args": null
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "RootQuery",
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
  }
};
(node as any).hash = '6b0f054e2959b028055190aabaf4b64d';
export default node;
