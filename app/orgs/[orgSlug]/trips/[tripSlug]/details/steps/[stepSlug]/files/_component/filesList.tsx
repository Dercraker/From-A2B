"use client";

import { GetFilesByStepSlugAction } from "@feat/files/getFilesByStepSlug.action";
import { STEP_KEY_FACTORY } from "@feat/steps/stepKey.factory";
import { isActionSuccessful } from "@lib/actions/actions-utils";
import { useQuery } from "@tanstack/react-query";
import { Alert, AlertDescription, AlertTitle } from "@ui/alert";
import { Loader } from "@ui/loader";
import { toast } from "sonner";
import { FileItem } from "./fileItem";

type FilesListProps = {
  stepSlug: string;
  tripSlug: string;
};

export const FilesList = ({ stepSlug, tripSlug }: FilesListProps) => {
  const {
    isPending,
    data: files,
    isError,
  } = useQuery({
    queryKey: STEP_KEY_FACTORY.Files(tripSlug, stepSlug),
    queryFn: async () => {
      const result = await GetFilesByStepSlugAction({
        stepSlug,
      });

      if (!isActionSuccessful(result)) {
        toast.error("Failed to fetch files. Please try again later.");
        return null;
      }

      return result.data;
    },
  });

  if (isPending) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader className="text-primary" />
      </div>
    );
  }

  if (isError || !files) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to fetch files. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {files.length === 0 ? (
        <div className="flex h-40 flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
          <p className="text-muted-foreground">No files uploaded yet.</p>
          <p className="text-sm text-muted-foreground">
            Upload files using the form above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {files.map((file) => (
            <FileItem
              key={file.id}
              file={file}
              stepSlug={stepSlug}
              tripSlug={tripSlug}
            />
          ))}
        </div>
      )}
    </div>
  );
};
