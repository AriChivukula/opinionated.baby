/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type TopBarLoginMutationVariables = {
    readonly code: string;
};
export type TopBarLoginMutationResponse = {
    readonly login: {
        readonly accessToken: string;
    };
};



/*
mutation TopBarLoginMutation(
  $code: String!
) {
  login(code: $code) {
    accessToken
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "code",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "login",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "code",
        "variableName": "code",
        "type": "String!"
      }
    ],
    "concreteType": "AccessToken",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "accessToken",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "TopBarLoginMutation",
  "id": null,
  "text": "mutation TopBarLoginMutation(\n  $code: String!\n) {\n  login(code: $code) {\n    accessToken\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "TopBarLoginMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "TopBarLoginMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node as any).hash = 'c69f210d37b3032bf4b4b1ed7cbc2013';
export default node;
