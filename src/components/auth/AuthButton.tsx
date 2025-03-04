import { currentUser } from "@lib/auth/helper";
import { LoggedInButton, SignInButton } from "./SignInButton";

export const AuthButton = async () => {
  const user = await currentUser();

  if (user) {
    return <LoggedInButton user={user} />;
  }

  return <SignInButton />;
};
