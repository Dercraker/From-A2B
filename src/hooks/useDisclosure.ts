import { useCallback, useState } from "react";

export type DisclosureHandler = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const useDisclosure = (
  initialState = false,
  callbacks?: { onOpen?: () => void; onClose?: () => void },
): readonly [boolean, DisclosureHandler] => {
  const { onOpen, onClose } = callbacks ?? {};
  const [opened, setOpened] = useState(initialState);

  const open = useCallback(() => {
    setOpened((isOpened) => {
      if (!isOpened) {
        onOpen?.();
        return true;
      }
      return isOpened;
    });
  }, [onOpen]);

  const close = useCallback(() => {
    setOpened((isOpened) => {
      if (isOpened) {
        onClose?.();
        return false;
      }
      return isOpened;
    });
  }, [onClose]);

  const toggle = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    opened ? close() : open();
  }, [close, open, opened]);

  return [opened, { open, close, toggle } satisfies DisclosureHandler] as const;
};
