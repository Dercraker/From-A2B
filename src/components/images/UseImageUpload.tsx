import { UploadProfilPictureAction } from "@feat/account/UploadProfilPicture.action";
import { isActionSuccessful } from "@lib/actions/actions-utils";
import { useMutation } from "@tanstack/react-query";
import { Typography } from "@ui/typography";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { ImageOverlay } from "./ImageOverlay";
import { NativeTargetBox } from "./NativeTargetBox";

type UseImageUploadProps = {
  onChange: (url: string) => void;
  maxSizePicture: number;
};

export const UseImageUpload = ({
  onChange,
  maxSizePicture = 1,
}: UseImageUploadProps) => {
  const uploadImageMutation = useMutation({
    mutationFn: async (file: File) => {
      const result = await UploadProfilPictureAction({
        file,
      });

      if (!isActionSuccessful(result)) {
        toast.error(result?.serverError ?? "Something went wrong");
        return;
      }

      onChange(result.data.url);
    },
  });

  const handleDrop = async (item: { files: File[] }) => {
    const file = item.files[0] as File;

    const validFiles = ["image/png", "image/jpeg", "image/jpg"];

    if (!validFiles.includes(file.type)) {
      toast.error("Invalid file type", {
        description: "Only png, jpg, jpeg are allowed",
      });
      return;
    }

    if (file.size > 1024 * 1024 * maxSizePicture) {
      toast.error(
        `File too large, max ${maxSizePicture}mb (current ${(file.size / (1024 * 1024)).toFixed(2)}mb)`,
        {
          description: "https://tinypng.com/ to compress the image",
        },
      );
      return;
    }

    uploadImageMutation.mutate(file);
  };

  return (
    <ImageOverlay isLoading={uploadImageMutation.isPending}>
      <NativeTargetBox
        className="absolute inset-0 flex h-auto items-center justify-center"
        isLoading={uploadImageMutation.isPending}
        onDrop={handleDrop}
        accept={["*.png"]}
      >
        {uploadImageMutation.isPending ? (
          <Loader className="animate-spin" />
        ) : (
          <Typography variant="muted">Upload</Typography>
        )}
      </NativeTargetBox>
    </ImageOverlay>
  );
};
