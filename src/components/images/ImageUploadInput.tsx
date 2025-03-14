import { cn } from "@lib/utils";
import { Typography } from "@ui/typography";
import { fileToBlob } from "@utils/file";
import { toast } from "sonner";
import { ImageOverlay } from "./ImageOverlay";
import { NativeTargetBox } from "./NativeTargetBox";

export type ImageUploadInputProps = {
  onChange: ({ url, file }: { url: string; file: Blob }) => void;
  imageUrl?: string | null;
  className?: string;
  maxSizePicture: number;
};

export const ImageInput = ({
  maxSizePicture,
  onChange,
  imageUrl,
  className,
}: ImageUploadInputProps) => {
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

    const imageBlob = await fileToBlob(file);
    const blobUrl = URL.createObjectURL(imageBlob);

    onChange({ url: blobUrl, file });
  };

  return (
    <div
      className={cn(
        "border relative overflow-hidden bg-muted rounded-md aspect-square h-32 group",
        className,
      )}
    >
      <img
        src={imageUrl ?? "/images/placeholder.svg"}
        className="absolute inset-0 object-contain object-center"
      />
      <ImageOverlay>
        <NativeTargetBox
          className="absolute inset-0 flex h-auto items-center justify-center"
          onDrop={handleDrop}
          accept={["*.png"]}
        >
          <Typography variant="muted">Upload</Typography>
        </NativeTargetBox>
      </ImageOverlay>
    </div>
  );
};
