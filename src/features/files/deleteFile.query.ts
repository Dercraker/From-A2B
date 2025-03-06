import { prisma } from "@lib/prisma";
import type { DeleteFileSchemaType } from "./file.schema";

export const DeleteFileQuery = async ({ fileId }: DeleteFileSchemaType) => {
  const file = await prisma.file.delete({
    where: {
      id: fileId,
    },
  });

  return file;
};
