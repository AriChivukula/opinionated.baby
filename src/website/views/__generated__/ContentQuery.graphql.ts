/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type ContentQuery = {
    readonly releases: ({
        readonly id: string;
        readonly title: string;
        readonly subtitle: string;
    })[];
    readonly tools: ({
        readonly id: string;
        readonly icon: string;
        readonly link: string;
        readonly title: string;
    })[];
};
