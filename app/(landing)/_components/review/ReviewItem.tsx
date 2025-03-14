import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/Avatar";
import { Card, CardContent, CardHeader } from "@components/ui/card";
import { Typography } from "@components/ui/typography";
import { ClientMarkdown } from "@feat/markdown/ClientMarkdown";
import { cn } from "@lib/utils";
import type { ComponentPropsWithoutRef } from "react";

export type ReviewItemProps = {
  /**
   * The review of the user. Use **bold** text to highlight.
   */
  review: string;
  /**
   * The name of the user.
   */
  name: string;
  /**
   * The role of the user. (his job)
   */
  role: string;
  /**
   * The image of the user.
   */
  image: string;
} & ComponentPropsWithoutRef<"div">;

export const ReviewItem = ({
  image,
  name,
  review,
  role,
  className,
  ...props
}: ReviewItemProps) => {
  return (
    <Card className={cn("h-fit", className)} {...props}>
      <CardHeader>
        <ClientMarkdown className="citation">{review}</ClientMarkdown>
      </CardHeader>
      <CardContent className="flex items-center gap-2 rounded-lg bg-background pt-6">
        <div>
          <Avatar>
            <AvatarFallback>{name[0]}</AvatarFallback>
            <AvatarImage src={image} alt="user image" />
          </Avatar>
        </div>
        <div>
          <Typography variant="small">{name}</Typography>
          <Typography variant="muted">{role}</Typography>
        </div>
      </CardContent>
    </Card>
  );
};
