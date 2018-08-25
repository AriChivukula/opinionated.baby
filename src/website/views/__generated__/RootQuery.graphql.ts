/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
type ContentQuery$ref = any;
type TopBarQuery$ref = any;
export type RootQueryVariables = {};
export type RootQueryResponse = {
    readonly " $fragmentRefs": ContentQuery$ref & TopBarQuery$ref;
};
export type RootQuery = {
    readonly response: RootQueryResponse;
    readonly variables: RootQueryVariables;
};



/*
query RootQuery {
  ...ContentQuery
  ...TopBarQuery
}

fragment ContentQuery on Query {
  releases {
    id
    title
    subtitle
  }
  tools {
    id
    icon
    link
    title
  }
}

fragment TopBarQuery on Query {
  loginURL
  me {
    id
    email
  }
}
*/

const node: ConcreteRequest = (function(){
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
  "kind": "Request",
  "operationKind": "query",
  "name": "RootQuery",
  "id": null,
  "text": "query RootQuery {\n  ...ContentQuery\n  ...TopBarQuery\n}\n\nfragment ContentQuery on Query {\n  releases {\n    id\n    title\n    subtitle\n  }\n  tools {\n    id\n    icon\n    link\n    title\n  }\n}\n\nfragment TopBarQuery on Query {\n  loginURL\n  me {\n    id\n    email\n  }\n}\n",
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
        "name": "ContentQuery",
        "args": null
      },
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
      },
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
          v0,
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
(node as any).hash = '898a746646efa3681f41bb5bd6931460';
export default node;
