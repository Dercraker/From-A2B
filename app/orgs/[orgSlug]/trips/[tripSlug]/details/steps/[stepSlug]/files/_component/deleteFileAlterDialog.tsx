"use client";

import { alertDialog } from "@feat/alert-dialog/alert-dialog-store";
import type { FileDto } from "@feat/files/file.schema";
import { useDeleteFile } from "@feat/files/useDeleteFile.hook";
import { Typography } from "@ui/typography";
import { Trash2 } from "lucide-react";

export type DeleteFileAlterDialogProps = {
  file: FileDto;
  stepSlug: string;
  tripSlug: string;
};

export const DeleteFileAlterDialog = ({
  file,
  stepSlug,
  tripSlug,
}: DeleteFileAlterDialogProps) => {
  const { mutateAsync: deleteFileAsync, isPending } = useDeleteFile({
    stepSlug,
    tripSlug,
  });

  return (
    <Trash2
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();

        alertDialog.add({
          title: `Delete file : ${file.name}`,
          description: (
            <>
              <Typography variant="lead" className="text-base">
                Are you sure you want to delete this file ?
              </Typography>
              <Typography variant="muted" className="italic">
                If you delete this file, all the data associated with it will be
                lost.
              </Typography>
            </>
          ),
          loading: isPending,
          action: {
            label: "Delete",
            onClick: async () => {
              await deleteFileAsync({
                fileId: file.id,
                url: file.url,
              });
            },
          },
        });
      }}
      size={24}
      className="cursor-pointer text-red-400"
    />
  );
};
