/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type LogoutInput = {
    readonly dummy: string;
};
export type TopBarLogoutMutationVariables = {
    readonly input?: LogoutInput | null;
};
export type TopBarLogoutMutationResponse = {
    readonly logout: {
        readonly accessToken: string;
    };
};
export type TopBarLogoutMutation = {
    readonly response: TopBarLogoutMutationResponse;
    readonly variables: TopBarLogoutMutationVariables;
};



/*
mutation TopBarLogoutMutation(
  $input: LogoutInput
) {
  logout(input: $input) {
    accessToken
  }
}
*/
// @ts-ignore
const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "LogoutInput",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "logout",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "LogoutInput"
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
  "fragment": {
    "kind": "Fragment",
    "name": "TopBarLogoutMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "TopBarLogoutMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "TopBarLogoutMutation",
    "id": null,
    "text": "mutation TopBarLogoutMutation(\n  $input: LogoutInput\n) {\n  logout(input: $input) {\n    accessToken\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '39f7bf943100d67e1b0a258513df84c4';
export default node;
