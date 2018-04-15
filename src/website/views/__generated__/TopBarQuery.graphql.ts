/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type TopBarQuery = {
    readonly loginURL: string;
    readonly me: ({
        readonly googleID: string | null;
        readonly email: string | null;
    }) | null;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "TopBarQuery",
  "type": "Query",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "accessToken",
      "type": "String!",
      "defaultValue": null
    }
  ],
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
        }
      ]
    }
  ]
};
(node as any).hash = '8ad488a0b8a904ecf6878d47fff8f288';
export default node;
