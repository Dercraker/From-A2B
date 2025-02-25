import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";
import { initEdgeStoreClient } from "@edgestore/server/core";
import { requiredAuth } from "@lib/auth/helper";
import { env } from "@lib/env/server";
import { phCapture } from "@lib/postHog/eventCapture";

type Context = {
  userId: string;
};

const createContext = async (): Promise<Context> => {
  const { id } = await requiredAuth();

  return {
    userId: id,
  };
};

const es = initEdgeStore.context<Context>().create();

const edgeStoreRouter = es.router({
  profilePictures: es
    .fileBucket({
      maxSize: 1024 * 1024 * 5, //5Mb
    })
    .beforeUpload(() => {
      phCapture("UploadProfilePicture");
      return true;
    })
    .beforeDelete(() => {
      phCapture("DeleteProfilePicture");
      return true;
    }),
});

export const handler = createEdgeStoreNextHandler({
  logLevel: env.NODE_ENV === "development" ? "debug" : "error",
  router: edgeStoreRouter,
  createContext,
});

export const backendClient = initEdgeStoreClient({
  router: edgeStoreRouter,
  accessKey: env.EDGE_STORE_ACCESS_KEY,
  secretKey: env.EDGE_STORE_SECRET_KEY,
});

export { handler as GET, handler as POST };
export type EdgeStoreRouter = typeof edgeStoreRouter;
