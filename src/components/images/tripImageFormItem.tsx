import { cn } from "@lib/utils";
import { SiteConfig } from "site-config";
import { ImageInput } from "./ImageUploadInput";
import { UseImageButton } from "./UseImageButton";

export type TripImageFormItemProps = {
  onChange: ({ url, file }: { url: string; file?: Blob }) => void;
  imageUrl?: string | null;
  className?: string;
  maxSizePicture: number;
};

export const TripImageFormItem = ({
  maxSizePicture,
  onChange,
  className,
  imageUrl: currentImage,
}: TripImageFormItemProps) => {
  return (
    <div
      className={cn(
        "border relative overflow-hidden bg-muted rounded-md aspect-square h-32 group",
        className,
      )}
    >
      <img
        src={currentImage ?? "/images/placeholder.svg"}
        className="absolute inset-0 object-contain object-center"
      />
      {SiteConfig.features.enableImageUpload ? (
        <ImageInput onChange={onChange} maxSizePicture={maxSizePicture} />
      ) : (
        <UseImageButton
          onChange={(params) => {
            onChange({ url: params.url });
          }}
        />
      )}
    </div>
  );
};
