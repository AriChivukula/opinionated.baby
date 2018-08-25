/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type LoginInput = {
    readonly code: string;
};
export type TopBarLoginMutationVariables = {
    readonly input?: LoginInput | null;
};
export type TopBarLoginMutationResponse = {
    readonly login: {
        readonly accessToken: string;
    };
};
export type TopBarLoginMutation = {
    readonly response: TopBarLoginMutationResponse;
    readonly variables: TopBarLoginMutationVariables;
};



/*
mutation TopBarLoginMutation(
  $input: LoginInput
) {
  login(input: $input) {
    accessToken
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "LoginInput",
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
        "name": "input",
        "variableName": "input",
        "type": "LoginInput"
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
  "text": "mutation TopBarLoginMutation(\n  $input: LoginInput\n) {\n  login(input: $input) {\n    accessToken\n  }\n}\n",
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
(node as any).hash = '8918a1a244bb60edf36c16e7b311cbca';
export default node;
