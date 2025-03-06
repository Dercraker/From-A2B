import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";
import { initEdgeStoreClient } from "@edgestore/server/core";
import { currentUser } from "@lib/auth/helper";
import { env } from "@lib/env/server";
import { phCapture } from "@lib/postHog/eventCapture";
import { z } from "zod";
import { getEnvPath } from "./getEnvPath";

type Context = {
  userId: string;
  envPath: string;
};

const createContext = async (): Promise<Context> => {
  const session = await currentUser();

  return {
    userId: session?.id ?? "",
    envPath: getEnvPath(),
  };
};

const es = initEdgeStore.context<Context>().create();

const edgeStoreRouter = es.router({
  profilePictures: es
    .imageBucket({
      maxSize: 1024 * 1024 * 1, //1Mb
    })
    .path(({ ctx }) => [{ env: ctx.envPath }])
    .beforeUpload(() => {
      phCapture("UploadProfilePicture");
      return true;
    })
    .beforeDelete(() => {
      phCapture("DeleteProfilePicture");
      return true;
    }),
  stepFiles: es
    .fileBucket({
      maxSize: 1024 * 1024 * 50, //50Mb
    })
    .input(z.object({ stepSlug: z.string() }))
    .path(({ ctx, input }) => [
      { env: ctx.envPath },
      { stepSlug: input.stepSlug },
    ])
    .beforeUpload(() => {
      phCapture("UploadFile");
      return true;
    })
    .beforeDelete(() => {
      phCapture("DeleteFile");
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
