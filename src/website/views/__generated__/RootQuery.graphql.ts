/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type RootQueryVariables = {
    readonly access_token: string;
};
export type RootQueryResponse = {
};



/*
query RootQuery(
  $access_token: String!
) {
  ...TopBarQuery_3NIOrk
}

fragment TopBarQuery_3NIOrk on Query {
  loginURL
  me(access_token: $access_token) {
    googleID
    email
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "access_token",
    "type": "String!",
    "defaultValue": null
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "RootQuery",
  "id": null,
  "text": "query RootQuery(\n  $access_token: String!\n) {\n  ...TopBarQuery_3NIOrk\n}\n\nfragment TopBarQuery_3NIOrk on Query {\n  loginURL\n  me(access_token: $access_token) {\n    googleID\n    email\n    id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "RootQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "TopBarQuery",
        "args": [
          {
            "kind": "Variable",
            "name": "access_token",
            "variableName": "access_token",
            "type": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "RootQuery",
    "argumentDefinitions": v0,
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
        "args": [
          {
            "kind": "Variable",
            "name": "access_token",
            "variableName": "access_token",
            "type": "String!"
          }
        ],
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "googleID",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "email",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
};
})();
(node as any).hash = 'bdaf27fa4849cc677b51cc36cd0a7d0a';
export default node;
