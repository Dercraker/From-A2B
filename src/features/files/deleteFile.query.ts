import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";
import type { DeleteFileSchemaType } from "./file.schema";

export const DeleteFileQuery = async ({ fileId }: DeleteFileSchemaType) => {
  await prisma.file.delete({
    where: {
      id: fileId,
    },
  });
};

export type DeleteFileQuery = Prisma.PromiseReturnType<typeof DeleteFileQuery>;
