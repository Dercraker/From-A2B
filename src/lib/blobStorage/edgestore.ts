"use client";
import { createEdgeStoreProvider } from "@edgestore/react";
import { type InferClientResponse } from "@edgestore/server/core";
import type { EdgeStoreRouter } from "./edgestore-server";

const { EdgeStoreProvider, useEdgeStore } =
  createEdgeStoreProvider<EdgeStoreRouter>();
export { EdgeStoreProvider, useEdgeStore };

export type ClientResponse = InferClientResponse<EdgeStoreRouter>;
