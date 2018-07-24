import { ConcreteRequest } from "relay-runtime";

export type TopBarLogoutMutationVariables = {
    readonly input?: {
        readonly dummy?: string;
    } | null;
};

export type TopBarLogoutMutationResponse = {
    readonly logout: {
        readonly accessToken: string;
    };
};
