import { Graph, IVertex } from "foia-db";
import {
  IncomingMessage,
  ServerResponse,
} from "http";

import {
  genAccessToken,
  genUserForAccessToken,
  genLoginURL,
} from "./google";
import {
  genNullOnThrow,
} from "./utility";

export async function genRoot(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<object> {
  return {
    login: async ({ input }: { input: { code: string } }): Promise<object> => {
      const accessToken: string = await genAccessToken(input.code);
      await genUserForAccessToken(accessToken);

      return { accessToken };
    },
    loginURL: async (): Promise<string> => await genLoginURL(),
    logout: async (): Promise<object> => ({
      accessToken: "",
    }),
    me: async (): Promise<object | null> => await genNullOnThrow(
      // @ts-ignore
      async (): Promise<object | null> => await genUserForAccessToken(req.token),
    ),
    tools: async (): Promise<object[]> => Graph.read().Vertices().outVertex("tool").listVertices().map((v: IVertex) => ({
      id: v.id,
      icon: v.properties["icon"].id,
      link: v.properties["link"].id,
      title: v.properties["title"].id,
    })),
    releases: async (): Promise<object[]> => Graph.read().Vertices().outVertex("release").listVertices().map((v: IVertex) => ({
      id: v.id,
      title: v.properties["title"].id,
      subtitle: v.properties["subtitle"].id,
    })),
  };
}
