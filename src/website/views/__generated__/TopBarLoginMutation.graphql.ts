import { ConcreteRequest } from "relay-runtime";

export type TopBarLoginMutationVariables = {
    readonly input?: {
        readonly code?: string;
    } | null;
};

export type TopBarLoginMutationResponse = {
    readonly login: {
        readonly accessToken: string;
    };
};
