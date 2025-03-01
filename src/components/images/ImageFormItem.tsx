import { cn } from "@lib/utils";
import { SiteConfig } from "site-config";
import { UseImageButton } from "./UseImageButton";
import { UseImageUpload } from "./UseImageUpload";

type ImageFormItemProps = {
  onChange: (url: string) => void;
  imageUrl?: string | null;
  className?: string;
  maxSizePicture: number;
};

export const ImageFormItem = ({
  onChange,
  imageUrl,
  className,
  maxSizePicture,
}: ImageFormItemProps) => {
  const currentImage = imageUrl;

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
        alt=""
      />
      {SiteConfig.features.enableImageUpload ? (
        <UseImageUpload onChange={onChange} maxSizePicture={maxSizePicture} />
      ) : (
        <UseImageButton
          onChange={(params) => {
            onChange(params.url);
          }}
        />
      )}
    </div>
  );
};
