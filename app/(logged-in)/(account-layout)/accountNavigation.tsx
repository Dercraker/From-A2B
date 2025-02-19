import { UserDropdown } from "@components/auth/UserDropDown";
import { NavigationWrapper } from "@components/navigation/NavigationWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/Avatar";
import { Button } from "@components/ui/button";
import { getUsersOrgs } from "@feat/org/get-users-orgs.query";
import { requiredAuth } from "@lib/auth/helper";
import type { PropsWithChildren } from "react";
import { OrgsSelect } from "../../orgs/[orgSlug]/(navigation)/_navigation/OrgsSelect";
import { AccountNavigationLinks } from "./accountNavigationLinks";

export async function AccountNavigation({ children }: PropsWithChildren) {
  const user = await requiredAuth();
  const userOrgs = await getUsersOrgs();
  return (
    <NavigationWrapper
      logoChildren={
        <OrgsSelect orgs={userOrgs}>
          <Avatar className="size-8">
            <AvatarFallback>
              {user.email ? user.email.slice(0, 2) : "??"}
            </AvatarFallback>
            {user.image && <AvatarImage src={user.image} />}
          </Avatar>
          <span>{user.name}</span>
        </OrgsSelect>
      }
      navigationChildren={<AccountNavigationLinks />}
      topBarCornerLeftChildren={
        <UserDropdown>
          <Button variant="ghost" className="size-10 rounded-full" size="sm">
            <Avatar className="size-8">
              <AvatarFallback>
                {user.email ? user.email.slice(0, 2) : "??"}
              </AvatarFallback>
              {user.image && <AvatarImage src={user.image} />}
            </Avatar>
          </Button>
        </UserDropdown>
      }
    >
      {children}
    </NavigationWrapper>
  );
}
