import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ButtonProps } from "../ui/button";
import { Button } from "../ui/button";
import { Loader } from "../ui/loader";

export const LoadingButton = ({
  loading,
  children,
  className,
  ...props
}: ButtonProps & {
  loading?: boolean;
  success?: string;
}) => {
  return (
    <Button {...props} className={cn(className, "relative select-none")}>
      <motion.span
        // @ts-expect-error - TODO : Remove this when framer-motion fully supports react 19 (https://mlv.sh/fm-r19)
        className="flex items-center gap-1"
        animate={{
          opacity: loading ? 0 : 1,
          y: loading ? -10 : 0,
        }}
      >
        {children}
      </motion.span>
      <motion.span
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: loading ? 1 : 0,
          y: loading ? 0 : 10,
        }}
        exit={{
          opacity: 0,
          y: 10,
        }}
        // @ts-expect-error - TODO : Remove this when framer-motion fully supports react 19 (https://mlv.sh/fm-r19)
        className="absolute inset-0 flex items-center justify-center"
      >
        <Loader size={20} />
      </motion.span>
    </Button>
  );
};
