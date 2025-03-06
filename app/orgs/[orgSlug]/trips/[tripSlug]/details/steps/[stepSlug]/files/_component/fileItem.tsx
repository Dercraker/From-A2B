"use client";

import { getDownloadUrl } from "@edgestore/react/utils";
import type { FileDto } from "@feat/files/file.schema";
import { Card, CardContent, CardFooter } from "@ui/card";
import { InlineTooltip } from "@ui/tooltip";
import { formatBytes } from "@utils/formatBytes";
import {
  Download,
  Eye,
  FileIcon,
  FileText,
  ImageIcon,
  Video,
} from "lucide-react";
import NextImage from "next/image";
import { DeleteFileAlterDialog } from "./deleteFileAlterDialog";

type FileItemProps = {
  file: FileDto;
  stepSlug: string;
  tripSlug: string;
};

export const FileItem = ({ file, stepSlug, tripSlug }: FileItemProps) => {
  const handlePreview = () => {
    window.open(file.url, "_blank");
  };

  const getFileIcon = () => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="size-5" />;
    } else if (file.type.startsWith("video/")) {
      return <Video className="size-5" />;
    } else if (file.type.startsWith("text/") || file.type.includes("pdf")) {
      return <FileText className="size-5" />;
    } else {
      return <FileIcon className="size-5" />;
    }
  };

  const renderPreview = () => {
    if (file.type.startsWith("image/")) {
      return (
        <div className="relative aspect-video w-full overflow-hidden rounded-t-md">
          <NextImage
            src={file.url}
            alt={file.name}
            fill
            className="object-cover"
          />
        </div>
      );
    }

    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-t-md bg-muted">
        {getFileIcon()}
        <span className="ml-2 text-sm">{file.type}</span>
      </div>
    );
  };

  const handleDownload = () => {
    window.open(getDownloadUrl(file.url, file.name), "_blank");
  };

  return (
    <Card className="overflow-hidden">
      {renderPreview()}
      <CardContent className="p-4">
        <h3 className="line-clamp-1 font-medium">{file.name}</h3>
        <p className="text-xs text-muted-foreground">
          {formatBytes(file.size)} •{" "}
          {new Date(file.uploadedAt).toLocaleDateString()}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <InlineTooltip title="Preview">
          <Eye
            className="cursor-pointer text-primary"
            onClick={handlePreview}
          />
        </InlineTooltip>
        <InlineTooltip title="Download">
          <Download
            className="cursor-pointer text-blue-500"
            onClick={handleDownload}
          />
        </InlineTooltip>
        <DeleteFileAlterDialog
          file={file}
          stepSlug={stepSlug}
          tripSlug={tripSlug}
        />
      </CardFooter>
    </Card>
  );
};
