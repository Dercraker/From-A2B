"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  CmdOrOption,
  KeyboardShortcut,
} from "@/components/ui/keyboard-shortcut";
import { useDebounce } from "@/hooks/use-debounce";
import { useDisclosure } from "@/hooks/useDisclosure";
import { Search } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useKey } from "react-use";
import { ORGANIZATION_LINKS } from "./org-navigation.links";

export const OrganizationCommand = () => {
  const [isOpen, { open, close, toggle }] = useDisclosure(false);
  const params = useParams();
  const router = useRouter();
  const orgSlug = typeof params.orgSlug === "string" ? params.orgSlug : "";

  const down = () => toggle();

  useKey(
    (event) => (event.ctrlKey || event.metaKey) && event.key === "k",
    down,
    {
      event: "keydown",
      options: {
        capture: true,
      },
    },
  );

  const [searchQuery, SetSearchQuery] = useState("");

  const deboucendSearchQuery = useDebounce(searchQuery, 500);

  return (
    <>
      <div className="relative w-full max-w-[200px] md:w-2/3 lg:w-1/3">
        <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full appearance-none bg-background pl-8 shadow-none"
          onClick={() => {
            open();
          }}
        />

        <div className="pointer-events-none absolute right-2.5 top-2.5 inline-flex h-5 select-none items-center gap-1">
          <KeyboardShortcut eventKey="cmd">
            <CmdOrOption />
          </KeyboardShortcut>
          <KeyboardShortcut eventKey="k">K</KeyboardShortcut>
        </div>
      </div>
      <CommandDialog open={isOpen} onOpenChange={toggle}>
        <CommandInput
          placeholder="Type a command or search..."
          value={searchQuery}
          onChangeCapture={(e) => SetSearchQuery(e.currentTarget.value)}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {ORGANIZATION_LINKS.map((link, idx) => (
            <CommandGroup heading={link.title} key={idx}>
              {link.links.map(({ href, label, Icon }) => (
                <CommandItem
                  key={href}
                  onSelect={() => {
                    close();
                    router.push(href.replace(":organizationSlug", orgSlug));
                  }}
                >
                  {Icon && <Icon className="mr-2 size-4" />}
                  <span>{label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading="Trips"></CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
