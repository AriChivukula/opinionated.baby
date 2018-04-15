/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type TopBarLogoutMutationVariables = {
};
export type TopBarLogoutMutationResponse = {
    readonly logout: {
        readonly accessToken: string;
    };
};



/*
mutation TopBarLogoutMutation {
  logout {
    accessToken
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "logout",
    "storageKey": null,
    "args": null,
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
  "name": "TopBarLogoutMutation",
  "id": null,
  "text": "mutation TopBarLogoutMutation {\n  logout {\n    accessToken\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "TopBarLogoutMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": v0
  },
  "operation": {
    "kind": "Operation",
    "name": "TopBarLogoutMutation",
    "argumentDefinitions": [],
    "selections": v0
  }
};
})();
(node as any).hash = 'c9c34226f572d38fb18b6780edd6d3d0';
export default node;
