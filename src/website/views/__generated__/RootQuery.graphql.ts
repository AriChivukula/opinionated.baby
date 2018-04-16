/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type RootQueryVariables = {
    readonly accessToken?: string | null;
};
export type RootQueryResponse = {
};



/*
query RootQuery(
  $accessToken: String
) {
  ...TopBarQuery_3aAabH
}

fragment TopBarQuery_3aAabH on Query {
  loginURL
  me(accessToken: $accessToken) {
    id
    email
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "accessToken",
    "type": "String",
    "defaultValue": null
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "RootQuery",
  "id": null,
  "text": "query RootQuery(\n  $accessToken: String\n) {\n  ...TopBarQuery_3aAabH\n}\n\nfragment TopBarQuery_3aAabH on Query {\n  loginURL\n  me(accessToken: $accessToken) {\n    id\n    email\n  }\n}\n",
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
            "name": "accessToken",
            "variableName": "accessToken",
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
            "name": "accessToken",
            "variableName": "accessToken",
            "type": "String"
          }
        ],
        "concreteType": "Login",
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
})();
(node as any).hash = '44a030f0348e92fe41033d53da62cd4b';
export default node;
