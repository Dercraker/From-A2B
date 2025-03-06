"use client";

import { LoadingButton } from "@components/form/LoadingButton";
import { useAddFile } from "@feat/files/useAddFile.hook";
import { logger } from "@lib/logger";
import { Input } from "@ui/input";
import { Progress } from "@ui/progress";
import { UploadCloud } from "lucide-react";
import { useRef, useState } from "react";

type FileUploaderProps = {
  stepSlug: string;
  tripSlug: string;
};

export const FileUploader = ({ stepSlug, tripSlug }: FileUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const { mutateAsync: addFileAsync } = useAddFile({
    stepSlug,
    tripSlug,
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      await addFileAsync({
        file,
      });

      setUploadProgress(100);

      setTimeout(() => {
        setUploadProgress(0);
        setIsUploading(false);
      }, 1500);
    } catch (error) {
      logger.error("Error uploading file:", error);
      setUploadProgress(0);
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          ref={inputRef}
        />
        <LoadingButton
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-2"
          loading={isUploading}
          disabled={isUploading}
        >
          <UploadCloud className="size-4" />
          Upload file
        </LoadingButton>
      </div>

      {isUploading && (
        <div className="space-y-1">
          <Progress value={uploadProgress} className="h-2 w-full" />
          <p className="text-xs text-muted-foreground">
            {uploadProgress < 100
              ? `Uploading: ${uploadProgress}%`
              : "Upload complete!"}
          </p>
        </div>
      )}
    </div>
  );
};
