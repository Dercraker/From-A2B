import type { User } from "@prisma/client";
import { baseAuth } from "./auth";

export class AuthError extends Error {}

export const GetCurrentUser = async () => {
  const session = await baseAuth();

  if (session?.user) {
    const user = session.user as User;
    return user;
  }

  return null;
};

export const GetRequiredUser = async () => {
  const user = await GetCurrentUser();

  if (!user) {
    throw new AuthError("You must be authenticated to access this resource");
  }

  return user as User;
};
