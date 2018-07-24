import { ConcreteFragment } from "relay-runtime";

export type TopBarQuery = {
    readonly loginURL: string;
    readonly me: ({
        readonly id: string;
        readonly email: string;
    }) | null;
};
