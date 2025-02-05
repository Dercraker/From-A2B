import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/button";
import { getUsersOrgs } from "@/features/org/get-users-orgs.query";
import { auth } from "@/lib/auth/helper";
import type { PropsWithChildren } from "react";
import { OrgsSelect } from "../../../app/orgs/[orgSlug]/(navigation)/_navigation/OrgsSelect";
import { UserDropdown } from "../auth/UserDropDown";
import { NavigationWrapper } from "./NavigationWrapper";

export default async function AuthNavigationWrapper(props: PropsWithChildren) {
  const user = await auth();

  if (!user) {
    return <NavigationWrapper>{props.children}</NavigationWrapper>;
  }
  const userOrgs = await getUsersOrgs();

  return (
    <NavigationWrapper
      logoChildren={
        <OrgsSelect orgs={userOrgs} currentOrgSlug="new">
          <span>Organization...</span>
        </OrgsSelect>
      }
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
      {props.children}
    </NavigationWrapper>
  );
}
