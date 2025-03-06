import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";

type AddFileQueryProps = {
  data: Prisma.FileCreateInput;
  stepSlug: string;
};

export const AddFileQuery = async ({ data, stepSlug }: AddFileQueryProps) => {
  const file = await prisma.file.create({
    data: {
      ...data,
      step: {
        connect: {
          slug: stepSlug,
        },
      },
    },
  });

  return file;
};
