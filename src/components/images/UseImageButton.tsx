"use client";

import { LoadingButton } from "@components/form/LoadingButton";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";
import { Input } from "@ui/input";
import { Typography } from "@ui/typography";
import { useState } from "react";
import { toast } from "sonner";
import { ImageOverlay } from "./ImageOverlay";

type UseImageButtonProps = {
  onChange: (params: { url: string }) => void;
};

export const UseImageButton = ({ onChange }: UseImageButtonProps) => {
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const mutation = useMutation({
    mutationFn: async (url: string) => {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Invalid URL");
      }

      const responseBlob = await response.blob();

      if (!responseBlob.type.startsWith("image")) {
        throw new Error("Invalid URL");
      }

      return url;
    },
    onSuccess: (url) => {
      onChange({ url });
      setOpen(false);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <ImageOverlay>
        <DialogTrigger>
          <Typography as="span" variant="small" className="text-xs">
            Change
          </Typography>
        </DialogTrigger>
      </ImageOverlay>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Use an image URL</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <Input
            type="url"
            onChange={(e) => setImageUrl(e.target.value)}
            value={imageUrl}
          />
          <LoadingButton
            loading={mutation.isPending}
            type="button"
            onClick={() => {
              mutation.mutate(imageUrl);
            }}
            variant="secondary"
            size="sm"
          >
            Save
          </LoadingButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};
